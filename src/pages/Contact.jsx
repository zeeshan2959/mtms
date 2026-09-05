import React from 'react'
import Timers from '../components/ui/Timer'
import ContactForm from '../components/ui/ContactForm'
import { useMediaQuery } from 'react-responsive';
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';

function Contact() {
  const isWeb = useMediaQuery({ minWidth: 1920 });
  return (
    <div className=''>
      <AnimatedText
        as="h1"
        text="Contact"
        split="chars"
        stagger={0.045}
        className="text-[32px] md:text-[44px] lg:text-[46px] xl:text-[56px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2] text-center mb-8"
        style={{ fontSize: isWeb && '65px' }}
      />
      <div className='flex flex-col md:flex-row gap-6 md:gap-10 pl-0 md:pl-20 md:min-w-[55%] md:justify-self-end justify-center md:justify-end text-white'>
        <Reveal x={-40} y={0} duration={1}>
          <ContactForm />
        </Reveal>
        <Reveal x={40} y={0} delay={0.15} duration={1}>
          <Timers />
        </Reveal>
      </div>
    </div>
  )
}

export default Contact
