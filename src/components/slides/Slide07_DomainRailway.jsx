import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";

const RAILWAY_PILLARS = [
  {
    title: "Carbody Structures",
    desc: "Aluminum extrusions, welded stainless-steel shells, and anti-climber crash energy absorption units.",
  },
  {
    title: "Interior Architecture",
    desc: "Modular passenger seating, luggage racks, partition bulkheads, and driver cab ergonomic desks.",
  },
  {
    title: "Underframe Packaging",
    desc: "Bogie clearance envelopes, pneumatic brake routing, cable trays, and aerodynamic underfloor fairings.",
  },
  {
    title: "HVAC & Ducting Integration",
    desc: "Ceiling air distribution, acoustic dampening, and fire/smoke compliance according to EN 45545.",
  },
];

export default function Slide07_DomainRailway({ slideIndex }) {
  const slideNum = slideIndex != null ? String(slideIndex + 1).padStart(2, "0") : "10";
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
            text="Railway &amp; Rolling Stock"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-daminga text-white tracking-tight leading-none mb-4"
          />

          <Reveal delay={0.15} y={16}>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg font-[Poppins,sans-serif] leading-relaxed mb-6">
              Engineering solutions for commuter rail, metros, and high-speed transit systems. We ensure structural crashworthiness, space optimization, and strict compliance with European and global railway standards.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {RAILWAY_PILLARS.map((item, i) => (
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

        {/* Right: Rolling Stock Graphic */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <Reveal delay={0.3} scale={0.96} y={20}>
            <div className="relative w-full max-w-lg p-5 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center">
              <picture className="w-full flex justify-center">
                <source srcSet="/domain/train.webp" type="image/webp" />
                <img
                  src="/domain/train.png"
                  alt="Rolling stock CAD engineering"
                  className="w-full h-auto max-h-[260px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                />
              </picture>
              <div className="w-full mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>EN 45545 &amp; EN 15227 Compliance</span>
                <span>Crashworthiness Verified</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
