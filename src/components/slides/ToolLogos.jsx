// High-Fidelity Vector Logos Matching Official Industrial Brands & Figma Specifications

export function CatiaLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="catiaCompass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0072CE" />
          <stop offset="60%" stopColor="#00539B" />
          <stop offset="100%" stopColor="#002D62" />
        </linearGradient>
      </defs>
      {/* 3DS Compass Icon */}
      <g transform="translate(6, 6)">
        <circle cx="18" cy="18" r="16" fill="url(#catiaCompass)" />
        <circle cx="18" cy="18" r="13" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        {/* Compass Cardinal Marks */}
        <polygon points="18,5 21,12 18,10 15,12" fill="#FFFFFF" />
        <polygon points="31,18 24,15 26,18 24,21" fill="rgba(255,255,255,0.7)" />
        <polygon points="18,31 15,24 18,26 21,24" fill="rgba(255,255,255,0.7)" />
        <polygon points="5,18 12,21 10,18 12,15" fill="rgba(255,255,255,0.7)" />
        {/* North Arrow Pointer */}
        <polygon points="18,8 24,18 18,15" fill="#E82A1F" />
        <polygon points="18,8 12,18 18,15" fill="#FFFFFF" />
        <circle cx="18" cy="18" r="2.5" fill="#FFFFFF" />
      </g>
      {/* CATIA Wordmark */}
      <text x="46" y="27" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="15" letterSpacing="0.8">
        CATIA
      </text>
      <text x="47" y="38" fill="#0072CE" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8.5" letterSpacing="1.2">
        3DEXPERIENCE
      </text>
    </svg>
  );
}

export function SiemensNxLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* SIEMENS Petrol Brandmark */}
      <text x="6" y="19" fill="#00A3A6" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="11" letterSpacing="1.5">
        SIEMENS
      </text>
      {/* Official Siemens NX Badge */}
      <g transform="translate(6, 24)">
        {/* NX Badge Background Pill */}
        <rect x="0" y="0" width="38" height="18" rx="4" fill="#00646E" />
        <text x="19" y="13.5" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="11" letterSpacing="1">
          NX
        </text>
        {/* Accent Orange/Petrol Line */}
        <rect x="42" y="7.5" width="28" height="3" rx="1.5" fill="#EB780A" />
      </g>
    </svg>
  );
}

export function CreoLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ptcGreen1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9BD438" />
          <stop offset="100%" stopColor="#78BE20" />
        </linearGradient>
        <linearGradient id="ptcGreen2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#008533" />
          <stop offset="100%" stopColor="#005A20" />
        </linearGradient>
      </defs>
      {/* Official PTC Curved Geometric Ribbon */}
      <g transform="translate(8, 9)">
        {/* Left Green Leaf / Curve */}
        <path
          d="M10 2C4 2 0 6 0 12C0 18 4 23 10 25C7 22 6 18 6 13C6 8 8 4 10 2Z"
          fill="url(#ptcGreen2)"
        />
        {/* Main P Ring */}
        <path
          d="M11 2C18 2 23 6 23 13C23 20 18 24 11 24C15 22 17 18 17 13C17 8 14 4 11 2Z"
          fill="url(#ptcGreen1)"
        />
        <circle cx="11.5" cy="13" r="4.5" fill="#0B1320" />
      </g>
      {/* PTC Brand & creo text */}
      <text x="38" y="21" fill="#8899A6" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="9" letterSpacing="0.8">
        PTC
      </text>
      <text x="38" y="36" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.5">
        creo
      </text>
    </svg>
  );
}

export function SolidWorksLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 130 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 3D Red Isometric Cube Block */}
      <g transform="translate(8, 8)">
        {/* Top facet */}
        <polygon points="15,2 29,9 15,16 1,9" fill="#EF4444" />
        {/* Left facet */}
        <polygon points="1,9 15,16 15,31 1,24" fill="#DC2626" />
        {/* Right facet */}
        <polygon points="29,9 29,24 15,31 15,16" fill="#991B1B" />
        {/* Embossed S on Left facet */}
        <path d="M5 14 C8 12 11 15 8 18 C5 21 9 23 11 21" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Embossed W on Right facet */}
        <path d="M19 14 L21 21 L23 16 L25 21 L27 14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      {/* SOLIDWORKS Wordmark */}
      <text x="44" y="24" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.5">
        SOLIDWORKS
      </text>
      <text x="44" y="36" fill="#EF4444" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" letterSpacing="0.8">
        DASSAULT SYSTÈMES
      </text>
    </svg>
  );
}

export function TeamcenterLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 130 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tcSwirl1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A3A6" />
          <stop offset="100%" stopColor="#00646E" />
        </linearGradient>
        <linearGradient id="tcSwirl2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="tcSwirl3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* Siemens Multi-Segmented Orbital Swirl */}
      <g transform="translate(8, 9)">
        {/* Outer Teal Arc */}
        <path d="M15 3 A13 13 0 0 1 28 15" stroke="url(#tcSwirl1)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Blue Arc */}
        <path d="M27 18 A13 13 0 0 1 12 28" stroke="url(#tcSwirl2)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Orange Arc */}
        <path d="M9 25 A13 13 0 0 1 3 14" stroke="url(#tcSwirl3)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Center Node */}
        <circle cx="15.5" cy="15.5" r="4.5" fill="#00A3A6" />
      </g>
      {/* Teamcenter Wordmark */}
      <text x="44" y="23" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.2">
        Teamcenter
      </text>
      <text x="44" y="35" fill="#00A3A6" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" letterSpacing="1">
        SIEMENS PLM
      </text>
    </svg>
  );
}

export function EnoviaLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="enoviaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      {/* 3DS Compass */}
      <g transform="translate(8, 8)">
        <circle cx="16" cy="16" r="14" fill="url(#enoviaGrad)" />
        <polygon points="16,4 20,12 16,10 12,12" fill="#FFFFFF" />
        <polygon points="16,6 21,16 16,13" fill="#E82A1F" />
        <polygon points="16,6 11,16 16,13" fill="#FFFFFF" />
        <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
      </g>
      <text x="44" y="24" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.8">
        ENOVIA
      </text>
      <text x="44" y="35" fill="#60A5FA" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" letterSpacing="1">
        3DEXPERIENCE
      </text>
    </svg>
  );
}

export function CodepLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(8, 8)">
        {/* Technical Data Exchange Icon */}
        <rect x="2" y="2" width="28" height="28" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        {/* Arrows indicating data exchange */}
        <path d="M8 12 H22 M18 8 L22 12 L18 16" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 20 H10 M14 24 L10 20 L14 16" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="44" y="24" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">
        CODEP
      </text>
      <text x="44" y="35" fill="#38BDF8" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" letterSpacing="0.8">
        PLM INTEGRATION
      </text>
    </svg>
  );
}

export function RamsisLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ergonomic Biomechanical Manikin Symbol */}
      <g transform="translate(8, 6)" stroke="#06B6D4" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="7" r="4.5" fill="#06B6D4" />
        {/* Torso & spine */}
        <path d="M20 12 L18 24 L10 28 L6 36" />
        {/* Arm posture */}
        <path d="M19 16 L12 20 L10 14" />
        {/* Vehicle seat baseline */}
        <path d="M4 36 H28" stroke="#64748B" strokeWidth="1.5" />
      </g>
      <text x="42" y="24" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.8">
        RAMSIS
      </text>
      <text x="42" y="35" fill="#06B6D4" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" letterSpacing="0.8">
        ERGONOMICS
      </text>
    </svg>
  );
}

export function AnsysLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Official ANSYS Geometric Chevron */}
      <g transform="translate(8, 8)">
        <polygon points="6,2 17,2 26,30 15,30" fill="#FFB71B" />
        <polygon points="20,2 31,2 22,30 11,30" fill="#1E293B" />
      </g>
      <text x="46" y="25" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="15" letterSpacing="0.5">
        Ansys
      </text>
      <text x="46" y="36" fill="#FFB71B" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" letterSpacing="0.8">
        SIMULATION
      </text>
    </svg>
  );
}

export function HyperMeshLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Altair Geometric Prism Mesh */}
      <g transform="translate(8, 7)">
        <polygon points="16,3 30,27 2,27" stroke="#38BDF8" strokeWidth="2" fill="none" />
        <line x1="16" y1="3" x2="16" y2="27" stroke="#F43F5E" strokeWidth="1.5" />
        <line x1="9" y1="15" x2="23" y2="15" stroke="#F59E0B" strokeWidth="1.5" />
      </g>
      <text x="44" y="21" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="10" letterSpacing="0.8">
        ALTAIR
      </text>
      <text x="44" y="34" fill="#38BDF8" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.3">
        HyperMesh
      </text>
    </svg>
  );
}

export function SimcenterLogo({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Siemens Simcenter Waveform */}
      <g transform="translate(6, 6)">
        <path
          d="M4 22 C10 10, 18 10, 24 20 C30 30, 38 30, 44 18"
          stroke="#00A3A6"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="14" cy="14" r="3" fill="#E82A1F" />
        <circle cx="34" cy="26" r="3" fill="#22D3EE" />
      </g>
      <text x="56" y="23" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.8">
        Simcenter
      </text>
      <text x="56" y="35" fill="#00A3A6" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="8" letterSpacing="1">
        SIEMENS
      </text>
    </svg>
  );
}
