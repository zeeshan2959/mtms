import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WorldMapSection from "../components/ui/WorldMap";
import TextComponent from "../components/ui/TextComponent";
import AnimatedText from "../components/ui/AnimatedText";
import Reveal from "../components/ui/Reveal";
import { playInteractionSound } from "../lib/interactionSound";

const clientLogos = [
  {
    name: "Stellantis",
    src: "/about/clients/stellantis-logo-png_seeklogo-395767.svg",
  },
  { name: "Alstom", src: "/about/clients/alstom-logo-png_-7266.svg" },
  { name: "Mole Urbana", src: "/about/clients/logo-Mole-Urbana.svg" },
  { name: "T.ERRE", src: "/about/clients/t.erre%20logo.svg" },
  { name: "NUOVA", src: "/about/clients/simplastGROUP.svg" },
  { name: "IVECO", src: "/about/clients/Iveco_Logo_2023.svg.svg" },
  // { name: "Deam", text: "Deam" },
  {
    name: "Alfa Romeo",
    src: "/about/clients/alfa_romeo_black-logo_brandlogos.net_f3e8a.svg",
  },
  { name: "Dodge", src: "/about/clients/Dodge_2022_logo.svg.svg" },
  { name: "FIAT", src: "/about/clients/fiat-logo-10.svg" },
  { name: "Jeep", src: "/about/clients/jeep-logo-png.svg" },
  { name: "Maserati", src: "/about/clients/Maserati-Logo%20(1).svg" },
  { name: "Peugeot", src: "/about/clients/Peugeot_2021_Logo.svg" },
];

function ClientsCarousel() {
  const isHoveringLogos = useRef(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    duration: 60,
    loop: true,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;

    const updateCarouselState = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setSnapCount(emblaApi.scrollSnapList().length);
    };

    updateCarouselState();
    emblaApi.on("select", updateCarouselState);
    emblaApi.on("reInit", updateCarouselState);

    return () => {
      emblaApi.off("select", updateCarouselState);
      emblaApi.off("reInit", updateCarouselState);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    if (
      !emblaApi ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const autoplayId = window.setInterval(() => {
      if (document.visibilityState === "visible" && !isHoveringLogos.current) {
        emblaApi.scrollNext();
      }
    }, 5000);

    return () => window.clearInterval(autoplayId);
  }, [emblaApi]);

  return (
    <section
      role="tabpanel"
      aria-label="Our clients"
      className="group relative mb-4 w-full max-w-[1040px] p-5 md:mx-auto md:p-8"
    >
      <div className="relative">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7bd0df]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Trusted partnerships
            </p>
            <h2
              className="text-2xl font-bold leading-tight text-white sm:text-3xl"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Our clients
            </h2>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous client logos"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white/85 transition hover:border-[#70d2e3]/60 hover:bg-[#23768C]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/60"
            >
              <ChevronLeft aria-hidden="true" size={20} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next client logos"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white/85 transition hover:border-[#70d2e3]/60 hover:bg-[#23768C]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/60"
            >
              <ChevronRight aria-hidden="true" size={20} />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden"
          ref={emblaRef}
          onMouseEnter={() => {
            isHoveringLogos.current = true;
          }}
          onMouseLeave={() => {
            isHoveringLogos.current = false;
          }}
        >
          <div className="-ml-3 flex touch-pan-y py-3 sm:-ml-4">
            {clientLogos.map((client) => (
              <div
                key={client.name}
                className="min-w-0 flex-[0_0_50%] pl-3 sm:flex-[0_0_33.333%] sm:pl-4 lg:flex-[0_0_25%]"
              >
                <div className="flex h-28 items-center justify-center rounded-2xl border border-white/35 bg-[linear-gradient(145deg,rgba(255,255,255,0.24),rgba(255,255,255,0.08)_55%,rgba(125,211,252,0.12))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_10px_28px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#70d2e3]/70 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_16px_34px_rgba(0,0,0,0.28)] sm:h-32 sm:p-5">
                  {client.src ? (
                    <img
                      src={client.src}
                      alt={client.name}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-contain ${
                        client.name === "Maserati"
                          ? "scale-150"
                          : client.name === "Stellantis"
                            ? "scale-[2]"
                            : client.name === "Jeep"
                              ? "scale-[2]"
                              : client.name === "Peugeot"
                                ? "scale-125"
                              : ""
                      }`}
                    />
                  ) : (
                    <span
                      aria-label={client.name}
                      className="text-2xl font-bold tracking-[0.12em] text-slate-900 sm:text-3xl"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {client.text}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-5 flex items-center justify-center gap-2"
          aria-label="Carousel pagination"
        >
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to logo group ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : undefined}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/60 ${
                index === selectedIndex
                  ? "w-6 bg-[#7bd0df]"
                  : "w-1.5 bg-white/35 hover:bg-white/65"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const isWeb = useMediaQuery({ minWidth: 1920 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [activeTab, setActiveTab] = useState("Mission");
  const touchStart = useRef(null);
  const tabs = [{ name: "Mission" }, { name: "Location" }, { name: "Clients" }];
  const handleTouchStart = (event) => {
    if (isMobile) {
      touchStart.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    }
  };
  const handleTouchEnd = (event) => {
    if (!isMobile || !touchStart.current) return;
    const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    const currentIndex = tabs.findIndex((tab) => tab.name === activeTab);
    const nextIndex = Math.max(
      0,
      Math.min(tabs.length - 1, currentIndex + (deltaX < 0 ? 1 : -1)),
    );
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
      <div
        className="w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
      >
        <Reveal
          className="mx-auto mb-5 w-full max-w-[520px]"
          y={20}
          blur={0}
          duration={0.7}
        >
          <div
            role="tablist"
            aria-label="About sections"
            className="grid grid-cols-3 gap-1 rounded-2xl border border-white/15 bg-slate-950/30 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl"
          >
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
              <Reveal
                scale={0.96}
                y={24}
                duration={0.9}
                className="relative mx-auto flex min-h-[220px] w-full max-w-[420px] items-center justify-center sm:min-h-[280px]"
              >
                <div className="pointer-events-none absolute inset-[12%] rounded-full bg-cyan-300/15 blur-3xl" />
                <picture className="relative block w-full">
                  <source
                    srcSet="/about/mission-vision.webp"
                    type="image/webp"
                  />
                  <img
                    src="/about/mission-vision.png"
                    alt="Detailed cutaway of a high-tech engineering system with a mission blueprint"
                    width="1400"
                    height="813"
                    fetchPriority="high"
                    decoding="async"
                    className="mx-auto max-h-[320px] w-full object-contain drop-shadow-[0_22px_32px_rgba(0,0,0,0.38)]"
                  />
                </picture>
              </Reveal>
              <div className="relative">
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#7bd0df]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Mission &amp; vision
                </p>
                <h2
                  className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Engineering with purpose
                </h2>
                <p
                  className="text-sm leading-7 text-white/80 sm:text-base sm:leading-8"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  To become a globally trusted engineering partner by delivering
                  innovative, high-quality and cost-effective solutions that
                  help our clients succeed in a competitive global market. We
                  strive to maximise efficiency and value through strong
                  technical expertise, collaborative partnerships and a
                  commitment to consistent engineering excellence.
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
        {activeTab === "Clients" && <ClientsCarousel />}
      </div>
    </>
  );
}
