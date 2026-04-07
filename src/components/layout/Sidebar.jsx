import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink, useLocation } from 'react-router-dom';
import hoverSound from '/dragon-studio-futuristic-transition-499653.mp3';
import imgHome from '/home.png';
import imgCircleInfo from '/circle-info.png';
import imgGlobe from '/globe.png';
import imgUsers from '/users.png';
import imgHand from '/hand.png';
import imgPhone from '/phone.png';


const NAV_ITEMS = [
  { path: '/', img: imgHome, label: 'Dashboard' },
  { path: '/about', img: imgCircleInfo, label: 'About' },
  { path: '/domain', img: imgGlobe, label: 'Domains' },
  { path: '/teams', img: imgUsers, label: 'R & D Teams' },
  { path: '/services', img: imgHand, label: 'Services' },
  { path: '/contact', img: imgPhone, label: 'Contact' },
];

export default function Sidebar() {
  const [hoveredPath, setHoveredPath] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const audioRef = useRef(null);
  let collapseTimeout = useRef(null);

  // ✅ Unlock audio on first user interaction
  useEffect(() => {
    audioRef.current = new Audio(hoverSound);

    const unlockAudio = () => {
      audioRef.current
        .play()
        .then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        })
        .catch(() => {});

      window.removeEventListener('click', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);

    return () => window.removeEventListener('click', unlockAudio);
  }, []);

  const playSound = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1200 });
  const isDesktop = useMediaQuery({ minWidth: 1201, maxWidth: 1919 });
  const isWeb = useMediaQuery({ minWidth: 1920 });

  return (
    <aside
      onMouseLeave={() => {
        collapseTimeout.current = setTimeout(() => {
          setIsExpanded(false);
        }, 200); // smooth delay
      }}
      onMouseEnter={() => {
        clearTimeout(collapseTimeout.current);
      }}
      style={{
        position: 'fixed',
        left: isTablet || isMobile ? '0px' : '60px',
        top: isWeb || isDesktop ? '133px' : '100px',
        height: '70%',
        width: 88,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isWeb || isDesktop ? 52 : isTablet ? 32 : 36,
        padding: '7px 0',
      }}
    >
      {NAV_ITEMS.map(({ path, img, label }, index) => {
        const isActive =
          path === '/'
            ? location.pathname === '/'
            : location.pathname === path ||
              location.pathname.startsWith(path + '/');

        const isHovered = hoveredPath === path;

        // ✅ Keep layout stable
        const isVisible = isExpanded || index === 0;

        return (
          <NavLink
            key={path}
            to={path}
            onMouseEnter={() => {
              setHoveredPath(path);
              playSound();

              // expand only when hovering home
              if (index === 0) {
                setIsExpanded(true);
              }
            }}
            onMouseLeave={() => setHoveredPath(null)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',

              width: isWeb ? 44 : isDesktop ? 36 : isTablet ? 36 : 30,
              height: isWeb ? 44 : isDesktop ? 36 : isTablet ? 36 : 30,

              // ✅ smooth show/hide without shifting
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translateY(0)'
                : 'translateY(-10px)',
              pointerEvents: isVisible ? 'auto' : 'none',

              transition: 'all 0.3s ease',
            }}
          >
            <img
              src={img}
              alt={label}
              style={{
                width: isWeb ? 38 : isDesktop ? 36 : isTablet ? 36 : 30,
                height: isWeb ? 38 : isDesktop ? 36 : isTablet ? 36 : 30,
                objectFit: 'contain',
                opacity: isActive ? 1 : isHovered ? 0.85 : 0.5,
                filter: isActive
                  ? 'brightness(1.4) drop-shadow(0 0 8px rgba(255,255,255,0.35))'
                  : isHovered
                  ? 'brightness(1.2)'
                  : 'none',
                transition: 'opacity 0.2s ease, filter 0.2s ease',
              }}
            />

            {/* label */}
            <span
              style={{
                position: 'absolute',
                left: 'calc(100% + 14px)',
                top: '50%',
                transform: isHovered
                  ? 'translateY(-50%) translateX(0)'
                  : 'translateY(-50%) translateX(-8px)',
                background: isMobile ? 'rgba(6, 13, 26, 0.92)' : 'transparent',
                color: '#ffffff',
                padding: '5px 14px',
                borderRadius: 8,
                fontSize: 16,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                transitionDelay: isHovered ? '0.15s' : '0s',
                pointerEvents: 'none',
                // border: '1px solid rgba(255,255,255,0.12)',
                // backdropFilter: 'blur(10px)',
                // boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                zIndex: 100,
              }}
            >
              {label}
            </span>
          </NavLink>
        );
      })}
    </aside>
  );
}