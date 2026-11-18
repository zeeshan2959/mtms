import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";

const TEAMS = [
  {
    name: "CAD Design & Class-A Surfacing",
    tools: "CATIA V5 • Siemens NX • Creo • SolidWorks",
    desc: "Parametric 3D solid modeling, surfacing, drafting, tolerance stacks, and 2D manufacturing prints.",
    tag: "Design",
  },
  {
    name: "DMU & Digital Mock-Up Validation",
    tools: "CATIA DMU • Teamcenter Visualization • Navisworks",
    desc: "Vehicle-level spatial packaging, static and dynamic clash detection, and ergonomic reach analysis.",
    tag: "Validation",
  },
  {
    name: "PLM & Release Governance",
    tools: "Siemens Teamcenter • Dassault ENOVIA • CODEP • EBOM",
    desc: "Multi-CAD lifecycle management, BOM baseline configurations, change requests (ECR/ECO), and audit readiness.",
    tag: "PLM",
  },
  {
    name: "CAE, Structural & Thermal Simulation",
    tools: "ANSYS • HyperMesh • Delmia • Autodesk Inventor",
    desc: "Stress concentrations, deformation under crash scenarios, vibrational modes, and thermal heat dissipation.",
    tag: "Simulation",
  },
  {
    name: "Tooling & Manufacturing Feasibility",
    tools: "AutoForm • Moldflow • PAM-STAMP",
    desc: "Stamping feasibility, split lines, injection mold draw angles, welding robot clearances, and PPAP approval.",
    tag: "Tooling",
  },
  {
    name: "OEM Technical Alignment & Coordination",
    tools: "Secure OEM Portals • ISO 9001 / IATF 16949",
    desc: "Direct engineering collaboration bridging OEM engineering leads, Tier-1 suppliers, and manufacturing plants.",
    tag: "Governance",
  },
];

export default function Slide11_RDTeams({ slideIndex }) {
  const slideNum = slideIndex != null ? String(slideIndex + 1).padStart(2, "0") : "14";
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      <Reveal delay={0.05} y={-10}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3 backdrop-blur-md">
          <span>{slideNum}</span>
          <span>/</span>
          <span>Engineering Muscle</span>
        </div>
      </Reveal>

      <AnimatedText
        as="h2"
        text="R&amp;D Teams &amp; Toolsets"
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-daminga text-white tracking-tight leading-none mb-3"
      />

      <Reveal delay={0.15} y={16}>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl font-[Poppins,sans-serif] leading-relaxed mb-8">
          Specialized engineering divisions equipped with industry-standard CAD, CAE, and PLM software ecosystems to ensure seamless digital continuity.
        </p>
      </Reveal>

      {/* Grid of R&D Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEAMS.map((team, idx) => (
          <Reveal key={team.name} delay={0.15 + idx * 0.06} y={16}>
            <div className="group h-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                    {team.tag}
                  </span>
                  <span className="text-xs font-mono text-gray-500">TEAM.0{idx + 1}</span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors font-daminga mb-1.5">
                  {team.name}
                </h3>

                <div className="text-xs text-cyan-400 font-mono font-medium mb-2.5">
                  {team.tools}
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-[Poppins,sans-serif]">
                  {team.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500 group-hover:text-cyan-400 transition-colors">
                <span>Continuity Status</span>
                <span>Active Engagement</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
