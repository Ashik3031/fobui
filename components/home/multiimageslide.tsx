'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO_DATA } from '@/data/home';
import { Arrow } from '@/components/ui/Arrow';
import { GridMotion } from '@/components/ui/GridMotion';

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Entrance reveal for the hero text block
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 25 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    delay: 0.15,
                }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            id="hero"
            data-nav-theme="light"
            className="relative min-h-screen lg:min-h-screen bg-white text-[#050505] pt-28 md:pt-36 pb-8 md:pb-12 flex flex-col justify-between overflow-hidden"
            aria-label="FOB Media Introduction"
        >
            {/* Background Interactive 3D Image Grid Motion */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <GridMotion gradientColor="transparent" />
            </div>

            {/* Editorial Scrim to preserve 100% white crispness on the left and smooth fade into cards */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-white via-white/95 via-35% md:via-40% to-transparent w-full md:w-[60%] lg:w-[48%]"
                aria-hidden="true"
            />

            {/* Top subtle fade to keep navbar crystal clear */}
            <div
                className="absolute top-0 left-0 right-0 h-28 z-[1] pointer-events-none bg-gradient-to-b from-white/90 via-white/40 to-transparent"
                aria-hidden="true"
            />

            {/* Main Content Container - Matches Reference Screenshot Layout */}
            <div className="relative z-10 max-w-[1720px] w-full mx-auto px-6 sm:px-10 md:px-14 my-auto py-6 sm:py-8 lg:py-10">
                <div ref={contentRef} className="max-w-xl xl:max-w-2xl flex flex-col items-start">
                    {/* Eyebrow Label with decorative dash line */}
                    <div className="flex items-center gap-3.5 mb-4 sm:mb-6">
                        <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#050505]/75">
                            DIGITAL PARTNER
                        </span>
                        <span className="w-10 h-px bg-[#050505]/25 inline-block" />
                    </div>

                    {/* Main Headline - Stacked 4 lines with IMPOSSIBLE in brand yellow */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.35rem] font-black tracking-[-0.035em] leading-[0.91] uppercase select-none text-[#050505]">
                        <span>WE MAKE</span>
                        <br />
                        <span>IDEAS</span>
                        <br />
                        <span className="text-[#FFD600]">IMPOSSIBLE</span>
                        <br />
                        <span>TO IGNORE.</span>
                    </h1>

                    {/* Supporting Copy */}
                    <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-[1.05rem] font-normal leading-relaxed text-[#050505]/70 max-w-sm sm:max-w-md">
                        Digital experiences, campaigns and stories built to move brands forward.
                    </p>

                    {/* Dual CTA Buttons: Pill 'LET'S TALK' and 'WATCH SHOWREEL' */}
                    <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#111111] hover:bg-[#FFD600] text-white hover:text-[#111111] text-xs font-mono font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
                            aria-label="Let's talk with FOB Media"
                        >
                            <span>LET&apos;S TALK</span>
                            <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                ↗
                            </span>
                        </a>

                        <a
                            href="#work"
                            className="group inline-flex items-center gap-3 text-xs font-mono font-bold tracking-[0.16em] uppercase text-[#050505] hover:text-[#FFD600] transition-colors"
                            aria-label="Watch Showreel"
                        >
                            <span className="w-11 h-11 rounded-full bg-white border border-[#050505]/15 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:border-[#FFD600]">
                                <span className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#050505] translate-x-0.5 group-hover:border-l-[#FFD600] transition-colors" />
                            </span>
                            <span>WATCH SHOWREEL</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom HUD Bar: Stats on the left, Scroll cue on the right */}
            <div className="relative z-10 max-w-[1720px] w-full mx-auto px-6 sm:px-10 md:px-14">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-[#050505]/10 pt-5 md:pt-6">
                    {/* Key Metrics / Stats */}
                    <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
                        <div>
                            <div className="font-heading font-black text-2xl sm:text-3xl text-[#050505] leading-none mb-1">
                                50+
                            </div>
                            <div className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#050505]/60 uppercase">
                                BRANDS
                            </div>
                        </div>
                        <div className="h-8 w-px bg-[#050505]/15" />
                        <div>
                            <div className="font-heading font-black text-2xl sm:text-3xl text-[#050505] leading-none mb-1">
                                250+
                            </div>
                            <div className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#050505]/60 uppercase">
                                CAMPAIGNS
                            </div>
                        </div>
                        <div className="h-8 w-px bg-[#050505]/15" />
                        <div>
                            <div className="font-heading font-black text-2xl sm:text-3xl text-[#050505] leading-none mb-1">
                                8+
                            </div>
                            <div className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#050505]/60 uppercase">
                                YEARS
                            </div>
                        </div>
                    </div>

                    {/* Scroll cue with circular down arrow button */}
                    <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase text-[#050505]/70">
                        <span className="hidden sm:inline">SCROLL TO EXPLORE</span>
                        <a
                            href="#brand-statement"
                            aria-label="Scroll to explore"
                            className="w-10 h-10 rounded-full border border-[#050505]/20 bg-white/90 backdrop-blur-xs flex items-center justify-center hover:bg-[#050505] hover:text-[#FFD600] transition-all duration-300 shadow-xs"
                        >
                            ↓
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
