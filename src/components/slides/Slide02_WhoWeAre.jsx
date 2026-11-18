import { useState, useEffect } from "react";
import Reveal from "../ui/Reveal";

const SECTORS = [
  {
    id: "automotive",
    title: "Automotive",
    image: "/sectors/automotive.jpg",
  },
  {
    id: "railway",
    title: "Railway",
    image: "/sectors/railway.jpg",
  },
  {
    id: "marine",
    title: "Marine",
    image: "/sectors/marine.jpg",
  },
  {
    id: "industrial",
    title: "Industrial Machinery",
    image: "/sectors/industrial.jpg",
  },
  {
    id: "appliances",
    title: "Home Appliances",
    image: "/sectors/appliances.jpg",
  },
];

export default function Slide02_WhoWeAre({ registerSubStep, onNext }) {
  const [visibleCount, setVisibleCount] = useState(1);

  // Register sub-steps with the presentation viewer
  useEffect(() => {
    if (!registerSubStep) return;
    return registerSubStep({
      canNext: () => visibleCount < SECTORS.length,
      next: () => setVisibleCount((c) => Math.min(SECTORS.length, c + 1)),
      canPrev: () => visibleCount > 1,
      prev: () => setVisibleCount((c) => Math.max(1, c - 1)),
    });
  }, [registerSubStep, visibleCount]);

  const advanceStep = () => {
    if (visibleCount < SECTORS.length) {
      setVisibleCount((c) => c + 1);
    } else {
      onNext?.();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] w-full flex flex-col lg:flex-row items-stretch justify-between overflow-hidden">
      {/* Left Side: Headline & Mission Statement */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-8 z-20">
        <Reveal delay={0.05} y={-12}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md w-fit">
            <span>02</span>
            <span>/</span>
            <span>Who We Are</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} y={16}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight font-sans mb-6">
            Who We Are
          </h1>
        </Reveal>

        <Reveal delay={0.2} y={16}>
          <p className="text-white/85 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-xl font-sans mb-8">
            MTMS Engineering is a precision-driven design and engineering consultancy serving the OEMs and Tier-1 suppliers for:
          </p>
        </Reveal>

        {/* Interactive Step Progress Dots */}
        <Reveal delay={0.3} y={16}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              {SECTORS.map((sector, i) => (
                <button
                  key={sector.id}
                  onClick={() => setVisibleCount(i + 1)}
                  title={`Show up to ${sector.title}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i < visibleCount
                      ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
              <span className="text-xs font-mono text-cyan-300/80 ml-2">
                {visibleCount} / {SECTORS.length}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-gray-400 font-mono tracking-wide">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/15 text-[11px]">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/15 text-[11px]">→</kbd> to reveal next sector
              </span>

              {visibleCount < SECTORS.length ? (
                <button
                  onClick={advanceStep}
                  className="px-3 py-1 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-mono transition-all cursor-pointer"
                >
                  Reveal Next +
                </button>
              ) : (
                <button
                  onClick={onNext}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-mono shadow-md transition-all cursor-pointer"
                >
                  Next Slide →
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Right Side: 5 Stacked Sector Banners */}
      <div
        onClick={advanceStep}
        title={visibleCount < SECTORS.length ? "Click to reveal next sector" : "Click to advance slide"}
        className="w-full lg:w-[52%] flex flex-col justify-start h-[480px] sm:h-[540px] lg:h-[calc(100vh-120px)] relative overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10 cursor-pointer select-none"
      >
        {SECTORS.map((sector, index) => {
          const isVisible = index < visibleCount;

          return (
            <div
              key={sector.id}
              className={`relative flex-1 w-full overflow-hidden transition-all duration-700 ease-out border-b border-black/40 last:border-b-0 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-24 pointer-events-none"
              }`}
            >
              {/* Background Sector Image */}
              <img
                src={sector.image}
                alt={sector.title}
                className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Dark Overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Sector Title Label (matches Figma position bottom-right) */}
              <div className="absolute bottom-3 right-5 sm:right-8 z-10">
                <span className="text-white text-base sm:text-xl md:text-2xl font-light tracking-wide font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {sector.title}
                </span>
              </div>

              {/* Subtle top indicator for active reveal */}
              {isVisible && index === visibleCount - 1 && (
                <div className="absolute top-2 left-3 z-10 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 backdrop-blur-sm animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>SECTOR 0{index + 1}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
