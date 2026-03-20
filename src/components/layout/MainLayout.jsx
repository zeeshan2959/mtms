import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import LoadingScreen from "../ui/LoadingScreen";

export default function MainLayout({ children }) {
  const [showLoader, setShowLoader] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div style={{ minHeight: "100vh", position: "relative", color: "#fff" }}>

      {/* Loader — stays mounted until user clicks CONTINUE */}
      {showLoader && (
        <LoadingScreen
          isReady={videoReady}
          onComplete={() => setShowLoader(false)}
        />
      )}

      {/* Background Video — always rendered so it can load in background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setVideoReady(true)}
        style={{ pointerEvents: "none" }}
        className={`absolute top-0 left-0 z-0 w-full h-full object-cover transition-opacity duration-700 ${
          showLoader ? "opacity-0" : "opacity-100"
        }`}
      >
        <source src="/Base.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10 bg-black/50"
        style={{ pointerEvents: "none" }}
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="z-30 relative flex flex-col min-h-screen">
        <Topbar />
        <main className="relative z-30 h-[calc(100vh-110px)] overflow-y-auto p-[24px_36px_40px]">
          {children}
        </main>
      </div>
    </div>
  );
}
