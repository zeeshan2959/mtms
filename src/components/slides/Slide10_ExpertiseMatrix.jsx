import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";

const CAPABILITIES = [
  {
    step: "01",
    phase: "Concept & Ideation",
    items: ["Styling Conversion", "Ergonomics Analysis", "Space & Package Studies"],
  },
  {
    step: "02",
    phase: "3D CAD Modelling",
    items: ["Parametric Class-A Surfaces", "Complex Solid Assemblies", "CATIA & Siemens NX"],
  },
  {
    step: "03",
    phase: "DMU & Clash Verification",
    items: ["Full Vehicle Packaging", "Tolerance Stack-Up", "Kinematic Clashes"],
  },
  {
    step: "04",
    phase: "Tooling & Feasibility",
    items: ["DFM / DFA Analysis", "Stamping Draw Studies", "Injection Mold Feasibility"],
  },
  {
    step: "05",
    phase: "Technical Documentation",
    items: ["2D Production Drawings", "ASME / ISO GD&T Standards", "BOM Management"],
  },
  {
    step: "06",
    phase: "Validation & Launch",
    items: ["PPAP Governance", "Prototype Verification", "OEM Technical Alignment"],
  },
];

export default function Slide10_ExpertiseMatrix({ slideIndex }) {
  const slideNum = slideIndex != null ? String(slideIndex + 1).padStart(2, "0") : "13";
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <Reveal delay={0.05} y={-10}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3 backdrop-blur-md">
              <span>{slideNum}</span>
              <span>/</span>
              <span>Full Lifecycle Coverage</span>
            </div>
          </Reveal>

          <AnimatedText
            as="h2"
            text="Our Expertise Spans"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-daminga text-white tracking-tight leading-none"
          />

          <Reveal delay={0.15} y={16}>
            <p className="mt-3 text-gray-300 text-sm sm:text-base font-[Poppins,sans-serif] max-w-2xl">
              An end-to-end engineering capability matrix from initial design concept through production tooling and assembly validation.
            </p>
          </Reveal>
        </div>

        {/* Action badge */}
        <Reveal delay={0.2} y={16}>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-cyan-400/30 text-xs font-mono text-cyan-300 backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Full Lifecycle Coverage</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Process Track Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAPABILITIES.map((cap, idx) => (
          <Reveal key={cap.step} delay={0.15 + idx * 0.08} y={20}>
            <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                  {cap.step}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-400/20">
                  Phase {cap.step}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide group-hover:text-cyan-200 transition-colors font-daminga mb-2">
                {cap.phase}
              </h3>

              <ul className="space-y-1.5 mt-2">
                {cap.items.map((item, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-center gap-2 font-[Poppins,sans-serif]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500 group-hover:text-cyan-300 transition-colors">
                <span>Precision Standard</span>
                <span>ISO / OEM Spec</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
