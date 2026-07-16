import React, { useLayoutEffect, useRef, useState } from "react";

// amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function WorldMapWithList() {
  const chartRef = useRef(null);
  const polygonSeriesRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState("IT");

  // Right side countries (codes + labels)
  const countryList = [
    { code: "IT", name: "Italy" },
    { code: "DE", name: "Germany" },
    { code: "US", name: "United States" },
    { code: "MY", name: "Malaysia" },
    { code: "PK", name: "Pakistan" },
    { code: "BR", name: "Brazil" },
  ];

  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);

    // ✅ Remove amCharts logo
    root._logo?.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    // ✅ Disable zoom & interactions
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

    // Map series
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeriesRef.current = polygonSeries;

    // Default map style
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0xdddddd),
      fillOpacity: 0.88,
      stroke: am5.color(0x45e7ef),
      strokeOpacity: 0.12,
      cursorOverStyle: "pointer",
    });

    // Hover state
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x45e7ef),
    });

    // Active (selected)
    polygonSeries.mapPolygons.template.states.create("active", {
      fill: am5.color(0x45e7ef),
      fillOpacity: 1,
    });

    // Click on map
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
      root.dispose();
    };
  }, []);

  // Click from right-side list
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

  return (
    <div className="flex flex-col md:flex-row h-[300px] lg:h-[360px] 3xl:h-[430px] text-white ml-auto md:gap-6 max-w-[980px] mx-auto px-4">
      
      {/* Map */}
      <div ref={chartRef} className="w-full ml-auto h-full" />

      {/* Right Side List */}
      <div className="w-full md:w-[220px] flex md:flex-col justify-center md:justify-center items-center gap-3 mt-4 md:mt-0">
        {countryList.map((item) => (
          <button
            key={item.code}
            style={{ fontFamily: 'Poppins, sans-serif'}}
            onClick={() => handleSelectCountry(item.code)}
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