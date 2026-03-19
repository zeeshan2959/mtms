import React from "react";

export default function DomainButton({title, buttonText="Learn more", handleDomainClick}) {
  return (
    <>
      <style>
        {`
          @keyframes upDownSettle {
            0% { transform: translateY(0); }
            40% { transform: translateY(-24px); }
            70% { transform: translateY(-14px); }
            100% { transform: translateY(-18px); }
          }

          .group:hover .content {
            animation: upDownSettle 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
        `}
      </style>

      <div className="2xl:w-[349px] 2xl:h-[274px] xl:w-[280px] xl:h-[250px] w-[240px] h-[250px] rounded-[30px] overflow-hidden relative group cursor-pointer border border-[rgba(255,255,255,0.20)]">
        
        {/* Background */}
        <div className="absolute inset-0 bg-[rgba(221,221,221,0.20)] transition-all duration-700 ease-out group-hover:bg-[#23768C]"></div>

        {/* Content Wrapper */}
        <div className="content absolute inset-0 text-white will-change-transform">
          
          {/* TEXT (BOTTOM → TOP) */}
          <div
            className="
              absolute left-1/2 bottom-8 -translate-x-1/2
              transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
              group-hover:top-16 group-hover:bottom-auto group-hover:-translate-y-0
            "
          >
            <h2 className="text-[20px] 2xl:text-[27px] font-bold text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {title}
            </h2>
          </div>

          {/* BUTTON (hidden → bottom) */}
          <div
            className="
              absolute left-1/2 bottom-6 -translate-x-1/2
              opacity-0 translate-y-6
              transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
              group-hover:opacity-100 group-hover:translate-y-0
            "
          >
            <button className="px-4 xl:px-12 xl:w-[230px] w-[180px] py-2 border border-white rounded-full" onClick={handleDomainClick}>
              {buttonText}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}