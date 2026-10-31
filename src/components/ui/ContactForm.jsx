import React from 'react'

function ContactForm() {
    const handleSubmit = (e) => {
        e.preventDefault();

    };
    return (
        <div className='2xl:min-w-[515px]'>
            <h1 className='text-[20px] xl:text-[24px] 2xl:text-[30px] font-bold text-white text-center mb-5' style={{ fontFamily: 'Daminga, sans-serif' }}>We will answer any questions</h1>
            <form
                onSubmit={handleSubmit}
                className='relative isolate flex flex-col gap-3 overflow-hidden rounded-[22px] border border-white/25 bg-[radial-gradient(ellipse_at_100%_0%,rgba(85,182,200,0.2),transparent_44%),linear-gradient(140deg,rgba(255,255,255,0.17),rgba(11,24,40,0.76)_54%,rgba(23,66,82,0.58))] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-2xl transition-all duration-300 hover:border-[#70d2e3]/35 sm:p-6 2xl:gap-[16px] 2xl:p-7'
            >
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent" />
                <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-20 -z-10 h-48 w-48 rounded-full bg-[#55B6C8]/20 blur-3xl" />
                <input name="full_name" type="text" placeholder="Full Name" className='rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition placeholder:text-white/55 hover:border-white/25 focus:border-[#70d2e3]/65 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20 2xl:px-[23px] 2xl:py-[12px] 2xl:text-base' style={{ fontFamily: 'Poppins, sans-serif' }} />
                <input name="number" type="text" placeholder="Number" className='rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition placeholder:text-white/55 hover:border-white/25 focus:border-[#70d2e3]/65 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20 2xl:px-[23px] 2xl:py-[12px] 2xl:text-base' style={{ fontFamily: 'Poppins, sans-serif' }} />
                <input name="email" type="email" placeholder="Email" className='rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition placeholder:text-white/55 hover:border-white/25 focus:border-[#70d2e3]/65 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20 2xl:px-[23px] 2xl:py-[12px] 2xl:text-base' style={{ fontFamily: 'Poppins, sans-serif' }} />
                <input name="company_name" type="text" placeholder="Company Name" className='rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition placeholder:text-white/55 hover:border-white/25 focus:border-[#70d2e3]/65 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20 2xl:px-[23px] 2xl:py-[12px] 2xl:text-base' style={{ fontFamily: 'Poppins, sans-serif' }} />
                <input name="designation" type="text" placeholder="Designation" className='rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition placeholder:text-white/55 hover:border-white/25 focus:border-[#70d2e3]/65 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20 2xl:px-[23px] 2xl:py-[12px] 2xl:text-base' style={{ fontFamily: 'Poppins, sans-serif' }} />
                <textarea name="message" placeholder="Message" className='min-h-24 resize-y rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition placeholder:text-white/55 hover:border-white/25 focus:border-[#70d2e3]/65 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20 2xl:px-[23px] 2xl:py-[12px] 2xl:text-base' style={{ fontFamily: 'Poppins, sans-serif' }} />
                <input name="file" type="file" className='rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition file:mr-3 file:rounded-lg file:border-0 file:bg-white/15 file:px-3 file:py-1 file:text-white hover:border-white/25 focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20' style={{ fontFamily: 'Poppins, sans-serif' }} />
                <div className='relative flex items-center gap-[14px]'>
                    <input name="terms" type="checkbox" id="terms" className='w-[16px] h-[16px] rounded-[6px] text-base font-medium text-white' style={{ backgroundColor: 'rgba(255, 255, 255, 0)', fontFamily: 'Poppins, sans-serif' }} />
                    <label htmlFor="terms" className='text-sm font-medium text-white' style={{ fontFamily: 'Poppins, sans-serif' }}>I agree to the terms and conditions</label>
                </div>
                <button type="submit" className='relative mt-2 w-[180px] rounded-full border border-white/35 bg-[linear-gradient(120deg,rgba(85,182,200,0.4),rgba(17,66,85,0.64))] px-8 py-2 text-base font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#70d2e3]/70 hover:shadow-[0_14px_32px_rgba(0,0,0,0.28),0_0_20px_rgba(85,182,200,0.16)] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/50' style={{ fontFamily: 'Poppins, sans-serif' }}>Submit</button>
            </form>
        </div>
    );
}

export default ContactForm;