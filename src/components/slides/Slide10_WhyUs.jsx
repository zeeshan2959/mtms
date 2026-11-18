import { useState, useEffect, useCallback, useRef } from "react";
import Reveal from "../ui/Reveal";

// 7 Value Proposition Cards matching Figma Slide 10 1:1
const WHY_US_CARDS = [
  // Column 1 (Left container) - Row 1
  {
    id: "standardization",
    step: 1,
    col: 1,
    row: 1,
    badge: "01",
    title: "Standardization and compliances",
    description:
      "Deliverables aligned with OEM/Tier-1 standards and global best practices",
    isHighlighted: false,
  },
  // Column 2 (Left container) - Row 1
  {
    id: "time-zones",
    step: 2,
    col: 2,
    row: 1,
    badge: "02",
    title: "Adapting Different Time Zones",
    description: "Flexible teams aligned to client-preferred time zones",
    isHighlighted: false,
  },
  // Column 3 (Right container) - Row 1
  {
    id: "different-teams",
    step: 3,
    col: 3,
    row: 1,
    badge: "03",
    title: "Assisting with different teams at once",
    description:
      "Cross-functional support across multiple domains and projects",
    isHighlighted: false,
  },
  // Column 4 (Right container) - Row 1
  {
    id: "engineering-leads",
    step: 4,
    col: 4,
    row: 1,
    badge: "04",
    title: "Our engineering resources with leads for each team",
    description:
      "Skilled engineers supported by team leads ensure quality delivery",
    isHighlighted: true, // Distinctive luminous cyan border & glow in Figma
  },
  // Column 1 (Left container) - Row 2
  {
    id: "scalability",
    step: 5,
    col: 1,
    row: 2,
    badge: "05",
    title: "Scalability on Demand",
    description:
      "Teams can be ramped up or down quickly based on project needs",
    isHighlighted: false,
  },
  // Column 2 (Left container) - Row 2
  {
    id: "knowledge-retention",
    step: 6,
    col: 2,
    row: 2,
    badge: "06",
    title: "Knowledge Retention",
    description:
      "Work captured within your systems to preserve organizational know-how",
    isHighlighted: false,
  },
  // Column 3 (Right container) - Row 2
  {
    id: "immediate-access",
    step: 7,
    col: 3,
    row: 2,
    badge: "07",
    title: "Immediate Access to Expertise",
    description: "Ready access to domain specialists when required",
    isHighlighted: false,
  },
];

const TOTAL_STEPS = 7;

export default function Slide10_WhyUs({
  slideIndex,
  totalSlides,
  onNext,
  registerSubStep,
}) {
  // Step 0: Clean landing state with title and stepped glass card (0 cards visible)
  // Clicks 1 through 7 reveal Cards 1 through 7 one by one
  const [visibleStep, setVisibleStep] = useState(0);
  const [animCycle, setAnimCycle] = useState(0);
  const containerRef = useRef(null);
  const [cardSize, setCardSize] = useState({ w: 1200, h: 560 });

  // Reset to initial landing state when navigating to this slide
  useEffect(() => {
    setVisibleStep(0);
    setAnimCycle((k) => k + 1);
  }, [slideIndex]);

  // Dynamically track container dimensions to generate exact curved SVG path matching Slide 11
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

  // Geometry for the curved stepped glass card (exact parity with Slide 11)
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
        @keyframes whyUsCardReveal {
          0% {
            opacity: 0;
            transform: translateY(22px) scale(0.96);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>

      {/* ── Main Container: Generous Full-Height Proportion matching Slide 11 ── */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[520px] lg:min-h-[580px] xl:min-h-[610px] h-[calc(100vh-140px)] max-h-[660px] p-7 sm:p-9 lg:p-11 flex flex-col justify-between"
      >
        {/* ── 1. Curved Stepped Glass Background (Luminous delicate hairline & sheer transparency) ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          
          {/* Transparent Frosted Glass clipped to the exact organic stepped path */}
          <div
            style={{
              clipPath: `path("${curvedPathString}")`,
            }}
            className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-cyan-900/[0.08] via-slate-900/[0.12] to-indigo-950/[0.06]"
          />

          {/* SVG for subtle translucent glass tint and luminous hairline border */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
          >
            <defs>
              {/* Ultra-transparent glass gradient letting wallpaper facets shine through */}
              <linearGradient id="whyUsGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a6a" stopOpacity="0.14" />
                <stop offset="45%" stopColor="#0f2648" stopOpacity="0.10" />
                <stop offset="70%" stopColor="#081830" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#1e3a6a" stopOpacity="0.04" />
              </linearGradient>

              {/* Luminous, delicate glass hairline border */}
              <linearGradient id="whyUsStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
                <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="55%" stopColor="#818cf8" stopOpacity="0.22" />
                <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Path with subtle glass fill and glowing hairline border */}
            <path
              d={curvedPathString}
              fill="url(#whyUsGlassGrad)"
              stroke="url(#whyUsStrokeGrad)"
              strokeWidth="1.2"
            />
          </svg>

          {/* Ambient luminous lighting refractions inside the glass */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/[0.07] rounded-full blur-3xl pointer-events-none" />
          <div className="hidden lg:block absolute right-6 bottom-6 w-[480px] h-[480px] bg-gradient-to-tl from-indigo-500/[0.09] via-cyan-500/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ── 2. Foreground Content: Slender Title & 4-Column Grid of Beautiful Glass Cards ── */}
        <div className="relative z-10 w-full flex flex-col justify-between h-full">
          {/* Title: Slender, elegant typography matching Slide 11 */}
          <div className="mb-6 sm:mb-8 pl-1">
            <Reveal delay={0.05} y={-8}>
              <h1
                onClick={(e) => {
                  e.stopPropagation();
                  // Click title to toggle Show All / Reset
                  setVisibleStep((s) => (s === TOTAL_STEPS ? 0 : TOTAL_STEPS));
                }}
                title="Click title to toggle all cards"
                className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-normal font-sans text-white tracking-normal leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] cursor-pointer hover:text-cyan-200 transition-colors"
              >
                Why Us
              </h1>
            </Reveal>
          </div>

          {/* Unified 4-Column Grid: Cards revealed ONE BY ONE on clicks (pending cards 100% hidden) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5 w-full flex-1">
            {WHY_US_CARDS.map((card) => {
              const isVisible = visibleStep >= card.step;
              const isActive = visibleStep === card.step;

              return (
                <div
                  key={`${animCycle}-${card.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisibleStep(card.step);
                  }}
                  style={{
                    animation: isVisible
                      ? `whyUsCardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both`
                      : "none",
                  }}
                  className={`p-5 sm:p-5.5 lg:p-6 rounded-2xl sm:rounded-[22px] min-h-[142px] sm:min-h-[148px] lg:min-h-[154px] flex flex-col justify-between transition-all duration-300 backdrop-blur-xl relative overflow-hidden group cursor-pointer ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 pointer-events-none translate-y-4"
                  } ${
                    card.isHighlighted
                      ? "border-2 border-cyan-400/90 shadow-[0_0_32px_rgba(34,211,238,0.35),0_16px_36px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.45)] bg-gradient-to-b from-cyan-500/[0.20] via-cyan-950/[0.35] to-[#041424]/50 hover:border-cyan-300"
                      : isActive
                      ? "border border-cyan-400/80 shadow-[0_0_24px_rgba(34,211,238,0.25),inset_0_1px_2px_rgba(255,255,255,0.35)] bg-gradient-to-b from-cyan-400/[0.12] via-white/[0.06] to-[#041424]/35"
                      : "border border-white/20 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-cyan-950/[0.12] hover:border-cyan-300/60 hover:bg-white/[0.12] shadow-[0_12px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_1.5px_rgba(255,255,255,0.25)]"
                  }`}
                >
                  {/* Specular hairline reflection at top of card (authentic glass refraction) */}
                  <div
                    className={`absolute top-0 inset-x-4 h-[1px] pointer-events-none ${
                      card.isHighlighted || isActive
                        ? "bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                        : "bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    }`}
                  />

                  {/* Card Header: Numbered badge & luminous pulse indicator */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-mono font-semibold tracking-wider px-2 py-0.5 rounded-full transition-colors ${
                          card.isHighlighted
                            ? "text-cyan-200 bg-cyan-400/20 border border-cyan-400/40"
                            : isActive
                            ? "text-cyan-300 bg-cyan-400/15 border border-cyan-400/30"
                            : "text-gray-400 bg-white/5 border border-white/10 group-hover:text-cyan-300 group-hover:border-cyan-400/30"
                        }`}
                      >
                        {card.badge}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          card.isHighlighted || isActive
                            ? "bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]"
                            : "bg-white/30 group-hover:bg-cyan-400/70"
                        }`}
                      />
                    </div>

                    {/* Card Title: Distinct, prominent typography */}
                    <h3 className="text-sm sm:text-[14px] lg:text-[14.5px] font-semibold font-sans text-white tracking-tight leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      {card.title}
                    </h3>
                  </div>

                  {/* Card Description: Clean, elegant, light font */}
                  <p className="text-xs sm:text-[12px] lg:text-[12.5px] text-gray-200/90 font-normal leading-relaxed mt-2">
                    {card.description}
                  </p>
                </div>
              );
            })}

            {/* Empty Slot 8 (Row 2, Col 4) matching Figma */}
            <div className="hidden lg:block pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Subtle Step Hint matching presentation feel */}
      <div className="mt-3 flex items-center justify-between w-full max-w-[1300px] px-3 text-[11px] font-mono text-gray-400">
        <span>
          {visibleStep === 0
            ? "Click slide or press Space / → to reveal pillars (0 / 7)"
            : `Pillar ${visibleStep} of ${TOTAL_STEPS} revealed • Click to continue`}
        </span>
        {visibleStep < TOTAL_STEPS ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setVisibleStep(TOTAL_STEPS);
            }}
            className="hover:text-cyan-400 text-gray-400 transition-colors cursor-pointer"
          >
            Show All Pillars ↷
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
