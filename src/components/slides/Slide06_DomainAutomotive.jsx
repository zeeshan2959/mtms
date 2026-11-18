import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";

const AUTOMOTIVE_PILLARS = [
  {
    title: "Body-in-White (BIW)",
    desc: "A/B/C pillars, structural crossmembers, floorpans, and multi-material joining technologies.",
  },
  {
    title: "Closures & Mechanisms",
    desc: "Side doors, tailgates, hood latching systems, hinges, and weather-seal compression analysis.",
  },
  {
    title: "Interior Trims & Cockpits",
    desc: "Instrument panels, center consoles, door trims, HVAC ducting, and occupant safety envelopes.",
  },
  {
    title: "EV Platform & Battery Pack",
    desc: "Underbody battery enclosures, side-impact crash protection, and high-voltage cable routing.",
  },
];

export default function Slide06_DomainAutomotive({ slideIndex }) {
  const slideNum = slideIndex != null ? String(slideIndex + 1).padStart(2, "0") : "09";
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      <Reveal delay={0.05} y={-10}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3 backdrop-blur-md">
          <span>{slideNum}</span>
          <span>/</span>
          <span>Domain Focus</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left text & systems */}
        <div className="lg:col-span-7">
          <AnimatedText
            as="h2"
            text="Automotive Engineering"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-daminga text-white tracking-tight leading-none mb-4"
          />

          <Reveal delay={0.15} y={16}>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg font-[Poppins,sans-serif] leading-relaxed mb-6">
              Complete product development cycles for global OEMs and Tier-1 automotive suppliers, balancing crashworthiness, lightweighting, and high-volume manufacturing feasibility.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {AUTOMOTIVE_PILLARS.map((item, i) => (
              <Reveal key={item.title} delay={0.2 + i * 0.08} y={16}>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all backdrop-blur-md">
                  <h3 className="text-sm sm:text-base font-semibold text-cyan-300 font-daminga mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-[Poppins,sans-serif] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: Vehicle CAD Graphic */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <Reveal delay={0.3} scale={0.96} y={20}>
            <div className="relative w-full max-w-lg p-4 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center">
              <img
                src="/Car.png"
                alt="Automotive platform CAD design"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
              />
              <div className="w-full mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>CATIA V5 / Siemens NX</span>
                <span>BIW &amp; DMU Validated</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
