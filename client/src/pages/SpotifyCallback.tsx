import { useEffect, useState } from "react";
import { exchangeSpotifyCode } from "@/lib/spotify";

export default function SpotifyCallback() {
  const [message, setMessage] = useState("Connecting to Spotify…");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");

    if (error) {
      setMessage("Spotify sign-in was cancelled. You can return to the home page.");
      return;
    }
    if (!code) {
      setMessage("Spotify did not return a sign-in code. You can return to the home page.");
      return;
    }

    exchangeSpotifyCode(code, state)
      .then(() => window.location.replace("/"))
      .catch((caught) => setMessage(caught instanceof Error ? caught.message : "Spotify sign-in could not be completed."));
  }, []);

  return (
    <section className="spotify-callback page-wrap">
      <div className="eyebrow">Spotify connection</div>
      <h1>{message}</h1>
      <a href="/" className="button-ghost">Return home</a>
    </section>
  );
}
