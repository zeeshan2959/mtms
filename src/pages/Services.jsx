import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import clickSoundFile from "/clickedSound.wav";
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';

const clickAudio = new Audio(clickSoundFile);

// ── All services from the Figma Moving Menu ──
const SERVICES = [
  {
    name: 'Design Release \nManagement',
    subtitle: 'Managing design release cycles with controlled documentation, reviews, and change traceability',
    description:
      'Comprehensive management of design release processes from concept to production. Our systems ensure controlled documentation, version management, and seamless handover between engineering teams.\n\nWe implement structured approval workflows that maintain data integrity throughout the product lifecycle, with full traceability from design intent to released engineering change.',
    frontTitle: 'Managing design release cycles with controlled documentation, reviews, and change traceability.',
    frontDescription: 'Ensuring accurate release governance across CAD, BOM, and PLM systems.',
    frontItems: ['Design Documentation', 'Data Structure', 'PLM Integration', 'Product Validations'],
    frontIconTypes: ['design-documentation', 'data-structure', 'plm-integration', 'product-validation'],
  },
  {
    name: 'BOM & \nConfiguration \nManagement',
    subtitle: 'Structured BOM hierarchies and full configuration control',
    description:
      'Complete Bill of Materials management and configuration control services. We provide structured BOM hierarchies, change management processes, and configuration baseline management to ensure product integrity across all variants and revisions.\n\nOur solutions integrate with leading PLM platforms for real-time BOM synchronisation and multi-level variant management across complex product architectures.',
    frontTitle: 'Managing BOM structures, configuration baselines, and engineering change control.',
    frontDescription: 'Maintaining product data consistency across variants, releases, and PLM workflows.',
    frontItems: ['Data Structure', 'PLM Ecosystem Validation Readiness', 'PPAP Process', 'Product Manufacturability'],
    frontIconTypes: ['data-structure', 'plm-ecosystem', 'ppap-process', 'product-manufacturability'],
  },
  {
    name: 'PLM Workflow \nControl',
    subtitle: 'Advanced PLM workflow automation and process control',
    description:
      'Advanced PLM workflow automation and control systems that streamline your engineering processes. We design and implement customised workflows that reduce cycle time, minimise errors, and ensure compliance with industry standards.\n\nOur PLM expertise spans CATIA, Teamcenter, Enovia, and other leading platforms, enabling workflows tailored to your team structure and business processes.',
    frontTitle: 'Controlling PLM workflows, approvals, and engineering process readiness.',
    frontDescription: 'Standardizing process governance across release, validation, and manufacturing gates.',
    frontItems: ['PLM Integration', 'PLM Ecosystem Validation Readiness', 'Product Manufacturability', 'Product Validations'],
    frontIconTypes: ['plm-integration', 'plm-ecosystem', 'product-manufacturability', 'product-validation'],
  },
  {
    name: 'Documentation \n& Reporting',
    subtitle: 'Comprehensive documentation frameworks and reporting pipelines',
    description:
      'Professional technical documentation and reporting services that keep stakeholders informed and projects on track. We create structured documentation frameworks, automated reporting pipelines, and dashboard solutions that provide real-time visibility.\n\nFrom engineering specifications to programme-level status reports, our documentation services ensure consistent quality and traceability across all project deliverables.',
    frontTitle: 'Creating technical documentation, engineering reports, and release-ready deliverables.',
    frontDescription: 'Maintaining traceable documentation for design reviews, validation, and customer reporting.',
    frontItems: ['Design Documentation', 'PPAP Process', 'Product Validations', 'OEM and Tier 1 Technical Coordination'],
    frontIconTypes: ['design-documentation', 'ppap-process', 'product-validation', 'oem-coordination'],
  },
  {
    name: 'Design & \nDevelopment',
    subtitle: 'End-to-end 3D modelling, engineering design, and detailing',
    description:
      'Complete engineering design and development services covering conceptual design through detailed engineering. Our team delivers high-quality 3D models, technical drawings, and design specifications using industry-leading CAD tools.\n\nWe handle complex geometry, Class A surfacing, and large assembly design with a structured approach that ensures downstream manufacturing and assembly compatibility from day one.',
    frontTitle: 'End-to-end 3D modelling, engineering design, and detailing',
    frontDescription: 'Supporting concept development through validated CAD models, drawings, and engineering documentation.',
    frontItems: ['3D/2D Modeling', 'Engineering Design', 'Design Documentation', 'Design and Manufacturing Feasibility Reviews'],
    frontIconTypes: ['3d-modeling', 'engineering-design', 'design-documentation', 'manufacturing-review'],
  },
  {
    name: 'Validation and \nAnalysis',
    subtitle: 'Rigorous validation and engineering analysis workflows',
    description:
      'Rigorous validation and analysis services ensuring product designs meet all technical and regulatory requirements. We conduct systematic design reviews, simulation-based validation, and structured analysis workflows that identify potential issues early.\n\nOur teams are proficient in FEA, CFD, tolerance analysis, and functional safety assessments across mechanical, electrical, and systems engineering domains.',
    frontTitle: 'Validating product performance through component and system-level analysis.',
    frontDescription: 'Supporting engineering sign-off with digital checks, readiness reviews, and product validation workflows.',
    frontItems: ['Component and System Level Analysis', 'Product Validations', 'Clash Verification and Replica Governance', 'PLM Ecosystem Validation Readiness'],
    frontIconTypes: ['component-analysis', 'product-validation', 'clash', 'plm-ecosystem'],
  },
  {
    name: 'DMU/PLM \nIntegration',
    subtitle: 'Ensuring digital continuity and spatial validation with CATIA DMU, ENOVIA, and Teamcenter',
    description:
      'Digital mock-up and PLM integration services that connect engineering data, product structures, and validation workflows. We ensure data consistency across CAD, DMU, and PLM platforms while enabling collaborative design reviews.\n\nOur approach supports assembly creation, clash checks, session control, and structured product data management across complex engineering programmes.',
    frontTitle: 'End-to-end 3D modelling, engineering design, and detailing',
    frontDescription: 'Ensuring digital continuity and spatial validation with CATIA DMU, ENOVIA, Teamcenter',
    frontItems: ['DMU Assembly Creation', 'Clash Verification and Replica Governance', 'CAD Import and Session Control', 'Data Structure'],
    frontIconTypes: ['assembly', 'clash', 'cad-import', 'data-structure'],
  },
  {
    name: 'Packaging\n Feasibility',
    subtitle: 'Conducting layout, interface, and feasibility studies with DMU reviews',
    description:
      'Packaging feasibility services that validate spatial integration, interface clearance, and manufacturability constraints before release. We conduct layout studies, interface studies, and feasibility reviews across CATIA V5 and Siemens NX environments.\n\nOur DMU reviews help teams identify conflicts early and align product packaging with engineering and manufacturing requirements.',
    frontTitle: 'Conducting layout, interface, and feasibility studies in CATIA V5, Siemens NX with DMU reviews.',
    frontDescription: 'Verifying product packaging, clearances, and integration constraints before release.',
    frontItems: ['Layout Studies', 'Interface Studies', 'Feasibility Studies', 'DMU Reviews'],
    frontIconTypes: ['layout', 'interface', 'feasibility', 'dmu-reviews'],
  },
  {
    name: 'Quality and \nCompliance',
    subtitle: 'Quality readiness, compliance checks, and product validation governance',
    description:
      'Quality and compliance services that support product readiness, regulatory alignment, and validation traceability. We help structure quality gates, approval evidence, and readiness reviews across engineering and manufacturing workflows.\n\nOur team supports PPAP documentation, product validation tracking, supplier coordination, and PLM readiness reviews to maintain compliance across the programme lifecycle.',
    frontTitle: 'Ensuring quality readiness, compliance evidence, and product validation traceability.',
    frontDescription: 'Supporting PPAP, validation governance, and PLM readiness across engineering release gates.',
    frontItems: ['PPAP Process', 'Product Validations', 'PLM Ecosystem Validation Readiness', 'OEM and Tier 1 Technical Coordination'],
    frontIconTypes: ['ppap-process', 'product-validation', 'plm-ecosystem', 'oem-coordination'],
  },
  {
    name: 'Supplier & \nStakeholder \nCoordination',
    subtitle: 'Coordinating OEM, Tier 1, supplier, and stakeholder engineering inputs',
    description:
      'Supplier and stakeholder coordination services that keep multi-party engineering programmes aligned. We manage technical communication, review cadence, issue tracking, and data exchange between OEMs, Tier 1 suppliers, and internal teams.\n\nOur coordination model keeps documentation, manufacturability inputs, and PLM updates synchronized across all programme stakeholders.',
    frontTitle: 'Coordinating OEM, Tier 1, supplier, and stakeholder engineering inputs.',
    frontDescription: 'Aligning technical reviews, issue resolution, and documentation across programme teams.',
    frontItems: ['OEM and Tier 1 Technical Coordination', 'PLM Integration', 'Design Documentation', 'Product Manufacturability'],
    frontIconTypes: ['oem-coordination', 'plm-integration', 'design-documentation', 'product-manufacturability'],
  },
  {
    name: 'Tooling & \nManufacturing \nFeasibility',
    subtitle: 'Reviewing product manufacturability, tooling feasibility, and system-level readiness',
    description:
      'Tooling and manufacturing feasibility services that evaluate product designs against production constraints. We review tool access, manufacturability, assembly strategy, and design readiness before downstream industrialization.\n\nOur feasibility reviews help reduce late design changes by validating component and system-level risks early in the product lifecycle.',
    frontTitle: 'Reviewing product manufacturability, tooling feasibility, and system-level readiness.',
    frontDescription: 'Checking designs against manufacturing constraints before release and industrialization.',
    frontItems: ['Product Manufacturability', 'Design and Manufacturing Feasibility Reviews', '3D/2D Modeling', 'Component and System Level Analysis'],
    frontIconTypes: ['product-manufacturability', 'manufacturing-review', '3d-modeling', 'component-analysis'],
  },
];

const DEFAULT_FRONT_ITEMS = ['Engineering Study', 'Digital Validation', 'Process Control', 'Data Structure'];
const DEFAULT_FRONT_ICON_TYPES = ['engineering-design', 'plm-ecosystem', 'product-validation', 'data-structure'];

// ── Tab left-offset staircase (matches Figma node 741:15863 exact pixel values) ──
// delta = index − activeIndex
// delta 0  → 112 px (rightmost, active)
// delta ±1 → 39 px
// delta ±2+→ −32 px (leftmost, partially clipped)
function tabLeft(delta) {
  if (delta === 0) return 112;
  if (Math.abs(delta) === 1) return 39;
  return -32;
}

// Opacity: active=full, ±1=visible, ±2=faint, ±3+=invisible
function tabOpacity(delta) {
  if (delta === 0) return 1;
  if (Math.abs(delta) === 1) return 0.70;
  if (Math.abs(delta) === 2) return 0.35;
  return 0;
}

function playClickSound() {
  clickAudio.currentTime = 0; // restart if spam clicking
  clickAudio.play().catch(() => { });
}

export default function Sercices() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isFlipped, setIsFlipped] = useState(false);
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

  useEffect(() => {
    setIsFlipped(false);
  }, [activeIndex]);

  const goNext = useCallback(() => {
    playClickSound();
    setActiveIndex(i => Math.min(i + 1, SERVICES.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    playClickSound();
    setActiveIndex(i => Math.max(i - 1, 0));
  }, []);

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < SERVICES.length - 1;
  const active = SERVICES[activeIndex];
  const activeFlipItems = active.flipContent ?? active.description.split('\n\n');
  const frontItems = active.frontItems ?? DEFAULT_FRONT_ITEMS;
  const frontIconTypes = active.frontIconTypes ?? DEFAULT_FRONT_ICON_TYPES;
  const frontTitle = active.frontTitle ?? active.subtitle;
  const frontDescription = active.frontDescription ?? active.description.split('\n\n')[0];

  return (
    <div
      style={{
        margin: isMobile ? 0 : '-24px -36px -40px',
        minHeight: 'calc(100vh - 76px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      className='px-2 sm:px-4 md:p-[40px 48px 48px 0]'
    >
      {/* ─── Services title block ─── */}
      <div style={{ paddingLeft: isMobile ? 0 : isWeb ? '46%' : isDesktop ? '32%' : isTablet ? '26%' : '36%', marginBottom: isMobile ? 24 : 40 }}>
        <AnimatedText
          as="h1"
          text="Services"
          split="chars"
          stagger={0.05}
          className="text-[32px] md:text-[44px] lg:text-[66px] xl:text-[66px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]"
          style={{ fontSize: isWeb && '65px' }}
        />
        <Reveal
          as="p"
          delay={0.2}
          y={24}
          style={{
            fontSize: 15,
            fontFamily: 'Poppins, sans-serif',
            color: 'rgba(255,255,255,0.60)',
            lineHeight: 1.7,
            maxWidth: 920,
          }}
        >
          End-to-End engineering excellence — from concept design to validation and compliance.Our integrated approach ensures seamless development, precise release management, and uncompromised quality at every stage.

        </Reveal>
      </div>

      {/* ─── Moving Menu ─── */}
      <Reveal className='px-0 sm:pl-32 flex flex-col lg:flex-row items-center lg:flex-start justify-end gap-0' y={48} delay={0.3} duration={1}>
        {/* ── Left panel: staircase tab list (414 × 556 px — exact Figma) ── */}
        <div
          className='order-2 block lg:order-1'
          style={{
            position: 'relative',
            width: isMobile ? '100%' : isTablet ? 414 : isDesktop ? 414 : isWeb ? 514 : 514,
            height: isMobile ? 'auto' : isTablet ? 411 : isDesktop ? 511 : 511,
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {SERVICES.map((svc, i) => {
            const delta = i - activeIndex;
            const left = tabLeft(delta);
            // Figma exact top values reproduced:
            // delta -2 → 10 px, -1 → 146 px, 0 → 318 px, +1 → 454 px, +2 → 590 px
            // Pattern: 10, +136, +172(active gap), +136, +136
            const tops = { '-4': -162, '-3': -106, '-2': 1, '-1': 106, '0': 218, '1': 334, '2': 450, '3': 626, '4': 762 };
            const top = tops[String(delta)] ?? (delta < -4 ? -400 : 862 + (delta - 4) * 136);
            const opacity = tabOpacity(delta);
            const isActive = delta === 0;

            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  position: isMobile ? 'relative' : 'absolute',
                  left: isMobile ? 0 : left,
                  top: isMobile ? 'auto' : top,
                  width: isMobile ? '100%' : isTablet ? 288 : isDesktop ? 288 : isWeb ? 388 : 388,
                  background: isActive ? 'rgba(221,221,221,0.18)' : 'rgba(0,0,0,0)',
                  border: `${isActive ? '1px solid rgba(255,255,255,0.25)' : '1px solid white'}`,
                  borderRadius: 10,
                  padding: isMobile ? '8px 16px' : '10px 30px',
                  color: '#ffffff',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: isMobile ? 11 : isTablet ? 14 : isDesktop ? 16 : 22,
                  textAlign: 'center',
                  lineHeight: 1.25,
                  whiteSpace: 'pre-line',  // honour \n line breaks in name
                  opacity: isMobile ? 1 : opacity,
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  marginBottom: isMobile ? 8 : 0,
                  transition: [
                    'left 0.42s cubic-bezier(0.4,0,0.2,1)',
                    'top 0.42s cubic-bezier(0.4,0,0.2,1)',
                    'opacity 0.30s ease',
                    'background 0.25s ease',
                    'border-color 0.25s ease',
                  ].join(', '),
                  backdropFilter: isActive ? 'blur(8px)' : 'none',
                }}
              >
                {svc.name}
              </button>
            );
          })}
        </div>

        {/* ── Right panel: content card (544 × 511 px — exact Figma) ── */}
        <div
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
          onFocus={() => setIsFlipped(true)}
          onBlur={() => setIsFlipped(false)}
          style={{
            width: isMobile ? '100%' : isTablet ? 444 : isDesktop ? 544 : isWeb ? 544 : 544,
            minHeight: isMobile ? 360 : isTablet ? 311 : isDesktop ? 411 : 511,
            flexShrink: 0,
            position: 'relative',
            perspective: 1200,
          }}
          className='order-1 ml-0 md:ml-[30px] lg:order-2'
        >
          <div
            tabIndex={0}
            aria-label={`${active.flipTitle ?? active.name.replace(/\s+/g, ' ')} details`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              minHeight: 'inherit',
              border: 0,
              padding: 0,
              background: 'transparent',
              color: 'inherit',
              textAlign: 'left',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              outline: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'rgba(221,221,221,0.20)',
                borderRadius: 18,
                border: '1px solid rgba(221,221,221,0.20)',
                padding: isMobile ? '20px 18px 104px' : '30px 34px 140px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Title */}
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: isMobile ? 14 : 20,
                  color: '#ffffff',
                  lineHeight: 1.35,
                  marginBottom: 0,
                }}
              >
                {frontTitle}
              </p>

              {/* Divider */}
              <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.10)', margin: isMobile ? '8px 0 14px' : '10px 0 20px' }} />
              <p
                style={{
                  margin: 0,
                  maxWidth: 480,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: isMobile ? 12 : 16,
                  color: 'rgba(255,255,255,0.90)',
                  lineHeight: 1.45,
                }}
              >
                {frontDescription}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${frontItems.length}, minmax(0, 1fr))`,
                  gap: isMobile ? 8 : 20,
                  alignItems: 'start',
                  marginTop: isMobile ? 16 : 26,
                }}
              >
                {frontItems.map((label, index) => (
                  <div
                    key={label}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      color: '#ffffff',
                    }}
                  >
                    
                    <ServiceFrontIcon type={frontIconTypes[index % frontIconTypes.length]} size={isMobile ? 46 : 66} />
                    <span
                      style={{
                        marginTop: 6,
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: isMobile ? 8 : 10,
                        lineHeight: 1.2,
                        maxWidth: 118,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'rgba(221,221,221,0.20)',
                borderRadius: 18,
                border: '1px solid rgba(221,221,221,0.20)',
                padding: isMobile ? '14px 18px 92px' : '18px 30px 104px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxHeight: '100%',
                  overflowY: 'auto',
                  // background: 'rgba(24,24,24,0.38)',
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    padding: '8px 16px',
                    background: '#ee7135',
                    color: '#ffffff',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: isMobile ? 16 : 18,
                    fontWeight: 500,
                    lineHeight: 1.15,
                    textAlign: 'center',
                  }}
                >
                  {active.flipTitle ?? active.name.replace(/\s+/g, ' ')}
                </h2>

                <ul
                  style={{
                    margin: 0,
                    padding: isMobile ? '14px 14px 16px 24px' : '16px 8px 8px 2px',
                    color: '#ffffff',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: isMobile ? 11 : isTablet ? 12 : 14,
                    fontWeight: 400,
                    lineHeight: 1.45,
                  }}
                >
                  {activeFlipItems.map((item, index) => (
                    <li key={index} style={{ marginBottom: index === activeFlipItems.length - 1 ? 0 : 14 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Prev / Next navigation ── (Figma: bottom-right of content panel) */}
          <div
            onClick={event => event.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
              marginTop: 22,
              position: 'absolute',
              left: isMobile ? 24 : 34,
              right: isMobile ? 24 : 34,
              bottom: isMobile ? 26 : 28,
              zIndex: 2,
            }}
          >
            {/* Counter */}
            <span
              className='hidden md:block'
              style={{
                marginRight: 'auto',
                fontSize: 11,
                color: 'rgba(255,255,255,0.35)',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.06em',
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
            </span>

            {/* Previous ← */}
            <RoundBtn onClick={goPrev} disabled={!canPrev} label="Previous">
              <ArrowLeft size={20} />
            </RoundBtn>

            {/* Next → */}
            <RoundBtn onClick={goNext} disabled={!canNext} label="Next">
              <ArrowRight size={20} />
            </RoundBtn>
          </div>

        </div>
      </Reveal>
    </div>
  );
}

function ServiceFrontIcon({ type, size = 77 }) {
  const iconProps = {
    stroke: '#45E7EF',
    strokeWidth: 2.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const icons = {
    '3d-modeling': (
      <>
        <path d="M38.5 26L50 32.5V46L38.5 53L27 46V32.5L38.5 26Z" {...iconProps} />
        <path d="M27 32.5L38.5 39L50 32.5M38.5 39V53" {...iconProps} />
      </>
    ),
    'engineering-design': (
      <>
        <circle cx="38.5" cy="39.5" r="5" {...iconProps} />
        <path d="M38.5 26V30M38.5 49V53M25 39.5H29M48 39.5H52M29 30L32 33M45 46L48 49M48 30L45 33M32 46L29 49" {...iconProps} />
        <path d="M34 26H43L45 31L50 34V44L45 48L43 53H34L32 48L27 44V34L32 31L34 26Z" {...iconProps} />
      </>
    ),
    'design-documentation': (
      <>
        <path d="M31 26H43L50 33V53H31V26Z" {...iconProps} />
        <path d="M43 26V33H50M35 39H46M35 45H45M35 33H39" {...iconProps} />
      </>
    ),
    layout: (
      <>
        <rect x="25" y="27" width="27" height="25" {...iconProps} />
        <path d="M31 33H38V40H31V33ZM43 33H47V38H43V33ZM31 45H36M42 45H48" {...iconProps} />
      </>
    ),
    interface: (
      <>
        <path d="M31 31H47M31 39H47M31 47H47" {...iconProps} />
        <path d="M31 31L35 27M31 31L35 35M47 39L43 35M47 39L43 43M31 47L35 43M31 47L35 51" {...iconProps} />
        <circle cx="38.5" cy="39" r="3" fill="#45E7EF" />
      </>
    ),
    feasibility: (
      <>
        <path d="M33 28H44M32 31H27V53H50V31H45" {...iconProps} />
        <path d="M32 39H37M32 46H37M41 45L44 48L50 40" {...iconProps} />
      </>
    ),
    checklist: (
      <>
        <path d="M33 28H44M32 31H27V53H50V31H45" {...iconProps} />
        <path d="M32 39H37M32 46H37M41 45L44 48L50 40" {...iconProps} />
      </>
    ),
    'dmu-reviews': (
      <>
        <circle cx="38.5" cy="31" r="5" {...iconProps} />
        <circle cx="29" cy="38" r="4" {...iconProps} />
        <circle cx="48" cy="38" r="4" {...iconProps} />
        <path d="M28 52V49C28 44.5 32 41.5 38.5 41.5C45 41.5 49 44.5 49 49V52M22 52V49C22 45.8 24.4 43.4 28.2 42.7M55 52V49C55 45.8 52.6 43.4 48.8 42.7" {...iconProps} />
      </>
    ),
    dmu: (
      <>
        <circle cx="38.5" cy="31" r="5" {...iconProps} />
        <circle cx="29" cy="38" r="4" {...iconProps} />
        <circle cx="48" cy="38" r="4" {...iconProps} />
        <path d="M28 52V49C28 44.5 32 41.5 38.5 41.5C45 41.5 49 44.5 49 49V52M22 52V49C22 45.8 24.4 43.4 28.2 42.7M55 52V49C55 45.8 52.6 43.4 48.8 42.7" {...iconProps} />
      </>
    ),
    assembly: (
      <>
        <path d="M29 33L38.5 28L48 33L38.5 38L29 33Z" {...iconProps} />
        <path d="M29 33V45L38.5 50M48 33V45L38.5 50M38.5 38V50" {...iconProps} />
        <path d="M27 48L23 52M50 48L54 52" {...iconProps} />
      </>
    ),
    clash: (
      <>
        <circle cx="35" cy="38" r="10" {...iconProps} />
        <circle cx="43" cy="38" r="10" {...iconProps} />
        <path d="M30 50L25 55M47 30L52 25M32 34L46 48M46 34L32 48" {...iconProps} />
      </>
    ),
    'cad-import': (
      <>
        <path d="M29 27H43L50 34V52H29V27Z" {...iconProps} />
        <path d="M43 27V34H50M38.5 37V49M33.5 44L38.5 49L43.5 44" {...iconProps} />
      </>
    ),
    'data-structure': (
      <>
        <rect x="26" y="28" width="12" height="9" {...iconProps} />
        <rect x="40" y="42" width="12" height="9" {...iconProps} />
        <rect x="26" y="42" width="12" height="9" {...iconProps} />
        <path d="M38 32.5H44V42M32 37V42" {...iconProps} />
      </>
    ),
    'dmu-assembly': (
      <>
        <path d="M29 33L38.5 28L48 33L38.5 38L29 33Z" {...iconProps} />
        <path d="M29 33V45L38.5 50M48 33V45L38.5 50M38.5 38V50" {...iconProps} />
        <path d="M27 48L23 52M50 48L54 52" {...iconProps} />
      </>
    ),
    'cad-import': (
      <>
        <path d="M29 27H43L50 34V52H29V27Z" {...iconProps} />
        <path d="M43 27V34H50M38.5 37V49M33.5 44L38.5 49L43.5 44" {...iconProps} />
      </>
    ),
    'oem-coordination': (
      <>
        <path d="M38.5 27V39M31 52V43H46V52M31 43L25 37M46 43L52 37" {...iconProps} />
        <circle cx="38.5" cy="27" r="3" fill="#45E7EF" />
        <path d="M47 30H52V35M52 30L45 37M43 47H50M43 52H48" {...iconProps} />
      </>
    ),
    'plm-ecosystem': (
      <>
        <circle cx="38.5" cy="39.5" r="13" {...iconProps} />
        <circle cx="38.5" cy="39.5" r="6" {...iconProps} />
        <path d="M38.5 26V30M38.5 49V53M25 39.5H29M48 39.5H52M29 30L32 33M45 46L48 49M48 30L45 33M32 46L29 49" {...iconProps} />
      </>
    ),
    'manufacturing-review': (
      <>
        <path d="M28 31H45C49 31 52 34 52 38V43H48C47 40 45 38.5 42 38.5H34V48H28V31Z" {...iconProps} />
        <circle cx="44" cy="49" r="5" {...iconProps} />
        <path d="M47.5 52.5L53 58M33 38H42M33 43H39" {...iconProps} />
      </>
    ),
    'ppap-process': (
      <>
        <rect x="26" y="29" width="8" height="8" {...iconProps} />
        <rect x="43" y="29" width="8" height="8" {...iconProps} />
        <rect x="34.5" y="45" width="8" height="8" {...iconProps} />
        <path d="M34 33H43M38.5 37V45" {...iconProps} />
      </>
    ),
    'plm-integration': (
      <>
        <circle cx="33" cy="35" r="6" {...iconProps} />
        <circle cx="45" cy="45" r="6" {...iconProps} />
        <path d="M39 35H45V39M33 41V45H39" {...iconProps} />
        <path d="M29 29L25 25M49 51L53 55" {...iconProps} />
      </>
    ),
    'product-manufacturability': (
      <>
        <circle cx="38.5" cy="36" r="5" {...iconProps} />
        <path d="M38.5 24V28M38.5 44V48M28 36H32M45 36H49M31 28.5L34 31.5M43 40.5L46 43.5M46 28.5L43 31.5M34 40.5L31 43.5" {...iconProps} />
        <path d="M33 51H44M36 55H41" {...iconProps} />
      </>
    ),
    'component-analysis': (
      <>
        <path d="M31 30H39V36H45V30H53V40H47V46H53V54H43V48H35V54H25V44H31V38H25V30H31Z" {...iconProps} />
        <circle cx="49" cy="50" r="6" {...iconProps} />
        <path d="M53 54L57 58" {...iconProps} />
      </>
    ),
    'product-validation': (
      <>
        <path d="M38.5 26L51 31V39C51 47 45 52 38.5 55C32 52 26 47 26 39V31L38.5 26Z" {...iconProps} />
        <path d="M33 40L37 44L45 35" {...iconProps} />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 77 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}
    >
      <path
        d="M38.4648 1.5C58.8425 1.50007 75.4297 18.4754 75.4297 39.5C75.4297 60.5246 58.8425 77.4999 38.4648 77.5C18.0871 77.5 1.5 60.5246 1.5 39.5C1.5 18.4754 18.0871 1.5 38.4648 1.5Z"
        stroke="#45E7EF"
        strokeWidth="3"
      />
      {icons[type] ?? icons.layout}
    </svg>
  );
}

/* ── Round navigation button — matches Figma circle buttons ── */
function RoundBtn({ onClick, disabled, label, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '10px 20px',
        borderRadius: '118px',
        border: `2px solid ${disabled ? 'rgba(148,148,148,0.45)' : hov ? '#fff' : 'rgba(255,255,255,0.75)'}`,
        background: hov && !disabled ? 'rgba(255,255,255,0.08)' : 'transparent',
        color: disabled ? 'rgba(148,148,148,0.45)' : '#ffffff',
        // fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'border-color 0.2s, background 0.2s, transform 0.15s',
        transform: hov && !disabled ? 'scale(1)' : 'scale(1)',
      }}
    >
      {children}
    </button>
  );
}
