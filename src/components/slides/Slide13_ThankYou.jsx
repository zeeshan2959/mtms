import Reveal from "../ui/Reveal";

export default function Slide13_ThankYou({ onGoTo, onNext, onPrev }) {
  return (
    <div
      onClick={onNext}
      aria-label="Thank you slide"
      className="relative w-full min-h-[calc(100vh-120px)] h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 py-8 sm:py-10 select-none cursor-pointer"
    >
      {/* ── Fixed Full-Viewport Background Layer ── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {/* Dark base ensuring 100% full viewport coverage */}
        <div className="absolute inset-0 bg-[#060c18]" />

        {/* 3D Exploded CAD Mechanical Assembly Background */}
        <img
          src="/thank-you-clean-bg.jpg"
          alt="MTMS Engineering Precision Design Assembly"
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
        />

        {/* Subtle radial depth gradient for contrast */}
        <div className="absolute inset-0 bg-radial-[ellipse_80%_60%_at_50%_50%] from-transparent via-[#060c18]/20 to-[#060c18]/70" />
      </div>

      {/* Top spacer */}
      <div className="relative z-10 w-full" />

      {/* ── Center Section: "Thank you" in bold white modern font ── */}
      <div className="relative z-10 w-full flex items-center justify-center text-center my-auto py-12">
        <Reveal delay={0.1} scale={0.96} y={-10}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[92px] font-bold font-daminga text-white tracking-tight leading-none drop-shadow-[0_4px_32px_rgba(0,0,0,0.95)]">
            Thank you
          </h1>
        </Reveal>
      </div>

      {/* ── Bottom Bar: MTMS Logo on Left, Contact Details on Right ── */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pt-4">
        {/* Bottom Left: MTMS Engineering Logo */}
        <Reveal delay={0.2} y={10}>
          <div className="flex items-center gap-3">
            <img
              src="/Logo.svg"
              alt="MTMS Engineering"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-110 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            />
          </div>
        </Reveal>

        {/* Bottom Right: Managing Director Contact Details matching Figma 1:1 */}
        <Reveal delay={0.25} y={10}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="text-center sm:text-right text-xs sm:text-[13px] md:text-[13.5px] font-sans leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] cursor-default select-text"
          >
            <p className="font-bold text-white text-sm sm:text-[15px] tracking-tight">
              Mutahir Qadeer
            </p>
            <p className="text-gray-300 font-normal">
              Managing Director – Offshore R&amp;D Delivery | MTMS Engineering
            </p>
            <p className="text-gray-300 font-normal">
              Email:{" "}
              <a
                href="mailto:mutahirqadeer@mtmsengineering.com"
                className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors cursor-pointer"
              >
                mutahirqadeer@mtmsengineering.com
              </a>
            </p>
            <p className="text-gray-300 font-normal">
              WhatsApp:{" "}
              <a
                href="https://wa.me/393924329167"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors cursor-pointer"
              >
                +39 3924329167
              </a>
            </p>
          </div>
        </Reveal>
      </div>

      {/* Optional: Floating restart presentation button for seamless review */}
      <div className="relative z-10 w-full flex justify-center mt-3 pt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGoTo?.(0);
          }}
          className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white text-xs font-mono tracking-wider transition-all backdrop-blur-md border border-white/10 shadow-lg cursor-pointer flex items-center gap-1.5"
        >
          <span>↺</span> Restart Presentation
        </button>
      </div>
    </div>
  );
}
