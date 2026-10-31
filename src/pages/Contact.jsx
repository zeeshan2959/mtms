import React from 'react'
import Timers from '../components/ui/Timer'
import ContactForm from '../components/ui/ContactForm'
import { useMediaQuery } from 'react-responsive';
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';

function Contact() {
  const isWeb = useMediaQuery({ minWidth: 1920 });
  const isWide = useMediaQuery({ minWidth: 1701 });
  return (
    <div className=''>
      <AnimatedText
        as="h1"
        text="Contact"
        split="chars"
        stagger={0.045}
        className="text-[32px] md:text-[44px] lg:text-[46px] xl:text-[56px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2] text-center mb-8"
        style={{ fontSize: isWide ? 72 : isWeb ? 65 : undefined }}
      />
      <div
        className='flex w-full min-w-0 flex-col items-stretch gap-6 text-white md:w-auto md:flex-row md:items-start md:gap-10 md:pl-20 md:min-w-[55%] md:justify-self-end md:justify-end'
        style={isWide ? {
          width: 'min(1100px, 100%)',
          minWidth: 0,
          margin: '0 auto',
          paddingLeft: 0,
          justifySelf: 'center',
          justifyContent: 'center',
          transform: 'scale(1.08)',
          transformOrigin: 'center top',
        } : undefined}
      >
        <Reveal x={-40} y={0} duration={1} className="w-full min-w-0 md:w-auto">
          <ContactForm />
        </Reveal>
        <Reveal x={40} y={0} delay={0.15} duration={1} className="w-full min-w-0 md:w-auto">
          <Timers />
        </Reveal>
      </div>
    </div>
  )
}

export default Contact
