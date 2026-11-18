import Reveal from "../ui/Reveal";

export default function Slide01_Cover({ onNext }) {
  return (
    <div
      onClick={onNext}
      aria-label="Click to start presentation"
      className="fixed inset-0 z-30 w-full h-full min-h-dvh flex items-center justify-start px-8 sm:px-16 md:px-24 lg:px-32 py-12 overflow-hidden cursor-pointer select-none"
    >
      {/* Full-Page Clean 3D Background Image (Exploded CAD view on geometric background) */}
      <img
        src="/bg_slide_01.png"
        alt="MTMS Engineering Precision-Driven Design"
        className="absolute inset-0 w-full h-full object-contain object-center z-0 select-none pointer-events-none"
      />

      {/* ── Full-Width & Full-Height Atmospheric Depth Overlay (Zero Outer Padding, True Edge-to-Edge) ── */}
      {/* Base full-bleed darkening */}
      <div className="absolute inset-0 w-full h-full bg-black/35 pointer-events-none z-10" />
      {/* Full-bleed gradient overlay: deep dark on the left for maximum text contrast, easing right */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#030712]/92 via-[#030712]/65 to-[#030712]/20 pointer-events-none z-10" />

      {/* ── Logo & Subtitle (Clean direct typography on full-width overlay, no card container) ── */}
      <Reveal delay={0.1} y={-8}>
        <div className="relative z-20 max-w-xl">
          {/* Logo */}
          <img
            src="/Logo.svg"
            alt="MTMS Engineering"
            className="h-9 sm:h-11 md:h-12 w-auto object-contain brightness-110 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          />

          {/* Subtitle with high contrast typography */}
          <p className="mt-4 sm:mt-5 text-white text-lg sm:text-xl md:text-2xl lg:text-[26px] font-normal tracking-wide font-sans leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            Precision-Driven Design &amp;
            <br />
            <span className="text-gray-200">Consultancy</span>
          </p>
        </div>
      </Reveal>

      {/* ── Start Button at Bottom Center (Matching Figma Slide 1) ── */}
      <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
          }}
          className="px-8 py-2.5 rounded-full bg-[#18202c]/85 hover:bg-[#202c3d] active:scale-95 border border-white/20 hover:border-cyan-400/60 backdrop-blur-md text-white text-sm font-medium tracking-wide transition-all shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex items-center gap-2 group cursor-pointer"
        >
          <span>Start</span>
          <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform text-xs">→</span>
        </button>
      </div>
    </div>
  );
}
