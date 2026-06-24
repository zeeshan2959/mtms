import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The app scrolls inside an inner <main> element (see MainLayout), not the
// window. ScrollTrigger therefore needs to be told which element is the
// scroll container. Everything funnels through this id.
export const SCROLLER_ID = "app-scroll";

export const getScroller = () =>
  (typeof document !== "undefined" && document.getElementById(SCROLLER_ID)) ||
  undefined;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Recalculate trigger positions once late-loading assets (fonts, images)
// settle, so scroll reveals stay aligned with their elements.
let loadBound = false;
export const refreshSoon = () => {
  requestAnimationFrame(() => ScrollTrigger.refresh());
  if (!loadBound && typeof window !== "undefined") {
    loadBound = true;
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }
};

export { gsap, ScrollTrigger };
