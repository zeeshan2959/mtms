import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import WorldMapSection from "../components/ui/WorldMap";
import TextComponent from "../components/ui/TextComponent";
import AnimatedText from "../components/ui/AnimatedText";
import Reveal from "../components/ui/Reveal";
import { playInteractionSound } from "../lib/interactionSound";

export default function About() {
  const isWeb = useMediaQuery({ minWidth: 1920 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [activeTab, setActiveTab] = useState("Mission");
  const touchStart = useRef(null);
  const tabs = [
    { name: "Mission" },
    { name: "Location" },
    { name: "Clients" },
  ];
  const handleTouchStart = (event) => {
    if (isMobile) {
      touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
  };
  const handleTouchEnd = (event) => {
    if (!isMobile || !touchStart.current) return;
    const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    const currentIndex = tabs.findIndex((tab) => tab.name === activeTab);
    const nextIndex = Math.max(0, Math.min(tabs.length - 1, currentIndex + (deltaX < 0 ? 1 : -1)));
    if (nextIndex !== currentIndex) playInteractionSound();
    setActiveTab(tabs[nextIndex].name);
  };

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
      <div className="w-full" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStart.current = null; }}>
      <Reveal
        className="mx-auto mb-5 w-full max-w-[520px]"
        y={20}
        blur={0}
        duration={0.7}
      >
        <div role="tablist" aria-label="About sections" className="grid grid-cols-3 gap-1 rounded-2xl border border-white/15 bg-slate-950/30 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl">
          {tabs.map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={tab.name === activeTab}
              onClick={() => setActiveTab(tab.name)}
              key={tab.name}
              className={`w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:text-base ${
                tab.name === activeTab
                  ? "border border-white/20 bg-[linear-gradient(135deg,rgba(108,210,225,0.28),rgba(255,255,255,0.12))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_14px_rgba(0,0,0,0.18)]"
                  : "border border-transparent text-white/65 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </Reveal>
      {activeTab === "Mission" && (
        <div
          role="tabpanel"
          aria-label="Mission and vision"
          className="group relative mb-4 w-full max-w-[1040px] overflow-hidden rounded-[24px] border border-white/20 bg-[linear-gradient(125deg,rgba(255,255,255,0.12),rgba(8,18,32,0.56)_48%,rgba(33,147,163,0.16))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:border-[#70d2e3]/35 md:mx-auto md:p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full bg-cyan-300/10 blur-[90px] transition-opacity duration-500 group-hover:opacity-80" />
          <div className="pointer-events-none absolute -bottom-36 left-0 h-72 w-72 rounded-full bg-sky-500/[0.08] blur-[90px]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="relative grid items-center gap-5 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
            <Reveal scale={0.96} y={24} duration={0.9} className="relative mx-auto flex min-h-[220px] w-full max-w-[340px] items-center justify-center sm:min-h-[280px]">
              <div className="pointer-events-none absolute inset-[12%] rounded-full bg-cyan-300/15 blur-3xl" />
              <picture className="relative block w-full">
                <source srcSet="/about/mission.webp" type="image/webp" />
                <img
                  src="/about/mission.png"
                  alt="Engineering team working with precision machinery"
                  width="277"
                  height="372"
                  fetchPriority="high"
                  decoding="async"
                  className="mx-auto max-h-[280px] w-full object-contain drop-shadow-[0_22px_32px_rgba(0,0,0,0.38)] sm:max-h-[320px]"
                />
              </picture>
            </Reveal>
            <div className="relative">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#7bd0df]" style={{ fontFamily: "Poppins, sans-serif" }}>
                Mission &amp; vision
              </p>
              <h2 className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                Engineering with purpose
              </h2>
              <p className="text-sm leading-7 text-white/80 sm:text-base sm:leading-8" style={{ fontFamily: "Poppins, sans-serif" }}>
                To become a globally trusted engineering partner by delivering innovative, high-quality and cost-effective solutions that help our clients succeed in a competitive global market. We strive to maximise efficiency and value through strong technical expertise, collaborative partnerships and a commitment to consistent engineering excellence.
              </p>
              <div className="mt-6 h-px w-20 bg-gradient-to-r from-[#55B6C8] to-transparent" />
            </div>
          </div>
        </div>
      )}
      {activeTab === "Location" && (
        <>
          <WorldMapSection showTimezoneTooltip />
          <TextComponent text="Our clients are bases across North America, South America, Asia-Pecific and EMEA, reflecting our global approach to engineering collaboration. We support orgranizations operating in diverse and demanding industries, working closely with Tier-1 suppliers and OEMs." />
        </>
      )}
      {activeTab === "Clients" && (
        <div className="text-center ">
          Comming soon...
        </div>
      )}
      </div>
    </>
  );
}
