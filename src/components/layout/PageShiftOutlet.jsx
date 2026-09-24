import { useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePageShift } from "../../context/PageShiftContext";
import { gsap, prefersReducedMotion, SCROLLER_ID, ScrollTrigger } from "../../lib/gsap";
import Dashboard from "../../pages/Dashboard";
import About from "../../pages/About";
import Domain from "../../pages/Domain";
import RAndDTeams from "../../pages/RAndDTeams";
import Services from "../../pages/Services";
import Contact from "../../pages/Contact";

const PAGE_COMPONENTS = {
  "/": Dashboard,
  "/about": About,
  "/domain": Domain,
  "/teams": RAndDTeams,
  "/services": Services,
  "/contact": Contact,
};

function resolvePath(pathname) {
  return PAGE_COMPONENTS[pathname] ? pathname : "/";
}

function PageLayer({ path, layerRef, className }) {
  const Page = PAGE_COMPONENTS[path] ?? Dashboard;
  return (
    <div ref={layerRef} className={className} data-page={path}>
      <Page />
    </div>
  );
}

export default function PageShiftOutlet() {
  const location = useLocation();
  const { direction, setLocked } = usePageShift();
  const requestedPath = resolvePath(location.pathname);
  const [currentPath, setCurrentPath] = useState(requestedPath);
  const [outgoingPath, setOutgoingPath] = useState(null);
  const incomingRef = useRef(null);
  const outgoingRef = useRef(null);

  useLayoutEffect(() => {
    if (requestedPath === currentPath) return;
    setOutgoingPath(currentPath);
    setCurrentPath(requestedPath);
  }, [requestedPath, currentPath]);

  useLayoutEffect(() => {
    const scroller = document.getElementById(SCROLLER_ID);
    if (scroller) scroller.scrollTop = 0;

    if (!outgoingPath) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return undefined;
    }

    const incoming = incomingRef.current;
    const leaving = outgoingRef.current;
    if (!incoming) {
      setOutgoingPath(null);
      setLocked(false);
      return undefined;
    }

    setLocked(true);
    scroller?.classList.add("is-page-shifting");

    if (prefersReducedMotion()) {
      setOutgoingPath(null);
      setLocked(false);
      scroller?.classList.remove("is-page-shifting");
      ScrollTrigger.refresh();
      return undefined;
    }

    const incomingFrom = direction > 0 ? 100 : -100;
    const outgoingTo = direction > 0 ? -100 : 100;

    gsap.set(incoming, { yPercent: incomingFrom });
    if (leaving) gsap.set(leaving, { yPercent: 0, opacity: 1 });

    const timeline = gsap.timeline({
      defaults: { duration: 0.95, ease: "power3.inOut" },
      onComplete: finish,
    });

    if (leaving) {
      timeline.to(leaving, { yPercent: outgoingTo, opacity: 0.2 }, 0);
    }
    timeline.to(incoming, { yPercent: 0 }, 0);

    const safety = window.setTimeout(finish, 1400);
    let finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      window.clearTimeout(safety);
      gsap.set(incoming, { clearProps: "transform" });
      setOutgoingPath(null);
      setLocked(false);
      scroller?.classList.remove("is-page-shifting");
      ScrollTrigger.refresh();
    }

    return () => {
      window.clearTimeout(safety);
      timeline.kill();
    };
  }, [outgoingPath, currentPath, direction, setLocked]);

  return (
    <div className="page-shift-root">
      {outgoingPath && (
        <PageLayer
          key={outgoingPath}
          path={outgoingPath}
          layerRef={outgoingRef}
          className="page-shift-layer is-outgoing"
        />
      )}
      <PageLayer
        key={currentPath}
        path={currentPath}
        layerRef={incomingRef}
        className={`page-shift-layer${outgoingPath ? " is-incoming" : ""}`}
      />
    </div>
  );
}
