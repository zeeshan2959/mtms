import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";

const SERVICES = [
  {
    title: "Design Release Management",
    desc: "Controlled release milestones (Concept, Alpha, Beta, Pilot, SOP) with complete revision traceability.",
    icon: "REL",
  },
  {
    title: "BOM Configuration Control",
    desc: "Structuring EBOM to MBOM baselines, variant management, and engineering change notifications (ECN).",
    icon: "BOM",
  },
  {
    title: "PLM Workflow Automation",
    desc: "Digital signature routing, access permissions, multi-site CAD synchronizations, and audit-trail governance.",
    icon: "PLM",
  },
  {
    title: "GD&T & Production Drawings",
    desc: "Comprehensive 2D technical drawings compliant with ASME Y14.5 and ISO GPS tolerance standards.",
    icon: "DWG",
  },
  {
    title: "PPAP & Quality Readiness",
    desc: "Level 1–5 PPAP documentation packages, control plans, FMEA risk assessments, and gauge R&R analysis.",
    icon: "QMS",
  },
  {
    title: "DFM & Tooling Verification",
    desc: "Pre-tooling mold flow and press draw reviews preventing costly late-stage tooling rework.",
    icon: "DFM",
  },
];

export default function Slide12_EngineeringServices({ slideIndex }) {
  const slideNum = slideIndex != null ? String(slideIndex + 1).padStart(2, "0") : "15";
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      <Reveal delay={0.05} y={-10}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3 backdrop-blur-md">
          <span>{slideNum}</span>
          <span>/</span>
          <span>Quality &amp; Delivery</span>
        </div>
      </Reveal>

      <AnimatedText
        as="h2"
        text="Engineering Services &amp; Delivery"
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-daminga text-white tracking-tight leading-none mb-3"
      />

      <Reveal delay={0.15} y={16}>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl font-[Poppins,sans-serif] leading-relaxed mb-8">
          End-to-end engineering excellence — from initial concept design to final validation and regulatory compliance. Our integrated approach guarantees precision release governance.
        </p>
      </Reveal>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((srv, idx) => (
          <Reveal key={srv.title} delay={0.15 + idx * 0.06} y={16}>
            <div className="group h-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
                    {srv.icon}
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">SERVICE.0{idx + 1}</span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors font-daminga mb-2">
                  {srv.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed font-[Poppins,sans-serif]">
                  {srv.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500 group-hover:text-cyan-400 transition-colors">
                <span>Standard</span>
                <span>ISO 9001 / IATF 16949</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
