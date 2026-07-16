import React, { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import WorldMapSection from "../components/ui/WorldMap";
import TextComponent from "../components/ui/TextComponent";
import AnimatedText from "../components/ui/AnimatedText";
import Reveal from "../components/ui/Reveal";

const TIMEZONE_COUNTRIES = [
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

export default function About() {
  const isWeb = useMediaQuery({ minWidth: 1920 });
  const [activeTab, setActiveTab] = useState("Mission");
  const tabs = [
    { name: "Mission", current: true },
    { name: "Location", current: false },
    { name: "TimeZones", current: false },
    { name: "Clients", current: false },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedText
          as="h1"
          text="About"
          split="chars"
          stagger={0.05}
          className="mb-10 3xl:mb-[88px] text-[32px] md:text-[44px] lg:text-[66px] xl:text-[66px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]"
          style={{ fontSize: isWeb && "65px" }}
        />
      </div>
      <div>
        <TextComponent text="Delivering reliable engneering solutions to clients across regions and time zones through seamless global collaboration. With a presence across multiple locations, we ensure consistent support and connectivity wherever our clients operate." />
      </div>
      <Reveal className="mb-4 flex justify-center flex-wrap mx-auto gap-8" y={20} blur={0} duration={0.7}>
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.name)}
            key={tab.name}
            className={`px-16 py-2 rounded-lg transition-all duration-300 hover:bg-[rgba(221,221,221,0.28)] hover:-translate-y-0.5 ${
              tab.name === activeTab
                ? "bg-[rgba(221,221,221,0.20)]"
                : "bg-[rgba(221,221,221,0.10)]"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </Reveal>
      {activeTab === "Mission" && (
        <div
          className="mb-4 flex justify-center flex-col items-center gap-10 rounded-[15px] max-w-[300px] sm:max-w-[940px] 3xl:max-w-[967px] md:mx-auto px-[15px] sm:px-[30px] 3xl:px-[35px] py-[20px]"
        >
          <Reveal scale={0.96} y={40} duration={1.1}>
            <img
              src="/about/mission.png"
              alt="Mission"
              className="max-h-[320px] object-contain"
            />
          </Reveal>
          <TextComponent text="To become a golbally trusted engineering partner by delivering innovative, high-quality and cost-effective solutions that help our cliens succeed in a competitive global market. We strive to maximise efficiency and value through strong technical expertise, collaborative partnerships and a commitment to consistent engineering excellence." />
        </div>
      )}
      {activeTab === "Location" && (
        <>
          <WorldMapSection />
          <TextComponent text="Our clients are bases across North America, South America, Asia-Pecific and EMEA, reflecting our global approach to engineering collaboration. We support orgranizations operating in diverse and demanding industries, working closely with Tier-1 suppliers and OEMs." />
        </>
      )}
      {activeTab === "TimeZones" && (
        <TimeZonesSection />
      )}
      {activeTab === "Clients" && (
        <>
          <WorldMapSection />
          <TextComponent text="Our clients are bases across North America, South America, Asia-Pecific and EMEA, reflecting our global approach to engineering collaboration. We support orgranizations operating in diverse and demanding industries, working closely with Tier-1 suppliers and OEMs." />
        </>
      )}
    </>
  );
}

function TimeZonesSection() {
  const [selectedCountry, setSelectedCountry] = useState("Italy");
  const [selectedZoneByCountry, setSelectedZoneByCountry] = useState({});
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const country = useMemo(
    () => TIMEZONE_COUNTRIES.find((item) => item.name === selectedCountry) ?? TIMEZONE_COUNTRIES[0],
    [selectedCountry]
  );
  const activeZoneName = selectedZoneByCountry[country.name] ?? country.zones[0].name;
  const zone = country.zones.find((item) => item.name === activeZoneName) ?? country.zones[0];
  const time = formatTimeParts(now, zone.timeZone);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: zone.timeZone,
    month: "short",
    day: "numeric",
  }).format(now);

  const selectZone = (zoneName) => {
    setSelectedZoneByCountry((current) => ({
      ...current,
      [country.name]: zoneName,
    }));
  };

  return (
    <Reveal y={30} duration={0.9}>
      <div className="mx-auto flex w-[92vw] max-w-[920px] flex-col items-center">
        <div className="mb-7 flex w-full flex-col gap-5 rounded-[15px] border border-white/20 bg-[rgba(221,221,221,0.14)] px-4 py-3 text-white shadow-[inset_0_0_28px_rgba(255,255,255,0.08)] md:flex-row md:items-center md:gap-6 md:px-7 md:py-4">
          <div className="flex min-h-[215px] w-full flex-col rounded-[12px] border border-white/20 bg-[rgba(20,20,20,0.10)] px-5 py-4 shadow-[inset_0_0_28px_rgba(255,255,255,0.08)] md:w-[max-content] md:flex-none md:flex-row md:gap-7">
            <div className="flex min-w-0 flex-1 flex-col pr-20">
              <p className="mb-2 text-[12px] font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                {country.name === "Italy" ? "Your local time" : country.name}
              </p>
              <div className="flex items-end gap-2 leading-none" style={{ fontFamily: "Poppins, sans-serif" }}>
                <span className="text-[48px] font-semibold md:text-[66px]">{time.hour}:{time.minute}</span>
                <span className="pb-2 text-[24px] font-semibold text-white/35 md:text-[31px]">:{time.second}</span>
              </div>
              <p className="mt-2 text-[9px] font-semibold text-white/85" style={{ fontFamily: "Poppins, sans-serif" }}>
                {zone.offset} - detected from browser
              </p>
              <div className="my-4 h-px w-full bg-white/15" />
              <div className="grid grid-cols-3 gap-4 text-[8px] font-semibold uppercase text-white/80" style={{ fontFamily: "Poppins, sans-serif" }}>
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
              <p className="mt-auto pt-4 text-[9px] text-white/85" style={{ fontFamily: "Poppins, sans-serif" }}>
                Click on each country to see its local time right now
              </p>
            </div>

            {country.zones.length > 1 && (
              <div className="mt-5 flex flex-row flex-wrap justify-center gap-3 md:mt-0 md:w-[145px] md:flex-col">
                {country.zones.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => selectZone(item.name)}
                    className={`rounded-[8px] border border-white/20 px-5 py-1.5 text-[14px] font-semibold transition md:text-[17px] ${
                      zone.name === item.name
                        ? "bg-[rgba(221,221,221,0.35)]"
                        : "bg-[rgba(221,221,221,0.08)] hover:bg-[rgba(221,221,221,0.22)]"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-row flex-wrap justify-center gap-3 ml-auto md:w-[26%] md:flex-col">
            {TIMEZONE_COUNTRIES.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelectedCountry(item.name)}
                className={`w-[150px] rounded-[8px] border border-white/20 px-4 py-1.5 text-[15px] font-semibold transition md:w-full md:text-[17px] ${
                  country.name === item.name
                    ? "bg-[rgba(221,221,221,0.35)]"
                    : "bg-[rgba(221,221,221,0.08)] hover:bg-[rgba(221,221,221,0.22)]"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full rounded-[8px] border border-white/20 bg-[rgba(221,221,221,0.18)] px-6 py-6 text-center shadow-[inset_0_0_26px_rgba(255,255,255,0.08)]">
          <p className="mx-auto max-w-[760px] text-[15px] font-medium leading-relaxed text-white md:text-[17px]" style={{ fontFamily: "Poppins, sans-serif" }}>
            We are highly flexible in working across working hours and global time zones to meet out clients&apos; requirements and ensure seamless collaboration. Our teams adapt to client schedules and operational needs to deliver consistent and reliable support.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
