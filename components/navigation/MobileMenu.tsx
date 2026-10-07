'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MAIN_NAV_ITEMS, SOCIAL_LINKS } from '@/data/navigation';
import { FobLogo } from '@/components/ui/FobLogo';
import { Arrow } from '@/components/ui/Arrow';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  // Animation on open / close
  useEffect(() => {
    const overlay = overlayRef.current;
    const links = linksContainerRef.current?.children;
    const bottom = bottomRef.current;

    if (!overlay) return;

    if (isOpen) {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(overlay, { display: 'flex', opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline();
      tl.set(overlay, { display: 'flex', yPercent: -100 })
        .to(overlay, {
          yPercent: 0,
          duration: 0.5,
          ease: 'power4.out',
        })
        .fromTo(
          links ? Array.from(links) : [],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power3.out',
          },
          '-=0.25'
        )
        .fromTo(
          bottom,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          '-=0.2'
        );
    } else {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(overlay, { display: 'none', opacity: 0 });
        return;
      }

      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power4.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    onClose();
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-[200] bg-[#FFD600] text-[#050505] flex-col justify-between p-6 sm:p-10 hidden overflow-y-auto"
      style={{ display: 'none' }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#050505]/20 pb-5">
        <div onClick={onClose}>
          <FobLogo color="black" width={130} height={92} priority />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 p-2 font-mono text-xs tracking-widest font-black uppercase text-[#050505] hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#050505]"
          aria-label="Close Navigation Menu"
        >
          <span>CLOSE</span>
          <span className="text-xl leading-none">✕</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav ref={linksContainerRef} className="my-8 flex flex-col gap-3 sm:gap-4" aria-label="Mobile Menu">
        {MAIN_NAV_ITEMS.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(item.href);
            }}
            className="group flex items-baseline justify-between py-2 border-b border-[#050505]/10 text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#050505] hover:translate-x-3 transition-transform duration-200"
          >
            <span>{item.label}</span>
            <span className="font-mono text-xs tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity">
              0{index + 1}
            </span>
          </a>
        ))}
      </nav>

      {/* Bottom Actions & Social */}
      <div ref={bottomRef} className="border-t border-[#050505]/20 pt-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#contact');
            }}
            className="inline-flex items-center gap-3 bg-[#050505] text-[#F7F7F5] px-8 py-4 font-mono text-xs font-black tracking-widest uppercase hover:bg-white hover:text-[#050505] transition-colors"
          >
            <span>LET&apos;S TALK</span>
            <Arrow diagonal />
          </a>
          <p className="mt-4 font-mono text-xs text-[#050505]/70">
            hello@fobmedia.com
          </p>
        </div>

        {/* Social */}
        <div className="flex flex-wrap gap-4 font-mono text-xs font-bold tracking-widest uppercase text-[#050505]">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
