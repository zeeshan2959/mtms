import { useRef, useLayoutEffect } from "react";
import {
  gsap,
  getScroller,
  prefersReducedMotion,
  refreshSoon,
} from "../../lib/gsap";

// Expand the clip box slightly beyond the glyph bounds so ascenders and
// descenders aren't shaved off by the overflow mask, while negative margins
// keep the surrounding layout untouched.
const maskStyle = {
  display: "inline-block",
  overflow: "hidden",
  verticalAlign: "top",
  paddingTop: "0.12em",
  paddingBottom: "0.22em",
  marginTop: "-0.12em",
  marginBottom: "-0.22em",
};

const unitStyle = { display: "inline-block", willChange: "transform" };

function renderWord(word, splitChars, wordKey) {
  if (!splitChars) {
    return (
      <span key={wordKey} aria-hidden="true" style={maskStyle}>
        <span data-at-unit style={unitStyle}>
          {word}
        </span>
      </span>
    );
  }
  return (
    <span key={wordKey} style={{ display: "inline-block" }} aria-hidden="true">
      {Array.from(word).map((ch, ci) => (
        <span key={ci} style={maskStyle}>
          <span data-at-unit style={unitStyle}>
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * AnimatedText
 * ------------
 * Splits text into words (or characters) and reveals them with a masked
 * "rise + fade" stagger driven by GSAP ScrollTrigger.
 */
export default function AnimatedText({
  text,
  as: Tag = "div",
  split = "words",
  duration = 0.85,
  stagger = 0.06,
  delay = 0,
  ease = "power4.out",
  start = "top 88%",
  className = "",
  style,
}) {
  const ref = useRef(null);
  const value = String(text ?? "");
  const splitChars = split === "chars";
  const words = value.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const units = el.querySelectorAll("[data-at-unit]");
    if (!units.length) return;

    if (prefersReducedMotion()) {
      gsap.set(units, { yPercent: 0, autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        units,
        { yPercent: 118, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration,
          ease,
          delay,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller: getScroller(),
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    refreshSoon();
    return () => ctx.revert();
  }, [value, split, duration, stagger, delay, ease, start]);

  return (
    <Tag ref={ref} className={className} style={style} aria-label={value}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline" }}>
          {renderWord(word, splitChars, `w${wi}`)}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
