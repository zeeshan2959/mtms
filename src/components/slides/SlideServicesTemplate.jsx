import { useState, useEffect, useCallback, useRef } from "react";
import Reveal from "../ui/Reveal";
import { SERVICES_LIST } from "../../config/servicesData";
import {
  CatiaLogo,
  SiemensNxLogo,
  CreoLogo,
  SolidWorksLogo,
  TeamcenterLogo,
  EnoviaLogo,
  CodepLogo,
  RamsisLogo,
  AnsysLogo,
  HyperMeshLogo,
  SimcenterLogo,
} from "./ToolLogos";

// Map tool logo identifiers to their authentic vector components
function RenderToolLogo({ logoKey, className = "w-full h-full" }) {
  switch (logoKey) {
    case "catia":
      return <CatiaLogo className={className} />;
    case "siemens-nx":
      return <SiemensNxLogo className={className} />;
    case "creo":
      return <CreoLogo className={className} />;
    case "solidworks":
      return <SolidWorksLogo className={className} />;
    case "teamcenter":
      return <TeamcenterLogo className={className} />;
    case "enovia":
      return <EnoviaLogo className={className} />;
    case "codep":
      return <CodepLogo className={className} />;
    case "ramsis":
      return <RamsisLogo className={className} />;
    case "ansys":
      return <AnsysLogo className={className} />;
    case "hypermesh":
      return <HyperMeshLogo className={className} />;
    case "simcenter":
      return <SimcenterLogo className={className} />;
    default:
      return <TeamcenterLogo className={className} />;
  }
}

export default function SlideServicesTemplate({
  serviceIndex = 0,
  onNext,
  onPrev,
  onGoTo,
  registerSubStep,
  slideIndex,
  totalSlides,
}) {
  const currentService = SERVICES_LIST[serviceIndex] || SERVICES_LIST[0];

  // 6 sequential steps:
  // Step 1: Core Tools card
  // Step 2: Core Skills card appears with Skill 1
  // Step 3: Skill 2 reveals
  // Step 4: Skill 3 reveals
  // Step 5: Skill 4 reveals
  // Step 6: Description card appears
  const [currentStep, setCurrentStep] = useState(1);
  const [animCycleKey, setAnimCycleKey] = useState(0);

  // Track if cards have already appeared so they NEVER re-animate on later steps
  const card2HasAppeared = useRef(false);
  const descHasAppeared = useRef(false);

  // Update tracking refs when step advances
  useEffect(() => {
    if (currentStep >= 2) {
      card2HasAppeared.current = true;
    }
    if (currentStep >= 6) {
      descHasAppeared.current = true;
    }
  }, [currentStep]);

  // Reset sequence when slide or service changes
  useEffect(() => {
    card2HasAppeared.current = false;
    descHasAppeared.current = false;
    setCurrentStep(1);
    setAnimCycleKey((k) => k + 1);
  }, [serviceIndex, slideIndex]);

  // Hook sub-steps into global Presentation navigation (keyboard arrow keys & dock)
  useEffect(() => {
    if (!registerSubStep) return;
    return registerSubStep({
      canNext: () => currentStep < 6,
      next: () => setCurrentStep((s) => Math.min(6, s + 1)),
      canPrev: () => currentStep > 1,
      prev: () => setCurrentStep((s) => Math.max(1, s - 1)),
    });
  }, [registerSubStep, currentStep]);

  // Handle click to shift slide stages sequentially
  const advanceStage = useCallback(() => {
    if (currentStep < 6) {
      setCurrentStep((s) => s + 1);
    } else {
      onNext?.();
    }
  }, [currentStep, onNext]);

  const replaySequence = (e) => {
    e?.stopPropagation?.();
    card2HasAppeared.current = false;
    descHasAppeared.current = false;
    setCurrentStep(1);
    setAnimCycleKey((k) => k + 1);
  };

  const showAllCards = (e) => {
    e?.stopPropagation?.();
    card2HasAppeared.current = true;
    descHasAppeared.current = true;
    setCurrentStep(6);
  };

  // Jump directly to any of the 4 service slides (Slide 4, 5, 6, 7 -> index 3, 4, 5, 6)
  const handleMenuClick = (targetServiceIndex, e) => {
    e?.stopPropagation?.();
    onGoTo?.(3 + targetServiceIndex);
  };

  const currentSlideNumber =
    slideIndex != null
      ? String(slideIndex + 1).padStart(2, "0")
      : String(serviceIndex + 4).padStart(2, "0");
  const totalNum =
    totalSlides != null ? String(totalSlides).padStart(2, "0") : "13";

  return (
    <div className="relative h-[calc(100vh-140px)] min-h-[580px] max-h-[calc(100vh-140px)] w-full flex flex-col lg:flex-row items-stretch justify-between select-none overflow-hidden">
      {/* CSS Animation Keyframes for Smooth Card Entrances & Staggered Elements */}
      <style>{`
        @keyframes cardMoveUpSmooth {
          0% {
            opacity: 0;
            transform: translateY(48px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes logoMoveUpOneByOne {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.9);
            filter: blur(3px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes skillItemFadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes descContentFade {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* ── Left Sidebar: Strictly Fixed / Non-Scrollable (Matches Figma & Executive UI) ── */}
      <div className="w-full lg:w-[36%] xl:w-[34%] h-full flex flex-col justify-between px-6 sm:px-8 md:px-10 lg:px-12 py-5 lg:py-6 z-20 overflow-hidden flex-shrink-0 select-none">
        {/* Header: Badge & Title */}
        <Reveal delay={0.05} y={-10}>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-xs tracking-wider font-semibold">
              {currentSlideNumber} / {totalNum}
            </span>
            <span className="text-gray-400 text-xs font-mono tracking-wider">SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold font-daminga text-white tracking-tight leading-none">
            Services
          </h2>
        </Reveal>

        {/* 4 Premium Service Navigation Tabs */}
        <div className="flex flex-col gap-2.5 my-auto py-2">
          {SERVICES_LIST.map((srv, idx) => {
            const isActive = idx === serviceIndex;
            const tabNumber = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={srv.id}
                onClick={(e) => handleMenuClick(idx, e)}
                className={`text-left transition-all duration-300 rounded-2xl cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-900 shadow-2xl shadow-cyan-950/40 p-3.5 border-l-4 border-cyan-500 scale-[1.02]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/30 text-white/70 hover:text-white p-3 hover:translate-x-1"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-[10.5px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? "bg-cyan-500 text-white"
                        : "bg-white/10 text-white/50 group-hover:text-cyan-300"
                    }`}
                  >
                    {tabNumber}
                  </span>

                  {isActive && (
                    <div className="flex items-center gap-1.5 text-cyan-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                      <span>Active</span>
                    </div>
                  )}
                </div>

                <p
                  className={`text-xs sm:text-[12.5px] md:text-[13px] leading-snug font-sans transition-colors ${
                    isActive ? "font-bold text-slate-900" : "font-medium text-white/80"
                  }`}
                >
                  {srv.menuLabel}
                </p>
              </div>
            );
          })}
        </div>

        {/* Presentation Step Controller & Cascade Navigator */}
        <div className="flex flex-col gap-2.5 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            {/* Visual 6-Step Progress Indicator */}
            <div className="flex items-center gap-1.5">
              {[
                { step: 1, label: "Core Tools" },
                { step: 2, label: "Skill 1" },
                { step: 3, label: "Skill 2" },
                { step: 4, label: "Skill 3" },
                { step: 5, label: "Skill 4" },
                { step: 6, label: "Description" },
              ].map((item) => (
                <button
                  key={item.step}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentStep(item.step);
                  }}
                  title={`Jump to ${item.label}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    item.step <= currentStep
                      ? "w-4 sm:w-5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
              <span className="text-[11px] font-mono text-cyan-300 ml-1 whitespace-nowrap">
                Step {currentStep}/6
              </span>
            </div>

            {/* Replay Button */}
            <button
              onClick={replaySequence}
              title="Replay sequence animation"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>↺</span> Replay
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {currentStep < 6 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  advanceStage();
                }}
                className="px-3 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 transition-all cursor-pointer font-medium"
              >
                {currentStep === 1
                  ? "Next: Core Skills +"
                  : currentStep >= 2 && currentStep <= 4
                  ? `Next: Skill ${currentStep} / 4 +`
                  : "Next: Description +"}
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext?.();
                }}
                className="px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 transition-all cursor-pointer font-semibold"
              >
                Next Slide →
              </button>
            )}

            {currentStep < 6 ? (
              <button
                onClick={showAllCards}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-all cursor-pointer"
              >
                Show All
              </button>
            ) : (
              <span className="text-[11px] text-white/40 font-mono">All Cards Visible</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Right Content Panel: Dedicated Scrollable White Container ── */}
      <div
        onClick={advanceStage}
        title={
          currentStep < 6
            ? "Click to advance reveal step"
            : "Click to advance slide"
        }
        className="w-full lg:w-[64%] xl:w-[66%] h-full flex flex-col justify-start bg-white rounded-t-[32px] lg:rounded-t-none lg:rounded-l-[40px] xl:rounded-l-[48px] p-6 sm:p-8 md:p-10 shadow-2xl z-20 relative overflow-y-auto overscroll-contain select-none cursor-pointer [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-slate-400"
      >
        {/* Header Title inside White Panel */}
        <div className="mb-5 z-20 flex-shrink-0">
          <h3 className="text-xl sm:text-2xl md:text-[26px] font-bold font-daminga text-[#0f172a] tracking-tight leading-snug">
            {currentService.title}
          </h3>
        </div>

        {/* ── Middle Grid: Core Tools & Core Skills Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 z-20">
          {/* ── CARD 1: Core Tools (Reveals First, then logos one by one) ── */}
          <div
            key={`tools-card-${animCycleKey}`}
            style={{
              animation: `cardMoveUpSmooth 0.65s cubic-bezier(0.16, 1, 0.3, 1) both`,
            }}
            className="rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-[#111c2e] via-[#0d273a] to-[#0c4052] text-white shadow-xl flex flex-col justify-between border border-white/10"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm sm:text-base font-bold font-daminga text-white">
                Core Tools
              </h4>
              <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
                Tool Suite
              </span>
            </div>

            {/* 5 Tools in 2 - 2 - 1 Grid, appearing one by one */}
            <div className="grid grid-cols-2 gap-3 my-auto pt-1">
              {currentService.tools.map((tool, index) => {
                const isCentered = index === 4;

                return (
                  <div
                    key={`${animCycleKey}-${tool.name}`}
                    style={{
                      animation: `logoMoveUpOneByOne 0.6s cubic-bezier(0.16, 1, 0.3, 1) both`,
                      animationDelay: `${250 + index * 120}ms`,
                    }}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      isCentered ? "col-span-2 mt-1" : ""
                    }`}
                  >
                    {/* Tool Logo Container Badge Matching Figma Spec */}
                    <div className="w-[110px] sm:w-[124px] h-[52px] sm:h-[56px] rounded-xl bg-slate-900/90 border border-white/15 hover:border-cyan-400/60 shadow-lg shadow-black/40 flex items-center justify-center p-2.5 transition-all duration-300 group hover:scale-105">
                      <RenderToolLogo logoKey={tool.logo} className="w-full h-full object-contain" />
                    </div>

                    {/* Tool Name Label */}
                    <span className="text-[11px] sm:text-xs font-semibold text-white/90 mt-1.5 text-center leading-tight tracking-wide">
                      {tool.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CARD 2: Core Skills (Appears on Step 2; does NOT re-animate when Description appears on Step 6) ── */}
          <div
            key={`skills-card-${animCycleKey}`}
            style={{
              animation:
                currentStep >= 2 && !card2HasAppeared.current
                  ? `cardMoveUpSmooth 0.65s cubic-bezier(0.16, 1, 0.3, 1) both`
                  : "none",
            }}
            className={`rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-[#111c2e] via-[#0d2a3d] to-[#0c4052] text-white shadow-xl flex flex-col justify-start border border-white/10 transition-all duration-300 ${
              currentStep >= 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12 pointer-events-none"
            }`}
          >
            {/* Header: Core Skills & Badge */}
            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
              <h4 className="text-sm sm:text-base font-bold font-daminga text-white">
                Core Skills
              </h4>
              <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
                Skills
              </span>
            </div>

            {/* 4 Skills revealed step by step on clicks */}
            <div className="space-y-3 sm:space-y-3.5 flex-1 pt-0.5">
              {currentService.skills.map((skill, index) => {
                const isSkillVisible = currentStep >= 2 + index;
                const isJustRevealed = currentStep === 2 + index;

                return (
                  <div
                    key={`${animCycleKey}-${skill}`}
                    style={{
                      animation: isJustRevealed
                        ? `skillItemFadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both`
                        : "none",
                    }}
                    className={`flex items-start gap-2.5 transition-all duration-300 ${
                      isSkillVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] mt-1.5 flex-shrink-0" />
                    <span className="text-xs sm:text-[13px] md:text-[13.5px] text-gray-100 font-medium font-[Poppins,sans-serif] leading-snug">
                      {skill}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── CARD 3: Description Card (Moves up on Step 6, text content fades in) ── */}
        <div
          key={`desc-card-${animCycleKey}`}
          style={{
            animation:
              currentStep >= 6 && !descHasAppeared.current
                ? `cardMoveUpSmooth 0.65s cubic-bezier(0.16, 1, 0.3, 1) both`
                : "none",
          }}
          className={`rounded-2xl p-5 md:p-6 bg-gradient-to-r from-[#0c2436] via-[#0e3b4a] to-[#0d4f5c] text-white shadow-xl border border-white/10 z-20 transition-all duration-500 mb-6 flex-shrink-0 ${
            currentStep >= 6
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12 pointer-events-none"
          }`}
        >
          <div
            style={{
              animation:
                currentStep >= 6 && !descHasAppeared.current
                  ? `descContentFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) both`
                  : "none",
              animationDelay: "200ms",
            }}
          >
            <p className="text-xs sm:text-[12.5px] md:text-[13px] leading-relaxed text-gray-200 font-[Poppins,sans-serif] whitespace-pre-line">
              {currentService.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
