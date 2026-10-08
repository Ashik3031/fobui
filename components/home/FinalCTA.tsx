'use client';

import React, { useState } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import Particles from '@/components/ui/Particles';

const UAE_OFFICE = {
  label: 'UAE HEAD OFFICE',
  address: 'Floor 2, Building 4, Union Business Park, Dubai Investment Park 1, Dubai, UAE',
  phn: '+971 52 869 2447',
  tel: '+971 44 329 464',
  email: 'hello@fobmedia.com',
};

export function FinalCTA() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      data-nav-theme="dark"
      className="relative bg-[#050505] text-[#F7F7F5] py-24 sm:py-32 md:py-40 overflow-hidden border-t border-white/10"
      aria-label="Start a project with FOB Media"
    >
      {/* ========================================================
          OGL PARTICLES BACKGROUND
          ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Subtle radial shading overlay to ensure text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505]/85 pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="border-b border-white/15 pb-4 sm:pb-5 mb-12 sm:mb-16 flex items-center justify-between">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#FFD600]">
            07 / START A PROJECT
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-white/60">
            [GET IN TOUCH]
          </span>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Heading, Pitch & UAE Office Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.08]">
                Start Your Growth<br />
                Journey with <span className="text-[#FFD600]">FOB!</span>
              </h2>
              <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed mt-5 max-w-lg">
                Let&apos;s dive into your ideas, achieve your goals with precision and design
                tailored strategies that fit your needs. We&apos;ll work with you to set clear
                expectations, goals, and metrics.
              </p>
            </div>

            {/* UAE Office Details */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-white/10">
              <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#FFD600] pb-2 border-b-2 border-[#FFD600]">
                <span>{UAE_OFFICE.label}</span>
              </div>

              <div className="mt-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-md">
                    {UAE_OFFICE.address}
                  </p>
                </div>

                <div className="mt-6">
                  <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-white/50 block mb-2">
                    CONTACT DETAILS
                  </span>
                  <div className="flex flex-col gap-1.5 text-sm text-white/80 font-mono tracking-wider">
                    <a
                      href={`tel:${UAE_OFFICE.phn.replace(/\s+/g, '')}`}
                      className="hover:text-[#FFD600] transition-colors"
                    >
                      Phn: {UAE_OFFICE.phn}
                    </a>
                    <a
                      href={`tel:${UAE_OFFICE.tel.replace(/\s+/g, '')}`}
                      className="hover:text-[#FFD600] transition-colors"
                    >
                      Tel: {UAE_OFFICE.tel}
                    </a>
                    <a
                      href={`mailto:${UAE_OFFICE.email}`}
                      className="hover:text-[#FFD600] transition-colors mt-1"
                    >
                      Email: {UAE_OFFICE.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-white/90">
                    First Name<span className="text-[#FFD600]">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full bg-white text-[#050505] placeholder-[#050505]/40 rounded-xl px-4 py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#FFD600] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-white/90">
                    Last Name<span className="text-[#FFD600]">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full bg-white text-[#050505] placeholder-[#050505]/40 rounded-xl px-4 py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#FFD600] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/90">
                    Email<span className="text-[#FFD600]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="yourname@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-white text-[#050505] placeholder-[#050505]/40 rounded-xl px-4 py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#FFD600] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="companyName" className="text-sm font-medium text-white/90">
                    Company Name<span className="text-[#FFD600]">*</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    placeholder="Enter your company name"
                    value={form.companyName}
                    onChange={handleChange}
                    className="w-full bg-white text-[#050505] placeholder-[#050505]/40 rounded-xl px-4 py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#FFD600] transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Phone Number (UAE only) */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-white/90">
                  Phone number<span className="text-[#FFD600]">*</span>
                </label>
                <div className="flex gap-3">
                  <div className="w-28 sm:w-32 bg-white text-[#050505] font-bold font-mono text-sm rounded-xl px-3 sm:px-4 py-3.5 flex items-center justify-center select-none shadow-xs">
                    +971
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="50 123 4567"
                    value={form.phone}
                    onChange={handleChange}
                    className="flex-1 bg-white text-[#050505] placeholder-[#050505]/40 rounded-xl px-4 py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#FFD600] transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-white/90">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-white text-[#050505] placeholder-[#050505]/40 rounded-xl p-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#FFD600] transition-all resize-none"
                />
              </div>

              {/* Privacy Disclaimer */}
              <p className="text-xs text-white/60 leading-relaxed font-light">
                We&apos;re committed to your privacy. FOB Media uses the information you provide to
                us to contact you about our relevant content, products, and services. You may
                unsubscribe from these communications at any time. For more information, check out
                our{' '}
                <a
                  href="#privacy"
                  className="text-white hover:text-[#FFD600] underline transition-colors"
                >
                  Privacy Policy
                </a>
                .
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                {submitted ? (
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFD600]/15 border border-[#FFD600] rounded-full text-[#FFD600] font-mono text-xs uppercase tracking-widest animate-in fade-in">
                    <span>✓ MESSAGE SENT. WE&apos;LL BE IN TOUCH PROMPTLY.</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 bg-[#FFD600] hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-[0.2em] px-10 py-4 rounded-full transition-all duration-300 shadow-[0_8px_25px_rgba(255,214,0,0.25)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] focus:outline-none cursor-pointer"
                  >
                    <span>SUBMIT</span>
                    <Arrow className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
