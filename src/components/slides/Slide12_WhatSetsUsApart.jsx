import { useState, useEffect, useCallback } from "react";
import Reveal from "../ui/Reveal";

// 7 Key Differentiators matching Figma 1:1
// Each point spans across the tiered left area corresponding to the 3 steps of the blueprint image
const DIFFERENTIATORS = [
  {
    step: 1,
    tier: 1, // Tier 1 (Top: max-w ~37%)
    id: "diff-1",
    title: "Number of Engineers",
    description: "A big pool of engineers in various design related expertise",
  },
  {
    step: 2,
    tier: 1, // Tier 1 (Top: max-w ~37%)
    id: "diff-2",
    title: "Years of Experience",
    description: "Industry-tested professionals with balanced and extended experience",
  },
  {
    step: 3,
    tier: 2, // Tier 2 (Middle: max-w ~45%)
    id: "diff-3",
    title: "Multi-Functional Resources",
    description: "Engineers equipped with diverse skill sets",
  },
  {
    step: 4,
    tier: 2, // Tier 2 (Middle: max-w ~45%)
    id: "diff-4",
    title: "Adapting Different Time Zones",
    description: "Flexible teams aligned to client-preferred time zones",
  },
  {
    step: 5,
    tier: 2, // Tier 2 (Middle: max-w ~45%)
    id: "diff-5",
    title: "Contractual Terms Within Industry",
    description:
      "OEM-level confidentiality backed by strong contractual frameworks ensuring smooth and secure project execution",
  },
  {
    step: 6,
    tier: 3, // Tier 3 (Bottom: max-w ~52%)
    id: "diff-6",
    title: "Open to New Trainings and Learnings",
    description: "Engineers eager to upgrade skills continuously",
  },
  {
    step: 7,
    tier: 3, // Tier 3 (Bottom: max-w ~52%)
    id: "diff-7",
    title: "OEM/Tier-1 Working Mindset",
    description: "Trained to operate seamlessly within OEM and Tier-1 environments",
  },
];

const TOTAL_STEPS = 7;

export default function Slide12_WhatSetsUsApart({
  slideIndex,
  totalSlides,
  onNext,
  registerSubStep,
}) {
  // Step 0: Landing State (Clean card with "What Sets Us Apart" + Stepped Blueprint Image, 0 points visible)
  // Step 1 to 7: Points 1 to 7 revealed sequentially on clicks one by one
  const [visibleStep, setVisibleStep] = useState(0);
  const [animCycle, setAnimCycle] = useState(0);

  const slideNum = String((slideIndex ?? 11) + 1).padStart(2, "0");
  const totalNum = String(totalSlides || 13).padStart(2, "0");

  // Reset to initial landing state when navigating to this slide
  useEffect(() => {
    setVisibleStep(0);
    setAnimCycle((k) => k + 1);
  }, [slideIndex]);

  // Hook sub-steps with PresentationViewer keyboard (Space, ArrowRight, ArrowLeft) and dock controls
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

  const replayCascade = (e) => {
    e?.stopPropagation?.();
    setVisibleStep(1);
    setAnimCycle((k) => k + 1);
  };

  const showAllPoints = (e) => {
    e?.stopPropagation?.();
    setVisibleStep(TOTAL_STEPS);
  };

  return (
    <div
      onClick={advance}
      className="relative w-full max-w-[1300px] mx-auto flex flex-col justify-center items-center py-1 sm:py-2 select-none cursor-pointer"
    >
      {/* High-End Presentation Animation Keyframes */}
      <style>{`
        @keyframes pointReveal {
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

      {/* ── Main Unified Glass Enclosure Card (Matching Figma 1:1) ── */}
      <div className="relative z-10 w-full min-h-[540px] lg:min-h-[580px] xl:min-h-[620px] h-[calc(100vh-140px)] max-h-[670px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-b from-[#0e223d]/45 via-[#07162a]/55 to-[#030d1a]/65 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(34,211,238,0.06),inset_0_1px_2px_rgba(255,255,255,0.22)] flex flex-col justify-between">
        
        {/* Top edge specular reflection line */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent pointer-events-none z-20" />

        {/* Ambient subtle cyan glow on left */}
        <div className="absolute -left-20 top-1/4 w-80 h-80 rounded-full bg-cyan-500/[0.06] blur-3xl pointer-events-none z-0" />

        {/* ── Stepped Blueprint & Mitutoyo Caliper Illustration (Right side, Exact Figma 3-Tier Curve) ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden">
          <img
            src="/office/blueprint-caliper-stepped.png"
            alt="MTMS Technical Blueprint and Mitutoyo Caliper Measurement"
            className="w-full h-full object-cover object-right opacity-95 transition-transform duration-700 ease-out"
          />
          {/* Subtle ambient glass reflections */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ── Left Foreground Section: Slender Title & Sequentially Revealed 7 Points ── */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-7 lg:p-9 xl:p-10">
          
          {/* Top Header: Badge & Slender Two-line Title matching Figma typography */}
          <div className="mb-2 sm:mb-3">
            <Reveal delay={0.05} y={-8}>
              <div>
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-[11px] sm:text-xs tracking-wider font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                    {slideNum} / {totalNum}
                  </span>
                  <span className="text-gray-400 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
                    KEY DIFFERENTIATORS
                  </span>
                </div>

                <h1
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle Show All / Reset on title click
                    setVisibleStep((s) => (s === TOTAL_STEPS ? 0 : TOTAL_STEPS));
                  }}
                  title="Click to toggle Show All / Reset"
                  className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-bold font-sans text-white tracking-tight leading-[1.06] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] cursor-pointer hover:text-cyan-200 transition-colors"
                >
                  What Sets Us
                  <br />
                  Apart
                </h1>
              </div>
            </Reveal>
          </div>

          {/* ── 7 Differentiators: Revealed 1-by-1 on clicks, contoured to the 3 tiers ── */}
          <div className="flex-1 flex flex-col justify-center space-y-2.5 sm:space-y-3 lg:space-y-3.5 xl:space-y-4 my-auto">
            {DIFFERENTIATORS.map((point) => {
              const isVisible = visibleStep >= point.step;
              const isActive = visibleStep === point.step;

              // Responsive max-width matching the exact 3 tiers of the blueprint image:
              // Tier 1 (Points 1 & 2): max-w ~37%
              // Tier 2 (Points 3, 4, 5): max-w ~45% (accommodates 3-line Point 5 comfortably)
              // Tier 3 (Points 6 & 7): max-w ~52%
              const tierWidthClass =
                point.tier === 1
                  ? "w-full lg:max-w-[36%] xl:max-w-[38%]"
                  : point.tier === 2
                  ? "w-full lg:max-w-[43%] xl:max-w-[46%]"
                  : "w-full lg:max-w-[49%] xl:max-w-[53%]";

              return (
                <div
                  key={`${animCycle}-${point.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisibleStep(point.step);
                  }}
                  style={{
                    animation: isVisible
                      ? `pointReveal 0.45s cubic-bezier(0.16, 1, 0.3, 1) both`
                      : "none",
                  }}
                  className={`transition-all duration-300 cursor-pointer ${tierWidthClass} ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3 pointer-events-none"
                  }`}
                >
                  <p className="text-[12px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] leading-snug sm:leading-[1.4] font-sans tracking-wide flex items-start gap-2">
                    {/* Glowing bullet indicator */}
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.95)] scale-125"
                          : "bg-white/60"
                      }`}
                    />

                    <span>
                      <strong
                        className={`font-bold transition-colors duration-300 ${
                          isActive ? "text-cyan-200" : "text-white"
                        }`}
                      >
                        {point.title} –{" "}
                      </strong>
                      <span
                        className={`font-normal transition-colors duration-300 ${
                          isActive ? "text-white font-medium" : "text-gray-300"
                        }`}
                      >
                        {point.description}
                      </span>
                    </span>
                  </p>
                </div>
              );
            })}
          </div>

          {/* ── Bottom Controls Bar Inside the Glass Card ── */}
          <div className="mt-2 pt-2.5 flex items-center justify-between w-full border-t border-white/10 flex-shrink-0">
            {/* Step Progress Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {DIFFERENTIATORS.map((pt) => (
                <button
                  key={pt.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisibleStep(pt.step);
                  }}
                  title={`Jump to Point ${pt.step}: ${pt.title}`}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    pt.step <= visibleStep
                      ? "w-5 sm:w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
              <span className="text-[11px] font-mono text-cyan-300 ml-2">
                {visibleStep} / {TOTAL_STEPS} Revealed
              </span>
            </div>

            {/* Interactive Actions */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="hidden sm:inline text-gray-500 text-[11px]">
                Click slide or press Space / → to reveal
              </span>

              {visibleStep < TOTAL_STEPS ? (
                <button
                  onClick={showAllPoints}
                  title="Reveal all 7 points at once"
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white transition-all cursor-pointer"
                >
                  Show All ↷
                </button>
              ) : (
                <button
                  onClick={replayCascade}
                  title="Replay from first point"
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white transition-all cursor-pointer"
                >
                  ↺ Replay
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext?.();
                }}
                className="px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer hover:brightness-110"
              >
                Next Slide →
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}