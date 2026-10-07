'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export type CardShape = 'wide' | 'square' | 'standard';

export interface GridMotionCard {
  url?: string;
  shape?: CardShape;
  type?: 'editorial-card';
  words?: string[];
  accent?: string;
}

export type GridMotionItem = string | GridMotionCard;

export const HERO_GRID_IMAGES: GridMotionItem[] = [
  // ==========================================
  // ROW 0: TOP ROW
  // ==========================================
  {
    // Left bleed: Modern creative agency studio
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    shape: 'wide',
  },
  {
    // Left bleed: Creative design system notes
    url: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=80',
    shape: 'standard',
  },
  {
    // Center-left visible: Dubai Burj Khalifa skyline at golden hour - WIDE
    url: 'https://res.cloudinary.com/dugtxybef/image/upload/v1791354849/Gemini_Generated_Image_fkicwafkicwafkic_uonlsq.png',
    shape: 'wide',
  },
  {
    // Center visible: Tablet with Strategy & Architecture mockup - WIDE
    url: 'https://res.cloudinary.com/dugtxybef/image/upload/v1791355099/Gemini_Generated_Image_9qy2409qy2409qy2_qjgoh6.png',
    shape: 'wide',
  },
  {
    // Center-right visible: Modern architectural interior curve with warm light - SQUARE
    url: 'https://res.cloudinary.com/dugtxybef/image/upload/v1791351814/Bookkeeping_Inspo_We_create_a_simple_design_for_your_complex_products_otw6gi.jpg',
    shape: 'square',
  },
  {
    // Right bleed: Dubai Marina waterfront architectural towers - WIDE
    url: 'https://res.cloudinary.com/dugtxybef/image/upload/v1791351814/Bookkeeping_Inspo_We_create_a_simple_design_for_your_complex_products_otw6gi.jpg',
    shape: 'wide',
  },

  // ==========================================
  // ROW 1: CENTER ROW (Positioned directly at vertical center)
  // ==========================================
  {
    // Left bleed: Modern digital creative workspace
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    shape: 'standard',
  },
  {
    // Left bleed: Tech founders discussion
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    shape: 'square',
  },
  {
    // Center focal card: Agency team around long table ("Good Ideas Better Brands") - WIDE
    url: 'https://res.cloudinary.com/dugtxybef/image/upload/v1791354474/Gemini_Generated_Image_9y3fpl9y3fpl9y3f_evepsu.png',
    shape: 'wide',
  },
  {
    // Center-right focal card: Editorial Black Card ("Ideas Campaigns Experiences Brands") - SQUARE
    type: 'editorial-card',
    words: ['Ideas', 'Campaigns', 'Experiences', 'Brands'],
    accent: '#FFD600',
    shape: 'square',
  },
  {
    // Right visible: Creative studio team collaborating - WIDE
    url: 'https://res.cloudinary.com/dugtxybef/image/upload/v1791354464/Gemini_Generated_Image_ksqvxkksqvxkksqv_ndpqt3.png',
    shape: 'wide',
  },
  {
    // Right bleed: Analytics dashboard & metrics - SQUARE
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    shape: 'square',
  },

  // ==========================================
  // ROW 2: BOTTOM ROW
  // ==========================================
  {
    // Left bleed: Strategy workshop
    url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
    shape: 'wide',
  },
  {
    // Left bleed: Modern product design process
    url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    shape: 'standard',
  },
  {
    // Center-left visible: Flatlay camera & notebook ("A BOLDER BRAND TOMORROW") - SQUARE
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    shape: 'square',
  },
  {
    // Center visible: Hands pointing to design sketches & prints on table - SQUARE
    url: 'https://res.cloudinary.com/dugtxybef/image/upload/v1791354463/Gemini_Generated_Image_wkh8u9wkh8u9wkh8_xti2f0.png',
    shape: 'square',
  },
  {
    // Center-right visible: Dubai skyline through floor-to-ceiling windows at dusk - WIDE
    url: 'https://res.cloudinary.com/dugtxybef/image/upload/v1791354464/Gemini_Generated_Image_fge8nyfge8nyfge8_vmxqgi.png',
    shape: 'wide',
  },
  {
    // Right bleed: Downtown Dubai dusk golden lights - WIDE
    url: 'https://res.cloudinary.com/dugtxybef/image/upload/v1791354463/Gemini_Generated_Image_76yrmg76yrmg76yr_dcvuc3.png',
    shape: 'wide',
  },
];

interface GridMotionProps {
  items?: GridMotionItem[];
  gradientColor?: string;
}

// Exactly 3 rows: Top (0), Center (1), Bottom (2)
const ROWS = 3;
const COLS = 6;

// Balanced card dimensions: consistent heights (~290px-315px on desktop) with square & rectangle variety
const getShapeClass = (shape?: CardShape) => {
  switch (shape) {
    case 'square':
      return 'w-[200px] sm:w-[240px] md:w-[280px] lg:w-[305px] aspect-square flex-shrink-0';
    case 'standard':
      return 'w-[260px] sm:w-[310px] md:w-[360px] lg:w-[395px] aspect-[4/3] flex-shrink-0';
    case 'wide':
    default:
      return 'w-[340px] sm:w-[410px] md:w-[470px] lg:w-[510px] aspect-[16/10] flex-shrink-0';
  }
};

export function GridMotion({ items = HERO_GRID_IMAGES, gradientColor = 'transparent' }: GridMotionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

  const totalItems = ROWS * COLS;
  const combinedItems = items.length >= totalItems ? items.slice(0, totalItems) : items;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 260;
      const baseDuration = 0.85;
      const inertiaFactors = [0.55, 0.38, 0.22];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const winWidth = window.innerWidth || 1;
          const moveAmount =
            ((mouseXRef.current / winWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;

          gsap.to(row, {
            x: moveAmount,
            duration: baseDuration + (inertiaFactors[index] ?? 0.3),
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });
    };

    gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(updateMotion);
    };
  }, []);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="w-full h-full min-h-screen overflow-hidden relative flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-[4]" />

        {/* 
          Tilted 3D Grid:
          - 3 rows: Top, Center, Bottom
          - Row 1 sits directly at the vertical midpoint
          - Reduced gap (gap-3.5 to gap-4.5) for tight, clean editorial spacing
          - Rotate -9.5deg matches the reference design
        */}
        <div className="flex flex-col gap-3.5 sm:gap-4 md:gap-4.5 flex-none relative w-[240vw] sm:w-[220vw] lg:w-[200vw] rotate-[-9.5deg] origin-center z-[2] justify-center items-center">
          {[...Array(ROWS)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-nowrap items-center gap-3.5 sm:gap-4 md:gap-4.5 flex-shrink-0"
              style={{ willChange: 'transform' }}
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
            >
              {[...Array(COLS)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * COLS + itemIndex];
                const imageUrl = typeof content === 'string' ? content : content?.url;
                const shape = typeof content === 'object' ? content?.shape || 'wide' : 'wide';
                const shapeClass = getShapeClass(shape);

                return (
                  <div key={itemIndex} className={`relative ${shapeClass}`}>
                    {/* Borderless Card with soft depth shadow and modern rounded corners */}
                    <div className="relative w-full h-full overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[28px] bg-[#111] shadow-[0_10px_28px_rgba(0,0,0,0.11)] transition-transform duration-500 hover:scale-[1.015]">
                      {imageUrl ? (
                        <div
                          className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                          style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                      ) : typeof content === 'object' && content?.type === 'editorial-card' ? (
                        <div className="w-full h-full bg-[#0D0D0D] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-center items-start select-none">
                          <div className="font-heading text-lg sm:text-2xl md:text-[1.75rem] font-bold tracking-tight text-white/95 leading-[1.18] space-y-1">
                            {content.words?.map((w, idx) => (
                              <div key={idx}>{w}</div>
                            ))}
                          </div>
                          <div
                            className="w-8 sm:w-10 h-1.5 sm:h-2 mt-4 sm:mt-5 rounded-full"
                            style={{ backgroundColor: content.accent || '#FFD600' }}
                          />
                        </div>
                      ) : (
                        <div className="p-4 text-center z-[1] text-white flex items-center justify-center h-full">
                          {typeof content === 'string' ? content : null}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="relative w-full h-full top-0 left-0 pointer-events-none" />
      </section>
    </div>
  );
}

export default GridMotion;
