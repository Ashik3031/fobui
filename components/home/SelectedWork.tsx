'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SELECTED_PROJECTS } from '@/data/home';

const items = (SELECTED_PROJECTS ?? []).map((project) => ({
  id: String(project.id),
  href: `/work/${project.slug}`,
  image: project.image,
  alt: `${project.title} — ${project.category}`,
  title: project.title,
  client: project.client,
  year: String(project.year),
  description: project.description,
  tags: (project.tags ?? []) as string[],
}));

const RADIUS = 620; // px, radius of the arc
const STEP = 24; // degrees between two numbers on the arc
const SCROLL_PER_PROJECT = 70; // svh of scrolling per project
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const pad = (n: number) => String(n + 1).padStart(2, '0');
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 across the whole section
  const count = items.length;

  // Scroll-linked progress
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      setProgress(range > 0 ? clamp(-rect.top / range) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Clicking a number scrolls to that project
  const scrollToIndex = useCallback(
    (i: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const range = el.offsetHeight - window.innerHeight;
      const target = top + (count > 1 ? i / (count - 1) : 0) * range;
      window.scrollTo({ top: target, behavior: 'smooth' });
    },
    [count]
  );

  if (!count) return null;

  const pos = progress * (count - 1); // continuous position along the arc
  const active = Math.round(pos);
  const current = items[active];

  return (
    <section
      ref={sectionRef}
      id="work"
      data-nav-theme="light"
      className="relative bg-[#F7F7F5] text-[#050505] border-b border-[#050505]/10"
      style={{ height: `calc(100svh + ${(count - 1) * SCROLL_PER_PROJECT}svh)` }}
      aria-label="Selected Client Work"
    >
      <style>{`
        @keyframes sw-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: no-preference) {
          .sw-in { animation: sw-in 700ms ${EASE} both; }
        }
      `}</style>

      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Section Header */}
        <div className="w-full pt-8 sm:pt-10 px-6 sm:px-10 md:px-14 z-20 flex-shrink-0">
          <div className="flex items-center justify-between border-b border-[#050505]/15 pb-5 sm:pb-6">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#050505]">
              02 / SELECTED WORK
            </span>
            <span className="font-mono text-xs tracking-widest uppercase text-[#050505]/60">
              [PORTFOLIO // 2024-2026]
            </span>
          </div>
        </div>

        {/* Main Work Session Area (Starts strictly below the divider) */}
        <div className="relative flex-1 w-full overflow-hidden flex flex-col justify-center px-6 sm:px-10 md:px-0">

        {/* Arc index (desktop), rotates with scroll */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[40vw] md:block">
          <div
            className="absolute top-1/2 rounded-full border border-[#050505]/10"
            style={{
              width: RADIUS * 2,
              height: RADIUS * 2,
              left: `calc(19vw - ${RADIUS * 2}px)`,
              marginTop: -RADIUS,
              transform: `rotate(${-pos * STEP}deg)`,
              willChange: 'transform',
            }}
          >
            {items.map((item, i) => {
              const d = Math.abs(i - pos);
              const a = clamp(1 - d); // 1 when active, 0 when a full step away
              const opacity = d < 1 ? 1 - 0.25 * d : d < 2 ? 0.75 - 0.4 * (d - 1) : Math.max(0, 0.35 - 0.35 * (d - 2));
              return (
                <div
                  key={item.id}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  style={{ transform: `rotate(${i * STEP}deg) translateX(${RADIUS}px)` }}
                >
                  <button
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Show project ${pad(i)}: ${item.title}`}
                    aria-current={i === active}
                    tabIndex={d > 2 ? -1 : 0}
                    className="absolute left-0 top-0 flex -translate-y-1/2 items-center focus-visible:outline-none"
                    style={{ opacity, pointerEvents: d > 2 ? 'none' : 'auto' }}
                  >
                    <span
                      className="absolute -left-[5px] block h-[10px] w-[10px] rounded-full bg-[#FFD600] border-2 border-[#050505]"
                      style={{
                        opacity: a,
                        boxShadow: '0 0 0 6px rgba(255,214,0,0.3)',
                      }}
                    />
                    <span
                      className="ml-5 font-heading text-[32px] sm:text-[36px] font-black leading-none tracking-tight transition-colors duration-300"
                      style={{
                        color: a > 0.6 ? '#050505' : `rgba(5,5,5,${0.2 + 0.6 * a})`,
                      }}
                    >
                      {pad(i)}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side image */}
        <div className="relative mb-5 h-[24svh] sm:h-[28svh] w-full md:absolute md:right-[-4vw] lg:right-[-2vw] xl:right-0 md:top-1/2 md:mb-0 md:h-auto md:aspect-[4/5] md:w-[28vw] md:max-w-[460px] md:-translate-y-1/2">
          {items.map((item, i) => (
            <img
              key={item.id}
              src={typeof item.image === 'string' ? item.image : (item.image as { src: string }).src}
              alt={i === active ? item.alt : ''}
              loading={i === active ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full rounded-[22px] sm:rounded-[26px] object-cover shadow-[0_20px_50px_-15px_rgba(0,0,0,0.18)] border border-[#050505]/10"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'scale(1)' : 'scale(0.96)',
                transition: `opacity 700ms ${EASE}, transform 900ms ${EASE}`,
              }}
            />
          ))}
        </div>

        {/* Center details: block centered on the page, text left-aligned inside it */}
        <div className="md:absolute md:left-1/2 md:top-1/2 md:w-[min(540px,38vw)] md:-translate-x-1/2 md:-translate-y-1/2">
          <div key={current.id} className="sw-in">
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#050505]/60 uppercase mb-3 sm:mb-4">
              <span className="font-bold text-[#050505]">{pad(active)}</span>
              <span className="w-6 h-px bg-[#050505]/20" />
              <span>{current.client} • {current.year}</span>
            </div>

            <h2 className="font-heading text-[clamp(1.85rem,3.4vw,3.6rem)] font-black uppercase leading-[1.04] tracking-tight text-[#050505]">
              <Link
                href={current.href}
                className="hover:opacity-75 transition-opacity focus-visible:underline"
              >
                {current.title}
              </Link>
            </h2>

            <p className="mt-4 sm:mt-5 max-w-[30rem] text-sm sm:text-base leading-relaxed text-[#050505]/75 font-normal">
              {current.description}
            </p>

            {current.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-[#050505]/5 border border-[#050505]/10 px-3 py-1 font-mono text-[11px] sm:text-xs tracking-wider uppercase text-[#050505]/80 transition-colors hover:border-[#050505]/30"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 sm:mt-7">
              <Link
                href={current.href}
                className="group inline-flex items-center gap-3 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#050505] hover:opacity-70 transition-opacity"
              >
                <span>VIEW CASE STUDY</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile index */}
        <div className="mt-8 flex items-center gap-5 md:hidden">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Show project ${pad(i)}: ${item.title}`}
              aria-current={i === active}
              className="font-heading font-black text-xl transition-colors duration-200"
              style={{
                color: i === active ? '#050505' : 'rgba(5,5,5,0.3)',
              }}
            >
              {pad(i)}
            </button>
          ))}
        </div>

        {/* Scroll hint with progress line */}
        <div
          className="absolute bottom-10 left-14 hidden items-center gap-4 font-mono text-xs tracking-widest uppercase text-[#050505]/50 md:flex"
          style={{ opacity: progress > 0.98 ? 0 : 1, transition: 'opacity 400ms' }}
          aria-hidden="true"
        >
          <span className="relative block h-12 w-px bg-[#050505]/15">
            <span
              className="absolute left-0 top-0 block w-px bg-[#050505]"
              style={{ height: `${progress * 100}%` }}
            />
          </span>
          <span>SCROLL TO EXPLORE</span>
        </div>
        </div>
      </div>
    </section>
  );
}