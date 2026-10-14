import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
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
            image: '/domain/turbine.png',
            description: 'Creating detailed CAD designs, assembly documentation, and comprehensive performance and validation reports to support complex industrial machinery programs. Our expertise spans component and system design, validation activities, and process optimization, providing production-ready design packages supported by thorough technical documentation throughout the development cycle.',
            summary: 'Preparing precise design specifications, assembly guides, and validation reports for complex machinery builds',
        },
        {
            title: 'Household Appliances',
            buttonText: 'Learn more',
            image: '/domain/fridge.png',
            description: 'Our expertise spans in comprehensive product design solutions for consumer appliances, including detailed design development, ergonomic and packaging studies, and compliance documentation. Our capabilities span component and system design, performance testing, and complete technical documentation to ensure functionality, safety, and manufacturability throughout the development lifecycle.',
            summary: 'Creating robust 3D models and user-oriented technical documentation for high-volume consumer products',
        },
        {
            title: 'IOT Devices',
            buttonText: 'Learn more',
            image: '/domain/fridge.png',
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

        const nextIndex = Math.max(0, Math.min(domains.length - 1, selectedDomainIndex + (deltaX < 0 ? 1 : -1)));
        if (nextIndex !== selectedDomainIndex) playInteractionSound();
        setActiveDomain(domains[nextIndex].title);
    };

    return (
        <div className='w-full flex flex-col justify-center items-center lg:flex-row'>
            <div className='w-full lg:w-1/2 pl-0 lg:pl-48 flex flex-col gap-2 lg:gap-4 items-center justify-end'>
                <div className='mb-2 md:mb-8 w-full ml-auto lg:hidden'>
                    <AnimatedText as="h1" text="Domains" split="chars" stagger={0.05} className="text-[32px] md:text-[44px] lg:text-[46px] xl:text-[56px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]" style={{ fontSize: isWeb && '65px' }} />
                    {/* <p className='text-white text-[18px]' style={{ fontFamily: 'Poppins, sans-serif' }}>Lorem ipsum dolor sit amet consectetur. Tellus blandit pellentesque duis eu at. Id sociis augue.</p> */}
                </div>
                <div id="domain-mobile-panel" role="tabpanel" aria-labelledby={`domain-tab-${selectedDomain.title}`} className="w-full lg:hidden" onTouchStart={handleDomainTouchStart} onTouchEnd={handleDomainTouchEnd}>
                    <div className="mx-auto max-w-[420px]">
                        <div className="mx-auto max-w-[280px]">
                            <TransparentDomainImage src={selectedDomain.image} alt={selectedDomain.title} />
                        </div>
                        <h2 className="mt-2 text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedDomain.title}</h2>
                        <p className="mt-2 text-sm font-semibold leading-6 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedDomain.summary}</p>
                        <p className="mt-2 text-sm leading-6 text-white/80" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedDomain.description}</p>
                    </div>
                </div>
                <div role="tablist" aria-label="Domains" className="flex w-full gap-2 overflow-x-auto py-2 lg:hidden snap-x snap-mandatory">
                    {domains.map((domain) => (
                        <button
                            key={domain.title}
                            id={`domain-tab-${domain.title}`}
                            type="button"
                            role="tab"
                            aria-selected={selectedDomain.title === domain.title}
                            aria-controls="domain-mobile-panel"
                            onClick={() => handleDomainClick(domain.title)}
                            className={`min-h-11 shrink-0 snap-start rounded-full border px-4 text-sm font-semibold text-white transition-colors ${selectedDomain.title === domain.title ? 'border-[#55B6C8] bg-[#23768C]' : 'border-white/30 bg-white/10'}`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            {domain.title}
                        </button>
                    ))}
                </div>
                <div className='hidden lg:flex flex-col gap-4 items-center justify-end'>
                    <Reveal scale={0.94} y={30} duration={1.1}>
                        <TransparentDomainImage src={selectedDomain.image} alt={selectedDomain.title} />
                    </Reveal>
                    <p className='text-[20px] xl:text-[27px] font-bold text-start' style={{ fontFamily: 'Poppins, sans-serif' }}>
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
                    <div className='hidden lg:grid grid-cols-2'>
                        {domains.map((domain, i) => (
                            <Reveal key={domain.title} y={26} blur={0} duration={0.7} delay={0.08 * i}>
                                <DomainButton title={domain.title} buttonText={domain.buttonText} handleDomainClick={() => handleDomainClick(domain.title)} onLearnMore={() => handleLearnMore(domain.title)} />
                            </Reveal>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

function TransparentDomainImage({ src, alt }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const image = new Image();
        image.fetchPriority = 'high';
        image.decoding = 'async';
        image.src = src;
        image.onload = () => {
            const context = canvas.getContext('2d', { willReadFrequently: true });
            if (!context) return;

            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0);

            const frame = context.getImageData(0, 0, canvas.width, canvas.height);
            const { data } = frame;
            for (let i = 0; i < data.length; i += 4) {
                const brightness = Math.max(data[i], data[i + 1], data[i + 2]);
                if (brightness < 24) {
                    data[i + 3] = 0;
                } else if (brightness < 58) {
                    data[i + 3] = Math.round(data[i + 3] * ((brightness - 24) / 34));
                }
            }
            context.putImageData(frame, 0, 0);
        };

        return () => {
            image.onload = null;
        };
    }, [src]);

    return (
        <canvas
            ref={canvasRef}
            role="img"
            aria-label={alt}
            className='max-h-[320px] w-full object-contain'
            style={{ display: 'block' }}
        />
    );
}

export default Domain