'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES, Service } from '@/data/services';
import { Arrow } from '@/components/ui/Arrow';

export function Capabilities() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const toggleMobileExpand = (id: string) => {
    setExpandedMobileId(expandedMobileId === id ? null : id);
  };

  return (
    <section
      id="capabilities"
      data-nav-theme="dark"
      className="relative bg-[#050505] text-[#F7F7F5] py-28 sm:py-36 md:py-48 overflow-hidden border-b border-white/10"
      aria-label="Capabilities and Services"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14">
        {/* ====================================================
            SECTION HEADER
            ==================================================== */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 sm:pb-5 mb-8 sm:mb-10">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#FFD600]">
            03 / WHAT WE DO
          </span>
          <span className="font-mono text-xs tracking-widest uppercase text-white/60">
            [DISCIPLINES & SERVICES]
          </span>
        </div>

        {/* Section Headline & Narrative */}
        <div className="mb-16 sm:mb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="fob-section-heading text-[#F7F7F5] tracking-tighter">
                BUILD.<br />
                LAUNCH.<br />
                GROW.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
                End-to-end digital capabilities designed to solve complex commercial challenges. We do not do fragmented work; we engineer entire brand outcomes. End-to-end digital capabilities designed to solve complex commercial challenges. We do not do fragmented work; we engineer entire brand outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Large Horizontal Interactive Service Rows */}
        <div ref={containerRef} className="border-t border-white/15 divide-y divide-white/15">
          {SERVICES.map((service) => {
            const isExpanded = expandedMobileId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => !isMobile && setActiveService(service)}
                onMouseLeave={() => !isMobile && setActiveService(null)}
                className="group relative transition-colors duration-300 hover:bg-[#FFD600]"
              >
                {/* Desktop and Tablet Row */}
                <div className="hidden lg:flex items-center justify-between py-8 xl:py-10 px-4 transition-all duration-300 group-hover:py-11 xl:group-hover:py-13 group-hover:translate-x-2">
                  <div className="flex flex-col gap-2 max-w-4xl">
                    <div className="flex items-baseline gap-10 xl:gap-16">
                      <span className="font-mono text-sm xl:text-base font-black tracking-widest text-white/40 group-hover:text-[#050505] transition-colors duration-200 select-none">
                        {service.number}
                      </span>
                      <Link
                        href={`/solutions/${service.slug}`}
                        className="text-4xl xl:text-6xl font-black uppercase tracking-tight text-[#F7F7F5] group-hover:text-[#050505] focus:outline-none transition-colors duration-200"
                      >
                        {service.title}
                      </Link>
                    </div>

                    {/* Expandable 2-line description on hover */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out pl-16 xl:pl-24">
                      <div className="overflow-hidden">
                        <p className="line-clamp-2 text-sm xl:text-base text-[#050505]/85 font-normal leading-relaxed max-w-2xl pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 shrink-0">
                    <span className="font-mono text-xs tracking-widest uppercase text-white/70 group-hover:text-[#050505]/80 max-w-xs text-right hidden xl:block transition-colors duration-200">
                      {service.tagline}
                    </span>
                    <div className="w-12 h-12 flex items-center justify-center border border-white/20 text-[#F7F7F5] group-hover:border-[#050505] group-hover:bg-[#050505] group-hover:text-[#FFD600] transition-all duration-300">
                      <Arrow className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Mobile Expandable Row */}
                <div className="lg:hidden py-6">
                  <button
                    type="button"
                    onClick={() => toggleMobileExpand(service.id)}
                    className="w-full flex items-baseline justify-between text-left focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-bold text-white/50">
                        {service.number}
                      </span>
                      <span className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F7F7F5]">
                        {service.title}
                      </span>
                    </div>
                    <span className="font-mono text-base font-bold text-[#F7F7F5]">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>

                  {/* Mobile Expanded Drawer */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 animate-in fade-in duration-200">
                      <p className="text-sm text-white/80 font-normal">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {service.deliverables.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 bg-white/5 border border-white/10 font-mono text-[10px] tracking-widest uppercase text-white/90"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/solutions/${service.slug}`}
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-[#FFD600] hover:text-white pt-2 transition-colors duration-200"
                      >
                        <span>EXPLORE CAPABILITY</span>
                        <Arrow diagonal className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Floating Cursor Image Preview */}
      {!isMobile && activeService && (
        <div
          className="fixed pointer-events-none z-40 w-80 h-52 bg-[#050505] border border-white/15 overflow-hidden shadow-2xl transform-gpu transition-opacity duration-200"
          style={{
            left: `${mousePos.x + 28}px`,
            top: `${mousePos.y - 100}px`,
            opacity: activeService ? 1 : 0,
          }}
        >
          <div className="relative w-full h-full bg-[#111]">
            <Image
              src={activeService.image}
              alt={activeService.title}
              fill
              sizes="320px"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
            <div className="absolute bottom-3 left-3 right-3 bg-[#050505]/85 backdrop-blur-sm px-3 py-2 font-mono text-[10px] tracking-widest uppercase text-[#fed604] flex justify-between items-center">
              <span className="font-bold">{activeService.number}</span>
              <span className="truncate max-w-[200px]">{activeService.title}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
