import React from 'react';
import { useMediaQuery } from 'react-responsive';
import WorldMapSection from '../components/ui/WorldMap';

export default function About() {
  const isWeb = useMediaQuery({ minWidth: 1920 });

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <h1 className="mb-10 3xl:mb-[88px] text-[32px] md:text-[44px] lg:text-[66px] xl:text-[66px] font-bold text-white font-daminga leading-[1.05] md:leading-[1.1] lg:leading-[1.2] xl:leading-[1.2]" style={{ fontSize: isWeb && '65px' }}>
          About
        </h1>

      </div>
      <WorldMapSection />
      <div>
        <div className="mt-4 flex gap-0 rounded-[15px] max-w-[300px] sm:max-w-[440px] 3xl:max-w-[567px] ml-auto md:mx-auto px-[15px] sm:px-[30px] 3xl:px-[35px] py-[20px] font-normal md:font-medium bg-[rgba(221,221,221,0.20)]" style={{ fontFamily: 'Poppins, sans-serif'}}>
          <p className='text-white text-sm md:text-[14px] 2xl:text-[16px] font-normal 3xl:font-medium' style={{ fontFamily: 'Poppins, sans-serif' }}>
            Lorem ipsum dolor sit amet consectetur. Imperdiet sed adipiscing sagittis egestas. Porta vitae vel enim nunc. Eget maecenas tincidunt.
          </p>
        </div>
      </div>
    </>
  );
};