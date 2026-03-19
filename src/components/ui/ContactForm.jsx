import React from 'react'
import emailjs from "emailjs-com";

function ContactForm() {
    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_xx9tfv9",
            "template_63z40io",
            e.target,
            "rR8-n63kCkYg7o5M_"
        )
        .then(() => {
            alert("Message sent successfully!");
        })
        .catch((error) => {
            console.error(error);
            alert("Failed to send message");
        });
    };
    return (
        <div className='2xl:min-w-[515px]'>
            <h1 className='text-[20px] xl:text-[24px] 2xl:text-[30px] font-bold text-white text-center mb-5' style={{ fontFamily: 'Daminga, sans-serif' }}>We will answer any questions</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 2xl:gap-[20px]'>
                <input name="full_name" type="text" placeholder="Full Name" className='px-4 py-2.5 2xl:px-[23px] 2xl:py-[12px] rounded-[6px] text-sm 2xl:text-base font-medium text-white focus:outline-none' style={{ backgroundColor: 'rgba(221, 221, 221, 0.20)', fontFamily: 'Poppins, sans-serif' }} />
                <input name="number" type="text" placeholder="Number" className='px-4 py-2.5 2xl:px-[23px] 2xl:py-[12px] rounded-[6px] text-sm 2xl:text-base font-medium text-white focus:outline-none' style={{ backgroundColor: 'rgba(221, 221, 221, 0.20)', fontFamily: 'Poppins, sans-serif' }} />
                <input name="email" type="email" placeholder="Email" className='px-4 py-2.5 2xl:px-[23px] 2xl:py-[12px] rounded-[6px] text-sm 2xl:text-base font-medium text-white focus:outline-none' style={{ backgroundColor: 'rgba(221, 221, 221, 0.20)', fontFamily: 'Poppins, sans-serif' }} />
                <input name="company_name" type="text" placeholder="Company Name" className='px-4 py-2.5 2xl:px-[23px] 2xl:py-[12px] rounded-[6px] text-sm 2xl:text-base font-medium text-white focus:outline-none focus:ring-0' style={{ backgroundColor: 'rgba(221, 221, 221, 0.20)', fontFamily: 'Poppins, sans-serif' }} />
                <input name="designation" type="text" placeholder="Designation" className='px-4 py-2.5 2xl:px-[23px] 2xl:py-[12px] rounded-[6px] text-sm 2xl:text-base font-medium text-white focus:outline-none focus:ring-0' style={{ backgroundColor: 'rgba(221, 221, 221, 0.20)', fontFamily: 'Poppins, sans-serif' }} />
                <textarea name="message" type="text" placeholder="Designation" className='px-4 py-2.5 2xl:px-[23px] 2xl:py-[12px] rounded-[6px] text-sm 2xl:text-base font-medium text-white focus:outline-none focus:ring-0' style={{ backgroundColor: 'rgba(221, 221, 221, 0.20)', fontFamily: 'Poppins, sans-serif' }} />
                <input name="file" type="file" placeholder="Designation" className='px-4 py-2.5 2xl:px-[23px] 2xl:py-[12px] rounded-[6px] text-sm 2xl:text-base font-medium text-white focus:outline-none' style={{ backgroundColor: 'rgba(221, 221, 221, 0.20)', fontFamily: 'Poppins, sans-serif' }} />
                <div className='flex items-center gap-[14px]'>
                    <input name="terms" type="checkbox" id="terms" className='w-[16px] h-[16px] rounded-[6px] text-base font-medium text-white' style={{ backgroundColor: 'rgba(255, 255, 255, 0)', fontFamily: 'Poppins, sans-serif' }} />
                    <label htmlFor="terms" className='text-sm font-medium text-white' style={{ fontFamily: 'Poppins, sans-serif' }}>I agree to the terms and conditions</label>
                </div>
                <button type="submit" className='mt-[22px] px-[66px] py-[8px] rounded-[78px] text-base font-medium text-white border-2 border-white w-[180px]' style={{ background: ' linear-gradient(90deg, rgba(74, 238, 175, 0.20) 0%, rgba(65, 82, 236, 0.20) 100%)', fontFamily: 'Poppins, sans-serif' }}>Submit</button>
            </form>
        </div>
    );
}

export default ContactForm;