'use client';

import React from 'react';
import Link from 'next/link';
import { FOOTER_NAV_ITEMS, SOCIAL_LINKS } from '@/data/navigation';
import { BRAND } from '@/lib/constants';
import { FobLogo } from '@/components/ui/FobLogo';
import { Arrow } from '@/components/ui/Arrow';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      data-nav-theme="dark"
      className="relative bg-[#050505] text-[#F7F7F5] pt-24 pb-12 overflow-hidden border-t border-white/10"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Top Grid: Brand Statement & Navigation & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-15 border-b border-white/10">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <FobLogo
                color="white"
                width={190}
                height={134}
                className="mb-8"
              />
              <p className="text-base sm:text-lg text-white/70 max-w-md font-light leading-relaxed">
                {BRAND.description}
              </p>
            </div>

            <div className="flex flex-col gap-2 font-mono text-xs tracking-widest text-white/50 uppercase">
              <span>LOCATION // NEW YORK × LONDON × DUBAI</span>
              <span>TIMEZONE // MULTI-REGIONAL PRESENCE</span>
            </div>
          </div>

          {/* Navigation Column (3 Cols) */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#FFD600] block mb-6">
              NAVIGATION
            </span>
            <ul className="flex flex-col gap-3 font-mono text-xs tracking-[0.2em] uppercase font-bold text-white/80">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="hover:text-[#FFD600] hover:translate-x-1 inline-block transition-transform duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8">
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#FFD600] block mb-6">
                CONNECT
              </span>
              <a
                href={`mailto:${BRAND.email}`}
                className="text-xl sm:text-2xl font-black text-[#F7F7F5] hover:text-[#FFD600] transition-colors block mb-6"
              >
                {BRAND.email}
              </a>

              <div className="flex flex-col gap-3 font-mono text-xs tracking-widest uppercase text-white/70">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FFD600] inline-flex items-center gap-2 transition-colors"
                  >
                    <span>{social.label}</span>
                    <Arrow diagonal className="w-3 h-3 text-white/40" />
                  </a>
                ))}
              </div>
            </div>

            {/* Back to top */}
            <div>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-3 font-mono text-xs font-bold tracking-[0.2em] uppercase text-white/50 hover:text-[#FFD600] transition-colors focus:outline-none"
                aria-label="Scroll back to top of page"
              >
                <span>BACK TO TOP</span>
                <span>↑</span>
              </button>
            </div>
          </div>
        </div>

        {/* Large Decorative Brand Signoff */}


        {/* Bottom Legal & Colophon */}
        <div className=" flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] tracking-widest uppercase text-white/50">
          <div>
            © {BRAND.year} {BRAND.name}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              TERMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
