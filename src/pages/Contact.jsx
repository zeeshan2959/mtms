import React from 'react';
import CalendlyEmbed from '../components/ui/CalendlyEmbed';
import { useMediaQuery } from 'react-responsive';
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';

function Contact() {
  const isWeb = useMediaQuery({ minWidth: 1920 });
  const isWide = useMediaQuery({ minWidth: 1701 });

  return (
    <div className="w-full min-w-0 pb-10">
      <AnimatedText
        as="h1"
        text="Contact"
        split="chars"
        stagger={0.045}
        className="text-[32px] md:text-[44px] lg:text-[46px] xl:text-[56px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2] text-center mb-2 md:mb-3"
        style={{ fontSize: isWide ? 72 : isWeb ? 65 : undefined }}
      />
      <p
        className="text-center text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-[#70d2e3] mb-6 md:mb-8"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Schedule a Discussion with MTMS Engineering
      </p>

      <Reveal y={24} duration={0.8} className="w-full">
        <CalendlyEmbed />
      </Reveal>
    </div>
  );
}

export default Contact;
