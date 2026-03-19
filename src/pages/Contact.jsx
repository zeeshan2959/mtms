import React from 'react'
import Timers from '../components/ui/Timer'
import ContactForm from '../components/ui/ContactForm'
import { useMediaQuery } from 'react-responsive';

function Contact() {
  const isWeb = useMediaQuery({ minWidth: 1920 });
  return (
    <div className=''>
      <h1 className="text-[32px] md:text-[44px] lg:text-[46px] xl:text-[56px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2] text-center mb-8" style={{ fontSize: isWeb && '65px' }}>
        Contact
      </h1>
      <div className='flex flex-col md:flex-row gap-10 pl-20 md:min-w-[55%] md:justify-self-end justify-center md:justify-end text-white'>
        <ContactForm />
        <Timers />
      </div>
    </div>
  )
}

export default Contact