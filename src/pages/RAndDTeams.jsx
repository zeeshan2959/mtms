import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import clickSoundFile from "/clickedSound.wav";
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
  },
  {
    name: 'DMU & PLM Integration \nEngineer',
    image: 'images/R and D/dmu and plm.png',
    subtitle: 'Ensuring digital continuity and spatial validation with CATIA DMU, ENOVIA, Teamcenter',
    description:
      'Complete Bill of Materials management and configuration control services. We provide structured BOM hierarchies, change management processes, and configuration baseline management to ensure product integrity across all variants and revisions.\n\nOur solutions integrate with leading PLM platforms for real-time BOM synchronisation and multi-level variant management across complex product architectures.',
    frontDescription: 'Ensuring digital continuity and spatial validation with CATIA DMU, ENOVIA, Teamcenter.',
    frontItems: ['DMU Assembly Creation', 'Clash Verification and Replica Governance', 'CAD Import and Session Control', 'Data Structure'],
  },
  {
    name: 'Product Packaging \nEngineer',
    image: 'images/R and D/product packege engineer.png',
    subtitle: 'Conducting layout, interface, and feasibility studies in CATIA V5, Siemens NX with DMU reviews.',
    description:
      'Advanced PLM workflow automation and control systems that streamline your engineering processes. We design and implement customised workflows that reduce cycle time, minimise errors, and ensure compliance with industry standards.\n\nOur PLM expertise spans CATIA, Teamcenter, Enovia, and other leading platforms, enabling workflows tailored to your team structure and business processes.',
    frontDescription: 'Verifying packaging, clearances, interfaces, and integration feasibility before release.',
    frontItems: ['Layout Studies', 'Interface Studies', 'Feasibility Studies', 'DMU Reviews'],
  },
  {
    name: 'Design Release \nEngineer',
    image: 'images/R and D/design release.png',
    subtitle: 'Managing component lifecycle and release governance using Teamcenter, ENOVIA, CATIA V6, Siemens NX, CODEP and EBOM',
    description:
      'Professional technical documentation and reporting services that keep stakeholders informed and projects on track. We create structured documentation frameworks, automated reporting pipelines, and dashboard solutions that provide real-time visibility.\n\nFrom engineering specifications to programme-level status reports, our documentation services ensure consistent quality and traceability across all project deliverables.',
    frontDescription: 'Managing component lifecycle, release governance, and engineering data traceability.',
    frontItems: ['Design Documentation', 'Data Structure', 'PLM Integration', 'Product Validations'],
  },
  {
    name: 'PLM Workflow \nSpecialist',
    image: 'images/R and D/plm workflow.png',
    subtitle: 'Configuring and managing workflows in ENOVIA with CATIA-integrated PLM environments',
    description:
      'Rigorous validation and analysis services ensuring product designs meet all technical and regulatory requirements. We conduct systematic design reviews, simulation-based validation, and structured analysis workflows that identify potential issues early.\n\nOur teams are proficient in FEA, CFD, tolerance analysis, and functional safety assessments across mechanical, electrical, and systems engineering domains.',
    frontDescription: 'Configuring workflow controls, validation gates, and PLM process readiness.',
    frontItems: ['PLM Integration', 'PLM Ecosystem Validation Readiness', 'Product Manufacturability', 'Product Validations'],
  },
  {
    name: 'CAE Engineer',
    image: 'images/R and D/cae engineer.png',
    subtitle: 'Performing structural and thermal analyses in ANSYS, Delima and Autodesk Inventor',
    description:
      'Complete engineering design and development services covering conceptual design through detailed engineering. Our team delivers high-quality 3D models, technical drawings, and design specifications using industry-leading CAD tools.\n\nWe handle complex geometry, Class A surfacing, and large assembly design with a structured approach that ensures downstream manufacturing and assembly compatibility from day one.',
    frontDescription: 'Performing component and system-level analysis for product validation readiness.',
    frontItems: ['Component and System Level Analysis', 'Product Validations', 'Clash Verification and Replica Governance', 'PLM Ecosystem Validation Readiness'],
  },
  {
    name: 'DMU/PLM\nIntegration',
    image: 'images/R and D/dmu and plm.png',
    subtitle: 'Seamless Digital Mock-Up and PLM system integration',
    description:
      'Expert Digital Mock-Up (DMU) and PLM integration services that unify your digital engineering environment. We implement seamless data flows between DMU tools and PLM platforms, enabling real-time collaborative design review and clash detection.\n\nOur integration frameworks support CATIA DMU, JT-based review, and VR/AR-enabled design reviews connected to live PLM data for maximum engineering team efficiency.',
    frontDescription: 'Connecting DMU reviews, PLM data, and structured product information.',
    frontItems: ['DMU Assembly Creation', 'CAD Import and Session Control', 'PLM Integration', 'Data Structure'],
  },
  {
    name: 'Packaging\nFeasibility',
    image: 'images/R and D/plm workflow.png',
    subtitle: 'In-depth packaging feasibility and space constraint studies',
    description:
      'In-depth packaging feasibility studies that analyse space constraints, clearances, and integration requirements. We perform detailed packaging analyses for automotive, aerospace, and industrial applications, ensuring components fit within defined envelopes while meeting functional requirements.\n\nOur studies include interference checking, ergonomic assessments, and service access evaluations to support informed design decisions at every programme stage.',
    frontDescription: 'Checking layout, interface, and feasibility constraints with DMU reviews.',
    frontItems: ['Layout Studies', 'Interface Studies', 'Feasibility Studies', 'DMU Reviews'],
  },
  {
    name: 'Quality\n& Compliance',
    image: 'images/R and D/plm workflow.png',
    subtitle: 'Quality assurance and regulatory compliance management',
    description:
      'Comprehensive quality assurance and regulatory compliance services ensuring your products meet the highest standards. We implement quality management systems, conduct thorough design reviews, and manage compliance documentation.\n\nOur quality services cover IATF 16949, AS9100, ISO 9001, functional safety (ISO 26262, IEC 61508), and product-specific regulatory standards across global markets.',
    frontDescription: 'Supporting PPAP, product validation, and compliance readiness across release gates.',
    frontItems: ['PPAP Process', 'Product Validations', 'PLM Ecosystem Validation Readiness', 'OEM and Tier 1 Technical Coordination'],
  },
  {
    name: 'Tooling & Manufacturing\nFeasibility',
    image: 'images/R and D/plm workflow.png',
    subtitle: 'Tooling design and manufacturing feasibility analysis',
    description:
      'Detailed tooling and manufacturing feasibility assessments that bridge design intent and production reality. We analyse draft angles, parting lines, wall thicknesses, and manufacturing constraints early in the design phase.\n\nPreventing costly changes during production tooling, our assessments cover injection moulding, die casting, stamping, and additive manufacturing processes.',
    frontDescription: 'Checking tooling readiness, manufacturability, and system-level production risks.',
    frontItems: ['Product Manufacturability', 'Design and Manufacturing Feasibility Reviews', '3D/2D Modeling', 'Component and System Level Analysis'],
  },
  {
    name: 'Supplier & Stakeholder\nCoordination',
    image: 'images/R and D/plm workflow.png',
    subtitle: 'Structured supplier and stakeholder management solutions',
    description:
      'Structured supplier and stakeholder coordination services that ensure alignment across your entire value chain. We implement communication frameworks, data exchange protocols, and collaborative review processes.\n\nOur coordination services keep all parties synchronised throughout the product development lifecycle, reducing misalignment, rework, and programme delays across multi-tier supply chains.',
    frontDescription: 'Aligning OEM, Tier 1, supplier, and stakeholder technical inputs.',
    frontItems: ['OEM and Tier 1 Technical Coordination', 'PLM Integration', 'Design Documentation', 'Product Manufacturability'],
  },
];

const DEFAULT_FRONT_ITEMS = ['3D/2D Modeling', 'Engineering Design', 'Design Documentation', 'Product Validations'];

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
  const [isFlipped, setIsFlipped] = useState(false);
  const tabsRef = useRef(null);
  const activeTabRef = useRef(null);
  const swipeStart = useRef(null);
  const suppressSwipeClickUntil = useRef(0);
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
  const isWide = useMediaQuery({ minWidth: 1701 });

  useEffect(() => {
    if (!isMobile || !tabsRef.current || !activeTabRef.current) return;
    const tabs = tabsRef.current;
    const activeTab = activeTabRef.current;
    tabs.scrollTo({
      left: activeTab.offsetLeft - (tabs.clientWidth - activeTab.clientWidth) / 2,
      behavior: 'smooth',
    });
  }, [activeIndex, isMobile]);

  const selectService = (index) => {
    setActiveIndex(index);
    setIsFlipped(false);
  };

  const goNext = useCallback(() => {
    playClickSound();
    selectService(Math.min(activeIndex + 1, SERVICES.length - 1));
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    playClickSound();
    selectService(Math.max(activeIndex - 1, 0));
  }, [activeIndex]);

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < SERVICES.length - 1;
  const active = SERVICES[activeIndex];
  const frontItems = active.frontItems ?? DEFAULT_FRONT_ITEMS;
  const handleTouchStart = (event) => {
    if (isMobile) {
      swipeStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
  };
  const handleTouchEnd = (event) => {
    if (!isMobile || !swipeStart.current) return;
    const deltaX = event.changedTouches[0].clientX - swipeStart.current.x;
    const deltaY = event.changedTouches[0].clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    suppressSwipeClickUntil.current = Date.now() + 500;
    if (deltaX < 0) goNext();
    else goPrev();
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClickCapture={(event) => {
        if (Date.now() < suppressSwipeClickUntil.current) {
          suppressSwipeClickUntil.current = 0;
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      style={{
        margin: isMobile ? 0 : '-24px -36px -40px',
        paddingRight: isMobile ? '8px' : '48px',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 76px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-start' : 'center',
        // background:'red'
      }}
      className='px-2 sm:px-4 md:p-[40px 48px 48px 0]'
    >
      {/* ─── Services title block ─── */}
      <div className="mx-auto mb-10 w-full max-w-[920px]">
        <AnimatedText
          as="h1"
          text="R & D Teams"
          split="chars"
          stagger={0.05}
          className="mb-4 w-full text-left text-[32px] md:text-[44px] lg:text-[66px] xl:text-[66px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]"
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
            margin: 0,
            textAlign: 'left',
          }}
        >
          End-to-End engineering excellence — from concept design to validation and compliance. Our integrated approach ensures seamless development, precise release management, and uncompromised quality at every stage.

        </Reveal>
      </div>

      {/* ─── Moving Menu ─── */}
      <Reveal className="mx-auto w-full max-w-[920px] px-0 flex flex-col lg:flex-row items-center lg:flex-start justify-start gap-0 lg:translate-x-[10%]" y={48} delay={0.3} duration={1}>
        {/* ── Left panel: staircase tab list (414 × 556 px — exact Figma) ── */}
        <div
        ref={tabsRef}
        className='order-1 block lg:order-1'
          style={{
            position: 'relative',
            width: isMobile ? '100%' : isTablet ? 414 : isDesktop ? 414 : isWeb ? 514 : 514,
            height: isMobile ? 'auto' : isTablet ? 411 : isDesktop ? 411 : 511,
            flexShrink: 0,
            overflowX: isMobile ? 'auto' : 'hidden',
            overflowY: 'hidden',
            display: isMobile ? 'flex' : 'block',
            gap: isMobile ? 8 : 0,
            padding: isMobile ? '0 2px 6px' : 0,
            marginBottom: isMobile ? 0 : 0,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
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
                ref={i === activeIndex ? activeTabRef : null}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectService(i)}
                style={{
                  position: isMobile ? 'relative' : 'absolute',
                  left: isMobile ? 0 : left,
                  top: isMobile ? 'auto' : top,
                  width: isMobile ? 'min(72vw, 220px)' : isTablet ? 288 : isDesktop ? 288 : isWeb ? 388 : 388,
                  minHeight: isMobile ? 48 : undefined,
                  flexShrink: isMobile ? 0 : undefined,
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(85,182,200,0.48), rgba(20,69,87,0.72) 58%, rgba(255,255,255,0.13))'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.13), rgba(9,20,35,0.38) 58%, rgba(35,118,140,0.16))',
                  border: `${isActive ? '1px solid rgba(112,210,227,0.68)' : '1px solid rgba(255,255,255,0.28)'}`,
                  borderRadius: 14,
                  padding: isMobile ? '7px 10px' : '10px 30px',
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
                  marginBottom: 0,
                  boxShadow: isActive
                    ? '0 12px 30px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.24), 0 0 24px rgba(85,182,200,0.14)'
                    : '0 8px 22px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.14)',
                  transition: [
                    'left 0.42s cubic-bezier(0.4,0,0.2,1)',
                    'top 0.42s cubic-bezier(0.4,0,0.2,1)',
                    'opacity 0.30s ease',
                    'background 0.25s ease',
                    'border-color 0.25s ease',
                    'box-shadow 0.25s ease',
                  ].join(', '),
                  backdropFilter: 'blur(18px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(18px) saturate(140%)',
                }}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111e] hover:border-[#70d2e3]/70 hover:shadow-[0_14px_32px_rgba(0,0,0,0.28)]"
              >
                {svc.name}
              </button>
            );
          })}
        </div>

        {/* ── Right panel: content card (544 × 511 px — exact Figma) ── */}
        <div
          className={`group order-2 ml-0 md:ml-[30px] lg:order-2 ${isMobile ? 'mt-3' : 'mt-6'} md:mt-0 transition-all duration-500 hover:-translate-y-1 hover:border-[#70d2e3]/45 hover:shadow-[0_32px_80px_rgba(0,0,0,0.44)]`}
          onTouchStart={(event) => {
            if (isMobile && !event.target.closest?.('button')) setIsFlipped(true);
          }}
          onTouchEnd={() => {
            if (isMobile) setIsFlipped(false);
          }}
          onTouchCancel={() => {
            if (isMobile) setIsFlipped(false);
          }}
          role="group"
          aria-label={isMobile ? (isFlipped ? 'Release to return to overview' : 'Hold to view details') : undefined}
          style={{
            width: isMobile ? '100%' : isTablet ? 444 : isDesktop ? 544 : isWeb ? 544 : 544,
            minHeight: isMobile ? 300 : isTablet ? 311 : isDesktop ? 411 : 511,
            flexShrink: 0,
            background: 'radial-gradient(ellipse at 100% 0%, rgba(85,182,200,0.3), transparent 45%), radial-gradient(ellipse at 0% 100%, rgba(39,112,148,0.2), transparent 48%), linear-gradient(140deg, rgba(255,255,255,0.2), rgba(9,22,38,0.76) 52%, rgba(20,68,87,0.64))',
            backdropFilter: isMobile ? undefined : 'blur(30px) saturate(160%)',
            WebkitBackdropFilter: isMobile ? undefined : 'blur(30px) saturate(160%)',
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 26px 70px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(112,210,227,0.12)',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: isMobile ? 'visible' : 'hidden',
            isolation: isMobile ? 'auto' : 'isolate',
            transformStyle: 'preserve-3d',
            transform: isMobile ? (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)') : undefined,
            transition: 'transform 450ms cubic-bezier(0.22,1,0.36,1), box-shadow 450ms ease, border-color 450ms ease',
          }}
        >
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: isMobile ? 'hidden' : undefined,
              borderRadius: isMobile ? 24 : undefined,
              padding: isMobile ? '18px 18px 18px' : '26px 26px 22px',
              backfaceVisibility: isMobile ? 'hidden' : undefined,
              WebkitBackfaceVisibility: isMobile ? 'hidden' : undefined,
            }}
          >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 z-0 h-72 w-72 rounded-full bg-[#55b6c8]/20 blur-3xl transition-transform duration-700 ease-out group-hover:scale-125"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 z-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent"
          />
          {/* Title */}
          <p
            style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: isMobile ? 14 : 18,
              color: '#ffffff',
              lineHeight: 1.45,
              marginBottom: isMobile ? 14 : 22,
            }}
          >
            {active.subtitle}
          </p>

          {/* Divider */}
          <div style={{ position: 'relative', zIndex: 1, width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(112,210,227,0.7), rgba(255,255,255,0.2) 58%, transparent)', marginBottom: isMobile ? 12 : 18 }} />

          {/* Description */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'Poppins, sans-serif',
                fontSize: isMobile ? 11 : 15,
                color: 'rgba(255,255,255,0.88)',
                lineHeight: 1.45,
              }}
            >
              {active.frontDescription ?? active.description.split('\n\n')[0]}
            </p>

            <style>
              {`
                @keyframes rdFeatureLineSweep {
                  from { transform: scaleX(0); opacity: 0.25; }
                  to { transform: scaleX(1); opacity: 1; }
                }

                @keyframes rdFeatureReveal {
                  from { opacity: 0; transform: translateY(12px); }
                  to { opacity: 1; transform: translateY(0); }
                }

                @keyframes rdIconHalo {
                  0%, 100% { opacity: 0.28; transform: scale(0.94); }
                  50% { opacity: 0.72; transform: scale(1.08); }
                }

                @keyframes rdIconFloat {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-2px); }
                }

                .rd-feature-line {
                  transform: scaleX(0);
                  transform-origin: left center;
                  animation: rdFeatureLineSweep 900ms cubic-bezier(0.22, 1, 0.36, 1) 180ms forwards;
                }

                .rd-feature-item {
                  opacity: 0;
                  animation: rdFeatureReveal 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }

                .rd-feature-icon {
                  position: relative;
                  isolation: isolate;
                }

                .rd-feature-icon::after {
                  content: "";
                  position: absolute;
                  inset: -5px;
                  z-index: -1;
                  border: 1px solid rgba(69, 231, 239, 0.55);
                  border-radius: 9999px;
                  animation: rdIconHalo 3.2s ease-in-out infinite;
                }

                .rd-feature-icon img {
                  animation: rdIconFloat 2.8s ease-in-out infinite;
                }

                .rd-feature-item:hover .rd-feature-icon {
                  box-shadow: 0 0 28px rgba(85, 182, 200, 0.32), inset 0 1px 0 rgba(255,255,255,0.24);
                  transform: translateY(-3px) scale(1.04);
                }

                @media (prefers-reduced-motion: reduce) {
                  .rd-feature-line, .rd-feature-item { animation: none; opacity: 1; transform: none; }
                  .rd-feature-icon, .rd-feature-icon::after, .rd-feature-icon img { animation: none; transition: none !important; }
                }
              `}
            </style>
            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: `repeat(${frontItems.length}, minmax(0, 1fr))`,
                gap: isMobile ? 3 : 12,
                alignItems: 'start',
                marginTop: isMobile ? 16 : 34,
                paddingBottom: 18,
              }}
            >
              <span
                aria-hidden="true"
                className="rd-feature-line pointer-events-none absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-gradient-to-r from-transparent via-[#70d2e3]/75 to-transparent md:block md:top-[30px]"
              />
              {frontItems.map((label, index) => (
                <div
                  key={label}
                  style={{ animationDelay: `${240 + index * 110}ms` }}
                  className="rd-feature-item relative z-[1] flex min-h-[94px] flex-col items-center text-center text-white md:min-h-[112px]"
                >
                  <span
                    className="rd-feature-icon grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.18),rgba(8,24,39,0.94)_66%,rgba(22,79,96,0.9))] shadow-[0_8px_24px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-300 md:h-16 md:w-16"
                    style={{ animationDelay: `${index * 180}ms` }}
                  >
                    <RAndDIcon label={label} size={isMobile ? 42 : 54} />
                  </span>
                  <span
                    className="mt-2 flex min-h-[26px] max-w-[150px] items-start justify-center text-[8px] leading-[1.25] text-white/85 md:text-[10px]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
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
              position: 'relative',
              zIndex: 1,
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
          {isMobile && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                borderRadius: 24,
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'radial-gradient(ellipse at 100% 0%, rgba(85,182,200,0.24), transparent 45%), linear-gradient(140deg, rgba(18,42,58,0.98), rgba(7,18,32,0.98) 62%, rgba(20,68,87,0.96))',
                padding: '42px 18px 20px',
                overflowY: 'auto',
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 12,
                lineHeight: 1.55,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 16,
                  border: '1px solid rgba(112,210,227,0.42)',
                  borderRadius: 999,
                  padding: '4px 9px',
                  color: 'rgba(190,246,250,0.9)',
                  background: 'rgba(8,24,39,0.42)',
                  font: '600 9px Poppins, sans-serif',
                  letterSpacing: '0.08em',
                }}
              >
                RELEASE TO RETURN
              </span>
              <h2 style={{ margin: '0 0 14px', color: '#fff', fontSize: 16, lineHeight: 1.35 }}>
                {active.subtitle}
              </h2>
              {active.description.split('\n\n').map((paragraph) => (
                <p key={paragraph} style={{ margin: '0 0 12px' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

const ICON_LABEL_OVERRIDES = {
  '3D/2D Modeling': '2D Modelling',
};

function getIconSrc(label) {
  const fileName = ICON_LABEL_OVERRIDES[label] ?? label;
  return `/new-icons/${fileName}.svg`;
}

function RAndDIcon({ label, size = 66 }) {
  return (
    <img
      src={getIconSrc(label)}
      alt=""
      width={size}
      height={size}
      draggable={false}
      style={{ flexShrink: 0, objectFit: 'contain' }}
    />
  );
}

/* ── Round navigation button — matches Figma circle buttons ── */
function RoundBtn({ onClick, disabled, label, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-sound-handled="true"
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
