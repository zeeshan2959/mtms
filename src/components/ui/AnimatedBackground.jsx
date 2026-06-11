import { useEffect, useRef } from "react";
import { usePageTransitionDirection } from "../../context/PageTransitionDirectionContext";
import pattern from '/triangle.svg';

const CELL_W = 80;
const CELL_H = 64;

const SHAPE_POINTS = [
  [0.5, 0],
  [0.525, 0.6],
  [1.0, 1.0],
  [0.5, 0.65],
  [0, 1.0],
  [0, 1.0],
  [0.475, 0.6],
];

const OPACITY_MIN = 0.12;
const OPACITY_MAX = 0.9;
const BURST_DURATION = 1.4;

function wavePhaseDelay(x, y, patternId, cssW, cssH) {
  const col = x / CELL_W;
  const row = y / CELL_H;
  const cx = cssW / 2;
  const cy = cssH / 2;
  const dist = Math.hypot(x - cx, y - cy);
  const maxDist = Math.hypot(cx, cy) || 1;
  const angle = Math.atan2(y - cy, x - cx);

  switch (patternId) {
    case "cascade-down":
      return row * 0.14;
    case "cascade-up":
      return ((cssH - y) / CELL_H) * 0.14;
    case "sweep-right":
      return col * 0.14;
    case "sweep-left":
      return ((cssW - x) / CELL_W) * 0.14;
    case "ripple":
      return (dist / CELL_W) * 0.1;
    case "spiral":
      return ((angle / (2 * Math.PI)) + 1 + dist / (CELL_W * 6)) * 0.55;
    case "checker":
      return ((Math.floor(col) + Math.floor(row)) % 2) * 0.75;
    case "diagonal":
    default:
      return col * 0.12 + row * 0.06;
  }
}

function burstPhase(x, y, patternId, cssW, cssH) {
  const cx = cssW / 2;
  const cy = cssH / 2;
  const dist = Math.hypot(x - cx, y - cy);
  const maxDist = Math.hypot(cx, cy) || 1;
  const angle = Math.atan2(y - cy, x - cx);

  switch (patternId) {
    case "cascade-down":
      return y / cssH;
    case "cascade-up":
      return 1 - y / cssH;
    case "sweep-right":
      return x / cssW;
    case "sweep-left":
      return 1 - x / cssW;
    case "ripple":
      return dist / maxDist;
    case "spiral":
      return ((angle / (2 * Math.PI)) + 1 + dist / maxDist) / 2;
    case "checker":
      return ((x / CELL_W + y / CELL_H) % 2) / 2;
    case "diagonal":
    default:
      return (x / cssW + y / cssH) / 2;
  }
}

function burstBoost(x, y, patternId, cssW, cssH, progress) {
  const front = progress * 1.25;
  const phase = burstPhase(x, y, patternId, cssW, cssH);
  const dist = Math.abs(phase - front);
  if (dist > 0.18) return 0;
  const falloff = 1 - dist / 0.18;
  return falloff * falloff * 0.55;
}

export default function AnimatedBackground({ className = "", style }) {
  const wavePattern = usePageTransitionDirection();
  const patternRef = useRef(wavePattern);
  patternRef.current = wavePattern;

  const burstStartRef = useRef(null);
  const prevPatternIdRef = useRef(wavePattern.id);

  const baseCanvasRef = useRef(null);
  const waveCanvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (wavePattern.id !== prevPatternIdRef.current) {
      prevPatternIdRef.current = wavePattern.id;
      burstStartRef.current = performance.now();
    }
  }, [wavePattern.id]);

  useEffect(() => {
    const container = containerRef.current;
    const baseCanvas = baseCanvasRef.current;
    const waveCanvas = waveCanvasRef.current;
    if (!container || !baseCanvas || !waveCanvas) return;

    const baseCtx = baseCanvas.getContext("2d");
    const waveCtx = waveCanvas.getContext("2d");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let placements = [];
    let rafId = null;
    let running = false;
    let visible = true;

    const tileImg = new Image();
    let tileReady = false;

    const buildLayout = () => {
      const cssW = container.clientWidth;
      const cssH = container.clientHeight;
      const cols = Math.ceil(cssW / CELL_W) + 1;
      const rows = Math.ceil(cssH / CELL_H) + 1;

      placements = [];
      for (let row = 0; row < rows; row++) {
        const y = row * CELL_H;
        for (let col = 0; col <= cols; col++) {
          const x = col * CELL_W;
          placements.push({ x, y, flip: false });
          placements.push({ x: x - CELL_W / 2, y, flip: true });
        }
      }
    };

    const drawBase = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = container.clientWidth;
      const cssH = container.clientHeight;

      [baseCanvas, waveCanvas].forEach((c) => {
        c.width = Math.max(1, Math.round(cssW * dpr));
        c.height = Math.max(1, Math.round(cssH * dpr));
        c.style.width = `${cssW}px`;
        c.style.height = `${cssH}px`;
      });

      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      waveCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildLayout();

      baseCtx.clearRect(0, 0, cssW, cssH);
      if (!tileReady) return;

      for (const p of placements) {
        baseCtx.save();
        if (p.flip) {
          baseCtx.translate(p.x + CELL_W, p.y + CELL_H);
          baseCtx.rotate(Math.PI);
          baseCtx.drawImage(tileImg, 0, 0, CELL_W, CELL_H);
        } else {
          baseCtx.drawImage(tileImg, p.x, p.y, CELL_W, CELL_H);
        }
        baseCtx.restore();
      }
    };

    const traceShape = (ctx, x, y, flip) => {
      ctx.beginPath();
      for (let i = 0; i < SHAPE_POINTS.length; i++) {
        const [nx, ny] = SHAPE_POINTS[i];
        const px = flip ? (1 - nx) : nx;
        const py = flip ? (1 - ny) : ny;
        const cx = x + px * CELL_W;
        const cy = y + py * CELL_H;
        if (i === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      }
      ctx.closePath();
    };

    const drawWave = (timeMs) => {
      const cssW = container.clientWidth;
      const cssH = container.clientHeight;
      const { id, period, color } = patternRef.current;
      const timeSec = timeMs / 1000;
      const wavePeriod = period ?? 3;

      waveCtx.clearRect(0, 0, cssW, cssH);
      waveCtx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

      let burstProgress = 1;
      if (burstStartRef.current != null) {
        burstProgress = (timeMs - burstStartRef.current) / (BURST_DURATION * 1000);
        if (burstProgress >= 1) {
          burstStartRef.current = null;
          burstProgress = 1;
        }
      }

      for (const { x, y, flip } of placements) {
        const delay = wavePhaseDelay(x, y, id, cssW, cssH);
        let p = ((timeSec - delay) % wavePeriod) / wavePeriod;
        if (p < 0) p += 1;
        const eased = 0.5 - 0.5 * Math.cos(p * 2 * Math.PI);
        let alpha = OPACITY_MIN + (OPACITY_MAX - OPACITY_MIN) * eased;

        if (burstProgress < 1) {
          alpha = Math.min(1, alpha + burstBoost(x, y, id, cssW, cssH, burstProgress));
        }

        waveCtx.globalAlpha = alpha;
        traceShape(waveCtx, x, y, flip);
        waveCtx.fill();
      }
      waveCtx.globalAlpha = 1;
    };

    const loop = (now) => {
      if (!running) return;
      drawWave(now);
      rafId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (running || reduceMotion || !visible) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      running = false;
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    const resizeObserver = new ResizeObserver(() => {
      drawBase();
      if (reduceMotion || !running) drawWave(performance.now());
    });
    resizeObserver.observe(container);

    let intersectionObserver = null;
    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true;
          if (visible) startLoop();
          else stopLoop();
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(container);
    }

    document.addEventListener("visibilitychange", handleVisibility);

    tileImg.onload = () => {
      tileReady = true;
      drawBase();
      if (reduceMotion) drawWave(0);
      else startLoop();
    };
    tileImg.src = pattern;

    if (tileImg.complete && tileImg.naturalWidth > 0) {
      tileImg.onload();
    }

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      ref={containerRef}
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
        .bg-darken {
          position: absolute; inset: 0;
          background:
            linear-gradient(90deg, rgba(5,7,12,0.82) 0%, rgba(5,7,12,0.45) 42%, rgba(5,7,12,0.18) 100%),
            linear-gradient(0deg, rgba(5,7,12,0.55) 0%, rgba(5,7,12,0) 45%);
        }
        .bg-grade-overlay {
          position: absolute; inset: 0; mix-blend-mode: overlay;
          background: linear-gradient(54deg, rgba(25, 27, 52, 0.21) 38%, rgb(115,115,115) 102%);
        }
        .bg-grade-soft {
          position: absolute; inset: 0; mix-blend-mode: soft-light;
          background: linear-gradient(55deg, rgb(25,27,52) 16%, rgb(115,115,115) 77%);
        }
        .bg-blob-main {
          position: absolute; top: 42%; left: -6%;
          width: 40vw; height: 40vw; max-width: 1000px; max-height: 1000px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 50%,
            #2D9297 0%,
            #2D9297 14%,
            rgba(45, 146, 151, 0.88) 26%,
            #212E60 48%,
            rgba(17, 22, 61, 0.72) 68%,
            rgba(17, 22, 61, 0) 82%
          );
          filter: blur(90px) saturate(1.15);
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

      <canvas
        ref={baseCanvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      <canvas
        ref={waveCanvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      <div className="bg-darken" />
      <div className="bg-grade-overlay" />
      <div className="bg-grade-soft" />

      <div className="bg-blob-main" />
    </div>
  );
}
