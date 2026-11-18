import { useState, useEffect } from "react";

export default function PresentationControls({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onGoTo,
  slides,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const progressPercent = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <>
      {/* Top persistent progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Floating Bottom Navigation Bar */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        {/* Slide quick-selector popup */}
        {showThumbnails && (
          <div className="mb-2 p-2 rounded-2xl bg-slate-900/90 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-1.5 overflow-x-auto max-w-[90vw] animate-in fade-in slide-in-from-bottom-2 duration-200">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  onGoTo(idx);
                  setShowThumbnails(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  currentIndex === idx
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30 scale-105"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {s.number}. {s.title}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-white/15 backdrop-blur-xl shadow-2xl shadow-black/50 text-white">
          {/* Previous Button */}
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            aria-label="Previous Slide"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              currentIndex === 0
                ? "text-gray-600 cursor-not-allowed"
                : "text-gray-300 hover:text-white hover:bg-white/10 active:scale-95 cursor-pointer"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slide Indicator & Drawer Toggle */}
          <button
            onClick={() => setShowThumbnails((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors font-mono text-xs sm:text-sm tracking-wider cursor-pointer"
            title="Click to view all slides"
          >
            <span className="text-cyan-400 font-semibold">{String(currentIndex + 1).padStart(2, "0")}</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-400">{String(totalSlides).padStart(2, "0")}</span>
            <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${showThumbnails ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentIndex === totalSlides - 1}
            aria-label="Next Slide"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              currentIndex === totalSlides - 1
                ? "text-gray-600 cursor-not-allowed"
                : "text-gray-300 hover:text-white hover:bg-cyan-500/20 hover:text-cyan-300 active:scale-95 cursor-pointer"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="w-[1px] h-5 bg-white/10" />

          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-300 hover:bg-white/10 transition-all cursor-pointer"
          >
            {isFullscreen ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9L4 4m0 0l5 0m-5 0l0 5m11 0l5-5m0 0l-5 0m5 0l0 5M9 15l-5 5m0 0l5 0m-5 0l0-5m11 0l5 5m0 0l-5 0m5 0l0-5" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
