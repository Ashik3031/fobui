'use client';

import React from 'react';
import Image from 'next/image';
import { IDEAS_DATA } from '@/data/home';
import { Arrow } from '@/components/ui/Arrow';
import { useTransition } from '@/components/motion/TransitionProvider';

export function Ideas() {
  const transition = useTransition();
  const { featured, secondary } = IDEAS_DATA;

  return (
    <section
      id="ideas"
      data-nav-theme="light"
      className="relative bg-[#F7F7F5] text-[#050505] py-28 sm:py-36 md:py-48 overflow-hidden border-b border-[#050505]/10"
      aria-label="Editorial Perspectives and Ideas"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="border-b border-[#050505]/15 pb-8 mb-16 sm:mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#050505] block mb-4">
                05 / IDEAS
              </span>
              <h2 className="fob-section-heading text-[#050505] tracking-tighter">
                THINKING<br />
                FORWARD.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-base sm:text-lg text-[#050505]/75 leading-relaxed font-normal">
                Dispatches on creative computing, algorithmic scale, and brand architecture from our multidisciplinary team.
              </p>
            </div>
          </div>
        </div>

        {/* Magazine Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Featured Article (Left 7 Cols) */}
          <article className="lg:col-span-7 group flex flex-col gap-6">
            <a
              href={`/ideas/${featured.slug}`}
              onClick={(e) => {
                e.preventDefault();
                transition(`/ideas/${featured.slug}`, featured.title);
              }}
              className="block relative aspect-[16/10] bg-[#111111] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] cursor-pointer"
              aria-label={`Read article: ${featured.title}`}
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#FFD600] text-[#050505] px-3 py-1 font-mono text-[10px] font-black tracking-widest uppercase">
                FEATURED ESSAY
              </div>
            </a>

            <div className="flex items-center gap-4 font-mono text-xs tracking-widest uppercase text-[#050505]/60 pt-2 border-b border-[#050505]/10 pb-3">
              <span className="text-[#050505] font-black">{featured.category}</span>
              <span>•</span>
              <span>{featured.date}</span>
              <span>•</span>
              <span>{featured.readTime}</span>
            </div>

            <a
              href={`/ideas/${featured.slug}`}
              onClick={(e) => {
                e.preventDefault();
                transition(`/ideas/${featured.slug}`, featured.title);
              }}
              className="group-hover:text-[#FFD600] transition-colors focus:outline-none cursor-pointer"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#050505] leading-[1.05]">
                {featured.title}
              </h3>
            </a>

            <p className="text-base sm:text-lg text-[#050505]/80 font-normal leading-relaxed">
              {featured.excerpt}
            </p>

            <a
              href={`/ideas/${featured.slug}`}
              onClick={(e) => {
                e.preventDefault();
                transition(`/ideas/${featured.slug}`, featured.title);
              }}
              className="inline-flex items-center gap-2 font-mono text-xs font-black tracking-widest uppercase text-[#050505] hover:text-[#FFD600] transition-colors pt-2 cursor-pointer"
            >
              <span>READ ESSAY</span>
              <Arrow diagonal className="w-3.5 h-3.5" />
            </a>
          </article>

          {/* Secondary Editorial Stories (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:border-l lg:border-[#050505]/15 lg:pl-12">
            <div className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#050505]/50 pb-2 border-b border-[#050505]/10">
              MORE PERSPECTIVES
            </div>

            {secondary.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col gap-4 border-b border-[#050505]/15 pb-10"
              >
                <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase text-[#050505]/60">
                  <span className="text-[#050505] font-bold">{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <a
                  href={`/ideas/${article.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    transition(`/ideas/${article.slug}`, article.title);
                  }}
                  className="group-hover:text-[#FFD600] transition-colors focus:outline-none cursor-pointer"
                >
                  <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#050505] leading-snug">
                    {article.title}
                  </h4>
                </a>

                <p className="text-sm text-[#050505]/75 font-normal leading-relaxed">
                  {article.excerpt}
                </p>

                <a
                  href={`/ideas/${article.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    transition(`/ideas/${article.slug}`, article.title);
                  }}
                  className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest uppercase text-[#050505] hover:text-[#FFD600] transition-colors pt-1 cursor-pointer"
                >
                  <span>READ PERSPECTIVE</span>
                  <Arrow diagonal className="w-3 h-3" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
