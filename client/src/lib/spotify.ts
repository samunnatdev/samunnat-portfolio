// Spotify Client IDs are public OAuth identifiers; no Client Secret is used in this browser-only PKCE flow.
export const spotifyClientId = (import.meta.env.VITE_SPOTIFY_CLIENT_ID as string | undefined) ?? "3fdd1facdfa04831a88413da31b44988";

export const spotifyRedirectUri = `${window.location.origin}/spotify-callback`;

export const spotifyScopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
];

const verifierKey = "spotify_pkce_verifier";
const stateKey = "spotify_oauth_state";
const tokenKey = "spotify_tokens";

export type SpotifyTokens = {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
};

function randomString(length = 64) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, length);
}

function base64UrlEncode(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function createCodeChallenge(verifier: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return base64UrlEncode(digest);
}

export async function beginSpotifyAuth() {
  if (!spotifyClientId) throw new Error("Spotify Client ID is not configured.");

  const verifier = randomString();
  const state = randomString(32);
  const challenge = await createCodeChallenge(verifier);
  localStorage.setItem(verifierKey, verifier);
  localStorage.setItem(stateKey, state);

  const params = new URLSearchParams({
    client_id: spotifyClientId,
    response_type: "code",
    redirect_uri: spotifyRedirectUri,
    code_challenge_method: "S256",
    code_challenge: challenge,
    state,
    scope: spotifyScopes.join(" "),
  });

  window.location.assign(`https://accounts.spotify.com/authorize?${params.toString()}`);
}

export async function exchangeSpotifyCode(code: string, state: string | null) {
  if (!spotifyClientId) throw new Error("Spotify Client ID is not configured.");
  if (!state || state !== localStorage.getItem(stateKey)) throw new Error("Spotify sign-in state could not be verified.");

  const verifier = localStorage.getItem(verifierKey);
  if (!verifier) throw new Error("Spotify sign-in session expired. Please try again.");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: spotifyClientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: spotifyRedirectUri,
      code_verifier: verifier,
    }),
  });

  if (!response.ok) throw new Error("Spotify could not complete sign-in. Check the redirect URI and try again.");
  const data = await response.json();
  const tokens: SpotifyTokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
  };
  localStorage.setItem(tokenKey, JSON.stringify(tokens));
  localStorage.removeItem(verifierKey);
  localStorage.removeItem(stateKey);
  return tokens;
}

export function getStoredTokens(): SpotifyTokens | null {
  const raw = localStorage.getItem(tokenKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SpotifyTokens;
  } catch {
    localStorage.removeItem(tokenKey);
    return null;
  }
}

export async function getSpotifyAccessToken() {
  const tokens = getStoredTokens();
  if (!tokens) return null;
  if (tokens.expires_at > Date.now() + 60_000) return tokens.access_token;
  if (!tokens.refresh_token || !spotifyClientId) return null;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: spotifyClientId,
      grant_type: "refresh_token",
      refresh_token: tokens.refresh_token,
    }),
  });
  if (!response.ok) {
    localStorage.removeItem(tokenKey);
    return null;
  }

  const data = await response.json();
  const refreshed: SpotifyTokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token ?? tokens.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
  };
  localStorage.setItem(tokenKey, JSON.stringify(refreshed));
  return refreshed.access_token;
}

export function clearSpotifySession() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(verifierKey);
  localStorage.removeItem(stateKey);
}
