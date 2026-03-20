import { useState, useEffect, useRef } from "react";

const LOGO_STAGES = [
  { pct: 0,   src: "/PropertyVarient1.png",  label: "Initializing…" },
  { pct: 20,  src: "/PropertyVariant2.png", label: "Loading assets…" },
  { pct: 40,  src: "/PropertyVariant3.png", label: "Building systems…" },
  { pct: 60,  src: "/PropertyVariant4.png", label: "Calibrating…" },
  { pct: 80,  src: "/PropertyVariant5.png", label: "Almost ready…" },
  { pct: 100, src: "/PropertyVariant6.png", label: "Ready" },
];

function getLogoForProgress(pct) {
  let stage = LOGO_STAGES[0];
  for (const s of LOGO_STAGES) {
    if (pct >= s.pct) stage = s;
  }
  return stage;
}

function ProgressRing({ progress, size = 220, stroke = 4 }) {
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
    >
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke}
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="url(#arcGrad)" strokeWidth={stroke}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c0392b" />
          <stop offset="50%" stopColor="#e67e22" />
          <stop offset="100%" stopColor="#f1c40f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function RingTicks({ size = 220 }) {
  const ticks = 60;
  const center = size / 2;
  const outerR = size / 2 - 2;
  const innerR = size / 2 - 10;

  return (
    <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0 }}>
      {Array.from({ length: ticks }).map((_, i) => {
        const angle = ((i / ticks) * 360 - 90) * (Math.PI / 180);
        const isMajor = i % 5 === 0;
        const r1 = isMajor ? innerR - 4 : innerR;
        const x1 = center + r1 * Math.cos(angle);
        const y1 = center + r1 * Math.sin(angle);
        const x2 = center + outerR * Math.cos(angle);
        const y2 = center + outerR * Math.sin(angle);
        return (
          <line
            key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isMajor ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}
            strokeWidth={isMajor ? 1.5 : 0.8}
          />
        );
      })}
    </svg>
  );
}

export default function LoadingScreen({ isReady, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const prevStageRef = useRef(0);
  const intervalRef = useRef(null);

  const currentStage = getLogoForProgress(progress);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        // If video is not ready, stall at 80%
        if (!isReady && prev >= 80) {
          return 80;
        }

        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => setDone(true), 400);
          return 100;
        }

        const milestones = [20, 40, 60, 80, 100];
        const nearMilestone = milestones.some((m) => prev < m && prev + 1.2 >= m);
        return nearMilestone ? prev + 0.3 : prev + 0.8;
      });
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, [isReady]);

  // When video becomes ready and progress is stalled at 80, resume
  useEffect(() => {
    if (isReady && progress >= 80 && progress < 100) {
      // Kick the interval by clearing and restarting
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            setTimeout(() => setDone(true), 400);
            return 100;
          }
          const milestones = [100];
          const nearMilestone = milestones.some((m) => prev < m && prev + 1.2 >= m);
          return nearMilestone ? prev + 0.3 : prev + 0.8;
        });
      }, 30);
    }
    return () => clearInterval(intervalRef.current);
  }, [isReady]);

  // Flash logo on stage change
  useEffect(() => {
    const stageIdx = LOGO_STAGES.indexOf(currentStage);
    if (stageIdx !== prevStageRef.current) {
      prevStageRef.current = stageIdx;
      setLogoOpacity(0);
      setTimeout(() => setLogoOpacity(1), 80);
    }
  }, [currentStage]);

  const pctDisplay = Math.round(progress);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "'Orbitron', sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;900&family=Rajdhani:wght@300;400;600&display=swap');

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes continueGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(230,126,34,0.4), 0 0 40px rgba(230,126,34,0.2); }
          50%       { box-shadow: 0 0 35px rgba(230,126,34,0.7), 0 0 70px rgba(230,126,34,0.35); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .scanline {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(transparent 50%, rgba(0,0,0,0.03) 50%);
          background-size: 100% 4px; z-index: 1;
        }
        .sweep {
          position: absolute; left: 0; right: 0; height: 120px;
          background: linear-gradient(to bottom, transparent, rgba(230,126,34,0.04), transparent);
          animation: scanline 4s linear infinite; pointer-events: none; z-index: 2;
        }
      `}</style>

      <div className="scanline" />
      <div className="sweep" />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(192,57,43,0.06) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        animation: "pulse-glow 3s ease-in-out infinite", pointerEvents: "none",
      }} />

      {/* Corner brackets */}
      {[
        { top: 32, left: 32, borderTop: "1px solid", borderLeft: "1px solid" },
        { top: 32, right: 32, borderTop: "1px solid", borderRight: "1px solid" },
        { bottom: 32, left: 32, borderBottom: "1px solid", borderLeft: "1px solid" },
        { bottom: 32, right: 32, borderBottom: "1px solid", borderRight: "1px solid" },
      ].map((style, i) => (
        <div key={i} style={{
          position: "absolute", width: 40, height: 40,
          borderColor: "rgba(230,126,34,0.35)", ...style,
        }} />
      ))}

      {/* Milestone percentage labels: 0 20 40 60 80 100 */}
      <div style={{
        display: "flex", gap: 20, marginBottom: 24,
        fontFamily: "'Orbitron', sans-serif",
      }}>
        {[0, 20, 40, 60, 80, 100].map((milestone) => {
          const reached = pctDisplay >= milestone;
          const isActive = pctDisplay >= milestone && (milestone === 100 || pctDisplay < milestone + 20);
          return (
            <div key={milestone} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: reached ? "#e67e22" : "rgba(255,255,255,0.15)",
                boxShadow: isActive ? "0 0 8px rgba(230,126,34,0.8)" : "none",
                transition: "background 0.3s, box-shadow 0.3s",
              }} />
              <span style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: reached ? (isActive ? "#e67e22" : "rgba(255,255,255,0.45)") : "rgba(255,255,255,0.15)",
                transition: "color 0.3s",
              }}>
                {milestone}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Circular loader */}
      <div style={{ position: "relative", width: 220, height: 220, marginBottom: 32 }}>
        <svg width={220} height={220} style={{
          position: "absolute", top: 0, left: 0,
          animation: done ? "none" : "spin-slow 8s linear infinite",
        }}>
          <circle cx={110} cy={110} r={106} fill="none"
            stroke="rgba(230,126,34,0.15)" strokeWidth={1} strokeDasharray="3 8" />
        </svg>

        <svg width={220} height={220} style={{
          position: "absolute", top: 0, left: 0,
          animation: done ? "none" : "counter-spin 5s linear infinite",
        }}>
          <circle cx={110} cy={110} r={98} fill="none"
            stroke="rgba(192,57,43,0.18)" strokeWidth={0.8} strokeDasharray="2 12" />
        </svg>

        <RingTicks size={220} />
        <ProgressRing progress={progress} size={220} stroke={3} />

        {/* Logo */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 130, height: 100,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "opacity 0.25s ease", opacity: logoOpacity,
        }}>
          <img
            key={currentStage.src}
            src={currentStage.src}
            alt="TST Logo"
            style={{
              width: "100%", height: "100%", objectFit: "contain",
              filter: done ? "none" : "brightness(0.95)",
            }}
          />
        </div>

        {/* Percentage inside ring */}
        {!done && (
          <div style={{
            position: "absolute", bottom: 18, left: "50%",
            transform: "translateX(-50%)",
            fontSize: 11, fontFamily: "'Orbitron', sans-serif",
            fontWeight: 600, color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.15em", whiteSpace: "nowrap",
          }}>
            {pctDisplay}%
          </div>
        )}
      </div>

      {/* Status label */}
      <div
        key={currentStage.label}
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 13, fontWeight: 300,
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: 24,
          animation: "fadeUp 0.4s ease both",
        }}
      >
        {currentStage.label}
      </div>

      {/* Progress bar with milestone markers */}
      {!done && (
        <div style={{ width: 320, marginBottom: 12 }}>
          {/* Bar */}
          <div style={{
            width: "100%", height: 2,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 2, overflow: "visible",
            position: "relative",
          }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "linear-gradient(90deg, #c0392b, #e67e22, #f1c40f)",
              transition: "width 0.3s linear", borderRadius: 2,
            }} />
            {/* Milestone tick marks on bar */}
            {[20, 40, 60, 80].map((m) => (
              <div key={m} style={{
                position: "absolute", top: "50%",
                left: `${m}%`, transform: "translate(-50%, -50%)",
                width: 1, height: 8,
                background: pctDisplay >= m ? "rgba(230,126,34,0.6)" : "rgba(255,255,255,0.15)",
                transition: "background 0.3s",
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Stalled notice when waiting for video */}
      {!done && !isReady && pctDisplay >= 80 && (
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 11, letterSpacing: "0.25em",
          color: "rgba(230,126,34,0.5)",
          textTransform: "uppercase",
          animation: "pulse-glow 1.5s ease-in-out infinite",
        }}>
          Waiting for video…
        </div>
      )}

      {/* Continue button */}
      {done && (
        <button
          onClick={onComplete}
          style={{
            marginTop: 4, padding: "14px 52px",
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 13, fontWeight: 600,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#fff", background: "transparent",
            border: "1px solid rgba(230,126,34,0.6)",
            cursor: "pointer",
            animation: "fadeUp 0.5s ease both, continueGlow 2s ease-in-out infinite",
            position: "relative", overflow: "hidden",
            transition: "background 0.3s, color 0.3s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(230,126,34,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
        >
          <span style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
            backgroundSize: "400px 100%",
            animation: "shimmer 2.5s linear infinite",
            pointerEvents: "none",
          }} />
          CONTINUE
        </button>
      )}
    </div>
  );
}
