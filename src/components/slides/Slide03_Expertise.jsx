import { useState, useEffect } from "react";
import Reveal from "../ui/Reveal";

function GlobeIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

// 13 Capabilities aligned edge-to-edge: Col 1 left aligns with title, Col 5 right aligns with Contact button
// 5 Columns: X = 8.75%, 29.375%, 50.0%, 70.625%, 91.25% (with width: 17.5%, left edge is 0%, right edge is 100%)
// 3 Rows: Y = 16.67%, 50.0%, 83.33% (reduced top gap directly under header)
const CAPABILITIES = [
  // --- Row 1 (Left to Right: Cards 1 - 5) ---
  {
    id: "cad-modelling",
    step: 1,
    title: "CAD Modelling",
    description: "Creating accurate 3D models that define product geometry and design intent.",
    col: 1,
    row: 1,
    x: 8.75,
    y: 16.67,
    slideDirection: "left",
  },
  {
    id: "technical-documentation",
    step: 2,
    title: "Technical Documentation",
    description: "Creating standardized reports, drawings, and compliance documents for release",
    col: 2,
    row: 1,
    x: 29.375,
    y: 16.67,
    slideDirection: "left",
  },
  {
    id: "tooling-feasibility",
    step: 3,
    title: "Tooling Feasibility",
    description: "Assessing manufacturability and tooling compatibility early in the design stage",
    col: 3,
    row: 1,
    x: 50.0,
    y: 16.67,
    slideDirection: "left",
  },
  {
    id: "plm-dmu-structuring",
    step: 4,
    title: "PLM/DMU Structuring",
    description: "Organizing digital data and mock-ups for traceability and spatial validation",
    col: 4,
    row: 1,
    x: 70.625,
    y: 16.67,
    slideDirection: "left",
  },
  {
    id: "packaging-studies",
    step: 5,
    title: "Packaging Studies",
    description: "Evaluating space utilization, fitment, and serviceability across assemblies",
    col: 5,
    row: 1,
    x: 91.25,
    y: 16.67,
    slideDirection: "left",
  },

  // --- Row 2 (Right to Left: Cards 6 - 10) ---
  {
    id: "assembly-interface-studies",
    step: 6,
    title: "Assembly & Interface Studies",
    description: "Ensuring smooth integration and interaction between components and subsystems",
    col: 5,
    row: 2,
    x: 91.25,
    y: 50.0,
    slideDirection: "top",
  },
  {
    id: "design-validation",
    step: 7,
    title: "Design Validation",
    description: "Verifying designs against performance, safety, and compliance requirements",
    col: 4,
    row: 2,
    x: 70.625,
    y: 50.0,
    slideDirection: "right",
  },
  {
    id: "process-validation",
    step: 8,
    title: "Process Validation",
    description: "Ensuring processes meet quality and reliability targets before release",
    col: 3,
    row: 2,
    x: 50.0,
    y: 50.0,
    slideDirection: "right",
  },
  {
    id: "dfmea-pfmea-execution",
    step: 9,
    title: "DFMEA/PFMEA Execution",
    description: "Identifying and mitigating potential failure modes early in design and process",
    col: 2,
    row: 2,
    x: 29.375,
    y: 50.0,
    slideDirection: "right",
  },
  {
    id: "change-management",
    step: 10,
    title: "Change Management",
    description: "Executing controlled engineering change processes within PLM ecosystems",
    col: 1,
    row: 2,
    x: 8.75,
    y: 50.0,
    slideDirection: "right",
  },

  // --- Row 3 (Left to Right: Cards 11 - 13) ---
  {
    id: "supplier-quality-coordination",
    step: 11,
    title: "Supplier Quality Coordination",
    description: "Working with suppliers to meet specifications and standards",
    col: 1,
    row: 3,
    x: 8.75,
    y: 83.33,
    slideDirection: "top",
  },
  {
    id: "rcca",
    step: 12,
    title: "Root Cause & Corrective Action (RCCA)",
    description: "Analysing issues and implementing effective solutions",
    col: 2,
    row: 3,
    x: 29.375,
    y: 83.33,
    slideDirection: "left",
  },
  {
    id: "cae-simulation-support",
    step: 13,
    title: "CAE/Simulation Support",
    description: "Assisting with structural, thermal, and kinematic simulations to validate performance",
    col: 3,
    row: 3,
    x: 50.0,
    y: 83.33,
    slideDirection: "left",
  },
];

export default function Slide03_Expertise({ registerSubStep, onNext, onGoTo, totalSlides }) {
  // Start with Card 1 revealed (matches initial Figma state)
  const [visibleCount, setVisibleCount] = useState(1);

  // Exact Serpentine path coordinates connecting the 5 columns and 3 rows
  // ViewBox: 0 0 1000 460
  // Col centers: 87.5, 293.75, 500, 706.25, 912.5
  // Row centers: 76.7, 230, 383.3
  const serpentinePath = `
    M 87.5 76.7
    L 880.5 76.7
    A 32 32 0 0 1 912.5 108.7
    L 912.5 198
    A 32 32 0 0 1 880.5 230
    L 119.5 230
    A 32 32 0 0 0 87.5 262
    L 87.5 351.3
    A 32 32 0 0 0 119.5 383.3
    L 500.0 383.3
  `.replace(/\s+/g, " ").trim();

  // Register sub-steps with PresentationViewer
  useEffect(() => {
    if (!registerSubStep) return;
    return registerSubStep({
      canNext: () => visibleCount < CAPABILITIES.length,
      next: () => setVisibleCount((c) => Math.min(CAPABILITIES.length, c + 1)),
      canPrev: () => visibleCount > 1,
      prev: () => setVisibleCount((c) => Math.max(1, c - 1)),
    });
  }, [registerSubStep, visibleCount]);

  const advanceStep = () => {
    if (visibleCount < CAPABILITIES.length) {
      setVisibleCount((c) => c + 1);
    } else {
      onNext?.();
    }
  };

  const handleCardClick = (step) => {
    if (step > visibleCount) {
      setVisibleCount(step);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] w-full flex flex-col justify-start px-6 sm:px-10 md:px-14 lg:px-20 pt-4 sm:pt-6 pb-20 select-none overflow-hidden">
      {/* Electric laser animation */}
      <style>{`
        @keyframes mtmsCircuitPulse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -980; }
        }
      `}</style>

      {/* Top Header: Title on Left, Controls on Right (Matches Figma 1:1) */}
      <div className="w-full flex items-center justify-between z-30 mb-2 sm:mb-3">
        <Reveal delay={0.05} y={-10}>
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-mono tracking-widest uppercase mb-1.5 backdrop-blur-md w-fit">
              <span>03</span>
              <span>/</span>
              <span>Core Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-daminga text-white tracking-tight">
              Our Expertise Spans
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1} y={-10}>
          <div className="flex items-center gap-3">
            <a
              href="https://mtmsengineering.com"
              target="_blank"
              rel="noreferrer"
              title="MTMS Website"
              aria-label="MTMS Website"
              className="w-10 h-10 rounded-full border border-white/20 hover:border-cyan-400/80 bg-white/[0.04] hover:bg-white/[0.1] text-white/90 hover:text-cyan-300 flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-lg shadow-black/30 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <GlobeIcon className="w-4 h-4" />
            </a>

            <button
              onClick={() => onGoTo?.(totalSlides ? totalSlides - 1 : 15)}
              title="Contact MTMS"
              aria-label="Contact MTMS"
              className="px-6 py-2 rounded-full border border-white/20 hover:border-cyan-400/80 bg-white/[0.04] hover:bg-white/[0.1] text-white text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md transition-all duration-200 shadow-lg shadow-black/30 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Contact
            </button>
          </div>
        </Reveal>
      </div>

      {/* Main Serpentine Grid Area: Aligned full-width from left title to right contact button */}
      <div className="relative w-full mt-2 sm:mt-4 mb-auto">
        <div className="relative w-full aspect-[1000/440] mx-auto">
          {/* Continuous Glowing Cyan Serpentine Circuit Line */}
          <svg
            viewBox="0 0 1000 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          >
            <defs>
              <linearGradient id="laserBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#a5f3fc" stopOpacity="1" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Ambient Cyan Aura */}
            <path
              d={serpentinePath}
              stroke="#06b6d4"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.32"
              className="filter blur-[6px]"
            />

            {/* Primary Glowing Cyan Serpentine Path */}
            <path
              d={serpentinePath}
              stroke="#22d3ee"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="filter drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] drop-shadow-[0_0_18px_rgba(6,182,212,0.6)]"
            />

            {/* Animated Laser Pulse along circuit */}
            <path
              d={serpentinePath}
              stroke="url(#laserBeam)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="50 350"
              style={{
                animation: "mtmsCircuitPulse 3.2s linear infinite",
              }}
              className="filter drop-shadow-[0_0_10px_#ffffff]"
            />
          </svg>

          {/* All 13 Cards Positioned Edge-to-Edge Across the 5 Columns */}
          {CAPABILITIES.map((card) => {
            const isVisible = card.step <= visibleCount;
            const isCurrent = card.step === visibleCount;

            // Slide-in transform based on direction along the serpentine flow
            let hiddenTransform = "opacity-0 scale-90 pointer-events-none ";
            if (card.slideDirection === "left") {
              hiddenTransform += "-translate-x-10";
            } else if (card.slideDirection === "right") {
              hiddenTransform += "translate-x-10";
            } else if (card.slideDirection === "top") {
              hiddenTransform += "-translate-y-8";
            }

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.step)}
                style={{
                  left: `${card.x}%`,
                  top: `${card.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute z-20 cursor-pointer w-[17.5%] min-w-[130px] transition-all duration-500 ease-out ${
                  isVisible
                    ? "opacity-100 scale-100 translate-x-0 translate-y-0"
                    : hiddenTransform
                }`}
              >
                {/* Clean Frosted Glass Card (Matches Figma 1:1) */}
                <div
                  className={`relative p-2.5 sm:p-3 md:p-3.5 rounded-xl backdrop-blur-xl transition-all duration-300 ${
                    isCurrent
                      ? "bg-[#0b1422]/95 border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.45)] ring-1 ring-cyan-400/60 scale-[1.02]"
                      : "bg-[#0a111e]/85 border border-cyan-500/25 hover:border-cyan-400/60 shadow-lg shadow-black/50 hover:bg-[#0c1626]/95 hover:scale-[1.01]"
                  }`}
                >
                  {/* Step Pill */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono font-bold text-cyan-400/80 px-1.5 py-0.2 rounded bg-cyan-500/10">
                      STEP {String(card.step).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-[11.5px] sm:text-xs md:text-[13px] font-bold font-daminga text-white tracking-tight leading-snug">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="mt-1 sm:mt-1.5 text-[9.5px] sm:text-[10px] md:text-[10.5px] text-gray-300/90 leading-snug font-[Poppins,sans-serif]">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* QR Code in Column 5, Row 3 - Perfectly Aligns to Contact Button */}
          <div
            style={{
              left: "91.25%",
              top: "83.33%",
              transform: "translate(-50%, -50%)",
            }}
            className="absolute z-20 flex items-center justify-center w-[17.5%] min-w-[130px]"
          >
            <a
              href="https://mtmsengineering.com"
              target="_blank"
              rel="noreferrer"
              title="Scan to connect with MTMS Engineering"
              className="p-2 sm:p-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-cyan-400/70 backdrop-blur-md transition-all duration-300 shadow-xl shadow-black/50 hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center gap-1.5"
            >
              <img
                src="/qr-code.png"
                alt="Scan QR code"
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-lg brightness-110 contrast-125"
                style={{ imageRendering: "pixelated" }}
              />
              <span className="text-[10px] font-mono text-cyan-300 font-medium tracking-wide">
                mtmsengineering.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
