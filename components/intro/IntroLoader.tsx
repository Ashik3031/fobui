'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { FobLogo } from '@/components/ui/FobLogo';

export function IntroLoader({ onComplete }: { onComplete?: () => void }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [stepText, setStepText] = useState('01');
  const [progressNum, setProgressNum] = useState(12);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already viewed in this session
    const hasSeen = typeof window !== 'undefined' ? sessionStorage.getItem('fob_intro_seen') : null;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen || prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    const frame = requestAnimationFrame(() => {
      setShouldRender(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  useEffect(() => {
    if (!shouldRender) return;

    const steps = [
      { text: '01', progress: 24 },
      { text: '02', progress: 48 },
      { text: '03', progress: 72 },
      { text: '04', progress: 89 },
      { text: '05', progress: 100 },
      { text: 'ENTER', progress: 100 },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setStepText(steps[currentStep].text);
        setProgressNum(steps[currentStep].progress);
      } else {
        clearInterval(interval);
      }
    }, 140);

    // Master GSAP timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => {
          sessionStorage.setItem('fob_intro_seen', 'true');
          setShouldRender(false);
          if (onComplete) onComplete();
        },
      });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )
        .to(tickerRef.current, { opacity: 1, duration: 0.2 }, '-=0.2')
        .to({}, { duration: 0.5 }) // Brief hold for sequence
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: 'power4.inOut',
        });
    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, [shouldRender, onComplete]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-[#FFD600] text-[#050505] flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none overflow-hidden"
      role="progressbar"
      aria-label="Loading FOB Media"
      aria-valuenow={progressNum}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] uppercase font-bold border-b border-[#050505]/20 pb-4">
        <span>FOB MEDIA // SYSTEM ENTRY</span>
        <span>2026 EDITION</span>
      </div>

      {/* Center Wordmark & Sequence */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div ref={logoRef} className="flex flex-col items-center">
          <FobLogo color="black" asLink={false} width={260} height={184} priority />
        </div>

        <div
          ref={tickerRef}
          className="mt-8 flex items-center gap-4 font-mono font-black tracking-widest text-xl sm:text-2xl text-[#050505]"
        >
          <span className="inline-block w-8 text-right">{stepText}</span>
          <span className="w-12 h-[2px] bg-[#050505]" />
          <span className="text-sm font-bold tracking-[0.3em]">
            {stepText === 'ENTER' ? 'HOME' : 'INITIALIZING'}
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-end justify-between border-t border-[#050505]/20 pt-4 font-mono text-[11px] tracking-[0.2em] uppercase font-bold">
        <span>DIGITAL MARKETING × WEB DEVELOPMENT</span>
        <span className="text-sm font-black">{progressNum}%</span>
      </div>
    </div>
  );
}
