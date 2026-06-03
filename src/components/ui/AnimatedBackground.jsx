import { useEffect, useRef } from "react";
import pattern from '/triangle.svg';

// Geometry of a single tile (matches the old `w-20 h-16` cells).
const CELL_W = 80;
const CELL_H = 64;

// The blue shimmer triangle (old `.shape` clip-path), in normalized cell space.
const SHAPE_POINTS = [
  [0.5, 0],
  [0.525, 0.6],
  [1.0, 1.0],
  [0.5, 0.65],
  [0, 1.0],
  [0, 1.0],
  [0.475, 0.6],
];

const WAVE_PERIOD = 3;     // seconds, matches `shapeWave 3s`
const OPACITY_MIN = 0.12;
const OPACITY_MAX = 0.9;

export default function AnimatedBackground({ className = "", style }) {
  const baseCanvasRef = useRef(null);
  const waveCanvasRef = useRef(null);
  const containerRef = useRef(null);

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

    // Grey faceted triangle tile.
    const tileImg = new Image();
    let tileReady = false;

    // Rebuild the gap-free tessellation: upward triangles on the grid plus
    // half-cell-offset downward (flipped) triangles that fill the gaps between
    // them. Called on resize.
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
          // Upward triangle on the grid.
          placements.push({ x, y, flip: false });
          // Downward triangle, shifted half a cell, fills the gap.
          placements.push({ x: x - CELL_W / 2, y, flip: true });
        }
      }
    };

    // Draw the static grey tessellation once per resize.
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

    // Draw one frame of the blue shimmer wave.
    const drawWave = (timeSec) => {
      const cssW = container.clientWidth;
      const cssH = container.clientHeight;
      waveCtx.clearRect(0, 0, cssW, cssH);
      waveCtx.fillStyle = "rgb(18, 223, 234)";

      for (const { x, y, flip } of placements) {
        // Diagonal phase offset so the shimmer sweeps across the grid.
        const delay = (x / CELL_W) * 0.12 + (y / CELL_H) * 0.06;
        let p = ((timeSec - delay) % WAVE_PERIOD) / WAVE_PERIOD;
        if (p < 0) p += 1;
        // 0 -> min, 0.5 -> max, 1 -> min (ease-in-out-ish via cosine)
        const eased = 0.5 - 0.5 * Math.cos(p * 2 * Math.PI);
        waveCtx.globalAlpha = OPACITY_MIN + (OPACITY_MAX - OPACITY_MIN) * eased;
        traceShape(waveCtx, x, y, flip);
        waveCtx.fill();
      }
      waveCtx.globalAlpha = 1;
    };

    const loop = (now) => {
      if (!running) return;
      drawWave(now / 1000);
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
      if (reduceMotion || !running) drawWave(performance.now() / 1000);
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

    // In case the image is cached and already complete.
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
        /* Deepen the left (sidebar/heading) side; let the pattern read on the right */
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

      {/* Triangle tessellation + shimmer wave, drawn on canvas for performance */}
      <canvas
        ref={baseCanvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      <canvas
        ref={waveCanvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      {/* Tone + Figma colour grade */}
      <div className="bg-darken" />
      <div className="bg-grade-overlay" />
      <div className="bg-grade-soft" />

      {/* Animated teal-green gradient circle (Figma Ellipse 4) */}
      <div className="bg-blob-main" />
      {/* <div className="bg-blob-accent" /> */}
    </div>
  );
}
