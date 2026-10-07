'use client';

import React from 'react';

interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'services',
    number: '1',
    question: 'What services does FOB Media provide?',
    answer:
      'We specialize in end-to-end digital experiences: brand identity systems, bespoke web development (Next.js & headless platforms), high-velocity digital marketing, technical search engine dominance (SEO), motion graphics, and conversion-engineered flagship commerce.',
  },
  {
    id: 'timeline',
    number: '2',
    question: 'How long does a typical project take?',
    answer:
      'A focused digital flagship or comprehensive brand sprint typically takes between 6 to 10 weeks from discovery to production launch. Larger enterprise platforms or complex multi-system builds usually run 10 to 14 weeks with transparent weekly sprint milestones.',
  },
  {
    id: 'client-types',
    number: '3',
    question: 'Do you work with startups or established companies?',
    answer:
      'Both. We partner with high-growth funded startups building category-defining digital foundations, as well as established global brands seeking to elevate their market presence, achieve sub-second site performance, and outpace modern competitors.',
  },
  {
    id: 'process',
    number: '4',
    question: 'What is your design and development process?',
    answer:
      'Our process is built on design-code convergence: 1) Strategic Discovery & Architecture, 2) Visual Identity & Interactive Motion Prototyping, 3) Production Engineering with clean Next.js architecture, and 4) Core Web Vitals optimization, testing, and seamless global deployment.',
  },
  {
    id: 'redesign',
    number: '5',
    question: 'Can FOB redesign an existing brand or website?',
    answer:
      'Yes. We frequently conduct deep brand overhauls and technical platform re-engineering. We preserve your existing SEO rankings and customer funnels while completely transforming the visual prestige, speed, and conversion velocity of the experience.',
  },
  {
    id: 'support',
    number: '6',
    question: 'Do you provide ongoing support after launch?',
    answer:
      'Yes. Following launch, we offer dedicated embedded squads and monthly sprint retainers for continuous feature engineering, conversion rate optimization, creative campaigns, and ongoing platform scaling to keep your business ahead.',
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      data-nav-theme="light"
      aria-label="Frequently Asked Questions"
      className="relative bg-[#F7F7F5] text-[#050505] py-20 sm:py-28 md:py-36 overflow-hidden border-b border-[#050505]/10"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14">
        {/* ====================================================
            SECTION HEADER
            ==================================================== */}
        <div className="flex items-center justify-between border-b border-[#050505]/15 pb-6 mb-16 sm:mb-20">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#050505]">
            06 / FAQ
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-[#050505]/60">
            [QUESTIONS & ANSWERS]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ====================================================
              LEFT COLUMN (STICKY HEADER & TITLE)
              ==================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">

            {/* Split Editorial Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#050505] leading-[1.08] mb-6">
              Questions?
              <br />
              <span className="font-bold">We are here to help</span>
            </h2>

            <p className="text-base sm:text-lg text-[#050505]/70 leading-relaxed max-w-md font-light">
              Everything you need to know about partnering with FOB Media, our process, and how we deliver high-impact digital outcomes.
            </p>
          </div>

          {/* ====================================================
              RIGHT COLUMN (CLEAN ACCORDION LIST)
              ==================================================== */}
          <div className="lg:col-span-7">
            <div className="border-t border-[#050505]/10 divide-y divide-[#050505]/10">
              {FAQ_ITEMS.map((item, index) => (
                <details
                  key={item.id}
                  name="fob-faq-group"
                  open={index === 0}
                  className="group py-6 sm:py-7 transition-colors duration-200"
                >
                  {/* Summary Row */}
                  <summary className="flex items-center justify-between gap-6 cursor-pointer list-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fed604] rounded-lg">
                    <div className="flex items-baseline gap-5 sm:gap-8">
                      {/* Number Index */}
                      <span className="text-2xl sm:text-3xl font-serif text-[#050505]/20 group-hover:text-[#050505]/50 group-open:text-[#050505] transition-colors shrink-0 w-6 sm:w-8 select-none">
                        {item.number}
                      </span>

                      {/* Question Text */}
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-[#050505] group-hover:text-[#050505]/80 transition-colors">
                        {item.question}
                      </h3>
                    </div>

                    {/* Circular Chevron Button */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#050505]/15 shadow-xs flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-[#050505] group-open:bg-[#050505] group-open:text-[#fed604] group-open:border-[#050505]">
                      <svg
                        className="w-4 h-4 text-current transition-transform duration-300 group-open:rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </summary>

                  {/* Answer Panel */}
                  <div className="pl-11 sm:pl-16 pr-4 sm:pr-12 pt-4 pb-2 text-sm sm:text-base text-[#050505]/75 leading-relaxed font-light">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
