'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  clip?: boolean;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  y = 40,
  clip = false,
}: RevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, clipPath: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y,
          clipPath: clip ? 'inset(100% 0% 0% 0%)' : 'none',
        },
        {
          opacity: 1,
          y: 0,
          clipPath: clip ? 'inset(0% 0% 0% 0%)' : 'none',
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, elRef);

    return () => ctx.revert();
  }, [delay, duration, y, clip]);

  return (
    <div ref={elRef} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}
