import { useEffect, useMemo, useState } from "react";

export const TIMEZONE_COUNTRIES = [
  {
    name: "Italy",
    zones: [{ name: "Italy", timeZone: "Europe/Rome", offset: "UTC+01:00" }],
  },
  {
    name: "Germany",
    zones: [{ name: "Germany", timeZone: "Europe/Berlin", offset: "UTC+01:00" }],
  },
  {
    name: "United States",
    zones: [
      { name: "Eastern", timeZone: "America/New_York", offset: "UTC-05:00" },
      { name: "Central", timeZone: "America/Chicago", offset: "UTC-06:00" },
      { name: "Mountain", timeZone: "America/Denver", offset: "UTC-07:00" },
      { name: "West Coast", timeZone: "America/Los_Angeles", offset: "UTC-08:00" },
    ],
  },
  {
    name: "Malaysia",
    zones: [{ name: "Malaysia", timeZone: "Asia/Kuala_Lumpur", offset: "UTC+08:00" }],
  },
  {
    name: "Pakistan",
    zones: [{ name: "Pakistan", timeZone: "Asia/Karachi", offset: "UTC+05:00" }],
  },
  {
    name: "Brazil",
    zones: [
      { name: "Fernando", timeZone: "America/Noronha", offset: "UTC-02:00" },
      { name: "Brasilia", timeZone: "America/Sao_Paulo", offset: "UTC-03:00" },
      { name: "Amazon", timeZone: "America/Manaus", offset: "UTC-04:00" },
      { name: "Acre", timeZone: "America/Rio_Branco", offset: "UTC-05:00" },
    ],
  },
];

export const TIMEZONE_COUNTRY_CODES = {
  IT: "Italy",
  DE: "Germany",
  US: "United States",
  MY: "Malaysia",
  PK: "Pakistan",
  BR: "Brazil",
};

function formatTimeParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  return {
    hour: parts.find((part) => part.type === "hour")?.value ?? "00",
    minute: parts.find((part) => part.type === "minute")?.value ?? "00",
    second: parts.find((part) => part.type === "second")?.value ?? "00",
  };
}

export default function TimezoneCard({
  countryName,
  selectedZoneName,
  onZoneChange,
  showFooter = true,
  footerText,
  compact = false,
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const country = useMemo(
    () => TIMEZONE_COUNTRIES.find((item) => item.name === countryName) ?? TIMEZONE_COUNTRIES[0],
    [countryName]
  );

  const activeZoneName = selectedZoneName ?? country.zones[0].name;
  const zone = country.zones.find((item) => item.name === activeZoneName) ?? country.zones[0];
  const time = formatTimeParts(now, zone.timeZone);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: zone.timeZone,
    month: "short",
    day: "numeric",
  }).format(now);

  const resolvedFooterText =
    footerText ??
    (compact
      ? "Hover on each country to see its local time right now"
      : "Click on each country to see its local time right now");

  return (
    <div
      className={`group relative isolate flex min-h-[215px] w-full flex-col overflow-hidden rounded-[22px] border border-white/25 bg-[radial-gradient(ellipse_at_100%_0%,rgba(85,182,200,0.18),transparent_44%),linear-gradient(140deg,rgba(255,255,255,0.16),rgba(11,24,40,0.55)_54%,rgba(23,66,82,0.4))] px-5 py-4 text-white shadow-[0_22px_60px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl md:w-[max-content] md:flex-none md:flex-row md:gap-7 ${
        compact ? "max-w-[min(92vw,520px)]" : ""
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#55B6C8]/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <div className={`relative z-10 flex min-w-0 flex-1 flex-col ${country.zones.length > 1 ? "pr-4 md:pr-20" : ""}`}>
        <p className="mb-2 text-[12px] font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
          {country.name === "Italy" && !compact ? "Your local time" : country.name}
        </p>
        <div className="flex items-end gap-2 leading-none" style={{ fontFamily: "Poppins, sans-serif" }}>
          <span className={`font-semibold ${compact ? "text-[40px] md:text-[52px]" : "text-[48px] md:text-[66px]"}`}>
            {time.hour}:{time.minute}
          </span>
          <span
            className={`pb-2 font-semibold text-white/35 ${compact ? "text-[20px] md:text-[26px]" : "text-[24px] md:text-[31px]"}`}
          >
            :{time.second}
          </span>
        </div>
        <p className="mt-2 text-[9px] font-semibold text-white/85" style={{ fontFamily: "Poppins, sans-serif" }}>
          {zone.offset} - detected from browser
        </p>
        <div className="my-4 h-px w-full bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
        <div
          className="grid grid-cols-3 gap-4 text-[8px] font-semibold uppercase text-white/80"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <div>
            <p className="mb-1 text-white/60">Time Zone</p>
            <p className="normal-case">{zone.timeZone.replace("_", " ")}</p>
          </div>
          <div>
            <p className="mb-1 text-white/60">UTC Offset</p>
            <p>{zone.offset}</p>
          </div>
          <div>
            <p className="mb-1 text-white/60">Date</p>
            <p className="normal-case">{dateLabel}</p>
          </div>
        </div>
        {showFooter && (
          <p className="mt-auto pt-4 text-[9px] text-white/85" style={{ fontFamily: "Poppins, sans-serif" }}>
            {resolvedFooterText}
          </p>
        )}
      </div>

      {country.zones.length > 1 && (
        <div className="relative z-10 mt-5 flex flex-row flex-wrap justify-center gap-3 md:mt-0 md:w-[145px] md:flex-col">
          {country.zones.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => onZoneChange?.(item.name)}
              className={`rounded-[12px] border px-5 py-1.5 text-[14px] font-semibold shadow-[0_8px_22px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl transition duration-300 md:text-[17px] ${
                zone.name === item.name
                  ? "border-[#70d2e3]/65 bg-[linear-gradient(145deg,rgba(85,182,200,0.42),rgba(17,66,85,0.72))] text-white shadow-[0_0_20px_rgba(85,182,200,0.16),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  : "border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(9,20,35,0.32))] hover:-translate-y-0.5 hover:border-[#70d2e3]/45 hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.17),rgba(9,32,49,0.5))]"
              }`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
