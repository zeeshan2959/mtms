import React, { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DomainButton from '../components/ui/DomainButton';
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';
import { playInteractionSound } from '../lib/interactionSound';

function Domain() {
    const isWeb = useMediaQuery({ minWidth: 1920 });
    const [activeDomain, setActiveDomain] = useState('Automotive');
    const domainTouchStart = useRef(null);
    const domains = [
        {
            title: 'Automotive',
            buttonText: 'Learn more',
            image: '/domain/car.png',
            description: 'Our expertise spans the complete vehicle development journey from concept to serial production encompassing style feasibility, vehicle architecture, and detailed packaging studies, with a strong emphasis on seamless chassis to top hat integration to deliver robust validation support and production-ready solutions.',
            summary: 'Delivering detailed CAD, packaging, and compliance documentation to support OEM and Tier-1 vehicle programs',
        },
        {
            title: 'Railway',
            buttonText: 'Learn more',
            image: '/domain/train.png',
            description: 'We specialize in providing detailed design and engineering support that includes detailed structural layouts, internal subsystem design, integration checks, and safety compliance documentation. Our capabilities cover component design, system validation, technical documentation, and operational support across the complete development lifecycle.',
            summary: 'Providing structural layouts, integration checks, and safety-driven documentation for rolling stock and subsystems',
        },
        {
            title: 'Marine',
            buttonText: 'Learn more',
            image: '/domain/boat.png',
            description: 'We deliver advanced digital mock-ups, durability assessments, and regulatory compliance documentation for marine systems, supporting safe and efficient development. Our expertise includes component and system design, performance validation, and comprehensive technical documentation across all phases of the development lifecycle.',
            summary: 'Developing digital mock-ups and technical records for vessel components, ensuring durability and regulatory compliance',
        },
        {
            title: 'Industrial Machinery',
            buttonText: 'Learn more',
            image: '/domain/industrial-machinery.png',
            description: 'Creating detailed CAD designs, assembly documentation, and comprehensive performance and validation reports to support complex industrial machinery programs. Our expertise spans component and system design, validation activities, and process optimization, providing production-ready design packages supported by thorough technical documentation throughout the development cycle.',
            summary: 'Preparing precise design specifications, assembly guides, and validation reports for complex machinery builds',
        },
        {
            title: 'Household Appliances',
            buttonText: 'Learn more',
            image: '/domain/household.png',
            description: 'Our expertise spans in comprehensive product design solutions for consumer appliances, including detailed design development, ergonomic and packaging studies, and compliance documentation. Our capabilities span component and system design, performance testing, and complete technical documentation to ensure functionality, safety, and manufacturability throughout the development lifecycle.',
            summary: 'Creating robust 3D models and user-oriented technical documentation for high-volume consumer products',
        },
        {
            title: 'IOT Devices',
            buttonText: 'Learn more',
            image: '/domain/iot-devices.png',
            description: 'Our expertise spans in comprehensive product design solutions for consumer appliances, including detailed design development, ergonomic and packaging studies, and compliance documentation. Our capabilities span component and system design, performance testing, and complete technical documentation to ensure functionality, safety, and manufacturability throughout the development lifecycle.',
            summary: 'We deliver robust engineering support for IoT hardware and smart device development, including detailed CAD design, integration studies, and regulatory compliance documentation. Our services span component design, connectivity and performance validation, system‑level integration, and comprehensive technical documentation across both prototyping and production stages.',
        },
    ]
    const selectedDomain = domains.find(domain => domain.title === activeDomain) ?? domains[0];
    const selectedDomainIndex = domains.findIndex(domain => domain.title === selectedDomain.title);

    const handleDomainClick = (domain) => {
        setActiveDomain(domain);
    }

    const handleLearnMore = (domain) => {
        setActiveDomain(domain);
    };

    const changeDomain = (direction) => {
        const nextIndex = Math.max(0, Math.min(domains.length - 1, selectedDomainIndex + direction));
        if (nextIndex !== selectedDomainIndex) {
            playInteractionSound();
            setActiveDomain(domains[nextIndex].title);
        }
    };

    const handleDomainTouchStart = (event) => {
        domainTouchStart.current = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
        };
    };

    const handleDomainTouchEnd = (event) => {
        if (!domainTouchStart.current) return;
        const deltaX = event.changedTouches[0].clientX - domainTouchStart.current.x;
        const deltaY = event.changedTouches[0].clientY - domainTouchStart.current.y;
        domainTouchStart.current = null;
        if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

        changeDomain(deltaX < 0 ? 1 : -1);
    };

    return (
        <div className='w-full flex flex-col justify-center items-center lg:flex-row'>
            <div className='w-full lg:w-1/2 pl-0 lg:pl-48 min-[1600px]:pl-8 flex flex-col gap-2 lg:gap-4 items-center justify-end'>
                <div className='mb-2 md:mb-8 w-full ml-auto lg:hidden'>
                    <AnimatedText as="h1" text="Domains" split="chars" stagger={0.05} className="text-[32px] md:text-[44px] lg:text-[46px] xl:text-[56px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]" style={{ fontSize: isWeb && '65px' }} />
                    {/* <p className='text-white text-[18px]' style={{ fontFamily: 'Poppins, sans-serif' }}>Lorem ipsum dolor sit amet consectetur. Tellus blandit pellentesque duis eu at. Id sociis augue.</p> */}
                </div>
                <div id="domain-mobile-panel" aria-label="Selected domain details" className="w-full lg:hidden" onTouchStart={handleDomainTouchStart} onTouchEnd={handleDomainTouchEnd}>
                    <div className="mx-auto max-w-[420px]">
                        <div className="mx-auto flex max-w-[420px] items-center justify-center gap-2">
                            <button
                                type="button"
                                aria-label="Previous domain"
                                onClick={() => changeDomain(-1)}
                                disabled={selectedDomainIndex === 0}
                                className="grid h-10 w-9 shrink-0 place-items-center rounded-xl border border-white/15 bg-slate-950/45 text-white/90 shadow-[0_4px_14px_rgba(0,0,0,0.2)] backdrop-blur-sm transition duration-200 hover:border-cyan-100/35 hover:text-cyan-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:text-white/90"
                            >
                                <ChevronLeft aria-hidden="true" size={22} strokeWidth={2.25} />
                            </button>
                            <div className="min-w-0 max-w-[320px] flex-1">
                                <TransparentDomainImage src={selectedDomain.image} alt={selectedDomain.title} />
                            </div>
                            <button
                                type="button"
                                aria-label="Next domain"
                                onClick={() => changeDomain(1)}
                                disabled={selectedDomainIndex === domains.length - 1}
                                className="grid h-10 w-9 shrink-0 place-items-center rounded-xl border border-white/15 bg-slate-950/45 text-white/90 shadow-[0_4px_14px_rgba(0,0,0,0.2)] backdrop-blur-sm transition duration-200 hover:border-cyan-100/35 hover:text-cyan-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:text-white/90"
                            >
                                <ChevronRight aria-hidden="true" size={22} strokeWidth={2.25} />
                            </button>
                        </div>
                        <h2 className="mt-2 text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedDomain.title}</h2>
                        <p className="mt-2 text-sm font-semibold leading-6 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedDomain.summary}</p>
                        <p className="mt-2 text-sm leading-6 text-white/80" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedDomain.description}</p>
                    </div>
                </div>
                <div className='hidden lg:flex flex-col gap-4 items-center justify-end min-[1600px]:translate-x-20 min-[1600px]:translate-y-8'>
                    <Reveal scale={0.94} y={30} duration={1.1}>
                        <TransparentDomainImage src={selectedDomain.image} alt={selectedDomain.title} />
                    </Reveal>
                    <p className='max-w-[560px] text-sm font-bold leading-relaxed text-start sm:text-base xl:text-lg' style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {selectedDomain.summary}
                    </p>
                </div>
            </div>
            <div className='hidden lg:block w-full lg:w-1/2'>
                <div className='mb-8 w-full ml-auto hidden lg:block'>
                    <AnimatedText as="h1" text="Domains" split="chars" stagger={0.05} className="text-[32px] md:text-[44px] lg:text-[46px] xl:text-[56px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]" style={{ fontSize: isWeb && '65px' }} />
                    {/* <p className='text-white text-[18px]' style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Lorem ipsum dolor sit amet consectetur. Tellus blandit pellentesque duis eu at. Id sociis augue.
                    </p> */}
                </div>
                <div className='flex gap-10 w-full lg:min-w-[55%] justify-self-end justify-center lg:justify-end text-white'>
                    <div className='hidden lg:grid grid-cols-2 gap-4 min-[1600px]:grid-cols-3'>
                        {domains.map((domain, i) => (
                            <Reveal key={domain.title} y={26} blur={0} duration={0.7} delay={0.08 * i}>
                                <DomainButton title={domain.title} buttonText={domain.buttonText} handleDomainClick={() => handleDomainClick(domain.title)} onLearnMore={() => handleLearnMore(domain.title)} isActive={selectedDomain.title === domain.title} className="min-[1600px]:!h-[190px] min-[1600px]:!w-[210px]" />
                            </Reveal>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

function TransparentDomainImage({ src, alt }) {
    const dimensions = {
        '/domain/car.png': [1400, 763],
        '/domain/train.png': [1400, 763],
        '/domain/boat.png': [1400, 763],
        '/domain/turbine.png': [1400, 1334],
        '/domain/fridge.png': [1090, 1536],
        '/domain/industrial-machinery.png': [1376, 768],
        '/domain/household.png': [1376, 768],
        '/domain/iot-devices.png': [1376, 768],
    }[src];

    return (
        <picture>
            {[
                '/domain/car.png',
                '/domain/train.png',
                '/domain/boat.png',
                '/domain/industrial-machinery.png',
                '/domain/household.png',
                '/domain/iot-devices.png',
            ].includes(src) && (
                <source srcSet={src.replace(/\.png$/, '.webp')} type="image/webp" />
            )}
            <img
                src={src}
                alt={alt}
                width={dimensions?.[0]}
                height={dimensions?.[1]}
                fetchPriority="high"
                decoding="async"
                className='block max-h-[320px] w-full object-contain'
            />
        </picture>
    );
}

export default Domain