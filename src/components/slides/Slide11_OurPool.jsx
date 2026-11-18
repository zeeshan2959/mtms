import { useState, useEffect, useCallback, useRef } from "react";
import Reveal from "../ui/Reveal";

// 4 Paragraphs of "Our Pool" matching Figma 1:1
// Revealed one-by-one on clicks 2, 3, 4, 5
const POOL_PARAGRAPHS = [
  {
    step: 2, // Click 2 (Step 2)
    id: "pool-p1",
    text: "MTMS Engineering is powered by a team of a vast and diversified pool of Design Engineers having excellence with industry experience",
  },
  {
    step: 3, // Click 3 (Step 3)
    id: "pool-p2",
    text: "Our engineers work directly with leading OEMs and Tier-1 suppliers, where they contribute to high-impact projects and deliver results that meet global standards",
  },
  {
    step: 4, // Click 4 (Step 4)
    id: "pool-p3",
    text: "With a strong mix of technical knowledge, adaptability, and problem-solving skills, our team represents one of the most capable and future-ready talent pools in the industry",
  },
  {
    step: 5, // Click 5 (Step 5)
    id: "pool-p4",
    text: "This allows us to provide clients with flexibility, scalability, and immediate access to engineering expertise whenever needed.",
  },
];

// Step 0: Landing State (Transparent Curved Stepped Glass Card + "Our Pool", NO outline, truly transparent, no photo, no paragraphs)
// Step 1: Click 1 -> Team photograph animates smoothly into the right side with full height
// Step 2: Click 2 -> Paragraph 1 appears
// Step 3: Click 3 -> Paragraph 2 appears
// Step 4: Click 4 -> Paragraph 3 appears
// Step 5: Click 5 -> Paragraph 4 appears
const TOTAL_STEPS = 5;

export default function Slide11_OurPool({
  slideIndex,
  totalSlides,
  onNext,
  registerSubStep,
}) {
  const [visibleStep, setVisibleStep] = useState(0);
  const [animCycle, setAnimCycle] = useState(0);
  const containerRef = useRef(null);
  const [cardSize, setCardSize] = useState({ w: 1200, h: 560 });

  // Reset to initial landing state when navigating to this slide
  useEffect(() => {
    setVisibleStep(0);
    setAnimCycle((k) => k + 1);
  }, [slideIndex]);

  // Dynamically track container dimensions to generate exact curved SVG path
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0) {
        setCardSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Hook sub-steps with PresentationViewer keyboard (Space, ArrowRight) and dock controls
  useEffect(() => {
    if (!registerSubStep) return;

    return registerSubStep({
      canNext: () => visibleStep < TOTAL_STEPS,
      next: () => setVisibleStep((s) => Math.min(TOTAL_STEPS, s + 1)),
      canPrev: () => visibleStep > 0,
      prev: () => setVisibleStep((s) => Math.max(0, s - 1)),
    });
  }, [registerSubStep, visibleStep]);

  const advance = useCallback(() => {
    if (visibleStep < TOTAL_STEPS) {
      setVisibleStep((s) => s + 1);
    } else {
      onNext?.();
    }
  }, [visibleStep, onNext]);

  const imageVisible = visibleStep >= 1;

  // Geometry for the curved stepped glass card matching Figma:
  // r = corner radius, stepX = horizontal split, stepY = vertical step down, f = inside concave fillet
  const r = 32;
  const f = 26;
  const stepX = Math.round(cardSize.w * 0.505);
  const stepY = 112;
  const W = cardSize.w;
  const H = cardSize.h;

  const curvedPathString = `M ${r} 0 L ${stepX - r} 0 A ${r} ${r} 0 0 1 ${stepX} ${r} L ${stepX} ${stepY - f} A ${f} ${f} 0 0 0 ${stepX + f} ${stepY} L ${W - r} ${stepY} A ${r} ${r} 0 0 1 ${W} ${stepY + r} L ${W} ${H - r} A ${r} ${r} 0 0 1 ${W - r} ${H} L ${r} ${H} A ${r} ${r} 0 0 1 0 ${H - r} L 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`;

  return (
    <div
      onClick={advance}
      className="relative w-full max-w-[1300px] mx-auto flex flex-col justify-center items-center py-1 select-none cursor-pointer"
    >
      {/* High-End Presentation Animation Keyframes */}
      <style>{`
        @keyframes poolImageCinematicReveal {
          0% {
            opacity: 0;
            transform: translateX(48px) scale(0.98);
            filter: blur(14px);
          }
          60% {
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
        @keyframes poolParagraphReveal {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* ── Main Container: Generous Full-Height Proportion matching Figma ── */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[520px] lg:min-h-[580px] xl:min-h-[610px] h-[calc(100vh-140px)] max-h-[660px] flex items-stretch"
      >
        {/* ── 1. Curved Stepped Glass Background (NO outline, truly transparent & frosted) ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          
          {/* Transparent Frosted Glass clipped to the exact organic stepped path (NO OUTLINE) */}
          <div
            style={{
              clipPath: `path("${curvedPathString}")`,
            }}
            className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-[#040e22]/22 via-[#061836]/15 to-[#0e245a]/10"
          />

          {/* SVG for subtle translucent glass tint (NO STROKE / OUTLINE) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
          >
            <defs>
              <linearGradient id="translucentGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#040d1e" stopOpacity="0.20" />
                <stop offset="45%" stopColor="#061838" stopOpacity="0.14" />
                <stop offset="60%" stopColor="#0c2250" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#143272" stopOpacity="0.06" />
              </linearGradient>
            </defs>

            {/* Path with fill only — ZERO stroke/outline */}
            <path
              d={curvedPathString}
              fill="url(#translucentGlassGrad)"
              stroke="none"
            />
          </svg>

          {/* Ambient soft glow behind the translucent right area */}
          <div
            className={`hidden lg:block absolute right-8 bottom-8 w-[42%] h-[65%] rounded-full bg-gradient-to-br from-indigo-500/[0.10] via-cyan-500/[0.05] to-transparent blur-3xl pointer-events-none transition-opacity duration-700 ${
              imageVisible ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* ── 2. Right Team Photograph (Full height, cinematic slide-in on Click 1) ── */}
        <div
          key={`${animCycle}-pool-photo`}
          style={{
            animation: imageVisible
              ? `poolImageCinematicReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) both`
              : "none",
          }}
          className={`absolute right-0 top-0 bottom-0 w-full lg:w-[49.8%] h-full rounded-[28px] sm:rounded-[36px] lg:rounded-r-[36px] lg:rounded-l-none overflow-hidden z-10 shadow-[0_24px_60px_rgba(0,0,0,0.65)] transition-opacity duration-500 ${
            imageVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src="/office/our-pool.jpg"
            alt="MTMS Engineering Talented Team Pool"
            className="w-full h-full object-cover object-center"
          />
          {/* Ambient reflections and vignettes */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ── 3. Left Foreground Content: Slender Title & Sequentially Revealed Paragraphs ── */}
        <div className="relative z-20 w-full lg:w-[49%] flex flex-col justify-start h-full p-7 sm:p-9 lg:p-11 pr-7 lg:pr-10">
          {/* Title: Slender, elegant, matching Figma */}
          <div className="mb-6 sm:mb-8 pl-1">
            <Reveal delay={0.05} y={-8}>
              <h1
                onClick={(e) => {
                  e.stopPropagation();
                  // Click title to toggle Show All / Reset
                  setVisibleStep((s) => (s === TOTAL_STEPS ? 0 : TOTAL_STEPS));
                }}
                title="Click title to toggle all / reset"
                className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-normal font-sans text-white tracking-normal leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] cursor-pointer hover:text-cyan-200 transition-colors"
              >
                Our Pool
              </h1>
            </Reveal>
          </div>

          {/* 4 Paragraphs: Revealed ONE BY ONE on clicks 2, 3, 4, 5 */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 flex-1 flex flex-col justify-center pl-1">
            {POOL_PARAGRAPHS.map((item) => {
              const isVisible = visibleStep >= item.step;
              const isActive = visibleStep === item.step;

              return (
                <div
                  key={`${animCycle}-${item.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisibleStep(item.step);
                  }}
                  style={{
                    animation: isVisible
                      ? `poolParagraphReveal 0.45s cubic-bezier(0.16, 1, 0.3, 1) both`
                      : "none",
                  }}
                  className={`transition-all duration-300 cursor-pointer ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3 pointer-events-none"
                  }`}
                >
                  <p
                    className={`text-xs sm:text-[13.5px] lg:text-[14px] xl:text-[14.5px] leading-relaxed font-sans font-light tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-white font-normal drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                        : "text-gray-300/90 hover:text-white"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Subtle Step Hint matching presentation feel */}
      <div className="mt-3 flex items-center justify-between w-full max-w-[1300px] px-3 text-[11px] font-mono text-gray-500/80">
        <span>
          {visibleStep === 0
            ? "Click slide or press Space / → to begin"
            : `Click slide or press Space / → to reveal (${visibleStep} / ${TOTAL_STEPS})`}
        </span>
        {visibleStep < TOTAL_STEPS ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setVisibleStep(TOTAL_STEPS);
            }}
            className="hover:text-cyan-400 text-gray-400 transition-colors cursor-pointer"
          >
            Show All ↷
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setVisibleStep(0);
              setAnimCycle((k) => k + 1);
            }}
            className="hover:text-cyan-400 text-gray-400 transition-colors cursor-pointer"
          >
            ↺ Replay Animation
          </button>
        )}
      </div>

    </div>
  );
}
