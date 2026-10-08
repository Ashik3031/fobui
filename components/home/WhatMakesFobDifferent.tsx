'use client';

import React from 'react';

interface Differentiator {
  number: string;
  title: string;
  description: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    number: '1',
    title: 'One senior team. One accountable owner.',
    description:
      'Strategy, creative direction, engineering, and SEO are delivered by a dedicated senior squad. No agency-of-record bureaucracy. No junior handoffs. The senior partners who scope your vision are the exact ones who design, code, and ship it.',
  },
  {
    number: '2',
    title: 'Built to perform, not just to launch.',
    description:
      'Every digital flagship we deliver targets 95+ Core Web Vitals out of the gate, ships with structured semantic architecture, and runs on sub-second Next.js cloud infrastructure. Extreme performance, security, and search discoverability are our baseline, not paid upsells.',
  },
  {
    number: '3',
    title: 'Commercial velocity over vanity.',
    description:
      'We do not build hollow design experiments that tank conversion. Every micro-interaction, layout hierarchy, and motion sequence is engineered to command market authority, capture high-intent demand, and tangibly lift bottom-line commercial revenue.',
  },
];

export function WhatMakesFobDifferent() {
  return (
    <section
      id="difference"
      data-nav-theme="dark"
      aria-label="What Makes FOB Media Different"
      className="relative bg-[#050505] text-[#F7F7F5] py-24 sm:py-32 md:py-40 overflow-hidden border-b border-white/10"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14">
        {/* ====================================================
            SECTION HEADER
            ==================================================== */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 sm:pb-5 mb-8 sm:mb-10">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#FFD600]">
            05 / THE FOB ADVANTAGE
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-white/60">
            [DIFFERENTIATORS]
          </span>
        </div>

        {/* ====================================================
            HEADER
            ==================================================== */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5">
            What makes <span className="text-[#fed604]">FOB different.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl font-light">
            We don&apos;t build generic brochure templates. We engineer bespoke digital flagships for ambitious brands that demand sub-second performance, cultural resonance, and measurable market dominance.
          </p>
        </div>

        {/* ====================================================
            SIMPLE VERTICAL NUMBERED CARDS STACK
            ==================================================== */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {DIFFERENTIATORS.map((item) => (
            <div
              key={item.number}
              className="
                group
                relative
                bg-[#0D0D0D]
                border
                border-white/10
                rounded-2xl
                sm:rounded-3xl
                p-8
                sm:p-10
                md:p-12
                flex
                flex-col
                sm:flex-row
                sm:items-start
                gap-6
                sm:gap-10
                md:gap-12
                transition-all
                duration-300
                hover:border-[#fed604]/50
                hover:bg-[#121212]
              "
            >
              {/* Big Minimal Number */}
              <div
                className="
                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  font-black
                  text-white/25
                  group-hover:text-[#fed604]
                  transition-colors
                  duration-300
                  shrink-0
                  select-none
                  leading-none
                  sm:w-16
                "
              >
                {item.number}
              </div>

              {/* Title & Description */}
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
