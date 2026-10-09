'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageTrail from '@/lib/imagetrail/ImageTrail';
import { useTransition } from '@/components/motion/TransitionProvider';

import { BRAND_STATEMENT_DATA } from '@/data/home';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_WORDS = [
  'BUSINESS.',
  'CULTURE.',
  'PEOPLE.',
  'BRANDS.',
];

const STATEMENT_WORDS = [
  { text: 'Anyone', highlight: false },
  { text: 'can', highlight: false },
  { text: 'make.', highlight: false },
  { text: 'Creating', highlight: false },
  { text: 'experiences', highlight: false },
  { text: 'that', highlight: false },
  { text: 'resonate', highlight: false },
  { text: 'with', highlight: false },
  { text: 'culture', highlight: false },
  { text: 'and', highlight: false },
  { text: 'business', highlight: false },
  { text: 'is', highlight: false },
  { text: 'the', highlight: false },
  { text: 'hard', highlight: false },
  { text: 'part.', highlight: false },
  { text: 'It', highlight: false },
  { text: 'takes', highlight: false },
  { text: 'design,', highlight: false },
  { text: 'tech', highlight: false },
  { text: 'and', highlight: false },
  { text: 'human', highlight: true },
  { text: 'judgment.', highlight: false },
];

const EDITORIAL_LINKS = [
  { label: 'See the work.', href: '#work', transitionLabel: 'Work' },
  { label: 'Discover our solutions.', href: '#capabilities', transitionLabel: 'Solutions' },
  { label: 'Check our approach.', href: '#approach', transitionLabel: 'Approach' },
  { label: 'Latest ideas & news.', href: '#ideas', transitionLabel: 'Ideas' },
  { label: 'This is FOB.', href: '#brand-statement', transitionLabel: 'Company' },
  { label: 'Want to join us?', href: '#contact', transitionLabel: 'Contact' },
];

const TRAIL_IMAGES = [
  'https://res.cloudinary.com/dugtxybef/image/upload/v1791540023/Polished_3D_Google_G_Logo_2_z3xdfv.png',
  'https://res.cloudinary.com/dugtxybef/image/upload/v1791540116/copy_of_gemini_generated_image_1h8te21h8te21h8t_n41h4n.png',
  'https://res.cloudinary.com/dugtxybef/image/upload/v1791540023/Glossy_3D_Web_Development_Workspace_ivqaz3.png',
  'https://res.cloudinary.com/dugtxybef/image/upload/v1791540023/Gemini_Generated_Image_r5x8vcr5x8vcr5x8_y67yny.png',
  'https://res.cloudinary.com/dugtxybef/image/upload/v1791540023/3D_Branding_Design_Studio_Composition_yctxi2.png',
  'https://res.cloudinary.com/dugtxybef/image/upload/v1791540023/Glossy_3D_Social_Media_Megaphone_zgyndt.png',
  'https://res.cloudinary.com/dugtxybef/image/upload/v1791540825/Glossy_3D_Next.js_Badge_rrxizk.png',
  'https://res.cloudinary.com/dugtxybef/image/upload/v1791540023/Polished_3D_Google_G_Logo_2_z3xdfv.png',
];

export function BrandStatement() {
  const transition = useTransition();
  const sectionRef = useRef<HTMLElement>(null);
  const statementGridRef = useRef<HTMLDivElement>(null);
  const statementWordsRef = useRef<HTMLSpanElement[]>([]);

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

  /*
   * ------------------------------------------------------------
   * STATEMENT SCROLL-BASED COLOR REVEAL (Off-white -> Black)
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const words = statementWordsRef.current.filter(Boolean);
    if (!words.length) return;

    if (prefersReducedMotion) {
      words.forEach((w) => {
        w.style.color = '#050505';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: statementGridRef.current,
          start: 'top 72%',
          end: 'center 55%',
          scrub: 0.3,
        },
      });

      tl.fromTo(
        words,
        {
          color: '#cfcfcb',
        },
        {
          color: '#050505',
          stagger: 0.08,
          ease: 'power1.out',
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
          MAIN CONTENT
          ======================================================== */}

      <div className="relative z-10">
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
              pb-4
              sm:pb-5
              mb-8
              sm:mb-10
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

          <div className="relative flex mb-20 sm:mb-28 md:mb-32">
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
            ref={statementGridRef}
            className="relative pt-12 pb-14 sm:pt-16 md:pt-20"
          >
            {/* Cursor Image Trail — scoped only to EDITORIAL INFORMATION GRID space */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              aria-hidden="true"
            >
              <ImageTrail
                items={TRAIL_IMAGES}
                variant={5}
                listenRef={statementGridRef}
              />
            </div>

            <div
              className="
                relative
                z-10
                grid
                grid-cols-1
                lg:grid-cols-12
                gap-12
                lg:gap-14
                xl:gap-20
                items-start
              "
            >
              {/* Left Column: Big Scroll-Reveal Statement */}
              <div className="lg:col-span-9 xl:col-span-9">
                <p
                  className="
                    font-[family-name:var(--font-heading)]
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    lg:text-[2.75rem]
                    xl:text-[3.1rem]
                    font-bold
                    tracking-[-0.035em]
                    leading-[1.14]
                    select-none
                  "
                >
                  {STATEMENT_WORDS.map((item, index) => (
                    <span
                      key={`${item.text}-${index}`}
                      ref={(element) => {
                        if (element) {
                          statementWordsRef.current[index] = element;
                        }
                      }}
                      data-highlight={item.highlight ? 'true' : 'false'}
                      className="statement-word inline-block mr-[0.24em] transition-colors"
                      style={{ color: '#cfcfcb' }}
                    >
                      {item.text}
                    </span>
                  ))}
                </p>
              </div>

              {/* Right Column: Editorial Navigation Links */}
              <div className="lg:col-span-3 xl:col-span-3 lg:pt-2">
                <nav
                  className="flex flex-col gap-4 sm:gap-5"
                  aria-label="Editorial Links"
                >
                  {EDITORIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        transition(link.href, link.transitionLabel);
                      }}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        font-[family-name:var(--font-heading)]
                        text-base
                        sm:text-lg
                        xl:text-[1.18rem]
                        font-bold
                        tracking-tight
                        text-[#050505]
                        hover:opacity-60
                        transition-opacity
                        duration-200
                        cursor-pointer
                        w-fit
                      "
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {link.label}
                      </span>
                      <span className="text-base sm:text-lg transition-transform duration-200 group-hover:translate-x-1.5 font-normal">
                        →
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}