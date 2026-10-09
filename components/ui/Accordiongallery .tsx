'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Arrow } from '@/components/ui/Arrow';
import { useTransition } from '@/components/motion/TransitionProvider';

export type AccordionItem = {
    id: string;
    href: string;
    image: string;
    alt: string;
    title: string;
    number: string;
    client: string;
    year: string;
    description: string;
    tags: string[];
};

type Props = {
    items: AccordionItem[];
    defaultIndex?: number;
    accentColor?: string;
    /** Desktop / tablet height (horizontal layout) */
    height?: number;
    /** Mobile height (stacked layout) */
    mobileHeight?: number;
    gap?: number;
    /** Share of the total space the open panel takes (0.2 – 0.9) */
    expandRatio?: number;
    duration?: number;
    ease?: string;
    /** Image drift between panels. 0 disables. */
    parallax?: number;
    /** 'hover' opens on pointer hover; 'click' only on click. Touch always uses tap. */
    trigger?: 'hover' | 'click';
    grayscale?: boolean;
    className?: string;
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export function AccordionGallery({
    items = [],
    defaultIndex = 0,
    accentColor = '#FFD600',
    height = 640,
    mobileHeight = 780,
    gap = 10,
    expandRatio = 0.62,
    duration = 0.7,
    ease = 'power3.out',
    parallax = 0.5,
    trigger = 'hover',
    grayscale = true,
    className = '',
}: Props) {
    const transition = useTransition();
    const count = Math.max(items.length, 1);
    const rootRef = useRef<HTMLDivElement>(null);
    const panelRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const mediaRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const mediaSizeRef = useRef(480);
    const animateRef = useRef(false);

    const [active, setActive] = useState(clamp(defaultIndex, 0, count - 1));
    const [vertical, setVertical] = useState(false);

    // Stack the panels on small screens
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        const update = () => setVertical(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    const applyLayout = useCallback(
        (animate: boolean) => {
            const panels = panelRefs.current;
            if (!panels.length) return;

            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const dur = animate && !reduced ? duration : 0;
            const r = clamp(expandRatio, 0.2, 0.9);
            const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;

            tlRef.current?.kill();
            const tl = gsap.timeline();

            panels.forEach((panel, i) => {
                if (!panel) return;
                const isActive = i === active;
                const media = mediaRefs.current[i];
                const content = contentRefs.current[i];
                const label = labelRefs.current[i];

                tl.to(panel, { flexGrow: isActive ? grow : 1, duration: dur, ease }, 0);

                if (media) {
                    const drift = clamp(active - i, -1.5, 1.5);
                    const shift = drift * parallax * mediaSizeRef.current * 0.06;
                    tl.to(
                        media,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: vertical || isActive ? 0 : shift,
                            y: vertical && !isActive ? shift : 0,
                            scale: isActive ? 1 : 1.06,
                            '--ag-gray': grayscale && !isActive ? 1 : 0,
                            '--ag-dim': isActive ? 0 : 0.45,
                            duration: dur,
                            ease,
                        },
                        0
                    );
                }

                // Closed-state label fades out, open-state content staggers in
                if (label) {
                    tl.to(label, { opacity: isActive ? 0 : 1, duration: dur * 0.5, ease: 'power2.out' }, 0);
                }
                if (content) {
                    const parts = content.querySelectorAll('[data-reveal]');
                    if (isActive) {
                        tl.fromTo(
                            parts,
                            { opacity: 0, y: 18 },
                            { opacity: 1, y: 0, duration: dur * 0.8, ease, stagger: reduced ? 0 : 0.06 },
                            dur * 0.3
                        );
                    } else {
                        tl.to(parts, { opacity: 0, y: 0, duration: dur * 0.3, ease: 'power2.out' }, 0);
                    }
                    content.style.pointerEvents = isActive ? 'auto' : 'none';
                }
            });

            tlRef.current = tl;
        },
        [active, count, duration, ease, expandRatio, grayscale, parallax, vertical]
    );

    // Always call the latest layout from the ResizeObserver without re-subscribing it
    const applyRef = useRef(applyLayout);
    applyRef.current = applyLayout;

    // Size the (fixed-size) image so panels reveal it instead of squashing it
    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const measureSize = () => {
            const rect = el.getBoundingClientRect();
            const total = vertical ? rect.height : rect.width;
            const usable = Math.max(total - gap * (count - 1), 120);
            const size = Math.max(160, usable * clamp(expandRatio, 0.2, 0.9) * 1.15);
            mediaSizeRef.current = size;
            el.style.setProperty('--ag-media-size', `${size}px`);
        };

        measureSize();
        const ro = new ResizeObserver(() => {
            measureSize();
            applyRef.current(false);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [gap, count, expandRatio, vertical]);

    useEffect(() => {
        applyLayout(animateRef.current);
        animateRef.current = true;
    }, [applyLayout]);

    useEffect(() => () => void tlRef.current?.kill(), []);

    const focusPanel = (i: number) => {
        const next = (i + count) % count;
        setActive(next);
        panelRefs.current[next]?.focus();
    };

    const onKeyDown = (i: number, e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            focusPanel(i + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            focusPanel(i - 1);
        } else if (e.key === 'Home') {
            e.preventDefault();
            focusPanel(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            focusPanel(count - 1);
        }
    };

    // First tap/click opens a closed panel; clicking the open one follows the link
    const onClick = (i: number, e: MouseEvent) => {
        if (i !== active) {
            e.preventDefault();
            setActive(i);
        } else {
            e.preventDefault();
            transition(items[i].href, items[i].title);
        }
    };

    if (items.length === 0) return null;

    return (
        <div
            ref={rootRef}
            className={`flex w-full ${vertical ? 'flex-col' : 'flex-row'} ${className}`}
            style={{ gap, height: vertical ? mobileHeight : height }}
            role="list"
            aria-label="Selected projects"
        >
            {items.map((item, i) => {
                const isActive = i === active;
                return (
                    <a
                        key={item.id}
                        href={item.href}
                        ref={(el) => {
                            panelRefs.current[i] = el;
                        }}
                        role="listitem"
                        aria-current={isActive ? 'true' : undefined}
                        aria-label={`${item.title}, ${item.client}, ${item.year}`}
                        onClick={(e) => onClick(i, e)}
                        onMouseEnter={() => trigger === 'hover' && setActive(i)}
                        onFocus={() => setActive(i)}
                        onKeyDown={(e) => onKeyDown(i, e)}
                        className="group relative block min-h-0 min-w-0 flex-[1_1_0] cursor-pointer overflow-hidden bg-[#111111] outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] focus-visible:ring-inset"
                        style={{ willChange: 'flex-grow' }}
                    >
                        {/* Image */}
                        <span className="absolute inset-0 overflow-hidden">
                            <span
                                ref={(el) => {
                                    mediaRefs.current[i] = el;
                                }}
                                className="absolute left-1/2 top-1/2 block [filter:grayscale(var(--ag-gray,1))]"
                                style={{
                                    width: vertical ? '100%' : 'var(--ag-media-size, 480px)',
                                    height: vertical ? 'var(--ag-media-size, 480px)' : '100%',
                                    willChange: 'transform, filter',
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    sizes="(max-width: 767px) 100vw, 70vw"
                                    priority={i === defaultIndex}
                                    draggable={false}
                                    className="select-none object-cover object-center"
                                />
                            </span>
                            {/* Dim + readability gradient */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(180deg, rgba(5,5,5,0) 30%, rgba(5,5,5,0.88) 100%), rgba(5,5,5,calc(var(--ag-dim, 0.45)))',
                                }}
                            />
                        </span>

                        {/* Closed state: number + title */}
                        <span
                            ref={(el) => {
                                labelRefs.current[i] = el;
                            }}
                            aria-hidden="true"
                            className={`pointer-events-none absolute z-[2] flex items-center gap-4 text-[#F7F7F5] ${vertical
                                    ? 'inset-x-5 top-1/2 -translate-y-1/2 flex-row'
                                    : 'bottom-6 left-1/2 -translate-x-1/2 flex-col-reverse'
                                }`}
                        >
                            <span className="font-mono text-xs font-black tracking-widest" style={{ color: accentColor }}>
                                {item.number}
                            </span>
                            <span
                                className={`truncate text-lg font-black uppercase tracking-tight sm:text-xl ${vertical ? '' : '[writing-mode:vertical-rl] rotate-180'
                                    }`}
                            >
                                {item.title}
                            </span>
                        </span>

                        {/* Open state: full project info */}
                        <div
                            ref={(el) => {
                                contentRefs.current[i] = el;
                            }}
                            className="absolute inset-x-0 bottom-0 z-[3] flex flex-col gap-4 p-5 sm:p-8 md:p-10"
                            style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                        >
                            <div
                                data-reveal
                                className="flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase text-white/70 opacity-0"
                            >
                                <span className="font-black" style={{ color: accentColor }}>
                                    {item.number}
                                </span>
                                <span className="text-white/30">{'//'}</span>
                                <span>{item.client}</span>
                                <span className="text-white/30">{'//'}</span>
                                <span>{item.year}</span>
                            </div>

                            <h3
                                data-reveal
                                className="text-3xl font-black uppercase leading-[0.95] tracking-tight text-[#F7F7F5] opacity-0 sm:text-5xl lg:text-6xl"
                            >
                                {item.title}
                            </h3>

                            <p data-reveal className="max-w-lg text-sm text-white/65 opacity-0 sm:text-base">
                                {item.description}
                            </p>

                            <div data-reveal className="flex flex-wrap items-center justify-between gap-4 opacity-0">
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-white/20 px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase text-white/75 backdrop-blur-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <span
                                    className="inline-flex items-center gap-2 px-4 py-3 font-mono text-xs font-black tracking-widest uppercase text-[#050505] transition-transform duration-300 group-hover:translate-x-1"
                                    style={{ background: accentColor }}
                                >
                                    View case
                                    <Arrow diagonal className="h-3.5 w-3.5 text-[#050505]" />
                                </span>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}

export default AccordionGallery;