import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import DomainButton from '../components/ui/DomainButton';
import Car from '/Car.png';
import DomainCarousel from '../components/ui/DomainCarousel';

function Domain() {
    const isWeb = useMediaQuery({ minWidth: 1920 });
    const [activeDomain, setActiveDomain] = useState(null);
    const domains = [
        {
            title: 'Automotive',
            buttonText: 'Learn more',
        },
        {
            title: 'Railway',
            buttonText: 'Learn more',
        },
        {
            title: 'Marine',
            buttonText: 'Learn more',
        },
        {
            title: 'Industrial Machinery',
            buttonText: 'Learn more',
        },
        {
            title: 'Household Appliances',
            buttonText: 'Learn more',
        },
    ]
    const handleDomainClick = (domain) => {
        setActiveDomain(domain);
    }

    return (
        <div className='w-full flex flex-col justify-center items-center lg:flex-row'>
            <div className='w-[70%] md:w-[60%] lg:w-1/2 pl-8 lg:pl-48 flex flex-col lg:gap-4 gap-2 items-center justify-end'>
                <div className='mb-8 w-full ml-auto lg:hidden'>
                    <h1 className="text-[32px] md:text-[44px] lg:text-[46px] xl:text-[56px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]" style={{ fontSize: isWeb && '65px' }}>
                        Domains
                    </h1>
                    {/* <p className='text-white text-[18px]' style={{ fontFamily: 'Poppins, sans-serif' }}>Lorem ipsum dolor sit amet consectetur. Tellus blandit pellentesque duis eu at. Id sociis augue.</p> */}
                </div>
                <div>
                    <img src={activeDomain === 'Automotive' ? Car : activeDomain === 'Railway' ? Car : activeDomain === 'Marine' ? Car : activeDomain === 'Industrial Machinery' ? Car : activeDomain === 'Household Appliances' ? Car : Car} alt="car" />
                </div>
                {activeDomain === 'Automotive' ? (
                    <p className='text-[14px] sm:text-[18px] lg:text-[20px] xl:text-[27px] font-bold text-center lg:text-start' style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Delivering detailed CAD design, vehicle packaging studies, and compliance documentation to support OEM and Tier-1 automotive development programs. Our work includes component design, system integration, design validation support, and technical documentation across multiple stages of the vehicle development cycle.

                    </p>
                ) : activeDomain === 'Railway' ? (
                    <p className='text-[14px] sm:text-[18px] lg:text-[20px] xl:text-[27px] font-bold text-center lg:text-start' style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Delivering precise structural layouts, subsystem integration checks, and safety compliance documentation to support rolling stock and railway infrastructure programs. Our services include component design, system validation, technical documentation, and operational support throughout the train development lifecycle.
                    </p>
                ) : activeDomain === 'Marine' ? (
                    <p className='text-[14px] sm:text-[18px] lg:text-[20px] xl:text-[27px] font-bold text-center lg:text-start' style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Providing detailed digital mock-ups, durability assessments, and regulatory compliance documentation for vessels and marine systems. Our work covers component and system design, performance validation, and technical records to ensure safety and efficiency at all stages of marine development.

                    </p>
                ) : activeDomain === 'Industrial Machinery' ? (
                    <p className='text-[14px] sm:text-[18px] lg:text-[20px] xl:text-[27px] font-bold text-center lg:text-start' style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Creating accurate CAD designs, assembly guides, and performance validation reports to support complex industrial machinery programs. We focus on component and system design, process optimization, and comprehensive technical documentation throughout the machinery development cycle.

                    </p>
                ) : activeDomain === 'Household Appliances' ? (
                    <p className='text-[14px] sm:text-[18px] lg:text-[20px] xl:text-[27px] font-bold text-center lg:text-start' style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Delivering detailed product designs, ergonomics and packaging studies, and compliance documentation for consumer appliance development programs. Our work spans component and system design, performance testing, and technical documentation to ensure functionality, safety, and manufacturability.

                    </p>
                ) : (
                    <p className='text-[14px] sm:text-[18px] lg:text-[20px] xl:text-[27px] font-bold text-center lg:text-start' style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Providing precise CAD designs, integration studies, and regulatory compliance documentation for IoT hardware and smart devices. Our services include component design, connectivity validation, system-level integration, and technical documentation across prototyping and production stages.
                    </p>
                )}
            </div>
            <div className='w-full lg:w-1/2'>
                <div className='mb-8 w-full ml-auto hidden lg:block'>
                    <h1 className="text-[32px] md:text-[44px] lg:text-[46px] xl:text-[56px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]" style={{ fontSize: isWeb && '65px' }}>
                        Domains
                    </h1>
                    {/* <p className='text-white text-[18px]' style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Lorem ipsum dolor sit amet consectetur. Tellus blandit pellentesque duis eu at. Id sociis augue.
                    </p> */}
                </div>
                <div className='flex gap-10 w-full lg:min-w-[55%] justify-self-end justify-center lg:justify-end text-white'>
                    <div className='hidden lg:grid grid-cols-2'>
                        {domains.map((domain) => (
                            <DomainButton key={domain.title} title={domain.title} buttonText={domain.buttonText} handleDomainClick={() => handleDomainClick(domain.title)} />
                        ))}
                    </div>
                    <DomainCarousel domains={domains} handleDomainClick={handleDomainClick} />
                </div>

            </div>
        </div>
    )
}

export default Domain