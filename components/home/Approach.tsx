'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APPROACH_DATA } from '@/data/home';

gsap.registerPlugin(ScrollTrigger);

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Progress line animation
      gsap.fromTo(
        lineProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );

      // Track active step on scroll
      stepRefs.current.forEach((stepEl, idx) => {
        if (!stepEl) return;
        ScrollTrigger.create({
          trigger: stepEl,
          start: 'top 65%',
          end: 'bottom 65%',
          onEnter: () => setActiveStep(idx),
          onEnterBack: () => setActiveStep(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      data-nav-theme="dark"
      className="relative bg-[#050505] text-[#F7F7F5] py-28 sm:py-36 md:py-48 overflow-hidden"
      aria-label="Our Approach and Methodology"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14">
        {/* ====================================================
            SECTION HEADER
            ==================================================== */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 sm:pb-5 mb-8 sm:mb-10">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#FFD600]">
            {APPROACH_DATA.label}
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-white/60">
            [METHODOLOGY]
          </span>
        </div>

        {/* Section Headline & Narrative */}
        <div className="mb-20 sm:mb-28">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="fob-section-heading text-[#F7F7F5] tracking-tighter">
                THINK.<br />
                MAKE.<br />
                MOVE.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
                {APPROACH_DATA.copy}
              </p>
            </div>
          </div>
        </div>

        {/* Vertical Timeline & Process Steps */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Progress Context */}
          <div className="hidden lg:block lg:col-span-4 sticky top-36 h-fit">
            <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-[#FFD600] block mb-2">
              ACTIVE STAGE // 0{activeStep + 1}
            </span>
            <div className="text-4xl xl:text-5xl font-black uppercase tracking-tight text-[#F7F7F5] mb-4">
              {APPROACH_DATA.steps[activeStep]?.title}
            </div>
            <p className="text-sm font-mono tracking-widest text-white/50 uppercase">
              {APPROACH_DATA.steps[activeStep]?.subtitle}
            </p>
            <div className="mt-8 pt-8 border-t border-white/10 font-mono text-xs tracking-widest text-white/40 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#FFD600] inline-block" />
              <span>ITERATIVE RIGOR GUARANTEED</span>
            </div>
          </div>

          {/* Right Column: Timeline & Steps */}
          <div className="lg:col-span-8 relative pl-8 sm:pl-12 md:pl-16">
            {/* Background Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 origin-top" />

            {/* Glowing Active Progress Line */}
            <div
              ref={lineProgressRef}
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FFD600] origin-top shadow-[0_0_12px_rgba(255,214,0,0.6)]"
              style={{ transform: 'scaleY(0)' }}
            />

            {/* Steps Container */}
            <div className="flex flex-col gap-20 sm:gap-28 md:gap-36">
              {APPROACH_DATA.steps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <div
                    key={step.step}
                    ref={(el) => {
                      if (el) stepRefs.current[idx] = el;
                    }}
                    className={`relative transition-all duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-40 hover:opacity-75'
                    }`}
                  >
                    {/* Node Marker on Line */}
                    <div
                      className={`absolute -left-8 sm:-left-12 md:-left-16 top-2 w-4 h-4 -translate-x-1/2 border-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#FFD600] border-[#FFD600] scale-125 shadow-[0_0_10px_#FFD600]'
                          : 'bg-[#050505] border-white/30'
                      }`}
                    />

                    {/* Step Content */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-baseline gap-4 font-mono text-xs tracking-widest">
                        <span
                          className={`font-black ${
                            isActive ? 'text-[#FFD600]' : 'text-white/60'
                          }`}
                        >
                          STAGE {step.step}
                        </span>
                        <span className="text-white/40">{'//'}</span>
                        <span className="text-white/60 uppercase">
                          {step.subtitle}
                        </span>
                      </div>

                      <h3
                        className={`text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-[#F7F7F5]' : 'text-white/50'
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="mt-2 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/80 max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
