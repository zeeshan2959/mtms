import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";

const PILLARS = [
  {
    title: "Technical Expertise",
    desc: "Mastery of advanced CAD/CAE/PLM tools and automotive-grade engineering standards.",
    icon: "01",
  },
  {
    title: "Global Collaboration",
    desc: "Deep integration with OEM and Tier-1 engineering teams across timezones.",
    icon: "02",
  },
  {
    title: "Cost & Time Efficiency",
    desc: "Optimized development cycles with early clash detection and DFM validation.",
    icon: "03",
  },
  {
    title: "End-to-End Excellence",
    desc: "Continuous governance from styling sketches through PPAP and factory launch.",
    icon: "04",
  },
];

export default function Slide03_MissionVision() {
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      {/* Header Badge */}
      <Reveal delay={0.05} y={-10}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3 backdrop-blur-md">
          <span>03</span>
          <span>/</span>
          <span>Mission &amp; Vision</span>
        </div>
      </Reveal>

      <AnimatedText
        as="h2"
        text="Engineering with Purpose"
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-daminga text-white tracking-tight leading-none mb-6"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2">
        {/* Left: Mission Statement & Image */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal delay={0.15} y={16}>
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl shadow-black/30">
              <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed font-[Poppins,sans-serif]">
                To become a globally trusted engineering partner by delivering innovative, high-quality, and cost-effective solutions that empower our clients to excel in competitive global markets.
              </p>
              <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-[Poppins,sans-serif]">
                We strive to maximize efficiency and engineering value through robust technical expertise, disciplined digital mock-up validation, and an uncompromising commitment to engineering excellence.
              </p>
            </div>
          </Reveal>

          {/* Visual cutaway illustration */}
          <Reveal delay={0.25} scale={0.97} y={16}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-4">
              <picture className="block w-full">
                <source srcSet="/about/mission-vision.webp" type="image/webp" />
                <img
                  src="/about/mission-vision.png"
                  alt="High-tech engineering system"
                  className="w-full max-h-[220px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
                />
              </picture>
            </div>
          </Reveal>
        </div>

        {/* Right: Core Pillars */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.2 + i * 0.08} y={16}>
              <div className="group p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono flex items-center justify-center font-bold">
                    {pillar.icon}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors font-daminga">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-[Poppins,sans-serif] pl-10">
                  {pillar.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
