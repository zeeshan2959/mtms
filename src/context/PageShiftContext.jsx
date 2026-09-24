import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_PATHS } from "../config/pages";

const PageShiftContext = createContext(null);

export function PageShiftProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const directionRef = useRef(1);
  const lockedRef = useRef(false);
  const [direction, setDirectionState] = useState(1);
  const [locked, setLockedState] = useState(false);

  const setDirection = useCallback((next) => {
    const value = next >= 0 ? 1 : -1;
    directionRef.current = value;
    setDirectionState(value);
  }, []);

  const setLocked = useCallback((next) => {
    lockedRef.current = next;
    setLockedState(next);
  }, []);

  const setDirectionForPath = useCallback(
    (nextPath) => {
      const from = APP_PATHS.indexOf(location.pathname);
      const to = APP_PATHS.indexOf(nextPath);
      if (from === -1 || to === -1 || from === to) return;
      setDirection(to > from ? 1 : -1);
    },
    [location.pathname, setDirection]
  );

  const goRelative = useCallback(
    (delta) => {
      if (lockedRef.current) return false;
      const index = APP_PATHS.indexOf(location.pathname);
      if (index < 0) return false;
      const nextIndex = index + (delta > 0 ? 1 : -1);
      if (nextIndex < 0 || nextIndex >= APP_PATHS.length) return false;
      lockedRef.current = true;
      setLockedState(true);
      setDirection(delta > 0 ? 1 : -1);
      navigate(APP_PATHS[nextIndex]);
      return true;
    },
    [location.pathname, navigate, setDirection]
  );

  const isLocked = useCallback(() => lockedRef.current, []);

  const value = useMemo(
    () => ({
      direction,
      locked,
      isLocked,
      setDirection,
      setLocked,
      setDirectionForPath,
      goRelative,
    }),
    [direction, locked, isLocked, setDirection, setLocked, setDirectionForPath, goRelative]
  );

  return (
    <PageShiftContext.Provider value={value}>{children}</PageShiftContext.Provider>
  );
}

export function usePageShift() {
  const context = useContext(PageShiftContext);
  if (!context) {
    throw new Error("usePageShift must be used within PageShiftProvider");
  }
  return context;
}
