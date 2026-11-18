import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";

const APPLIANCE_PILLARS = [
  {
    title: "Plastic Injection Enclosures",
    desc: "Complex aesthetic Class-A surfaces, snap-fit joints, structural ribs, parting line management, and tool feasibility.",
  },
  {
    title: "Precision Sheet Metal",
    desc: "Deep-draw stampings, internal skeleton chassis, acoustic damping pads, and high-efficiency press-brake designs.",
  },
  {
    title: "PCB & Electronic Packaging",
    desc: "Component keep-out zones, harness management, connector clearance, thermal dissipation, and IP-rated ingress protection.",
  },
  {
    title: "DFM / DFA Optimization",
    desc: "Part count reduction, automated assembly readiness, drop-impact structural resistance, and UL/CE compliance.",
  },
];

export default function Slide09_DomainAppliancesIoT({ slideIndex }) {
  const slideNum = slideIndex != null ? String(slideIndex + 1).padStart(2, "0") : "12";
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
            text="Appliances &amp; Smart Devices"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-daminga text-white tracking-tight leading-none mb-4"
          />

          <Reveal delay={0.15} y={16}>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg font-[Poppins,sans-serif] leading-relaxed mb-6">
              Engineering high-volume consumer goods, smart appliances, and IoT hardware. We harmonize industrial design aesthetics with mechanical integrity, thermal performance, and lean manufacturing.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {APPLIANCE_PILLARS.map((item, i) => (
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

        {/* Right: IoT & Appliance CAD Graphic */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <Reveal delay={0.3} scale={0.96} y={20}>
            <div className="relative w-full max-w-lg p-5 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center">
              <picture className="w-full flex justify-center">
                <source srcSet="/domain/iot-devices.webp" type="image/webp" />
                <img
                  src="/domain/iot-devices.png"
                  alt="IoT hardware and smart device engineering"
                  className="w-full h-auto max-h-[260px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                />
              </picture>
              <div className="w-full mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>Consumer &amp; Industrial IoT Standards</span>
                <span>DFM &amp; Tooling Certified</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
