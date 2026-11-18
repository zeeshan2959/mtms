import { useState, useEffect, useCallback } from "react";
import Reveal from "../ui/Reveal";

const TEAMS_LIST = [
  {
    id: "dmu-plm",
    role: "DMU & PLM Integration Engineer",
    description:
      "Ensuring digital continuity and spatial validation with CATIA DMU, ENOVIA, Teamcenter",
  },
  {
    id: "packaging",
    role: "Product Packaging Engineer",
    description:
      "Conducting layout, interface, and feasibility studies in CATIA V5, Siemens NX with DMU reviews",
  },
  {
    id: "release",
    role: "Design Release Engineer",
    description:
      "Managing component lifecycle and release governance using Teamcenter, ENOVIA, CATIA V6, Siemens NX, CODEP and EBOM",
  },
  {
    id: "workflow",
    role: "PLM Workflow Specialist",
    description:
      "Configuring and managing workflows in ENOVIA with CATIA-integrated PLM environments",
  },
  {
    id: "cae",
    role: "CAE",
    description:
      "Performing structural and thermal analyses in ANSYS, Hyper Works, Abaqus",
  },
];

export default function Slide08_TeamsAtYourService({
  slideIndex,
  totalSlides,
  onNext,
  registerSubStep,
}) {
  const slideNum =
    slideIndex != null ? String(slideIndex + 1).padStart(2, "0") : "08";
  const totalNum =
    totalSlides != null ? String(totalSlides).padStart(2, "0") : "13";

  // Default to step mode (1 item visible initially) for presentation, can be toggled to show all rows
  const [visibleCount, setVisibleCount] = useState(1);
  const [isStepMode, setIsStepMode] = useState(true);
  const [animCycle, setAnimCycle] = useState(0);

  // Reset to initial step mode if slideIndex changes
  useEffect(() => {
    setIsStepMode(true);
    setVisibleCount(1);
    setAnimCycle((k) => k + 1);
  }, [slideIndex]);

  // Hook sub-steps with PresentationViewer keyboard and dock controls
  useEffect(() => {
    if (!registerSubStep) return;
    if (!isStepMode) {
      // In normal mode, clicking advances to next slide directly
      return registerSubStep({
        canNext: () => false,
        next: () => onNext?.(),
        canPrev: () => false,
        prev: () => {},
      });
    }

    return registerSubStep({
      canNext: () => visibleCount < TEAMS_LIST.length,
      next: () => setVisibleCount((c) => Math.min(TEAMS_LIST.length, c + 1)),
      canPrev: () => visibleCount > 1,
      prev: () => setVisibleCount((c) => Math.max(1, c - 1)),
    });
  }, [registerSubStep, isStepMode, visibleCount, onNext]);

  const advance = useCallback(() => {
    if (!isStepMode) {
      onNext?.();
      return;
    }
    if (visibleCount < TEAMS_LIST.length) {
      setVisibleCount((c) => c + 1);
    } else {
      onNext?.();
    }
  }, [isStepMode, visibleCount, onNext]);

  const replayCascade = (e) => {
    e?.stopPropagation?.();
    if (isStepMode) {
      setVisibleCount(1);
    } else {
      setVisibleCount(TEAMS_LIST.length);
    }
    setAnimCycle((k) => k + 1);
  };

  const startStepMode = (e) => {
    e?.stopPropagation?.();
    setIsStepMode(true);
    setVisibleCount(1);
    setAnimCycle((k) => k + 1);
  };

  const showAllRows = (e) => {
    e?.stopPropagation?.();
    setIsStepMode(false);
    setVisibleCount(TEAMS_LIST.length);
  };

  return (
    <div
      onClick={advance}
      className="relative min-h-[calc(100vh-140px)] w-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-8 select-none cursor-pointer"
    >
      {/* ── Background: Faceted Geometric Texture & Cyan Ambient Lighting (Full Viewport W & H) ── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {/* Solid dark base ensuring 100% full viewport opacity */}
        {/* <div className="absolute inset-0 bg-[#060c18]" /> */}

        {/* Geometric Background Image Overlay covering full viewport */}
        {/* <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
          style={{ backgroundImage: `url('/bg-pattern.png')` }}
        /> */}

        {/* Ambient Cyan Vignette on Left Side */}
        <div
          className="absolute inset-0"
          // style={{
          //   background:
          //     "radial-gradient(ellipse 65% 55% at 18% 25%, rgba(6, 182, 212, 0.22) 0%, rgba(14, 116, 144, 0.1) 45%, transparent 75%)",
          // }}
        />

        {/* Deep dark gradient overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060c18]/60 to-[#060c18]/90" /> */}
      </div>

      {/* Animation Keyframes */}
      {/* <style>{`
        @keyframes teamRowSlideUp {
          0% {
            opacity: 0;
            transform: translateY(32px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style> */}

      {/* ── Header: Title Matching Figma 1:1 ── */}
      <div className="relative z-10 mb-8 sm:mb-10 max-w-4xl">
        <Reveal delay={0.05} y={-8}>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-xs tracking-wider font-semibold">
              {slideNum} / {totalNum}
            </span>
            <span className="text-gray-400 text-xs font-mono tracking-wider uppercase">
              ENGINEERING MUSCLE
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold font-daminga text-white tracking-tight leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Teams At Your Service
          </h1>
        </Reveal>
      </div>

      {/* ── 5 Horizontal Team Bars (Exact Figma Gradient & Structure) ── */}
      <div className="relative z-10 flex flex-col gap-3.5 sm:gap-4 max-w-6xl w-full">
        {TEAMS_LIST.map((item, index) => {
          const isVisible = index + 1 <= visibleCount;

          return (
            <div
              key={`${animCycle}-${item.id}`}
              style={{
                animation: isVisible
                  ? `teamRowSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both`
                  : "none",
                animationDelay: isStepMode ? "0ms" : `${index * 110}ms`,
              }}
              className={`flex flex-col sm:flex-row items-stretch rounded-2xl sm:rounded-full overflow-hidden border border-white/10 hover:border-cyan-400/60 shadow-xl shadow-black/40 transition-all duration-300 group hover:scale-[1.01] hover:shadow-cyan-500/20 backdrop-blur-md ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 pointer-events-none"
              }`}
            >
              {/* Left Segment: Role / Team Title (Dark Navy Slate) */}
              <div className="w-full sm:w-[320px] md:w-[360px] lg:w-[390px] flex-shrink-0 bg-[#0e2132]/95 group-hover:bg-[#12283c] px-6 py-4 flex items-center border-b sm:border-b-0 sm:border-r border-white/10 transition-colors">
                <span className="text-sm sm:text-base md:text-[16px] font-bold font-sans text-white tracking-wide group-hover:text-cyan-200 transition-colors leading-tight">
                  {item.role}
                </span>
              </div>

              {/* Right Segment: Description / Capabilities (Teal / Cyan Gradient with Rounded Right) */}
              <div className="flex-1 bg-gradient-to-r from-[#143e4c] via-[#1a5b6d] to-[#258296] group-hover:from-[#174857] group-hover:to-[#2c96ad] px-6 py-4 flex items-center transition-all">
                <p className="text-xs sm:text-[13.5px] md:text-[14.5px] font-sans text-white/95 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom Controls & Progress Bar (Consistent with presentation deck) ── */}
      <div className="relative z-10 mt-8 pt-4 flex items-center justify-between max-w-6xl w-full border-t border-white/10">
        <div className="flex items-center gap-2">
          {TEAMS_LIST.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIsStepMode(true);
                setVisibleCount(i + 1);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i + 1 <= visibleCount
                  ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
          <span className="text-[11px] font-mono text-cyan-300 ml-2">
            {visibleCount} / {TEAMS_LIST.length} Teams
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={replayCascade}
            title="Replay slide cascade animation"
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>↺</span> Replay
          </button>

          {!isStepMode ? (
            <button
              onClick={startStepMode}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-all cursor-pointer"
            >
              Step Mode
            </button>
          ) : (
            <button
              onClick={showAllRows}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-all cursor-pointer"
            >
              Show All
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            className="px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            Next Slide →
          </button>
        </div>
      </div>
    </div>
  );
}
