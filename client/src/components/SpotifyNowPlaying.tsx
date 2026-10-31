import { useEffect, useRef, useState } from "react";
import { ExternalLink, LogOut, Music2, Play, Radio, RefreshCw } from "lucide-react";
import {
  beginSpotifyAuth,
  clearSpotifySession,
  getSpotifyAccessToken,
  getStoredTokens,
  spotifyClientId,
} from "@/lib/spotify";

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album?: { name: string; images?: { url: string }[] };
  external_urls?: { spotify?: string };
};

type PlaybackState = {
  item?: SpotifyTrack | null;
  is_playing?: boolean;
  progress_ms?: number;
  duration_ms?: number;
};

type SpotifyPlayer = {
  addListener: (event: string, callback: (...args: any[]) => void) => void;
  connect: () => Promise<boolean>;
  disconnect: () => void;
};

declare global {
  interface Window {
    Spotify?: { Player: new (options: { name: string; volume: number; getOAuthToken: (callback: (token: string) => void) => void }) => SpotifyPlayer };
    onSpotifyWebPlaybackSDKReady?: () => void;
  }
}

let sdkPromise: Promise<void> | null = null;

function loadSpotifySdk() {
  if (window.Spotify) return Promise.resolve();
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-spotify-sdk="true"]');
    window.onSpotifyWebPlaybackSDKReady = () => resolve();
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    script.dataset.spotifySdk = "true";
    script.onerror = () => reject(new Error("Spotify’s player library could not load."));
    document.body.appendChild(script);
  });
  return sdkPromise;
}

export default function SpotifyNowPlaying() {
  const [state, setState] = useState<PlaybackState | null>(null);
  const [connected, setConnected] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<SpotifyPlayer | null>(null);

  const updateRemoteState = async () => {
    const token = await getSpotifyAccessToken();
    if (!token) return;
    const response = await fetch("https://api.spotify.com/v1/me/player", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 204) {
      setState(null);
      return;
    }
    if (response.status === 401) {
      clearSpotifySession();
      setConnected(false);
      setError("Your Spotify session expired. Connect again to continue.");
      return;
    }
    if (!response.ok) throw new Error("Spotify could not return playback status for this account.");
    setState(await response.json());
  };

  const connectPlayer = async () => {
    if (!spotifyClientId) {
      setError("The Spotify Client ID is missing from the local preview configuration.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const token = await getSpotifyAccessToken();
      if (!token) {
        await beginSpotifyAuth();
        return;
      }
      await loadSpotifySdk();
      if (!window.Spotify) throw new Error("Spotify’s player library is unavailable.");
      const player = new window.Spotify.Player({
        name: "Samunnat’s Portfolio Player",
        volume: 0.55,
        getOAuthToken: async (callback) => callback((await getSpotifyAccessToken()) ?? token),
      });
      player.addListener("ready", () => setConnected(true));
      player.addListener("not_ready", () => setConnected(false));
      player.addListener("player_state_changed", (nextState: PlaybackState | null) => {
        if (nextState) setState(nextState);
      });
      player.addListener("initialization_error", ({ message }: { message: string }) => setError(message));
      player.addListener("authentication_error", ({ message }: { message: string }) => setError(message));
      player.addListener("account_error", ({ message }: { message: string }) => setError(message));
      playerRef.current = player;
      const didConnect = await player.connect();
      if (!didConnect) throw new Error("Spotify could not connect this browser as a playback device.");
      await updateRemoteState();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Spotify could not connect right now.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!getStoredTokens()) return;
    connectPlayer();
    const interval = window.setInterval(() => updateRemoteState().catch(() => undefined), 15_000);
    return () => {
      window.clearInterval(interval);
      playerRef.current?.disconnect();
    };
  }, []);

  const track = state?.item;
  const artwork = track?.album?.images?.[0]?.url;
  const artist = track?.artists?.map(({ name }) => name).join(", ");

  const signOut = () => {
    playerRef.current?.disconnect();
    playerRef.current = null;
    clearSpotifySession();
    setConnected(false);
    setState(null);
    setError(null);
  };

  return (
    <section className={`spotify-widget ${connected ? "spotify-widget--connected" : ""} ${state?.is_playing ? "spotify-widget--playing" : ""}`} aria-label="Spotify Now Playing">
      <div className="spotify-widget__head">
        <div>
          <div className="eyebrow spotify-widget__eyebrow">Now playing</div>
          <h2>Soundtrack <em>of the moment.</em></h2>
        </div>
        <div className={`spotify-widget__status ${connected ? "spotify-widget__status--live" : ""}`}>
          <span className="spotify-widget__status-dot" />
          {connected && <span className="spotify-widget__signal" aria-hidden="true"><i /><i /><i /><i /></span>}
          {connected ? "Connected" : "Spotify"}
        </div>
      </div>

      {track ? (
        <div className="spotify-track">
          <div className="spotify-track__artwork">{artwork ? <img src={artwork} alt="" /> : <Music2 size={27} />}</div>
          <div className="spotify-track__info">
            <span className="spotify-track__label">{state?.is_playing ? "Listening now" : "Paused"}</span>
            <strong>{track.name}</strong>
            <span>{artist}</span>
          </div>
          {track.external_urls?.spotify && <a href={track.external_urls.spotify} target="_blank" rel="noreferrer" className="spotify-track__link" aria-label="Open track in Spotify"><ExternalLink size={17} /></a>}
        </div>
      ) : (
        <div className="spotify-empty">
          <div className="spotify-empty__icon"><Radio size={22} /></div>
          <div><strong>{connected ? "Nothing playing right now" : "Connect your Spotify"}</strong><p>{connected ? "Start a track and it will appear here." : "Show the music behind the work in real time."}</p></div>
        </div>
      )}

      {error && <p className="spotify-widget__error" role="alert">{error}</p>}
      <div className="spotify-widget__actions">
        {!connected && <button type="button" className="spotify-widget__button" onClick={connectPlayer} disabled={busy}><Play size={14} /> {busy ? "Connecting…" : "Connect Spotify"}</button>}
        {connected && <button type="button" className="spotify-widget__button spotify-widget__button--quiet" onClick={() => updateRemoteState().catch((caught) => setError(caught instanceof Error ? caught.message : "Could not refresh playback."))}><RefreshCw size={14} /> Refresh</button>}
        {getStoredTokens() && <button type="button" className="spotify-widget__signout" onClick={signOut}><LogOut size={14} /> Disconnect</button>}
      </div>
    </section>
  );
}
