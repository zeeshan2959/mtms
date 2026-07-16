import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import clickSoundFile from "/clickedSound.wav";
import imgServices from '/services.png';
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';

const clickAudio = new Audio(clickSoundFile);

// ── All 11 services from the Figma Moving Menu (node 741:16130) ──
const SERVICES = [
  {
    name: 'Mechanical Design \nEngineer',
    subtitle: 'Delivering 3D/2D designs and detailing using CATIA V5, Siemens NX, Creo, SolidWorks',
    image: 'images/R and D/mechinical design engineer.png',
    description:
      'Comprehensive management of design release processes from concept to production. Our systems ensure controlled documentation, version management, and seamless handover between engineering teams.\n\nWe implement structured approval workflows that maintain data integrity throughout the product lifecycle, with full traceability from design intent to released engineering change.',
    frontDescription: 'Supporting product development from concept models through release-ready engineering documentation.',
    frontItems: ['3D/2D Modeling', 'Engineering Design', 'Design Documentation', 'Design and Manufacturing Feasibility Reviews'],
    frontIconTypes: ['3d-modeling', 'engineering-design', 'design-documentation', 'manufacturing-review'],
  },
  {
    name: 'DMU & PLM Integration \nEngineer',
    image: 'images/R and D/dmu and plm.png',
    subtitle: 'Ensuring digital continuity and spatial validation with CATIA DMU, ENOVIA, Teamcenter',
    description:
      'Complete Bill of Materials management and configuration control services. We provide structured BOM hierarchies, change management processes, and configuration baseline management to ensure product integrity across all variants and revisions.\n\nOur solutions integrate with leading PLM platforms for real-time BOM synchronisation and multi-level variant management across complex product architectures.',
    frontDescription: 'Ensuring digital continuity and spatial validation with CATIA DMU, ENOVIA, Teamcenter.',
    frontItems: ['DMU Assembly Creation', 'Clash Verification and Replica Governance', 'CAD Import and Session Control', 'Data Structure'],
    frontIconTypes: ['assembly', 'clash', 'cad-import', 'data-structure'],
  },
  {
    name: 'Product Packaging \nEngineer',
    image: 'images/R and D/product packege engineer.png',
    subtitle: 'Conducting layout, interface, and feasibility studies in CATIA V5, Siemens NX with DMU reviews.',
    description:
      'Advanced PLM workflow automation and control systems that streamline your engineering processes. We design and implement customised workflows that reduce cycle time, minimise errors, and ensure compliance with industry standards.\n\nOur PLM expertise spans CATIA, Teamcenter, Enovia, and other leading platforms, enabling workflows tailored to your team structure and business processes.',
    frontDescription: 'Verifying packaging, clearances, interfaces, and integration feasibility before release.',
    frontItems: ['Layout Studies', 'Interface Studies', 'Feasibility Studies', 'DMU Reviews'],
    frontIconTypes: ['layout', 'interface', 'feasibility', 'dmu-reviews'],
  },
  {
    name: 'Design Release \nEngineer',
    image: 'images/R and D/design release.png',
    subtitle: 'Managing component lifecycle and release governance using Teamcenter, ENOVIA, CATIA V6, Siemens NX, CODEP and EBOM',
    description:
      'Professional technical documentation and reporting services that keep stakeholders informed and projects on track. We create structured documentation frameworks, automated reporting pipelines, and dashboard solutions that provide real-time visibility.\n\nFrom engineering specifications to programme-level status reports, our documentation services ensure consistent quality and traceability across all project deliverables.',
    frontDescription: 'Managing component lifecycle, release governance, and engineering data traceability.',
    frontItems: ['Design Documentation', 'Data Structure', 'PLM Integration', 'Product Validations'],
    frontIconTypes: ['design-documentation', 'data-structure', 'plm-integration', 'product-validation'],
  },
  {
    name: 'PLM Workflow \nSpecialist',
    image: 'images/R and D/plm workflow.png',
    subtitle: 'Configuring and managing workflows in ENOVIA with CATIA-integrated PLM environments',
    description:
      'Rigorous validation and analysis services ensuring product designs meet all technical and regulatory requirements. We conduct systematic design reviews, simulation-based validation, and structured analysis workflows that identify potential issues early.\n\nOur teams are proficient in FEA, CFD, tolerance analysis, and functional safety assessments across mechanical, electrical, and systems engineering domains.',
    frontDescription: 'Configuring workflow controls, validation gates, and PLM process readiness.',
    frontItems: ['PLM Integration', 'PLM Ecosystem Validation Readiness', 'Product Manufacturability', 'Product Validations'],
    frontIconTypes: ['plm-integration', 'plm-ecosystem', 'product-manufacturability', 'product-validation'],
  },
  {
    name: 'CAE Engineer',
    image: 'images/R and D/cae engineer.png',
    subtitle: 'Performing structural and thermal analyses in ANSYS, Delima and Autodesk Inventor',
    description:
      'Complete engineering design and development services covering conceptual design through detailed engineering. Our team delivers high-quality 3D models, technical drawings, and design specifications using industry-leading CAD tools.\n\nWe handle complex geometry, Class A surfacing, and large assembly design with a structured approach that ensures downstream manufacturing and assembly compatibility from day one.',
    frontDescription: 'Performing component and system-level analysis for product validation readiness.',
    frontItems: ['Component and System Level Analysis', 'Product Validations', 'Clash Verification and Replica Governance', 'PLM Ecosystem Validation Readiness'],
    frontIconTypes: ['component-analysis', 'product-validation', 'clash', 'plm-ecosystem'],
  },
  {
    name: 'DMU/PLM\nIntegration',
    image: 'images/R and D/dmu and plm.png',
    subtitle: 'Seamless Digital Mock-Up and PLM system integration',
    description:
      'Expert Digital Mock-Up (DMU) and PLM integration services that unify your digital engineering environment. We implement seamless data flows between DMU tools and PLM platforms, enabling real-time collaborative design review and clash detection.\n\nOur integration frameworks support CATIA DMU, JT-based review, and VR/AR-enabled design reviews connected to live PLM data for maximum engineering team efficiency.',
    frontDescription: 'Connecting DMU reviews, PLM data, and structured product information.',
    frontItems: ['DMU Assembly Creation', 'CAD Import and Session Control', 'PLM Integration', 'Data Structure'],
    frontIconTypes: ['assembly', 'cad-import', 'plm-integration', 'data-structure'],
  },
  {
    name: 'Packaging\nFeasibility',
    image: 'images/R and D/plm workflow.png',
    subtitle: 'In-depth packaging feasibility and space constraint studies',
    description:
      'In-depth packaging feasibility studies that analyse space constraints, clearances, and integration requirements. We perform detailed packaging analyses for automotive, aerospace, and industrial applications, ensuring components fit within defined envelopes while meeting functional requirements.\n\nOur studies include interference checking, ergonomic assessments, and service access evaluations to support informed design decisions at every programme stage.',
    frontDescription: 'Checking layout, interface, and feasibility constraints with DMU reviews.',
    frontItems: ['Layout Studies', 'Interface Studies', 'Feasibility Studies', 'DMU Reviews'],
    frontIconTypes: ['layout', 'interface', 'feasibility', 'dmu-reviews'],
  },
  {
    name: 'Quality\n& Compliance',
    image: 'images/R and D/plm workflow.png',
    subtitle: 'Quality assurance and regulatory compliance management',
    description:
      'Comprehensive quality assurance and regulatory compliance services ensuring your products meet the highest standards. We implement quality management systems, conduct thorough design reviews, and manage compliance documentation.\n\nOur quality services cover IATF 16949, AS9100, ISO 9001, functional safety (ISO 26262, IEC 61508), and product-specific regulatory standards across global markets.',
    frontDescription: 'Supporting PPAP, product validation, and compliance readiness across release gates.',
    frontItems: ['PPAP Process', 'Product Validations', 'PLM Ecosystem Validation Readiness', 'OEM and Tier 1 Technical Coordination'],
    frontIconTypes: ['ppap-process', 'product-validation', 'plm-ecosystem', 'oem-coordination'],
  },
  {
    name: 'Tooling & Manufacturing\nFeasibility',
    image: 'images/R and D/plm workflow.png',
    subtitle: 'Tooling design and manufacturing feasibility analysis',
    description:
      'Detailed tooling and manufacturing feasibility assessments that bridge design intent and production reality. We analyse draft angles, parting lines, wall thicknesses, and manufacturing constraints early in the design phase.\n\nPreventing costly changes during production tooling, our assessments cover injection moulding, die casting, stamping, and additive manufacturing processes.',
    frontDescription: 'Checking tooling readiness, manufacturability, and system-level production risks.',
    frontItems: ['Product Manufacturability', 'Design and Manufacturing Feasibility Reviews', '3D/2D Modeling', 'Component and System Level Analysis'],
    frontIconTypes: ['product-manufacturability', 'manufacturing-review', '3d-modeling', 'component-analysis'],
  },
  {
    name: 'Supplier & Stakeholder\nCoordination',
    image: 'images/R and D/plm workflow.png',
    subtitle: 'Structured supplier and stakeholder management solutions',
    description:
      'Structured supplier and stakeholder coordination services that ensure alignment across your entire value chain. We implement communication frameworks, data exchange protocols, and collaborative review processes.\n\nOur coordination services keep all parties synchronised throughout the product development lifecycle, reducing misalignment, rework, and programme delays across multi-tier supply chains.',
    frontDescription: 'Aligning OEM, Tier 1, supplier, and stakeholder technical inputs.',
    frontItems: ['OEM and Tier 1 Technical Coordination', 'PLM Integration', 'Design Documentation', 'Product Manufacturability'],
    frontIconTypes: ['oem-coordination', 'plm-integration', 'design-documentation', 'product-manufacturability'],
  },
];

const DEFAULT_FRONT_ITEMS = ['3D/2D Modeling', 'Engineering Design', 'Design Documentation', 'Product Validations'];
const DEFAULT_FRONT_ICON_TYPES = ['3d-modeling', 'engineering-design', 'design-documentation', 'product-validation'];

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
  clickAudio.play().catch(() => {});
}

export default function RAndDTeams() {
  const [activeIndex, setActiveIndex] = useState(2); 
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
  const frontItems = active.frontItems ?? DEFAULT_FRONT_ITEMS;
  const frontIconTypes = active.frontIconTypes ?? DEFAULT_FRONT_ICON_TYPES;

  return (
    <div
      style={{
        margin: '-24px -36px -40px',
        minHeight: 'calc(100vh - 76px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      className='px-2 sm:px-4 md:p-[40px 48px 48px 0]'
    >
      {/* ─── Services title block ─── */}
      <div style={{ paddingLeft: isWeb ? '46%' : isDesktop ? '32%' : isTablet ? '26%' : '36%', marginBottom: 40 }}>
        <AnimatedText
          as="h1"
          text="R & D Teams"
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
          End-to-End engineering excellence — from concept design to validation and compliance. Our integrated approach ensures seamless development, precise release management, and uncompromised quality at every stage.

        </Reveal>
      </div>

      {/* ─── Moving Menu ─── */}
      <Reveal className='pl-32 flex flex-col lg:flex-row items-center lg:flex-start justify-end gap-0' y={48} delay={0.3} duration={1}>
        {/* ── Left panel: staircase tab list (414 × 556 px — exact Figma) ── */}
        <div
        className='hidden sm:block'
          style={{
            position: 'relative',
            width: isMobile ? '100%' : isTablet ? 414 : isDesktop ? 414 : isWeb ? 514 : 514,
            height: isMobile ? 411 : isTablet ? 411 : isDesktop ? 411 : 511,
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
                  position: 'absolute',
                  left,
                  top,
                  width: isMobile ? '100%' : isTablet ? 288 : isDesktop ? 288 : isWeb ? 388 : 388,
                  background: isActive ? 'rgba(221,221,221,0.18)' : 'rgba(0,0,0,0)',
                  border: `${isActive ? '1px solid rgba(255,255,255,0.25)' : '1px solid white'}`,
                  borderRadius: 10,
                  padding: '10px 30px',
                  color: '#ffffff',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: isMobile ? 12 : isTablet ? 14 : isDesktop ? 16 : 22,       
                  textAlign: 'center',
                  lineHeight: 1.25,
                  whiteSpace: 'pre-line',  // honour \n line breaks in name
                  opacity,
                  cursor: Math.abs(delta) <= 2 ? 'pointer' : 'default',
                  pointerEvents: Math.abs(delta) <= 2 ? 'auto' : 'none',
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
          style={{
            width: isMobile ? '100%' : isTablet ? 444 : isDesktop ? 544 : isWeb ? 544 : 544,
            minHeight: isMobile ? 211 : isTablet ? 311 : isDesktop ? 411 : 511,
            flexShrink: 0,
            background: 'rgba(221,221,221,0.20)',
            borderRadius: 15,
            border: '1px solid rgba(221,221,221,0.20)',
            padding: '26px 26px 22px',
            display: 'flex',
            flexDirection: 'column',
            // boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            position: 'relative',
          }}
          className='ml-0 md:ml-[30px]'
        >
          {/* Title */}
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: 18,
              color: '#ffffff',
              lineHeight: 1.45,
              marginBottom: 22,
            }}
          >
            {active.subtitle}
          </p>

          {/* Divider */}
          <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.10)', marginBottom: 18 }} />

          {/* Description */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'Poppins, sans-serif',
                fontSize: isMobile ? 13 : 15,
                color: 'rgba(255,255,255,0.88)',
                lineHeight: 1.45,
              }}
            >
              {active.frontDescription ?? active.description.split('\n\n')[0]}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${frontItems.length}, minmax(0, 1fr))`,
                gap: isMobile ? 14 : 20,
                alignItems: 'start',
                marginTop: isMobile ? 24 : 34,
                paddingBottom: 18,
              }}
            >
              {frontItems.map((label, index) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: '#ffffff',
                  }}
                >
                  <RAndDIcon type={frontIconTypes[index % frontIconTypes.length]} size={isMobile ? 60 : 66} />
                  <span
                    style={{
                      marginTop: 6,
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: isMobile ? 9 : 10,
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

          {/* ── Prev / Next navigation ── (Figma: bottom-right of content panel) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
              marginTop: 22,
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
            <ArrowRight size={20}/>
            </RoundBtn>
          </div>

        </div>
      </Reveal>
    </div>
  );
}

function RAndDIcon({ type, size = 66 }) {
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
    'dmu-reviews': (
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
      </>
    ),
    clash: (
      <>
        <circle cx="35" cy="38" r="10" {...iconProps} />
        <circle cx="43" cy="38" r="10" {...iconProps} />
        <path d="M32 34L46 48M46 34L32 48" {...iconProps} />
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
    'plm-integration': (
      <>
        <circle cx="33" cy="35" r="6" {...iconProps} />
        <circle cx="45" cy="45" r="6" {...iconProps} />
        <path d="M39 35H45V39M33 41V45H39" {...iconProps} />
      </>
    ),
    'plm-ecosystem': (
      <>
        <circle cx="38.5" cy="39.5" r="13" {...iconProps} />
        <circle cx="38.5" cy="39.5" r="6" {...iconProps} />
        <path d="M38.5 26V30M38.5 49V53M25 39.5H29M48 39.5H52" {...iconProps} />
      </>
    ),
    'product-validation': (
      <>
        <path d="M38.5 26L51 31V39C51 47 45 52 38.5 55C32 52 26 47 26 39V31L38.5 26Z" {...iconProps} />
        <path d="M33 40L37 44L45 35" {...iconProps} />
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
    'oem-coordination': (
      <>
        <path d="M38.5 27V39M31 52V43H46V52M31 43L25 37M46 43L52 37" {...iconProps} />
        <circle cx="38.5" cy="27" r="3" fill="#45E7EF" />
      </>
    ),
    'product-manufacturability': (
      <>
        <circle cx="38.5" cy="36" r="5" {...iconProps} />
        <path d="M38.5 24V28M38.5 44V48M28 36H32M45 36H49M33 51H44M36 55H41" {...iconProps} />
      </>
    ),
    'manufacturing-review': (
      <>
        <path d="M28 31H45C49 31 52 34 52 38V43H48C47 40 45 38.5 42 38.5H34V48H28V31Z" {...iconProps} />
        <circle cx="44" cy="49" r="5" {...iconProps} />
        <path d="M47.5 52.5L53 58" {...iconProps} />
      </>
    ),
    'component-analysis': (
      <>
        <path d="M31 30H39V36H45V30H53V40H47V46H53V54H43V48H35V54H25V44H31V38H25V30H31Z" {...iconProps} />
        <circle cx="49" cy="50" r="6" {...iconProps} />
        <path d="M53 54L57 58" {...iconProps} />
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
      style={{ flexShrink: 0 }}
    >
      <path
        d="M38.4648 1.5C58.8425 1.50007 75.4297 18.4754 75.4297 39.5C75.4297 60.5246 58.8425 77.4999 38.4648 77.5C18.0871 77.5 1.5 60.5246 1.5 39.5C1.5 18.4754 18.0871 1.5 38.4648 1.5Z"
        stroke="#45E7EF"
        strokeWidth="3"
      />
      {icons[type] ?? icons['engineering-design']}
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
