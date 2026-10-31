import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import LoadingScreen from "../ui/LoadingScreen";
import AnimatedBackground from "../ui/AnimatedBackground";
import useFullPageScroll from "../../hooks/useFullPageScroll";
import { playInteractionSound } from "../../lib/interactionSound";
import { Volume2, VolumeX } from "lucide-react";

export default function MainLayout({ children }) {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const lastControlClick = useRef(0);
  const musicRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);
  const [bgReady, setBgReady] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);

  useFullPageScroll(!showLoader);

  useEffect(() => {
    const music = new Audio("/engineering-ambient.wav");
    music.preload = "auto";
    music.loop = true;
    music.volume = 0.12;
    musicRef.current = music;
    let active = true;

    music.play()
      .then(() => {
        if (active) setMusicPlaying(true);
      })
      .catch((error) => {
        if (!active || error.name === "NotAllowedError" || error.name === "AbortError") return;
        console.error("Background music could not be played:", error);
        setMusicError(true);
      });

    return () => {
      active = false;
      music.pause();
      musicRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    const music = musicRef.current;
    if (!music) return;

    if (musicPlaying) {
      music.pause();
      setMusicPlaying(false);
      return;
    }

    music.play()
      .then(() => {
        setMusicError(false);
        setMusicPlaying(true);
      })
      .catch((error) => {
        console.error("Background music could not be played:", error);
        setMusicError(true);
      });
  };

  useEffect(() => {
    const handleClick = (event) => {
      const control = event.target instanceof Element
        ? event.target.closest("button, a, [role='button']")
        : null;
      if (!control || control.disabled || control.getAttribute("aria-disabled") === "true") return;

      lastControlClick.current = Date.now();
      if (control.dataset.soundHandled !== "true") playInteractionSound();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (previousPath.current === location.pathname) return;
    previousPath.current = location.pathname;
    if (Date.now() - lastControlClick.current > 500) playInteractionSound();
  }, [location.pathname]);

  // The animated background is rendered instantly (no asset to download),
  // so let the loader proceed as soon as the layout mounts.
  useEffect(() => {
    const id = requestAnimationFrame(() => setBgReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative h-dvh max-h-dvh overflow-hidden text-white">

      {showLoader && (
        <LoadingScreen
          isReady={bgReady}
          onComplete={() => setShowLoader(false)}
        />
      )}

      {/* Animated SVG background — replaces the old Base.mp4 video */}
      <AnimatedBackground
        className={`absolute top-0 left-0 z-0 w-full h-full transition-opacity duration-700 ${
          showLoader ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Dark overlay — lighter now that the background carries its own grade */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10 bg-black/35"
        style={{ pointerEvents: "none" }}
      />

      <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2">
        {musicError && (
          <span role="status" className="rounded-lg border border-white/15 bg-slate-950/90 px-3 py-2 text-xs text-white/85 shadow-lg backdrop-blur-xl">
            Background music is unavailable.
          </span>
        )}
        <button
          type="button"
          data-sound-handled="true"
          aria-label={musicPlaying ? "Pause background music" : "Play background music"}
          aria-pressed={musicPlaying}
          onClick={toggleMusic}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white shadow-lg backdrop-blur-xl transition-colors hover:bg-[#23768C]"
        >
          {musicPlaying ? <Volume2 size={19} aria-hidden="true" /> : <VolumeX size={19} aria-hidden="true" />}
        </button>
      </div>

      <Sidebar />

      <div className="relative z-30 flex h-full min-h-0 flex-col">
        <Topbar />
        <main id="app-scroll" className="relative z-30 min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-none p-[10px_12px_24px] sm:p-[24px_36px_40px]">
          {children}
        </main>
      </div>
    </div>
  );
}
