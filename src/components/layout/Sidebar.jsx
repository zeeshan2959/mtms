import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink, useLocation } from 'react-router-dom';

// Exact icon images from Figma (node 295:20357 — menu-main-start)
const imgHome = 'https://www.figma.com/api/mcp/asset/d606dd8b-e5bb-4bea-8ab0-8e57522cef42';
const imgCircleInfo = 'https://www.figma.com/api/mcp/asset/bb53456b-6a1b-4fcb-805c-aac899b304e9';
const imgGlobe = 'https://www.figma.com/api/mcp/asset/c44951b2-66fc-43a9-838f-13602927e24f';
const imgUsers = 'https://www.figma.com/api/mcp/asset/5b4a22a2-698f-448d-a0ca-41a418f01420';
const imgHand = 'https://www.figma.com/api/mcp/asset/986cd62f-8f1d-4232-ae7a-3d29419845cc';
const imgPhone = 'https://www.figma.com/api/mcp/asset/e9919d33-a6ae-407c-9456-e485a82f2798';

const NAV_ITEMS = [
  { path: '/', img: imgHome, label: 'Dashboard' },
  { path: '/about', img: imgCircleInfo, label: 'About' },
  { path: '/domain', img: imgGlobe, label: 'Domain' },
  { path: '/teams', img: imgUsers, label: 'R & D Teams' },
  { path: '/services', img: imgHand, label: 'Services' },
  { path: '/contact', img: imgPhone, label: 'Contact' },
];

export default function Sidebar() {
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({
    minWidth: 769,
    maxWidth: 1200,
  });
  const isDesktop = useMediaQuery({
    minWidth: 1201,
    maxWidth: 1919,
  });
  const isWeb = useMediaQuery({ minWidth: 1920 });

  return (
    <aside
      style={{
        position: 'fixed',
        left: isTablet || isMobile ? '0px' : '60px',
        top: isWeb ? '133px' : isDesktop ? '133px' : isTablet ? '100px' : '100px',
        height: '70%',
        width: 88,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isWeb ? 52 : isDesktop ? 52 : isTablet ? 32 : 36,
        padding: '7px 0',
      }}
    >
      {NAV_ITEMS.map(({ path, img, label }) => {
        const isActive =
          path === '/'
            ? location.pathname === '/'
            : location.pathname === path || location.pathname.startsWith(path + '/');
        const isHovered = hoveredPath === path;

        return (
          <NavLink
            key={path}
            to={path}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              width: isWeb ? 44 : isDesktop ? 36 : isTablet ? 36 : 30,
              height: isWeb ? 44 : isDesktop ? 36 : isTablet ? 36 : 30,
            }}
            onMouseEnter={() => setHoveredPath(path)}
            onMouseLeave={() => setHoveredPath(null)}
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

            {/* Hover label — appears to the RIGHT with transitionDelay */}
            <span
              style={{
                position: 'absolute',
                left: 'calc(100% + 14px)',
                top: '50%',
                transform: isHovered ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-8px)',
                background: 'rgba(6, 13, 26, 0.92)',
                color: '#ffffff',
                padding: '5px 14px',
                borderRadius: 8,
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                transitionDelay: isHovered ? '0.15s' : '0s',
                pointerEvents: 'none',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
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
