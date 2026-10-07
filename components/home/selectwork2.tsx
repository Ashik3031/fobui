'use client';

import React from 'react';
import { SELECTED_PROJECTS } from '@/data/home';
import { AccordionGallery } from '@/components/ui/Accordiongallery ';

const items = (SELECTED_PROJECTS ?? []).map((project) => ({
    id: String(project.id),
    href: `/work/${project.slug}`,
    image: project.image,
    alt: `${project.title} — ${project.category}`,
    title: project.title,
    number: project.number,
    client: project.client,
    year: String(project.year),
    description: project.description,
    tags: project.tags,
}));

export function SelectedWork() {
    return (
        <section
            id="work"
            data-nav-theme="dark"
            className="relative bg-[#050505] text-[#F7F7F5] py-28 sm:py-36 md:py-48 overflow-hidden"
            aria-label="Selected Client Work"
        >
            <div className="max-w-[1720px] mx-auto px-6 sm:px-10 md:px-14">
                {/* Section Header */}
                <div className="border-b border-white/15 pb-8 mb-12 sm:mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#FFD600] block mb-4">
                                02 / SELECTED WORK
                            </span>
                            <h2 className="fob-section-heading text-[#F7F7F5] tracking-tighter">
                                SELECTED<br />WORK.
                            </h2>
                        </div>
                        <div className="max-w-md">
                            <p className="text-base sm:text-lg text-[#F7F7F5]/70 leading-relaxed font-light">
                                A selection of digital experiences, brands and products we&apos;ve helped build and grow across commerce, luxury, and technology.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Accordion Gallery */}
                <AccordionGallery
                    items={items}
                    height={680}
                    mobileHeight={820}
                    expandRatio={0.62}
                    accentColor="#FFD600"
                />
            </div>
        </section>
    );
}