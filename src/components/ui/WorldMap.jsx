import React, { useLayoutEffect, useRef, useState } from "react";

// amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function WorldMapWithList() {
  const chartRef = useRef(null);
  const polygonSeriesRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Right side countries (codes + labels)
  const countryList = [
    { code: "IT", name: "Italy" },
    { code: "US", name: "USA" },
    { code: "MX", name: "Mexico" },
    { code: "PK", name: "Pakistan" },
    { code: "CA", name: "Canada" },
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
      fill: am5.color(0xdddddd), // rgba(221,221,221)
      fillOpacity: 0.35,
      stroke: am5.color(0x16a7ef),
      strokeOpacity: 0.2,
      cursorOverStyle: "pointer",
    });

    // Hover state
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x16a7ef),
    });

    // Active (selected)
    polygonSeries.mapPolygons.template.states.create("active", {
      fill: am5.color(0x16a7ef),
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
    <div className="flex flex-col md:flex-row h-[300px] lg:h-[450px] 3xl:h-[600px] text-white ml-auto pl-20 md:gap-4">
      
      {/* Map */}
      <div ref={chartRef} className="w-full ml-auto h-full" />

      {/* Right Side List */}
      <div className="w-full md:w-[220px] flex md:flex-col justify-center md:justify-end items-center md:items-start gap-4 space-y-2 lg:space-y-[20px]">
        {countryList.map((item) => (
          <button
            key={item.code}
            style={{ fontFamily: 'Poppins, sans-serif'}}
            onClick={() => handleSelectCountry(item.code)}
            className={`font-poppins transition text-[16px] md:text-[20px] xl:text-[27px] 3xl:text-[35px] ${
              selectedCountry === item.code
                ? "text-blue-400 font-normal md:font-bold"
                : "text-white/60 hover:text-white"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}