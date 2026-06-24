import { useRef, useLayoutEffect } from "react";
import {
  gsap,
  getScroller,
  prefersReducedMotion,
  refreshSoon,
} from "../../lib/gsap";

/**
 * Reveal
 * ------
 * Wraps any content and smoothly animates it into view on scroll using GSAP
 * ScrollTrigger. Elements that are already on screen on load simply play
 * their entrance immediately.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  y = 32,
  x = 0,
  scale = 1,
  blur = 6,
  from = 0,
  duration = 0.9,
  delay = 0,
  ease = "power3.out",
  start = "top 86%",
  once = true,
  className = "",
  style,
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1, clearProps: "transform,filter" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          autoAlpha: from,
          y,
          x,
          scale,
          filter: blur ? `blur(${blur}px)` : "blur(0px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            scroller: getScroller(),
            start,
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        }
      );
    }, ref);

    refreshSoon();
    return () => ctx.revert();
  }, [y, x, scale, blur, from, duration, delay, ease, start, once]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
