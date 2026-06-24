import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { SCROLLER_ID, ScrollTrigger } from "../../lib/gsap";

/**
 * PageTransition
 * --------------
 * Re-keys its children on every route change so the page plays a fresh
 * "enter" animation (fade + lift + un-blur), making navigation feel like
 * a deliberate change of context. See `.page-enter` in index.css.
 *
 * It also resets the scroll container to the top and refreshes ScrollTrigger
 * so the new page's scroll-driven reveals start from a clean state.
 */
export default function PageTransition({ children }) {
  const location = useLocation();

  useLayoutEffect(() => {
    const scroller = document.getElementById(SCROLLER_ID);
    if (scroller) scroller.scrollTop = 0;
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="page-enter">
      {children}
    </div>
  );
}
