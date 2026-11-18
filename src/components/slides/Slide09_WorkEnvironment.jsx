import { useState, useEffect, useCallback } from "react";
import Reveal from "../ui/Reveal";

// 3 Facility Features matching Figma 1:1
const FACILITY_FEATURES = [
  {
    id: "secure",
    step: 1,
    labelLine1: "Secure",
    labelLine2: "Environment",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4 5.5v5.5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5.5L12 2z" />
        <path
          d="M12 4.1L6 6.7v4.3c0 4.3 2.8 8.4 6 9.6V4.1z"
          fill="white"
          fillOpacity="0.35"
        />
      </svg>
    ),
  },
  {
    id: "surveillance",
    step: 2,
    labelLine1: "24-hour",
    labelLine2: "Surveillance",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        {/* Wall mount plate & bracket */}
        <path d="M3 16h2.5v2.5H3V16zm1.5-6.5h2v6.5h-2v-6.5zm2 4.5h2.5v2H6.5v-2z" />
        {/* Angled CCTV bullet camera body */}
        <path d="M10 8.2l9-4.2a1 1 0 011.3.5l1.6 3.4a1 1 0 01-.5 1.3l-9 4.2a1 1 0 01-1.3-.5l-1.6-3.4a1 1 0 01.5-1.3z" />
        {/* Lens */}
        <ellipse
          cx="10.8"
          cy="11.2"
          rx="1.3"
          ry="2.3"
          transform="rotate(-25 10.8 11.2)"
          fill="#060c18"
        />
      </svg>
    ),
  },
  {
    id: "broadband",
    step: 3,
    labelLine1: "High-speed",
    labelLine2: "broadband",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 9a11.5 11.5 0 0 1 15 0" />
        <path d="M8 13a6.5 6.5 0 0 1 8 0" />
        <circle cx="12" cy="17.5" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const TOTAL_PHOTOS = 4;

export default function Slide09_WorkEnvironment({
  slideIndex,
  totalSlides,
  onNext,
  registerSubStep,
}) {
  const slideNum =
    slideIndex != null ? String(slideIndex + 1).padStart(2, "0") : "09";
  const totalNum =
    totalSlides != null ? String(totalSlides).padStart(2, "0") : "13";

  // Step 0: Landing State (Clean card with 0 photos, waiting for clicks)
  // Step 1 to 4: Images reveal ONE BY ONE on clicks (1=Left Tall, 2=Middle Top, 3=Middle Bottom, 4=Right Large)
  const [visibleStep, setVisibleStep] = useState(0);
  const [animCycle, setAnimCycle] = useState(0);

  // Reset to initial step mode if slideIndex changes
  useEffect(() => {
    setVisibleStep(0);
    setAnimCycle((k) => k + 1);
  }, [slideIndex]);

  // Hook sub-steps with PresentationViewer keyboard (Space, ArrowRight, ArrowLeft) and dock controls
  useEffect(() => {
    if (!registerSubStep) return;

    return registerSubStep({
      canNext: () => visibleStep < TOTAL_PHOTOS,
      next: () => setVisibleStep((s) => Math.min(TOTAL_PHOTOS, s + 1)),
      canPrev: () => visibleStep > 0,
      prev: () => setVisibleStep((s) => Math.max(0, s - 1)),
    });
  }, [registerSubStep, visibleStep, onNext]);

  const advance = useCallback(() => {
    if (visibleStep < TOTAL_PHOTOS) {
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

  const showAllCards = (e) => {
    e?.stopPropagation?.();
    setVisibleStep(TOTAL_PHOTOS);
  };

  return (
    <div
      onClick={advance}
      className="relative w-full flex flex-col justify-center items-center py-0 select-none cursor-pointer -mb-20 sm:-mb-24 pt-1"
    >
      {/* Animation Keyframes */}
      <style>{`
        @keyframes photoCardReveal {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes iconFadeDown {
          0% {
            opacity: 0;
            transform: translateY(-14px) scale(0.88);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* ── Main Outer Glass Enclosure Card (Expanded Height Extending Under Slide Switcher Dock) ── */}
      <div className="relative z-10 w-full max-w-[1380px] xl:max-w-[1460px] mx-auto min-h-[600px] h-[calc(100vh-50px)] max-h-[860px] xl:max-h-[920px] p-5 sm:p-6 lg:p-7 pb-8 rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#0e223d]/35 via-[#07162a]/45 to-[#030d1a]/55 backdrop-blur-2xl border border-cyan-400/25 shadow-[0_24px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(34,211,238,0.08),inset_0_1px_2px_rgba(255,255,255,0.25)] flex flex-col justify-between overflow-hidden">
        
        {/* Top edge specular reflection line */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent pointer-events-none" />

        {/* ── Top Header Section: Title on Left, 3 Glass Icon Pods on Right (Matching Figma 1:1) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-2 sm:mb-2.5 w-full flex-shrink-0">
          {/* Left: Badge & Two-line Title */}
          <Reveal delay={0.05} y={-8}>
            <div>
              <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-[11px] sm:text-xs tracking-wider font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  {slideNum} / {totalNum}
                </span>
                <span className="text-gray-400 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
                  INFRASTRUCTURE &amp; ENVIRONMENT
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] xl:text-[42px] font-bold font-sans text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                Excellent Work
                <br />
                Environment
              </h1>
            </div>
          </Reveal>

          {/* Right: 3 Frosted Glass Icon Pods (Matching Figma 1:1, Crisp, Glassy & Balanced) ── */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 pb-1">
            {FACILITY_FEATURES.map((feat) => {
              // Feature 1: active on step 1; Feature 2: active on steps 2 & 3; Feature 3: active on step 4
              const isActive =
                feat.step === 1
                  ? visibleStep === 1
                  : feat.step === 2
                  ? visibleStep === 2 || visibleStep === 3
                  : visibleStep === 4;

              return (
                <div
                  key={`${animCycle}-${feat.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Jump to corresponding photo step
                    const targetStep = feat.step === 1 ? 1 : feat.step === 2 ? 2 : 4;
                    setVisibleStep(targetStep);
                  }}
                  className={`px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-all duration-300 backdrop-blur-xl relative overflow-hidden group min-w-[105px] sm:min-w-[115px] ${
                    isActive
                      ? "bg-cyan-500/20 border border-cyan-400/80 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] scale-105"
                      : "bg-white/[0.06] border border-white/15 text-white shadow-lg hover:border-cyan-400/50 hover:bg-white/[0.12] hover:scale-102"
                  }`}
                >
                  {/* Top specular reflection hairline */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                  <div
                    className={`transition-all duration-300 ${
                      isActive
                        ? "text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] scale-110"
                        : "text-white group-hover:text-cyan-200"
                    }`}
                  >
                    {feat.icon}
                  </div>
                  <span
                    className={`text-[11.5px] sm:text-xs font-sans leading-tight mt-1.5 transition-colors duration-300 ${
                      isActive
                        ? "text-white font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                        : "text-white/90 font-medium group-hover:text-white"
                    }`}
                  >
                    {feat.labelLine1}
                    <br />
                    {feat.labelLine2}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Photo Gallery Grid: 4 Images Revealed One by One on Clicks ── */}
        <div className="flex flex-col md:flex-row items-stretch gap-3 sm:gap-3.5 lg:gap-4 flex-1 min-h-0 w-full my-1.5 sm:my-2">
          
          {/* Column 1: Left Vertical Photo (Step 1) */}
          <div
            key={`${animCycle}-env-1`}
            onClick={(e) => {
              e.stopPropagation();
              setVisibleStep(1);
            }}
            className={`w-full md:w-auto md:flex-[1.15] h-full min-h-0 rounded-2xl sm:rounded-[24px] overflow-hidden transition-all duration-500 relative group backdrop-blur-xl ${
              visibleStep >= 1
                ? visibleStep === 1
                  ? "border-2 border-cyan-400 ring-2 ring-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.45),0_16px_40px_rgba(0,0,0,0.5)] scale-[1.01] z-10 opacity-100"
                  : "border border-white/20 hover:border-cyan-400/60 shadow-[0_12px_32px_rgba(0,0,0,0.4)] opacity-95 hover:opacity-100"
                : "border border-white/10 bg-white/[0.02] opacity-40 hover:opacity-60"
            }`}
          >
            {visibleStep >= 1 ? (
              <>
                <img
                  src="/office/work-env-1.jpg"
                  alt="MTMS Engineering Workstations"
                  style={{
                    animation: "photoCardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                  className="w-full h-full object-cover object-center contrast-[1.05] brightness-[1.02] saturate-[1.04] group-hover:scale-105 transition-all duration-700 ease-out"
                />
                {/* Crisp top specular hairline */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/30 p-4">
                <div className="w-9 h-9 rounded-full border border-dashed border-white/25 flex items-center justify-center text-white/40 mb-1.5 font-mono text-xs">
                  01
                </div>
                <span className="text-[10px] font-mono tracking-wider">CLICK TO REVEAL</span>
              </div>
            )}
          </div>

          {/* Column 2: Middle Stacked Photos (Photo 2 = Top, Photo 3 = Bottom) */}
          <div className="w-full md:w-auto md:flex-[1.0] min-w-0 h-full min-h-0 flex flex-col gap-2.5 sm:gap-3">
            {/* Top Photo: Step 2 */}
            <div
              key={`${animCycle}-env-2`}
              onClick={(e) => {
                e.stopPropagation();
                setVisibleStep(2);
              }}
              className={`w-full flex-1 min-h-0 rounded-2xl sm:rounded-[20px] overflow-hidden transition-all duration-500 relative group backdrop-blur-xl ${
                visibleStep >= 2
                  ? visibleStep === 2
                    ? "border-2 border-cyan-400 ring-2 ring-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.45),0_16px_40px_rgba(0,0,0,0.5)] scale-[1.01] z-10 opacity-100"
                    : "border border-white/20 hover:border-cyan-400/60 shadow-[0_12px_32px_rgba(0,0,0,0.4)] opacity-95 hover:opacity-100"
                  : "border border-white/10 bg-white/[0.02] opacity-40 hover:opacity-60"
              }`}
            >
              {visibleStep >= 2 ? (
                <>
                  <img
                    src="/office/work-env-2.jpg"
                    alt="MTMS Collaborative CAD Bay"
                    style={{
                      animation: "photoCardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
                    }}
                    className="w-full h-full object-cover object-center contrast-[1.05] brightness-[1.02] saturate-[1.04] group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/30 p-2">
                  <div className="w-7 h-7 rounded-full border border-dashed border-white/25 flex items-center justify-center text-white/40 mb-1 font-mono text-[11px]">
                    02
                  </div>
                  <span className="text-[10px] font-mono tracking-wider">CLICK TO REVEAL</span>
                </div>
              )}
            </div>

            {/* Bottom Photo: Step 3 */}
            <div
              key={`${animCycle}-env-3`}
              onClick={(e) => {
                e.stopPropagation();
                setVisibleStep(3);
              }}
              className={`w-full flex-1 min-h-0 rounded-2xl sm:rounded-[20px] overflow-hidden transition-all duration-500 relative group backdrop-blur-xl ${
                visibleStep >= 3
                  ? visibleStep === 3
                    ? "border-2 border-cyan-400 ring-2 ring-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.45),0_16px_40px_rgba(0,0,0,0.5)] scale-[1.01] z-10 opacity-100"
                    : "border border-white/20 hover:border-cyan-400/60 shadow-[0_12px_32px_rgba(0,0,0,0.4)] opacity-95 hover:opacity-100"
                  : "border border-white/10 bg-white/[0.02] opacity-40 hover:opacity-60"
              }`}
            >
              {visibleStep >= 3 ? (
                <>
                  <img
                    src="/office/work-env-3.jpg"
                    alt="MTMS Dedicated CAD Workstation"
                    style={{
                      animation: "photoCardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
                    }}
                    className="w-full h-full object-cover object-center contrast-[1.05] brightness-[1.02] saturate-[1.04] group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/30 p-2">
                  <div className="w-7 h-7 rounded-full border border-dashed border-white/25 flex items-center justify-center text-white/40 mb-1 font-mono text-[11px]">
                    03
                  </div>
                  <span className="text-[10px] font-mono tracking-wider">CLICK TO REVEAL</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Right Large Photo (Step 4) */}
          <div
            key={`${animCycle}-env-4`}
            onClick={(e) => {
              e.stopPropagation();
              setVisibleStep(4);
            }}
            className={`w-full md:w-auto md:flex-[1.75] h-full min-h-0 rounded-2xl sm:rounded-[24px] overflow-hidden transition-all duration-500 relative group backdrop-blur-xl ${
              visibleStep >= 4
                ? visibleStep === 4
                  ? "border-2 border-cyan-400 ring-2 ring-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.45),0_16px_40px_rgba(0,0,0,0.5)] scale-[1.01] z-10 opacity-100"
                  : "border border-white/20 hover:border-cyan-400/60 shadow-[0_12px_32px_rgba(0,0,0,0.4)] opacity-95 hover:opacity-100"
                : "border border-white/10 bg-white/[0.02] opacity-40 hover:opacity-60"
            }`}
          >
            {visibleStep >= 4 ? (
              <>
                <img
                  src="/office/work-env-4.jpg"
                  alt="MTMS Multi-Display Validation Center"
                  style={{
                    animation: "photoCardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                  className="w-full h-full object-cover object-center contrast-[1.05] brightness-[1.02] saturate-[1.04] group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/30 p-4">
                <div className="w-9 h-9 rounded-full border border-dashed border-white/25 flex items-center justify-center text-white/40 mb-1.5 font-mono text-xs">
                  04
                </div>
                <span className="text-[10px] font-mono tracking-wider">CLICK TO REVEAL</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom Controls & Progress Bar Inside the Glass Card ── */}
        <div className="mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 flex items-center justify-between w-full border-t border-white/10 flex-shrink-0">
          {/* Step Indicator Pills: 4 Photos */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: TOTAL_PHOTOS }, (_, i) => {
              const stepNum = i + 1;
              const isRevealed = stepNum <= visibleStep;
              const isCurrent = stepNum === visibleStep;

              return (
                <button
                  key={stepNum}
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisibleStep(stepNum);
                  }}
                  title={`Jump to Photo ${stepNum}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : isRevealed
                      ? "w-4 bg-cyan-500/50 hover:bg-cyan-400"
                      : "w-2 bg-white/25 hover:bg-white/50"
                  }`}
                />
              );
            })}
            <span className="text-[11px] font-mono text-cyan-300 ml-2">
              {visibleStep === 0
                ? "0 / 4 Photos • Click to begin"
                : `${visibleStep} / 4 Photos Revealed`}
            </span>
          </div>

          {/* Action Buttons: Positioned on right to keep dock center completely clear */}
          <div className="flex items-center gap-2 text-xs font-mono">
            {visibleStep < TOTAL_PHOTOS ? (
              <button
                onClick={showAllCards}
                title="Reveal all 4 photos at once"
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white transition-all cursor-pointer"
              >
                Show All ↷
              </button>
            ) : (
              <button
                onClick={replayCascade}
                title="Replay sequence from first photo"
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white transition-all cursor-pointer"
              >
                ↺ Replay
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
