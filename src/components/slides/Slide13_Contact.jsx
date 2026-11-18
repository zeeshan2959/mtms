import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";

export default function Slide13_Contact({ onGoTo, slideIndex }) {
  const slideNum = slideIndex != null ? String(slideIndex + 1).padStart(2, "0") : "16";
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      <Reveal delay={0.05} y={-10}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3 backdrop-blur-md">
          <span>{slideNum}</span>
          <span>/</span>
          <span>Next Steps</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Call to Action */}
        <div className="lg:col-span-7">
          <AnimatedText
            as="h2"
            text="Let's Engineer the Future Together"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-daminga text-white tracking-tight leading-none mb-4"
          />

          <Reveal delay={0.15} y={16}>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg font-[Poppins,sans-serif] leading-relaxed mb-6">
              Partner with MTMS Engineering for precision design, digital mock-up validation, and seamless PLM execution across your programs.
            </p>
          </Reveal>

          {/* Contact highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
            <Reveal delay={0.2} y={16}>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-1">Inquiries</div>
                <div className="text-sm font-semibold text-white">info@mtms.engineering</div>
                <div className="text-[11px] text-gray-400 mt-1">24hr Technical Response</div>
              </div>
            </Reveal>

            <Reveal delay={0.25} y={16}>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-1">Collaboration</div>
                <div className="text-sm font-semibold text-white">OEM &amp; Tier-1 Direct</div>
                <div className="text-[11px] text-gray-400 mt-1">Dedicated Teams / SOW</div>
              </div>
            </Reveal>

            <Reveal delay={0.3} y={16}>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="text-xs font-mono text-cyan-400 uppercase mb-1">Security</div>
                <div className="text-sm font-semibold text-white">ITAR &amp; ISO 9001</div>
                <div className="text-[11px] text-gray-400 mt-1">Secure PLM Gateways</div>
              </div>
            </Reveal>
          </div>

          {/* Action CTAs */}
          <Reveal delay={0.35} y={16}>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onGoTo?.(0)}
                className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 transform group-hover:-rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Restart Presentation</span>
              </button>

              <span className="text-xs text-gray-400 font-mono">
                Thank you for reviewing MTMS Engineering
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right Side: MTMS Brand & Seal Card */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <Reveal delay={0.3} scale={0.96} y={20}>
            <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-6 shadow-inner">
                <img src="/favicon.svg" alt="MTMS Logo mark" className="w-9 h-9" />
              </div>

              <img src="/Logo.svg" alt="MTMS Engineering" className="h-8 w-auto mb-3" />

              <p className="text-xs text-gray-400 font-mono uppercase tracking-widest mb-6">
                Precision-Driven Design &amp; Consultancy
              </p>

              <div className="w-full pt-4 border-t border-white/10 text-xs text-gray-400 leading-relaxed font-[Poppins,sans-serif]">
                Delivering integrated CAD, CAE, and PLM solutions to transform complex product concepts into validated, production-ready engineering reality.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
