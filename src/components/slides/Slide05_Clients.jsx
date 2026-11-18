import AnimatedText from "../ui/AnimatedText";
import Reveal from "../ui/Reveal";

const CLIENTS = [
  { name: "Stellantis", src: "/about/clients/stellantis-logo-png_seeklogo-395767.svg" },
  { name: "Alstom", src: "/about/clients/alstom-logo-png_-7266.svg" },
  { name: "Maserati", src: "/about/clients/Maserati-Logo%20(1).svg" },
  { name: "Alfa Romeo", src: "/about/clients/alfa_romeo_black-logo_brandlogos.net_f3e8a.svg" },
  { name: "Peugeot", src: "/about/clients/Peugeot_2021_Logo.svg" },
  { name: "IVECO", src: "/about/clients/Iveco_Logo_2023.svg.svg" },
  { name: "FIAT", src: "/about/clients/fiat-logo-10.svg" },
  { name: "Jeep", src: "/about/clients/jeep-logo-png.svg" },
  { name: "Dodge", src: "/about/clients/Dodge_2022_logo.svg.svg" },
  { name: "Mole Urbana", src: "/about/clients/logo-Mole-Urbana.svg" },
  { name: "T.ERRE", src: "/about/clients/t.erre%20logo.svg" },
  { name: "Simplast Group", src: "/about/clients/simplastGROUP.svg" },
];

export default function Slide05_Clients({ slideIndex }) {
  const slideNum = slideIndex != null ? String(slideIndex + 1).padStart(2, "0") : "08";
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      <Reveal delay={0.05} y={-10}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3 backdrop-blur-md">
          <span>{slideNum}</span>
          <span>/</span>
          <span>Trusted Partnerships</span>
        </div>
      </Reveal>

      <AnimatedText
        as="h2"
        text="Our Clients &amp; Partners"
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-daminga text-white tracking-tight leading-none mb-3"
      />

      <Reveal delay={0.15} y={16}>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl font-[Poppins,sans-serif] leading-relaxed mb-8">
          Trusted by world-leading OEMs and Tier-1 engineering suppliers to solve demanding design, packaging, and validation challenges.
        </p>
      </Reveal>

      {/* Grid of Client Logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {CLIENTS.map((client, idx) => (
          <Reveal key={client.name} delay={0.1 + idx * 0.04} y={16}>
            <div className="group h-24 sm:h-28 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center p-4 backdrop-blur-md shadow-lg shadow-black/20 hover:scale-[1.03]">
              <img
                src={client.src}
                alt={client.name}
                className="max-h-12 max-w-[85%] object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
              />
            </div>
          </Reveal>
        ))}
      </div>

      {/* Footnote callout */}
      <Reveal delay={0.6} y={16}>
        <div className="mt-8 text-center text-xs text-gray-400 font-mono">
          <span>Confidentiality guaranteed through strict OEM protocols &amp; ISO-compliant data governance.</span>
        </div>
      </Reveal>
    </div>
  );
}
