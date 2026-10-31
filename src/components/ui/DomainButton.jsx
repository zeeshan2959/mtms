import { ArrowUpRight } from "lucide-react";

export default function DomainButton({
  title,
  buttonText = "Learn more",
  handleDomainClick,
  onLearnMore,
  isActive = false,
  className = "",
}) {
  const handleClick = onLearnMore ?? handleDomainClick;

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={handleClick}
      className={`group relative flex h-[140px] w-[240px] flex-col justify-between overflow-hidden rounded-[24px] border p-5 text-left text-white shadow-[0_12px_35px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#70d2e3]/70 hover:shadow-[0_18px_42px_rgba(0,0,0,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111e] xl:h-[190px] xl:w-[260px] 2xl:h-[205px] 2xl:w-[280px] ${
        isActive
          ? "border-[#70d2e3]/65 bg-[linear-gradient(145deg,rgba(35,118,140,0.95),rgba(17,66,85,0.94))]"
          : "border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(9,20,35,0.72))] backdrop-blur-xl hover:bg-[linear-gradient(145deg,rgba(35,118,140,0.68),rgba(9,32,49,0.92))]"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500 ${
          isActive ? "bg-[#8ce9f2]/25 opacity-100" : "bg-[#55b6c8]/20 opacity-0 group-hover:opacity-100"
        }`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />

      <span className="relative flex w-full items-start justify-between gap-3">
        <span className="max-w-[190px] text-lg font-semibold leading-snug tracking-[-0.02em] sm:text-xl 2xl:text-[22px]" style={{ fontFamily: "Poppins, sans-serif" }}>
          {title}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          size={19}
          className={`mt-0.5 shrink-0 text-white/65 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white ${
            isActive ? "text-white" : ""
          }`}
        />
      </span>

      <span className="relative inline-flex items-center gap-2 text-[12px] font-medium tracking-wide text-white/70 transition-colors duration-300 group-hover:text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
        <span>{buttonText}</span>
        <span aria-hidden="true" className={`h-px w-5 transition-all duration-300 group-hover:w-9 ${isActive ? "bg-white/80" : "bg-[#70d2e3]/75"}`} />
      </span>
    </button>
  );
}
