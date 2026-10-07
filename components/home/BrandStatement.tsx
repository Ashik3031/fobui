'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageTrail from '@/lib/imagetrail/ImageTrail';

import { BRAND_STATEMENT_DATA } from '@/data/home';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_WORDS = [
  'BUSINESS.',
  'CULTURE.',
  'PEOPLE.',
  'BRANDS.',
];

const TRAIL_IMAGES = [
  'https://picsum.photos/id/287/300/300',
  'https://picsum.photos/id/1001/300/300',
  'https://picsum.photos/id/1025/300/300',
  'https://picsum.photos/id/1026/300/300',
  'https://picsum.photos/id/1027/300/300',
  'https://picsum.photos/id/1028/300/300',
  'https://picsum.photos/id/1029/300/300',
  'https://picsum.photos/id/1030/300/300',
];

export function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  const linesRef = useRef<HTMLSpanElement[]>([]);
  const wordRef = useRef<HTMLSpanElement>(null);

  const [wordIndex, setWordIndex] = useState(0);

  /*
   * ------------------------------------------------------------
   * HEADLINE WORD ROTATION
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setWordIndex((current) => {
        return (current + 1) % HEADLINE_WORDS.length;
      });
    }, 2800);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * WORD CHANGE ANIMATION
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (!wordRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    gsap.fromTo(
      wordRef.current,
      {
        yPercent: 110,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.55,
        ease: 'power4.out',
      }
    );
  }, [wordIndex]);

  /*
   * ------------------------------------------------------------
   * SCROLL REVEAL
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const lines = linesRef.current.filter(Boolean);

      gsap.fromTo(
        lines,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brand-statement"
      data-nav-theme="light"
      aria-label="Why FOB Media"
      className="
        relative
        overflow-hidden
        bg-[#F7F7F5]
        text-[#050505]
        border-b
        border-[#050505]/10
      "
    >
      {/* ========================================================
          CURSOR IMAGE TRAIL — full section
          ======================================================== */}

      <div
        className="absolute inset-0 z-20 pointer-events-auto"
        aria-hidden="true"
      >
        <ImageTrail
          items={TRAIL_IMAGES}
          variant={5}
        />
      </div>

      {/* ========================================================
          MAIN CONTENT
          ======================================================== */}

      <div className="relative z-10 pointer-events-none">
        <div
          className="
            max-w-[1720px]
            mx-auto
            px-6
            sm:px-10
            md:px-14
            pt-24
            sm:pt-32
            md:pt-36
            pb-12
            sm:pb-16
            md:pb-20
          "
        >
          {/* ====================================================
              SECTION HEADER
              ==================================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#050505]/15
              pb-6
              mb-20
              sm:mb-32
            "
          >
            <span
              className="
                font-mono
                text-xs
                sm:text-sm
                font-bold
                tracking-[0.25em]
                uppercase
              "
            >
              {BRAND_STATEMENT_DATA.label}
            </span>

            <span
              className="
                font-mono
                text-xs
                tracking-widest
                uppercase
                text-[#050505]/60
              "
            >
              [BELIEF SYSTEM]
            </span>
          </div>

          {/* ====================================================
              HEADLINE
              ==================================================== */}

          <div className="relative flex mt-12 sm:mt-16 mb-20 sm:mb-28 md:mb-32">
            {/* Massive editorial headline */}

            <h2
              className="
                relative
                z-10
                w-full
                fob-statement-heading
                tracking-[-0.055em]
                leading-[0.88]
                uppercase
                pointer-events-none
                select-none
              "
            >
              {/* ------------------------------------------------
                  LINE 1
                  ------------------------------------------------ */}

              <span className="block overflow-hidden">
                <span
                  ref={(element) => {
                    if (element) {
                      linesRef.current[0] = element;
                    }
                  }}
                  className="block"
                >
                  WE BUILD
                </span>
              </span>

              {/* ------------------------------------------------
                  LINE 2
                  ------------------------------------------------ */}

              <span className="block overflow-hidden">
                <span
                  ref={(element) => {
                    if (element) {
                      linesRef.current[1] = element;
                    }
                  }}
                  className="block"
                >
                  DIGITAL EXPERIENCES
                </span>
              </span>

              {/* ------------------------------------------------
                  LINE 3
                  ------------------------------------------------ */}

              <span className="block overflow-hidden">
                <span
                  ref={(element) => {
                    if (element) {
                      linesRef.current[2] = element;
                    }
                  }}
                  className="block"
                >
                  <span>THAT MOVE </span>

                  {/* --------------------------------------------
                      FIXED WIDTH WORD CONTAINER

                      Prevents the headline from moving when
                      BUSINESS / CULTURE / PEOPLE / BRANDS change.
                      -------------------------------------------- */}

                  <span
                    className="
                      inline-grid
                      align-bottom
                      overflow-hidden
                    "
                    style={{
                      width: '5.1em',
                    }}
                  >
                    <span
                      ref={wordRef}
                      className="
                        col-start-1
                        row-start-1
                        inline-block
                        whitespace-nowrap
                      "
                      style={{ color: '#fed604' }}
                    >
                      {HEADLINE_WORDS[wordIndex]}
                    </span>
                  </span>
                </span>
              </span>
            </h2>
          </div>

          {/* ====================================================
              EDITORIAL INFORMATION GRID
              ==================================================== */}

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-12
              gap-12
              lg:gap-16
              pt-12
              sm:pt-14
              border-t
              border-[#050505]/15
              items-center
            "
          >
            {/* Philosophy */}

            <div className="lg:col-span-4">
              <span
                className="
                  font-mono
                  text-xs
                  font-bold
                  tracking-[0.3em]
                  uppercase
                  text-[#050505]/60
                  block
                  mb-3
                "
              >
                THE PHILOSOPHY
              </span>

              <p
                className="
                  font-mono
                  text-sm
                  tracking-widest
                  uppercase
                "
              >
                ZERO NOISE. MAXIMUM VELOCITY.
              </p>
            </div>

            {/* Description */}

            <div className="lg:col-span-5">
              <p
                className="
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  font-normal
                  leading-relaxed
                  text-[#050505]/90
                "
              >
                {BRAND_STATEMENT_DATA.copy}
              </p>
            </div>

            {/* Metrics */}

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-6">
                {BRAND_STATEMENT_DATA.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="
                      border-b
                      border-[#050505]/10
                      pb-4
                    "
                  >
                    <div
                      className="
                        font-mono
                        text-[11px]
                        font-bold
                        tracking-[0.25em]
                        text-[#050505]/60
                        uppercase
                      "
                    >
                      {metric.label}
                    </div>

                    <div
                      className="
                        font-mono
                        text-base
                        font-black
                        tracking-widest
                        text-[#050505]
                        mt-1
                      "
                    >
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}