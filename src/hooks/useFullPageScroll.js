import { useEffect, useRef } from "react";
import { usePageShift } from "../context/PageShiftContext";
import { SCROLLER_ID } from "../lib/gsap";

const WHEEL_THRESHOLD = 48;
const SWIPE_THRESHOLD = 52;
const EDGE_SLACK = 28;
const NEGLIGIBLE_OVERFLOW = 64;

function isEditableTarget(target) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true']")
  );
}

function canScrollInDirection(node, deltaY) {
  if (!(node instanceof HTMLElement)) return false;
  const style = window.getComputedStyle(node);
  const overflowY = style.overflowY;
  const overflowable =
    overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay";
  if (!overflowable) return false;

  const overflow = node.scrollHeight - node.clientHeight;
  if (overflow <= NEGLIGIBLE_OVERFLOW) return false;

  const goingDown = deltaY > 0;
  if (goingDown) {
    return node.scrollTop + node.clientHeight < node.scrollHeight - EDGE_SLACK;
  }
  return node.scrollTop > EDGE_SLACK;
}

function ancestorCanScroll(start, deltaY) {
  let node = start instanceof Element ? start : null;
  const scroller = document.getElementById(SCROLLER_ID);

  while (node && node !== document.body) {
    if (canScrollInDirection(node, deltaY)) return true;
    node = node.parentElement;
  }

  if (scroller && canScrollInDirection(scroller, deltaY)) return true;

  const root = document.scrollingElement;
  return root ? canScrollInDirection(root, deltaY) : false;
}

export default function useFullPageScroll(enabled) {
  const { goRelative, isLocked } = usePageShift();
  const wheelAccRef = useRef(0);
  const touchStartYRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchTargetRef = useRef(null);
  const touchShiftedRef = useRef(false);
  const usingTouchRef = useRef(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const tryShift = (delta) => {
      if (isLocked()) return false;
      return goRelative(delta);
    };

    const onWheel = (event) => {
      if (usingTouchRef.current) return;
      if (isLocked()) {
        event.preventDefault();
        return;
      }
      if (isEditableTarget(event.target)) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (ancestorCanScroll(event.target, event.deltaY)) {
        wheelAccRef.current = 0;
        return;
      }

      event.preventDefault();
      wheelAccRef.current += event.deltaY;
      if (Math.abs(wheelAccRef.current) < WHEEL_THRESHOLD) return;

      const delta = wheelAccRef.current > 0 ? 1 : -1;
      wheelAccRef.current = 0;
      tryShift(delta);
    };

    const resetTouch = () => {
      touchStartYRef.current = null;
      touchStartXRef.current = null;
      touchTargetRef.current = null;
      touchShiftedRef.current = false;
    };

    const onTouchStart = (event) => {
      usingTouchRef.current = true;
      if (isLocked() || isEditableTarget(event.target)) {
        resetTouch();
        return;
      }
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      touchStartXRef.current = event.touches[0]?.clientX ?? null;
      touchTargetRef.current = event.target;
      touchShiftedRef.current = false;
      wheelAccRef.current = 0;
    };

    const onTouchMove = (event) => {
      if (touchStartYRef.current == null || touchShiftedRef.current) return;
      if (isLocked() || isEditableTarget(event.target)) return;

      const point = event.touches[0];
      if (!point) return;

      const deltaX = point.clientX - (touchStartXRef.current ?? point.clientX);
      const deltaY = touchStartYRef.current - point.clientY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) return;
      if (Math.abs(deltaY) < 8) return;
      if (ancestorCanScroll(touchTargetRef.current, deltaY)) return;

      event.preventDefault();
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;

      touchShiftedRef.current = true;
      const shifted = tryShift(deltaY > 0 ? 1 : -1);
      if (shifted) resetTouch();
    };

    const onTouchEnd = (event) => {
      usingTouchRef.current = false;
      if (isLocked() || touchShiftedRef.current || touchStartYRef.current == null) {
        resetTouch();
        return;
      }

      const endY = event.changedTouches[0]?.clientY;
      const deltaX =
        (event.changedTouches[0]?.clientX ?? 0) - (touchStartXRef.current ?? 0);
      const distance = touchStartYRef.current - endY;
      const target = touchTargetRef.current;
      resetTouch();

      if (Math.abs(deltaX) > Math.abs(distance)) return;
      if (Math.abs(distance) < SWIPE_THRESHOLD) return;
      if (ancestorCanScroll(target, distance)) return;
      tryShift(distance > 0 ? 1 : -1);
    };

    const onTouchCancel = () => {
      usingTouchRef.current = false;
      resetTouch();
    };

    const onKeyDown = (event) => {
      if (isLocked() || isEditableTarget(event.target)) return;
      const down = event.key === "ArrowDown" || event.key === "PageDown";
      const up = event.key === "ArrowUp" || event.key === "PageUp";
      if (!down && !up) return;
      const scroller = document.getElementById(SCROLLER_ID);
      if (scroller && canScrollInDirection(scroller, down ? 1 : -1)) return;
      event.preventDefault();
      tryShift(down ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true, capture: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true, capture: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd, { capture: true });
      window.removeEventListener("touchcancel", onTouchCancel, { capture: true });
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [enabled, goRelative, isLocked]);
}
