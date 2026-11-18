import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";

const REGIONS = [
  {
    name: "North America",
    centers: "Detroit • Windsor • Silicon Valley",
    focus: "EV platform architectures, crash structure optimization, lightweighting.",
    code: "NA",
  },
  {
    name: "EMEA",
    centers: "Turin • Stuttgart • Paris • Modena",
    focus: "Luxury & supercar BIW, high-speed rail interiors, marine engineering.",
    code: "EU",
  },
  {
    name: "Asia-Pacific",
    centers: "Tokyo • Seoul • Bangalore • Shanghai",
    focus: "Precision tooling, robotics automation, smart appliances & IoT hardware.",
    code: "AP",
  },
  {
    name: "South America",
    centers: "São Paulo • Cordoba • Belo Horizonte",
    focus: "Commercial transport, heavy agricultural machinery, powertrain chassis.",
    code: "SA",
  },
];

export default function Slide04_GlobalReach() {
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      <Reveal delay={0.05} y={-10}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3 backdrop-blur-md">
          <span>04</span>
          <span>/</span>
          <span>Global Footprint</span>
        </div>
      </Reveal>

      <AnimatedText
        as="h2"
        text="Worldwide Engineering Reach"
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-daminga text-white tracking-tight leading-none mb-4"
      />

      <Reveal delay={0.15} y={16}>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl font-[Poppins,sans-serif] leading-relaxed mb-8">
          Our clients and technical engagements span across North America, EMEA, Asia-Pacific, and South America, delivering seamless digital mock-up continuity across global supply chains.
        </p>
      </Reveal>

      {/* 4 Regional Hubs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {REGIONS.map((reg, idx) => (
          <Reveal key={reg.name} delay={0.2 + idx * 0.08} y={20}>
            <div className="group h-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                    {reg.code}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-daminga">
                  {reg.name}
                </h3>
                <div className="text-xs text-gray-400 font-mono mt-1 mb-3">
                  {reg.centers}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-[Poppins,sans-serif]">
                  {reg.focus}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500 group-hover:text-cyan-400 transition-colors">
                <span>PLM Integration</span>
                <span>Active</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Key Metric Highlights */}
      <Reveal delay={0.5} y={16}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">4</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono mt-1">Continental Hubs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">100+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono mt-1">OEM / Tier-1 Deliverables</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">24/7</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono mt-1">Engineering Continuity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">100%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono mt-1">Data Security &amp; NDA</div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
