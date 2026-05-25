import { useEffect, useRef } from "react";

/**
 * Figma Services (1:1396) / Home (1:1195) background.
 * Uses Base.mp4 directly — same ambient teal motion as the design reference.
 */
export default function KineticBackground({ visible = true, onReady }) {
  const videoRef = useRef(null);
  const readyRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const markReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      onReady?.();
    };

    const onCanPlay = () => {
      video.play().catch(() => {});
      markReady();
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", markReady);

    if (video.readyState >= 2) {
      video.play().catch(() => {});
      markReady();
    }

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", markReady);
    };
  }, [onReady]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <source src="/Base.mp4" type="video/mp4" />
    </video>
  );
}
