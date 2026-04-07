import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import imgLogo from '/Logo.svg';

export default function Topbar() {
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
  const logoHeight = isMobile
    ? 24
    : isTablet
      ? 30
      : isDesktop
        ? 36
        : 42;

  return (
    <header
      style={{
        padding: isWeb ? '68px 76px 20px 60px' : isDesktop ? '40px 66px 20px 66px' : isTablet ? '40px 20px 20px' : '30px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'transparent',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      {/* MTMS Engineering logo — exact Figma asset */}
      <Link to="/">
        <img
          src={imgLogo}
          alt="MTMS Engineering"
          className="h-[20px] max-w-[100px] md:h-[26px] md:max-w-[140px] lg:h-[32px] lg:max-w-[180px] 2xl:h-[38px] 2xl:max-w-[220px] w-auto object-contain block"
        />
      </Link>

      {/* "Book a meeting" pill button — matches Figma node 286:20246 */}
      <button
        style={{
          padding: isWeb ? '10px 32px' : isDesktop ? '10px 32px' : isTablet ? '10px 22px' : '8px 12px',
          border: isWeb ? '2px solid #ffffff' : isDesktop ? '2px solid #ffffff' : isTablet ? '1px solid #ffffff' : '1px solid #ffffff',
          borderRadius: 35,
          background: 'transparent',
          color: '#ffffff',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: isWeb ? '16px' : isDesktop ? '16px' : isTablet ? '14px' : '12px',
          cursor: 'pointer',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          transition: 'background 0.2s ease',
          width: isWeb ? '388px' : isDesktop ? '388px' : isTablet ? '288px' : '188px',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        Book a meeting
      </button>
    </header>
  );
}
