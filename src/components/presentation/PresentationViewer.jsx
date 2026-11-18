import { useState, useEffect, useCallback, useRef } from "react";
import PresentationControls from "./PresentationControls";

export default function PresentationViewer({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef(null);
  const subStepHandlerRef = useRef(null);

  const totalSlides = slides.length;

  const registerSubStep = useCallback((handler) => {
    subStepHandlerRef.current = handler;
    return () => {
      subStepHandlerRef.current = null;
    };
  }, []);

  const goToSlide = useCallback((index) => {
    subStepHandlerRef.current = null;
    setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    subStepHandlerRef.current = null;
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    subStepHandlerRef.current = null;
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Handlers that check sub-step first before changing slide
  const handleNext = useCallback(() => {
    if (subStepHandlerRef.current?.canNext()) {
      subStepHandlerRef.current.next();
      return;
    }
    nextSlide();
  }, [nextSlide]);

  const handlePrev = useCallback(() => {
    if (subStepHandlerRef.current?.canPrev()) {
      subStepHandlerRef.current.prev();
      return;
    }
    prevSlide();
  }, [prevSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, goToSlide, totalSlides]);

  // Touch Swipe Navigation
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current == null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? null;
    if (touchEndX == null) return;

    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Automatically zero out parent layout padding on Cover Slide (Slide 0) for true full-bleed edge-to-edge display
  useEffect(() => {
    const main = document.getElementById("app-scroll");
    if (!main) return;
    if (currentIndex === 0) {
      main.style.padding = "0px";
    } else {
      main.style.padding = "";
    }
    return () => {
      main.style.padding = "";
    };
  }, [currentIndex]);

  const currentSlide = slides[currentIndex] || slides[0];
  const SlideComponent = currentSlide.component;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full min-h-full flex flex-col justify-between ${
        currentIndex === 0 ? "pb-0" : "pb-24"
      } select-none`}
    >
      {/* Current Slide Container */}
      <div key={currentSlide.id} className="w-full flex-1">
        <SlideComponent
          onNext={handleNext}
          onPrev={handlePrev}
          onGoTo={goToSlide}
          slideIndex={currentIndex}
          totalSlides={totalSlides}
          registerSubStep={registerSubStep}
        />
      </div>

      {/* Floating Presentation Navigation Dock (hidden on Cover Slide) */}
      {currentIndex > 0 && (
        <PresentationControls
          currentIndex={currentIndex}
          totalSlides={totalSlides}
          onPrev={handlePrev}
          onNext={handleNext}
          onGoTo={goToSlide}
          slides={slides}
        />
      )}
    </div>
  );
}
