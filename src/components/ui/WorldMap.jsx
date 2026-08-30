import React, { useLayoutEffect, useRef, useState, useCallback } from "react";

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
  const [selectedZoneByCountry, setSelectedZoneByCountry] = useState({});

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
    }, 120);
  }, [clearHideTooltipTimer]);

  const showCountryTooltip = useCallback(
    (code) => {
      if (!showTimezoneTooltipRef.current || !SUPPORTED_CODES.has(code)) return;
      clearHideTooltipTimer();
      setHoveredCountry(code);
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

      polygonSeries.mapPolygons.each((polygon) => {
        polygon.set("active", false);
      });

      ev.target.set("active", true);
    });

    polygonSeries.events.on("datavalidated", () => {
      const dataItem = polygonSeries.getDataItemById("IT");
      dataItem?.get("mapPolygon")?.set("active", true);
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
        polygon.set("active", false);
      });

      dataItem.get("mapPolygon").set("active", true);
      setSelectedCountry(code);
    }
  };

  const hoveredCountryName = hoveredCountry ? TIMEZONE_COUNTRY_CODES[hoveredCountry] : null;
  const showTooltip = showTimezoneTooltip && hoveredCountryName;

  const selectZone = (zoneName) => {
    if (!hoveredCountryName) return;
    setSelectedZoneByCountry((current) => ({
      ...current,
      [hoveredCountryName]: zoneName,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row h-[300px] lg:h-[360px] 3xl:h-[430px] text-white ml-auto md:gap-6 max-w-[980px] mx-auto px-4">
      <div
        className="relative w-full ml-auto h-full"
        onMouseLeave={() => {
          setTooltipHovered(false);
          scheduleHideTooltip();
        }}
      >
        <div ref={chartRef} className="h-full w-full" />

        {showTooltip && (
          <div
            className="pointer-events-auto absolute left-3 top-3 z-20 max-w-[calc(100%-24px)]"
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
              countryName={hoveredCountryName}
              selectedZoneName={selectedZoneByCountry[hoveredCountryName]}
              onZoneChange={selectZone}
              compact
            />
          </div>
        )}
      </div>

      <div className="w-full md:w-[220px] flex md:flex-col justify-center md:justify-center items-center gap-3 mt-4 md:mt-0">
        {countryList.map((item) => (
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
            className={`w-[150px] md:w-[190px] rounded-[8px] border border-white/20 px-4 py-1.5 font-poppins transition text-[13px] md:text-[15px] xl:text-[18px] shadow-[inset_0_0_18px_rgba(255,255,255,0.08)] ${
              selectedCountry === item.code
                ? "bg-[rgba(221,221,221,0.35)] text-white font-semibold"
                : "bg-[rgba(221,221,221,0.08)] text-white hover:bg-[rgba(221,221,221,0.22)]"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
