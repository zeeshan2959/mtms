import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import LoadingScreen from "../ui/LoadingScreen";
import KineticBackground from "../ui/KineticBackground";

export default function MainLayout({ children }) {
  const [showLoader, setShowLoader] = useState(true);
  const [backgroundReady, setBackgroundReady] = useState(false);

  return (
    <div style={{ minHeight: "100vh", position: "relative", color: "#fff" }}>

      {showLoader && (
        <LoadingScreen
          isReady={backgroundReady}
          onComplete={() => setShowLoader(false)}
        />
      )}

      {/* Background — Base.mp4 (matches Figma 1:1396 ambient motion) */}
      <KineticBackground
        visible={!showLoader}
        onReady={() => setBackgroundReady(true)}
      />

      <Sidebar />

      <div className="z-30 relative flex flex-col min-h-screen">
        <Topbar />
        <main className="relative z-30 h-[calc(100vh-110px)] overflow-y-auto p-[24px_36px_40px]">
          {children}
        </main>
      </div>
    </div>
  );
}
