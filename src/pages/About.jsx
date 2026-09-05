import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import WorldMapSection from "../components/ui/WorldMap";
import TextComponent from "../components/ui/TextComponent";
import AnimatedText from "../components/ui/AnimatedText";
import Reveal from "../components/ui/Reveal";

export default function About() {
  const isWeb = useMediaQuery({ minWidth: 1920 });
  const [activeTab, setActiveTab] = useState("Mission");
  const tabs = [
    { name: "Mission", current: true },
    { name: "Location", current: false },
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
      <Reveal className="mb-4 grid w-full max-w-[940px] grid-cols-2 justify-center gap-2 mx-auto sm:flex sm:flex-wrap sm:gap-8" y={20} blur={0} duration={0.7}>
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.name)}
            key={tab.name}
            className={`w-full px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:bg-[rgba(221,221,221,0.28)] hover:-translate-y-0.5 sm:w-auto sm:px-16 sm:text-base ${
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
          className="mb-4 flex w-full max-w-[940px] justify-center flex-col items-center gap-6 rounded-[15px] md:mx-auto px-3 sm:gap-10 sm:px-[30px] 3xl:max-w-[967px] 3xl:px-[35px] py-4 sm:py-[20px]"
        >
          <Reveal scale={0.96} y={40} duration={1.1}>
            <img
              src="/about/mission.png"
              alt="Mission"
              className="h-auto max-h-[320px] w-full max-w-[520px] object-contain"
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
    </>
  );
}
