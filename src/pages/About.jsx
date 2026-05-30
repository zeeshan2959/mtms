import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import WorldMapSection from "../components/ui/WorldMap";
import TextComponent from "../components/ui/TextComponent";

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
        <h1
          className="mb-10 3xl:mb-[88px] text-[32px] md:text-[44px] lg:text-[66px] xl:text-[66px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]"
          style={{ fontSize: isWeb && "65px" }}
        >
          About
        </h1>
      </div>
      <div>
        <TextComponent text="Delivering reliable engneering solutions to clients across regions and time zones through seamless global collaboration. With a presence across multiple locations, we ensure consistent support and connectivity wherever our clients operate." />
      </div>
      <div className="mb-4 flex justify-center flex-wrap mx-auto gap-8">
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.name)}
            key={tab.name}
            className={`px-16 py-2 rounded-lg ${
              tab.name === activeTab
                ? "bg-[rgba(221,221,221,0.20)]"
                : "bg-[rgba(221,221,221,0.10)]"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {activeTab === "Mission" && (
        <div
          className="mb-4 flex justify-center flex-col items-center gap-10 rounded-[15px] max-w-[300px] sm:max-w-[940px] 3xl:max-w-[967px] md:mx-auto px-[15px] sm:px-[30px] 3xl:px-[35px] py-[20px]"
        >
          <img
            src="/mission.png"
            alt="Mission"
          />
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
        <div
          className="mb-4 flex justify-center flex-col items-center gap-10 rounded-[15px] max-w-[300px] sm:max-w-[940px] 3xl:max-w-[967px] md:mx-auto px-[15px] sm:px-[30px] 3xl:px-[35px] py-[20px]"
        >
          <img
            src="/mission.png"
            alt="Mission"
          />
          <TextComponent text="Time Zones across our global operations." />
        </div>
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
