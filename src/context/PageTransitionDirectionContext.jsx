import { createContext, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_PATTERN = {
  id: "diagonal",
  period: 3,
  color: [18, 223, 234],
};

const PageTransitionDirectionContext = createContext(DEFAULT_PATTERN);

/** Distinct shimmer modes — cycled on every route change */
export const WAVE_PATTERNS = [
  { id: "diagonal",      period: 3.0, color: [18, 223, 234] },
  { id: "cascade-down",  period: 2.6, color: [20, 228, 238] },
  { id: "ripple",        period: 4.2, color: [25, 235, 245] },
  { id: "sweep-right",   period: 2.4, color: [15, 210, 228] },
  { id: "spiral",        period: 5.0, color: [22, 220, 235] },
  { id: "cascade-up",    period: 2.6, color: [18, 215, 225] },
  { id: "checker",       period: 2.8, color: [20, 230, 240] },
  { id: "sweep-left",    period: 2.4, color: [15, 210, 228] },
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
