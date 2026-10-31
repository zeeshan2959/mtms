import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "react-responsive";

// amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import TimezoneCard, { TIMEZONE_COUNTRY_CODES } from "./TimezoneCard";

const SUPPORTED_CODES = new Set(Object.keys(TIMEZONE_COUNTRY_CODES));

export default function WorldMapWithList({ showTimezoneTooltip = false }) {
  const chartRef = useRef(null);
  const polygonSeriesRef = useRef(null);
  const hideTooltipTimerRef = useRef(null);
  const tooltipHoveredRef = useRef(false);
  const showTimezoneTooltipRef = useRef(showTimezoneTooltip);
  const [selectedCountry, setSelectedCountry] = useState("IT");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipHovered, setTooltipHovered] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [selectedZoneByCountry, setSelectedZoneByCountry] = useState({});
  const isMobile = useMediaQuery({ maxWidth: 768 });

  showTimezoneTooltipRef.current = showTimezoneTooltip;
  tooltipHoveredRef.current = tooltipHovered;

  const countryList = [
    { code: "IT", name: "Italy" },
    { code: "DE", name: "Germany" },
    { code: "US", name: "United States" },
    { code: "MY", name: "Malaysia" },
    { code: "PK", name: "Pakistan" },
    { code: "BR", name: "Brazil" },
  ];

  const clearHideTooltipTimer = useCallback(() => {
    if (hideTooltipTimerRef.current) {
      window.clearTimeout(hideTooltipTimerRef.current);
      hideTooltipTimerRef.current = null;
    }
  }, []);

  const scheduleHideTooltip = useCallback(() => {
    clearHideTooltipTimer();
    hideTooltipTimerRef.current = window.setTimeout(() => {
      setHoveredCountry(null);
      setTooltipOpen(false);
    }, 120);
  }, [clearHideTooltipTimer]);

  const showCountryTooltip = useCallback(
    (code) => {
      if (!showTimezoneTooltipRef.current || !SUPPORTED_CODES.has(code)) return;
      clearHideTooltipTimer();
      setHoveredCountry(code);
      setTooltipOpen(true);
    },
    [clearHideTooltipTimer]
  );

  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);

    root._logo?.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        wheelX: "none",
        wheelY: "none",
        pinchZoom: false,
        projection: am5map.geoNaturalEarth1(),
      })
    );

    chart.chartContainer.set("interactive", false);

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeriesRef.current = polygonSeries;

    polygonSeries.mapPolygons.template.setAll({
      interactive: true,
      fill: am5.color(0xdddddd),
      fillOpacity: 0.88,
      stroke: am5.color(0x45e7ef),
      strokeOpacity: 0.12,
      cursorOverStyle: "pointer",
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x45e7ef),
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: am5.color(0x45e7ef),
      fillOpacity: 1,
    });

    polygonSeries.mapPolygons.template.events.on("pointerover", (ev) => {
      const id = ev.target.dataItem.get("id");
      showCountryTooltip(id);
    });

    polygonSeries.mapPolygons.template.events.on("pointerout", () => {
      if (!tooltipHoveredRef.current) {
        scheduleHideTooltip();
      }
    });

    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const id = ev.target.dataItem.get("id");

      setSelectedCountry(id);
      showCountryTooltip(id);

      polygonSeries.mapPolygons.each((polygon) => {
        const polygonCode = polygon.dataItem?.get("id");
        polygon.set("active", SUPPORTED_CODES.has(polygonCode) || polygonCode === id);
      });
    });

    polygonSeries.events.on("datavalidated", () => {
      polygonSeries.mapPolygons.each((polygon) => {
        const polygonCode = polygon.dataItem?.get("id");
        polygon.set("active", SUPPORTED_CODES.has(polygonCode));
      });
    });

    return () => {
      clearHideTooltipTimer();
      root.dispose();
    };
  }, [showCountryTooltip, scheduleHideTooltip, clearHideTooltipTimer]);

  const handleSelectCountry = (code) => {
    const polygonSeries = polygonSeriesRef.current;

    if (!polygonSeries) return;

    const dataItem = polygonSeries.getDataItemById(code);

    if (dataItem) {
      polygonSeries.mapPolygons.each((polygon) => {
        const polygonCode = polygon.dataItem?.get("id");
        polygon.set("active", SUPPORTED_CODES.has(polygonCode) || polygonCode === code);
      });

      dataItem.get("mapPolygon").set("active", true);
      setSelectedCountry(code);
      showCountryTooltip(code);
    }
  };

  const selectedCountryIndex = countryList.findIndex((item) => item.code === selectedCountry);

  const moveCountry = (direction) => {
    const nextIndex = Math.min(
      Math.max(selectedCountryIndex + direction, 0),
      countryList.length - 1
    );
    handleSelectCountry(countryList[nextIndex].code);
  };

  const displayedCountryCode = isMobile ? selectedCountry : hoveredCountry;
  const displayedCountryName = displayedCountryCode
    ? TIMEZONE_COUNTRY_CODES[displayedCountryCode]
    : null;
  const showTooltip = showTimezoneTooltip && tooltipOpen && displayedCountryName;

  const selectZone = (zoneName) => {
    if (!displayedCountryName) return;
    setSelectedZoneByCountry((current) => ({
      ...current,
      [displayedCountryName]: zoneName,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row h-[420px] md:h-[300px] lg:h-[360px] 3xl:h-[430px] text-white ml-auto md:gap-6 max-w-[980px] mx-auto px-4">
      <div
        className="relative w-full ml-auto h-[360px] md:h-full"
        onMouseLeave={() => {
          setTooltipHovered(false);
          scheduleHideTooltip();
        }}
      >
        <div ref={chartRef} className="h-full w-full" />

        {showTooltip && (
          <div
            className="pointer-events-auto absolute left-1/2 top-1/2 z-20 max-w-[calc(100%-24px)] -translate-x-1/2 -translate-y-1/2"
            onMouseEnter={() => {
              clearHideTooltipTimer();
              setTooltipHovered(true);
            }}
            onMouseLeave={() => {
              setTooltipHovered(false);
              scheduleHideTooltip();
            }}
          >
            <TimezoneCard
              countryName={displayedCountryName}
              selectedZoneName={selectedZoneByCountry[displayedCountryName]}
              onZoneChange={selectZone}
              compact
            />
          </div>
        )}
      </div>

      <div className="w-full min-w-0 md:w-[220px] flex flex-row md:flex-col justify-center items-center gap-3 mt-4 md:mt-0">
        {isMobile ? (
          <div className="flex w-full min-w-0 items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Previous country"
              disabled={selectedCountryIndex === 0}
              onClick={() => moveCountry(-1)}
              className="rounded-full border border-white/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(9,20,35,0.42))] p-1.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl transition hover:border-[#70d2e3]/50 disabled:opacity-30"
            >
              <ChevronLeft size={17} />
            </button>
            <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 py-1 snap-x snap-mandatory no-scrollbar">
              {countryList.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  onClick={() => handleSelectCountry(item.code)}
                  className={`w-[92px] flex-none snap-center rounded-[10px] border px-2 py-1 font-poppins text-[10px] text-white shadow-[0_8px_20px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition ${
                    selectedCountry === item.code
                      ? "border-[#70d2e3]/60 bg-[linear-gradient(145deg,rgba(85,182,200,0.42),rgba(17,66,85,0.68))] font-semibold"
                      : "border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(9,20,35,0.34))]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next country"
              disabled={selectedCountryIndex === countryList.length - 1}
              onClick={() => moveCountry(1)}
              className="rounded-full border border-white/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(9,20,35,0.42))] p-1.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl transition hover:border-[#70d2e3]/50 disabled:opacity-30"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        ) : countryList.map((item) => (
          <button
            key={item.code}
            style={{ fontFamily: "Poppins, sans-serif" }}
            onClick={() => handleSelectCountry(item.code)}
            onMouseEnter={() => showCountryTooltip(item.code)}
            onMouseLeave={() => {
              if (!tooltipHovered) {
                scheduleHideTooltip();
              }
            }}
            className={`w-[150px] flex-none snap-center md:w-[190px] rounded-[12px] border px-4 py-1.5 font-poppins transition duration-300 text-[13px] md:text-[15px] xl:text-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl hover:-translate-y-0.5 ${
              selectedCountry === item.code
                ? "border-[#70d2e3]/60 bg-[linear-gradient(145deg,rgba(85,182,200,0.42),rgba(17,66,85,0.68))] text-white font-semibold shadow-[0_0_20px_rgba(85,182,200,0.14),inset_0_1px_0_rgba(255,255,255,0.2)]"
                : "border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(9,20,35,0.34))] text-white hover:border-[#70d2e3]/45 hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(9,32,49,0.5))]"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
