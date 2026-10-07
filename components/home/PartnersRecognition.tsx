'use client';

import React from 'react';

// ============================================================================
// PARTNERS DATA (ROW 1 - MOVES LEFT)
// ============================================================================
interface PartnerItem {
  name: string;
  symbol: React.ReactNode;
}

const PARTNERS: PartnerItem[] = [
  {
    name: 'STRIPE',
    symbol: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C17.652.753 15.354.333 12.607.333 6.942.333 3.1 3.255 3.1 8.012c0 4.418 3.633 5.928 7.375 7.158 2.502.822 3.393 1.547 3.393 2.519 0 .937-.805 1.516-2.186 1.516-2.227 0-5.111-1.077-7.072-2.128l-.916 5.618c2.25 1.05 5.378 1.618 8.169 1.618 6.046 0 9.877-2.793 9.877-7.822 0-4.662-3.791-6.198-7.76-7.343z" />
      </svg>
    ),
  },
  {
    name: 'PORSCHE',
    symbol: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    ),
  },
  {
    name: 'NIKE',
    symbol: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.707 5.293c-4.492 4.14-9.845 8.188-14.887 11.233-1.96 1.183-4.04 2.144-5.32 1.604-.85-.359-1.2-1.332-.78-2.316.63-1.478 2.21-3.265 4.58-5.158C9.53 7.275 14.88 4.715 19.83 3.66c.8-.17 1.98-.38 2.45.34.34.52.01 1.08-.573 1.293z" />
      </svg>
    ),
  },
  {
    name: 'APPLE',
    symbol: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.93.04-2.03.62-2.68 1.39-.58.67-1.09 1.77-.95 2.82 1.03.08 2.06-.51 2.69-1.28z" />
      </svg>
    ),
  },
  {
    name: 'SONY',
    symbol: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
  },
  {
    name: 'VERCEL',
    symbol: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 1L24 22H0L12 1Z" />
      </svg>
    ),
  },
  {
    name: 'POLESTAR',
    symbol: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 1.5L9.5 9.5H1.5L7.5 14.5L5 22.5L12 17.5L19 22.5L16.5 14.5L22.5 9.5H14.5L12 1.5Z" />
      </svg>
    ),
  },
  {
    name: 'MONCLER',
    symbol: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2L1 21h22L12 2zm0 4.5l6.5 11.5h-13L12 6.5z" />
      </svg>
    ),
  },
  {
    name: 'RIMOWA',
    symbol: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm3 4v10h2V7H9zm4 0v10h2V7h-2z" />
      </svg>
    ),
  },
  {
    name: 'BANG & OLUFSEN',
    symbol: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="16" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
];

// ============================================================================
// RECOGNITION DATA (ROW 2 - MOVES RIGHT)
// ============================================================================
interface AwardItem {
  name: string;
}

const AWARDS: AwardItem[] = [
  { name: 'AWWWARDS' },
  { name: 'THE FWA' },
  { name: 'THE WEBBY AWARDS' },
  { name: 'RED DOT DESIGN' },
  { name: 'CANNES LIONS' },
  { name: 'D&AD AWARDS' },
  { name: 'EUROPEAN DESIGN' },
  { name: 'CSS DESIGN AWARDS' },
];

// Laurel Wreath Icon for Awards
function LaurelWreath() {
  return (
    <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5c-2.48 0-4.5-2.02-4.5-4.5 0-1.85 1.13-3.44 2.74-4.11l.76 1.85c-.94.39-1.5 1.27-1.5 2.26 0 1.38 1.12 2.5 2.5 2.5v2zm4 0v-2c1.38 0 2.5-1.12 2.5-2.5 0-.99-.56-1.87-1.5-2.26l.76-1.85C18.37 9.56 19.5 11.15 19.5 13c0 2.48-2.02 4.5-4.5 4.5z" />
    </svg>
  );
}

export function PartnersRecognition() {
  return (
    <section
      id="recognition"
      data-nav-theme="light"
      aria-label="Partners and Recognition"
      className="relative bg-[#F7F7F5] text-[#050505] py-16 sm:py-20 md:py-24 overflow-hidden border-b border-[#050505]/10"
    >
      {/* Centered Small Heading */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14 mb-10 sm:mb-14 text-center">
        <h2 className="font-heading font-black text-xl sm:text-2xl md:text-3xl tracking-tight uppercase text-[#050505]">
          PARTNERS & RECOGNITION
        </h2>
      </div>

      {/* ====================================================================
          TICKER CAROUSEL WRAPPER (TWO LINES, OPPOSITE SIDES)
          ==================================================================== */}
      <div className="relative w-full overflow-hidden flex flex-col gap-8 sm:gap-10 md:gap-12 pause-on-hover">
        {/* Left & Right Gradient Masks for Seamless Edge Fading */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-[#F7F7F5] via-[#F7F7F5]/80 to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-[#F7F7F5] via-[#F7F7F5]/80 to-transparent z-10"
        />

        {/* ------------------------------------------------------------------
            LINE 1: GLOBAL PARTNERS (MOVING LEFT)
            ------------------------------------------------------------------ */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee-left flex items-center gap-12 sm:gap-16 md:gap-20">
            {/* First Set */}
            {PARTNERS.map((partner, index) => (
              <div
                key={`partner-a-${index}`}
                className="
                  group
                  flex
                  items-center
                  gap-3.5
                  sm:gap-4
                  shrink-0
                  text-[#050505]/70
                  hover:text-[#050505]
                  transition-colors
                  duration-200
                  cursor-default
                "
              >
                <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                  {partner.symbol}
                </div>
                <span className="font-heading font-black text-lg sm:text-xl md:text-2xl tracking-tight uppercase whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}

            {/* Second Set (Duplicate for Infinite Loop) */}
            {PARTNERS.map((partner, index) => (
              <div
                key={`partner-b-${index}`}
                aria-hidden="true"
                className="
                  group
                  flex
                  items-center
                  gap-3.5
                  sm:gap-4
                  shrink-0
                  text-[#050505]/70
                  hover:text-[#050505]
                  transition-colors
                  duration-200
                  cursor-default
                "
              >
                <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                  {partner.symbol}
                </div>
                <span className="font-heading font-black text-lg sm:text-xl md:text-2xl tracking-tight uppercase whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            LINE 2: AWARDS & RECOGNITION (MOVING RIGHT)
            ------------------------------------------------------------------ */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee-right flex items-center gap-12 sm:gap-16 md:gap-20">
            {/* First Set */}
            {AWARDS.map((award, index) => (
              <div
                key={`award-a-${index}`}
                className="
                  group
                  flex
                  items-center
                  gap-3.5
                  sm:gap-4
                  shrink-0
                  text-[#050505]/70
                  hover:text-[#050505]
                  transition-colors
                  duration-200
                  cursor-default
                "
              >
                <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <LaurelWreath />
                </div>
                <span className="font-heading font-black text-lg sm:text-xl md:text-2xl tracking-tight uppercase whitespace-nowrap">
                  {award.name}
                </span>
              </div>
            ))}

            {/* Second Set (Duplicate for Infinite Loop) */}
            {AWARDS.map((award, index) => (
              <div
                key={`award-b-${index}`}
                aria-hidden="true"
                className="
                  group
                  flex
                  items-center
                  gap-3.5
                  sm:gap-4
                  shrink-0
                  text-[#050505]/70
                  hover:text-[#050505]
                  transition-colors
                  duration-200
                  cursor-default
                "
              >
                <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <LaurelWreath />
                </div>
                <span className="font-heading font-black text-lg sm:text-xl md:text-2xl tracking-tight uppercase whitespace-nowrap">
                  {award.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
