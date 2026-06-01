
import pattern from '/triangle.svg';
// import pattern from '/triangleOpen.svg';
export default function AnimatedBackground({ className = "", style }) {
  return (
    <div
      className={className}
      style={{ overflow: "hidden", pointerEvents: "none", background: "#06070c", ...style }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes bgBlobMain {
          0%   { transform: translate(-32%, -52%) scale(1);    opacity: 0.85; }
          50%  { transform: translate(-22%, -42%) scale(1.14); opacity: 1;    }
          100% { transform: translate(-32%, -52%) scale(1);    opacity: 0.85; }
        }
        @keyframes bgBlobAccent {
          0%   { transform: translate(0, 0) scale(1);          opacity: 0.45; }
          50%  { transform: translate(60px, -40px) scale(1.2); opacity: 0.8;  }
          100% { transform: translate(0, 0) scale(1);          opacity: 0.45; }
        }
        .bg-pattern {
          position: absolute; inset: 0;
          background-image: url('/bg-pattern.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        /* Deepen the left (sidebar/heading) side; let the pattern read on the right */
        .bg-darken {
          position: absolute; inset: 0;
          background:
            linear-gradient(90deg, rgba(5,7,12,0.82) 0%, rgba(5,7,12,0.45) 42%, rgba(5,7,12,0.18) 100%),
            linear-gradient(0deg, rgba(5,7,12,0.55) 0%, rgba(5,7,12,0) 45%);
        }
        .bg-grade-overlay {
          position: absolute; inset: 0; mix-blend-mode: overlay;
          background: linear-gradient(54deg, rgb(25,27,52) 38%, rgb(115,115,115) 102%);
        }
        .bg-grade-soft {
          position: absolute; inset: 0; mix-blend-mode: soft-light;
          background: linear-gradient(55deg, rgb(25,27,52) 16%, rgb(115,115,115) 77%);
        }
        .bg-blob-main {
          position: absolute; top: 42%; left: -6%;
          width: 40vw; height: 40vw; max-width: 1000px; max-height: 1000px;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 50%,
            rgba(56,201,160,0.95) 0%,
            rgba(35,118,140,0.55) 38%,
            rgba(35,118,140,0) 70%);
          filter: blur(90px);
          mix-blend-mode: screen;
          animation: bgBlobMain 14s ease-in-out infinite;
        }
        .bg-blob-accent {
          position: absolute; top: 8%; right: 14%;
          width: 26vw; height: 26vw; max-width: 460px; max-height: 460px;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 50%,
            rgba(47,174,143,0.6) 0%,
            rgba(47,174,143,0) 70%);
          filter: blur(70px);
          mix-blend-mode: screen;
          animation: bgBlobAccent 18s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-blob-main, .bg-blob-accent { animation: none; }
        }
      `}</style>

      {/* Exact triangular pattern supplied by the user */}
      {/* <div className="bg-pattern" /> */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          display: "grid",
          gridTemplateRows: "repeat(20, 80px)",
        }}
      >
        {Array.from({ length: 80 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-nowrap"
            style={{
              width: "calc(100vw + 80px)",
              height: "100%",
            }}
          >
            {Array.from({ length: 80 }).map((_, colIndex) => (
              <img
                key={`${rowIndex}-${colIndex}`}
                src={pattern}
                alt=""
                draggable={false}
                className={`w-20 h-16 shrink-0 select-none ${rowIndex % 2 === 0 ? "rotate-180 -translate-x-10" : "-translate-x-20 -translate-y-16"
                  } 
                  
                  ${rowIndex === 0 && colIndex === 0 ? "" : ""}
                  ${rowIndex === 1 ? "-translate-y-[80px] " : ""}
                  ${rowIndex === 2 ? "-translate-y-[94px] " : ""}
                  ${rowIndex === 3 ? "-translate-y-[174px]" : ""}
                  ${rowIndex === 4 ? "-translate-y-[188px]" : ""}
                  ${rowIndex === 5 ? "-translate-y-[268px]" : ""}
                  ${rowIndex === 6 ? "-translate-y-[282px]" : ""}
                  ${rowIndex === 7 ? "-translate-y-[362px]" : ""}
                  ${rowIndex === 8 ? "-translate-y-[376px]" : ""}
                  ${rowIndex === 9 ? "-translate-y-[456px]" : ""}
                  ${rowIndex === 10 ? "-translate-y-[470px]" : ""}
                  ${rowIndex === 11 ? "-translate-y-[550px]" : ""}
                  ${rowIndex === 12 ? "-translate-y-[564px]" : ""}
                  ${rowIndex === 13 ? "-translate-y-[644px]" : ""}
                  ${rowIndex === 14 ? "-translate-y-[658px]" : ""}
                  ${rowIndex === 15 ? "-translate-y-[738px]" : ""}
                  ${rowIndex === 16 ? "-translate-y-[752px]" : ""}
                  ${rowIndex === 17 ? "-translate-y-[832px]" : ""}
                  ${rowIndex === 18 ? "-translate-y-[846px]" : ""}
                  ${rowIndex === 19 ? "-translate-y-[926px]" : ""}
                  ${rowIndex === 20 ? "-translate-y-[940px]" : ""}
                  ${rowIndex === 21 ? "-translate-y-[1004px]" : ""}
                  ${rowIndex === 22 ? "-translate-y-[1002px]" : ""}
                  ${rowIndex === 23 ? "-translate-y-[1066px]" : ""}
                  ${rowIndex === 24 ? "-translate-y-[1064px]" : ""}
                  ${rowIndex === 25 ? "-translate-y-[1128px]" : ""}
                  ${rowIndex === 26 ? "-translate-y-[1126px]" : ""}
                  ${rowIndex === 27 ? "-translate-y-[1192px]" : ""}
                  ${rowIndex === 28 ? "-translate-y-[1190px]" : ""}
                  ${rowIndex === 29 ? "-translate-y-[1256px]" : ""}
                  ${rowIndex === 30 ? "-translate-y-[1254px]" : ""}
                  ${rowIndex === 31 ? "-translate-y-[1320px]" : ""}
                  ${rowIndex === 32 ? "-translate-y-[1320px]" : ""}
                  ${rowIndex === 33 ? "-translate-y-[1386px]" : ""}
                  ${rowIndex === 34 ? "-translate-y-[1384px]" : ""}
                  ${rowIndex === 35 ? "-translate-y-[1450px]" : ""}
                  ${rowIndex === 36 ? "-translate-y-[1448px]" : ""}
                  ${rowIndex === 37 ? "-translate-y-[1514px]" : ""}
                  ${rowIndex === 38 ? "-translate-y-[1512px]" : ""}
                  ${rowIndex === 39 ? "-translate-y-[1578px]" : ""}
                  ${rowIndex === 40 ? "-translate-y-[1576px]" : ""}
                  ${rowIndex === 41 ? "-translate-y-[1642px]" : ""}
                  ${rowIndex === 42 ? "-translate-y-[1640px]" : ""}
                  ${rowIndex === 43 ? "-translate-y-[1706px]" : ""}
                  ${rowIndex === 44 ? "-translate-y-[1704px]" : ""}
                  ${rowIndex === 45 ? "-translate-y-[1770px]" : ""}
                  ${rowIndex === 46 ? "-translate-y-[1768px]" : ""}
                  ${rowIndex === 47 ? "-translate-y-[1834px]" : ""}
                  ${rowIndex === 48 ? "-translate-y-[1832px]" : ""}
                  ${rowIndex === 49 ? "-translate-y-[1898px]" : ""}
                  ${rowIndex === 50 ? "-translate-y-[1896px]" : ""}
                  ${rowIndex === 51 ? "-translate-y-[1962px]" : ""}
                  ${rowIndex === 52 ? "-translate-y-[1960px]" : ""}
                  ${rowIndex === 53 ? "-translate-y-[2026px]" : ""}
                  ${rowIndex === 54 ? "-translate-y-[2024px]" : ""}
                  ${rowIndex === 55 ? "-translate-y-[2090px]" : ""}
                  ${rowIndex === 56 ? "-translate-y-[2088px]" : ""}
                  ${rowIndex === 57 ? "-translate-y-[2154px]" : ""}
                  ${rowIndex === 58 ? "-translate-y-[2152px]" : ""}
                  ${rowIndex === 59 ? "-translate-y-[2218px]" : ""}
                  ${rowIndex === 60 ? "-translate-y-[2216px]" : ""}
                  ${rowIndex === 61 ? "-translate-y-[2282px]" : ""}
                  ${rowIndex === 62 ? "-translate-y-[2280px]" : ""}
                  ${rowIndex === 63 ? "-translate-y-[2346px]" : ""}
                  ${rowIndex === 64 ? "-translate-y-[2344px]" : ""}
                  ${rowIndex === 65 ? "-translate-y-[2410px]" : ""}
                  ${rowIndex === 66 ? "-translate-y-[2408px]" : ""}
                  ${rowIndex === 67 ? "-translate-y-[2474px]" : ""}
                  ${rowIndex === 68 ? "-translate-y-[2472px]" : ""}
                  ${rowIndex === 69 ? "-translate-y-[2538px]" : ""}
                  ${rowIndex === 70 ? "-translate-y-[2536px]" : ""}
                  ${rowIndex === 71 ? "-translate-y-[2602px]" : ""}
                  ${rowIndex === 72 ? "-translate-y-[2600px]" : ""}
                  ${rowIndex === 73 ? "-translate-y-[2666px]" : ""}
                  ${rowIndex === 74 ? "-translate-y-[2664px]" : ""}
                  ${rowIndex === 75 ? "-translate-y-[2730px]" : ""}
                  ${rowIndex === 76 ? "-translate-y-[2728px]" : ""}
                  ${rowIndex === 77 ? "-translate-y-[2794px]" : ""}
                  ${rowIndex === 78 ? "-translate-y-[2792px]" : ""}
                  ${rowIndex === 79 ? "-translate-y-[2858px]" : ""}
                  ${rowIndex === 80 ? "-translate-y-[2856px]" : ""}
                  ${rowIndex === 81 ? "-translate-y-[2922px]" : ""}
                  ${rowIndex === 82 ? "-translate-y-[2920px]" : ""}
                  ${rowIndex === 83 ? "-translate-y-[2986px]" : ""}
                  ${rowIndex === 84 ? "-translate-y-[2984px]" : ""}
                  ${rowIndex === 85 ? "-translate-y-[3050px]" : ""}
                  ${rowIndex === 86 ? "-translate-y-[3048px]" : ""}
                  ${rowIndex === 87 ? "-translate-y-[3114px]" : ""}
                  ${rowIndex === 88 ? "-translate-y-[3112px]" : ""}
                  ${rowIndex === 89 ? "-translate-y-[3178px]" : ""}
                  ${rowIndex === 90 ? "-translate-y-[3176px]" : ""}
                  ${rowIndex === 91 ? "-translate-y-[3242px]" : ""}
                  ${rowIndex === 92 ? "-translate-y-[3240px]" : ""}
                  ${rowIndex === 93 ? "-translate-y-[3306px]" : ""}
                  ${rowIndex === 94 ? "-translate-y-[3304px]" : ""}
                  ${rowIndex === 95 ? "-translate-y-[3370px]" : ""}
                  `}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Tone + Figma colour grade */}
      <div className="bg-darken" />
      {/* <div className="bg-grade-overlay" /> */}
      <div className="bg-grade-soft" />

      {/* Animated teal-green gradient circle (Figma Ellipse 4) */}
      <div className="bg-blob-main" />
      {/* <div className="bg-blob-accent" /> */}
    </div>
  );
}
