'use client';

import React from 'react';
import { FINAL_CTA_DATA } from '@/data/home';
import { Arrow } from '@/components/ui/Arrow';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function FinalCTA() {
  return (
    <section
      id="contact"
      data-nav-theme="light"
      className="relative bg-[#FFD600] text-[#050505] py-28 sm:py-36 md:py-48 overflow-hidden"
      aria-label="Start a project with FOB Media"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="border-b border-[#050505]/20 pb-6 mb-16 sm:mb-24 flex items-center justify-between">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#050505]">
            {FINAL_CTA_DATA.label}
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-[#050505]/60">
            [GET IN TOUCH]
          </span>
        </div>

        {/* Climax Oversized Typography */}
        <div className="mb-14 sm:mb-20">
          <h2 className="fob-cta-heading text-[#050505] tracking-tighter select-none">
            LET&apos;S MAKE<br />
            SOMETHING<br />
            MATTER.
          </h2>
        </div>

        {/* Narrative & Action Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-10 border-t border-[#050505]/20">
          <div className="lg:col-span-7">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-[#050505] max-w-2xl">
              {FINAL_CTA_DATA.copy}
            </p>
            <div className="mt-4 font-mono text-xs uppercase tracking-widest text-[#050505]/70">
              DIRECT INQUIRIES // HELLO@FOBMEDIA.COM
            </div>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <MagneticButton
              href="mailto:hello@fobmedia.com"
              variant="black"
              className="px-10 py-6 text-sm tracking-[0.25em]"
              ariaLabel="Send email to hello@fobmedia.com to discuss a project"
            >
              <span>{FINAL_CTA_DATA.ctaText}</span>
              <Arrow className="w-5 h-5" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
