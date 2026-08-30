import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import WorldMapSection from "../components/ui/WorldMap";
import TextComponent from "../components/ui/TextComponent";
import AnimatedText from "../components/ui/AnimatedText";
import Reveal from "../components/ui/Reveal";
import TimezoneCard, { TIMEZONE_COUNTRIES } from "../components/ui/TimezoneCard";

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
          <WorldMapSection showTimezoneTooltip />
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

  const selectZone = (zoneName) => {
    setSelectedZoneByCountry((current) => ({
      ...current,
      [selectedCountry]: zoneName,
    }));
  };

  return (
    <Reveal y={30} duration={0.9}>
      <div className="mx-auto flex w-[92vw] max-w-[920px] flex-col items-center">
        <div className="mb-7 flex w-full flex-col gap-5 rounded-[15px] border border-white/20 bg-[rgba(221,221,221,0.14)] px-4 py-3 text-white shadow-[inset_0_0_28px_rgba(255,255,255,0.08)] md:flex-row md:items-center md:gap-6 md:px-7 md:py-4">
          <TimezoneCard
            countryName={selectedCountry}
            selectedZoneName={selectedZoneByCountry[selectedCountry]}
            onZoneChange={selectZone}
          />

          <div className="flex flex-row flex-wrap justify-center gap-3 ml-auto md:w-[26%] md:flex-col">
            {TIMEZONE_COUNTRIES.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelectedCountry(item.name)}
                className={`w-[150px] rounded-[8px] border border-white/20 px-4 py-1.5 text-[15px] font-semibold transition md:w-full md:text-[17px] ${
                  selectedCountry === item.name
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
