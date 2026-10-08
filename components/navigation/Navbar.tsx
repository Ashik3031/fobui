'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MAIN_NAV_ITEMS } from '@/data/navigation';
import { FobLogo } from '@/components/ui/FobLogo';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const delta = currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 20);

      // At the very top of the page, the navbar should always be visible
      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (Math.abs(delta) > 5) {
        // Hide while scrolling down; reveal when scrolling back up
        if (delta > 0) {
          setIsVisible(false);
        } else if (delta < 0) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showNavbar = isVisible || isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showNavbar
            ? 'translate-y-0 opacity-100'
            : '-translate-y-[calc(100%+2rem)] opacity-0'
        }`}
        role="banner"
      >
        <div
          className={`w-full max-w-[1240px] rounded-full bg-[#050505] px-4 sm:px-7 md:px-8 flex items-center justify-between transition-all duration-300 border border-white/15 ${
            showNavbar ? 'pointer-events-auto' : 'pointer-events-none'
          } ${
            isScrolled
              ? 'py-2 sm:py-2.5 shadow-[0_14px_36px_rgba(0,0,0,0.4)]'
              : 'py-2.5 sm:py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
          }`}
        >
          {/* Brand Logo (White) */}
          <div className="flex items-center">
            <FobLogo
              color="white"
              width={125}
              height={88}
              priority
              className="h-7 sm:h-8 md:h-9 w-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-opacity duration-300 hover:opacity-85"
            />
          </div>

          {/* Desktop Navigation Links (White Text) */}
          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-9"
            aria-label="Main Navigation"
          >
            {MAIN_NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative py-1.5 text-xs tracking-[0.2em] font-extrabold uppercase transition-colors duration-200 text-white hover:text-[#fed604] group"
              >
                <span className="relative z-10 block transition-transform duration-200 group-hover:-translate-y-0.5">
                  {item.label}
                </span>
                {/* Underline indicator */}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ease-out bg-[#fed604] ${
                    hoveredNav === item.id
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs tracking-[0.16em] font-bold uppercase transition-all duration-300 shadow-xs bg-white text-[#050505] hover:bg-[#fed604] hover:text-[#050505] group"
              aria-label="Contact FOB Media"
            >
              <span>LET&apos;S TALK</span>
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>

            {/* Mobile / Tablet Menu Button (White Text & Bars) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden flex items-center gap-2 px-2.5 py-1.5 font-mono text-xs font-bold tracking-widest uppercase transition-colors text-white hover:text-[#fed604] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fed604]"
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span>MENU</span>
              <span className="w-5 flex flex-col gap-1 items-end">
                <span className="block h-[2px] w-5 bg-white" />
                <span className="block h-[2px] w-3 bg-[#fed604]" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
