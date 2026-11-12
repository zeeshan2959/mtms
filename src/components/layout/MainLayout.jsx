import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import LoadingScreen from "../ui/LoadingScreen";
import AnimatedBackground from "../ui/AnimatedBackground";
import useFullPageScroll from "../../hooks/useFullPageScroll";
import { playInteractionSound } from "../../lib/interactionSound";

export default function MainLayout({ children }) {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const lastControlClick = useRef(0);
  const [showLoader, setShowLoader] = useState(true);
  const [bgReady, setBgReady] = useState(false);

  useFullPageScroll(!showLoader);

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
