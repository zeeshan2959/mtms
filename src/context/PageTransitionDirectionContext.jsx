import { createContext, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_PATTERN = {
  id: "diagonal",
  period: 3,
  color: [18, 223, 234],
  blob: { top: "42%", left: "-6%", size: "40vw" },
};

const PageTransitionDirectionContext = createContext(DEFAULT_PATTERN);

/** Distinct shimmer modes — cycled on every route change */
export const WAVE_PATTERNS = [
  { id: "diagonal",      period: 3.0, color: [18, 223, 234], blob: { top: "42%", left: "-6%",  size: "40vw" } },
  { id: "cascade-down",  period: 2.6, color: [20, 228, 238], blob: { top: "68%", left: "18%",  size: "44vw" } },
  { id: "ripple",        period: 4.2, color: [25, 235, 245], blob: { top: "28%", left: "38%",  size: "36vw" } },
  { id: "sweep-right",   period: 2.4, color: [15, 210, 228], blob: { top: "50%", left: "58%",  size: "42vw" } },
  { id: "spiral",        period: 5.0, color: [22, 220, 235], blob: { top: "22%", left: "12%",  size: "38vw" } },
  { id: "cascade-up",    period: 2.6, color: [18, 215, 225], blob: { top: "12%", left: "48%",  size: "34vw" } },
  { id: "checker",       period: 2.8, color: [20, 230, 240], blob: { top: "55%", left: "72%",  size: "46vw" } },
  { id: "sweep-left",    period: 2.4, color: [15, 210, 228], blob: { top: "38%", left: "6%",   size: "40vw" } },
];

function patternForNavCount(navCount) {
  if (navCount <= 0) return WAVE_PATTERNS[0];
  return WAVE_PATTERNS[(navCount - 1) % WAVE_PATTERNS.length];
}

export function PageTransitionDirectionProvider({ children }) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const navCountRef = useRef(0);
  const patternRef = useRef(WAVE_PATTERNS[0]);

  if (location.pathname !== prevPathRef.current) {
    navCountRef.current += 1;
    patternRef.current = patternForNavCount(navCountRef.current);
    prevPathRef.current = location.pathname;
  }

  return (
    <PageTransitionDirectionContext.Provider value={patternRef.current}>
      {children}
    </PageTransitionDirectionContext.Provider>
  );
}

export function usePageTransitionDirection() {
  return useContext(PageTransitionDirectionContext);
}
