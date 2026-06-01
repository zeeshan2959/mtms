import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import LoadingScreen from "../ui/LoadingScreen";
import AnimatedBackground from "../ui/AnimatedBackground";
import PageTransition from "../ui/PageTransition";

export default function MainLayout({ children }) {
  const [showLoader, setShowLoader] = useState(true);
  const [bgReady, setBgReady] = useState(false);

  // The animated background is rendered instantly (no asset to download),
  // so let the loader proceed as soon as the layout mounts.
  useEffect(() => {
    const id = requestAnimationFrame(() => setBgReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative", color: "#fff" }}>

      {/* Loader — stays mounted until user clicks CONTINUE */}
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

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="z-30 relative flex flex-col min-h-screen">
        <Topbar />
        <main className="relative z-30 h-[calc(100vh-110px)] overflow-y-auto p-[24px_36px_40px]">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
