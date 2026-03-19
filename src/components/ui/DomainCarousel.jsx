import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DomainButton from "./DomainButton";

export default function DomainCarousel({ domains, handleDomainClick }) {
  const scrollRef = useRef();

  const scroll = (dir) => {
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative lg:hidden max-w-[240px] sm:max-w-[480px] md:max-w-[650px] ml-20 lg:ml-0 mt-4">
      
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 p-2 rounded-full"
      >
        <ChevronLeft />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {domains.map((domain) => (
          <div
            key={domain.title}
            className="snap-start min-w-[240px] flex-shrink-0"
          >
            <DomainButton
              title={domain.title}
              buttonText={domain.buttonText}
              handleDomainClick={() =>
                handleDomainClick(domain.title)
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 p-2 rounded-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
}