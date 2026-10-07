'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { FobLogo } from '@/components/ui/FobLogo';

interface TransitionContextType {
  navigateTo: (href: string, title?: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigateTo: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [destinationTitle, setDestinationTitle] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isReducedMotionRef = useRef(false);

  useEffect(() => {
    isReducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  const navigateTo = (href: string, title = '') => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (isReducedMotionRef.current) {
      router.push(href);
      return;
    }

    setIsTransitioning(true);
    setDestinationTitle(title);

    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) {
      router.push(href);
      setIsTransitioning(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href);
        // Animate out
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.45,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.set(overlay, { yPercent: 100 });
            setIsTransitioning(false);
            setDestinationTitle('');
          },
        });
      },
    });

    // Animate in: yellow layer slides up from bottom
    tl.set(overlay, { yPercent: 100, display: 'flex' })
      .to(overlay, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      })
      .fromTo(
        content,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        '-=0.15'
      )
      .to(content, { opacity: 0, y: -20, duration: 0.2, ease: 'power2.in', delay: 0.1 });
  };

  return (
    <TransitionContext.Provider value={{ navigateTo, isTransitioning }}>
      {children}
      {/* Yellow Transition Overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[999] pointer-events-none bg-[#FFD600] flex flex-col items-center justify-center"
        style={{ transform: 'translateY(100%)' }}
      >
        <div ref={contentRef} className="flex flex-col items-center text-center px-6">
          <FobLogo color="black" asLink={false} width={180} height={127} priority />
          {destinationTitle && (
            <p className="mt-6 text-sm font-bold tracking-[0.3em] uppercase text-[#050505]">
              {destinationTitle}
            </p>
          )}
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
