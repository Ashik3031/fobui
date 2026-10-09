"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTransition } from "@/components/motion/TransitionProvider";

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
};

type Props = {
    posts: BlogPost[];
    videoSrc: string; // one looping video: cover first, then the background for every blog
    poster?: string; // still image shown until the video starts
    heading?: string;
    tagline?: string;
    issue?: string;
    introLead?: string;
    introMain?: string;
    allBlogsHref?: string;
    allBlogsLabel?: string;
};

/*
  Theme (matches the site): black #070707, yellow #FFD600, white text,
  mono uppercase labels. If you have Tailwind brand tokens, replace the
  arbitrary values (bg-[#070707], text-[#FFD600]) with them.
*/

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// ease-in-out: starts gently, ends gently
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Scroll timeline (0 → 1 across the whole section)
const T_FRAME = [0.06, 0.18] as const; // dashed frame dissolves, dash by dash
const T_TEXT_OUT = [0.06, 0.22] as const; // dead zone first, so nothing moves on arrival
const T_EXPAND = [0.18, 0.40] as const; // square grows to full screen
const T_PANEL = [0.36, 0.48] as const; // blurred blog panel fades in immediately as cover expands
const T_LIST_START = 0.48; // blogs step through earlier without lag

// Starting square, as insets from the viewport edges (bigger number = smaller square)
const CARD_DESKTOP = { top: 16, bottom: 9, side: 35 }; // vh, vh, vw → about 30vw × 75vh
const CARD_MOBILE = { top: 17, bottom: 12, side: 12 };

// Cover zoom. 1 = the video is fitted to the card. Raise it (1.2, 1.4) to zoom in.
const COVER_ZOOM = 1.04;

// Scroll smoothing. Lower = floatier and slower to catch up, 1 = no smoothing.
const SMOOTHING = 0.12;

// Frame dissolve: dashes vanish one by one on all four sides.
// "corners" = start at the four corners and meet in the middle of each side.
// "middles" = start in the middle of each side and run out to the corners.
const FRAME_FADE_FROM: "corners" | "middles" = "corners";

const label = "font-mono text-[11px] font-bold uppercase tracking-[0.2em]";

// When each dash starts to fade (0 = first, 1 = last). A little jitter makes it feel hand-picked.
const dashThresholds = (count: number, side: number) =>
    Array.from({ length: count }, (_, i) => {
        const u = count > 1 ? i / (count - 1) : 0;
        const fromCorner = Math.min(u, 1 - u) * 2; // 0 at the corners, 1 in the middle of the side
        const order = FRAME_FADE_FROM === "corners" ? fromCorner : 1 - fromCorner;
        const jitter = (i * 0.6180339887 + side * 0.37) % 1;
        return clamp(order * 0.75 + jitter * 0.25);
    });

const Arrow = () => (
    <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
    >
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

export default function ScrollBlogShowcase({
    posts,
    videoSrc,
    poster,
    heading = "Ideas",
    tagline = "Notes on growth, brand and performance",
    issue = "Issue 01",
    introLead = "Fresh thinking,",
    introMain = "worth the scroll",
    allBlogsHref = "/blogs",
    allBlogsLabel = "Read full blogs",
}: Props) {
    const transition = useTransition();
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const targetRef = useRef(0);
    const currentRef = useRef(0);
    const rafRef = useRef(0);
    const [p, setP] = useState(0);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        if (posts.length === 0) {
            console.warn("ScrollBlogShowcase: `posts` is empty, so no stories can be shown.");
        }
    }, [posts.length]);

    // Keep the video playing (some browsers need a nudge), and pause it for reduced motion
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => {
            if (reduce.matches) v.pause();
            else v.play().catch(() => { });
        };
        sync();
        reduce.addEventListener("change", sync);
        return () => reduce.removeEventListener("change", sync);
    }, []);

    // Scroll progress with damping, so the animation glides instead of following every wheel tick
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onMq = () => setMobile(mq.matches);
        onMq();
        mq.addEventListener("change", onMq);

        const readTarget = () => {
            const el = sectionRef.current;
            if (!el) return 0;
            const rect = el.getBoundingClientRect();
            return clamp(-rect.top / (rect.height - window.innerHeight));
        };

        let last = 0;
        const tick = (t: number) => {
            const dt = last ? Math.min(t - last, 50) : 16.7;
            last = t;
            const k = reduce.matches ? 1 : 1 - Math.pow(1 - SMOOTHING, dt / 16.7);
            const diff = targetRef.current - currentRef.current;
            if (Math.abs(diff) < 0.0002) {
                currentRef.current = targetRef.current;
                setP(currentRef.current);
                rafRef.current = 0;
                last = 0;
                return;
            }
            currentRef.current += diff * k;
            setP(currentRef.current);
            rafRef.current = requestAnimationFrame(tick);
        };

        const onScroll = () => {
            targetRef.current = readTarget();
            if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
        };

        // Start in the right place if the page loads already scrolled
        targetRef.current = readTarget();
        currentRef.current = targetRef.current;
        setP(currentRef.current);

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            mq.removeEventListener("change", onMq);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = 0;
        };
    }, []);

    const n = posts.length;
    const first = posts[0] as BlogPost | undefined;
    const card = mobile ? CARD_MOBILE : CARD_DESKTOP;

    const textOut = ease(clamp((p - T_TEXT_OUT[0]) / (T_TEXT_OUT[1] - T_TEXT_OUT[0])));
    const expand = ease(clamp((p - T_EXPAND[0]) / (T_EXPAND[1] - T_EXPAND[0])));
    const panel = ease(clamp((p - T_PANEL[0]) / (T_PANEL[1] - T_PANEL[0])));
    const listP = clamp((p - T_LIST_START) / (1 - T_LIST_START));
    const active = Math.max(0, Math.min(n - 1, Math.floor(listP * n)));

    // Frame dissolve progress (linear, so the dashes go at an even pace)
    const frameP = clamp((p - T_FRAME[0]) / (T_FRAME[1] - T_FRAME[0]));
    const dashes = useMemo(() => {
        const h = mobile ? 16 : 30; // dashes along the top and bottom
        const v = mobile ? 20 : 34; // dashes along the left and right
        return {
            top: dashThresholds(h, 0),
            right: dashThresholds(v, 1),
            bottom: dashThresholds(h, 2),
            left: dashThresholds(v, 3),
        };
    }, [mobile]);
    const dashOpacity = (th: number) => 1 - clamp((frameP - th * 0.7) / 0.3);

    // Window (clip-path): square → full screen. It stays full screen afterwards.
    const top = lerp(card.top, 0, expand);
    const bottom = lerp(card.bottom, 0, expand);
    const side = lerp(card.side, 0, expand);
    const radius = lerp(4, 0, expand);
    const clip = `inset(${top}vh ${side}vw ${bottom}vh ${side}vw round ${radius}px)`;

    // Cover framing: shrink the video box so it just covers the card (less zoomed),
    // then grow it back to full size as the square expands.
    const coverScale0 =
        Math.max((100 - card.top - card.bottom) / 100, (100 - 2 * card.side) / 100) * COVER_ZOOM;
    const coverShift0 = (card.top + (100 - card.bottom)) / 2 - 50; // vh, card centre vs screen centre
    const videoScale = lerp(coverScale0, 1, expand);
    const videoShift = lerp(coverShift0, 0, expand);

    // On phones the panel sits at the bottom, so lift the video a little
    const lift = mobile ? panel : 0;

    return (
        <section
            ref={sectionRef}
            id="ideas"
            aria-label="Blog"
            className="relative bg-[#070707] text-white selection:bg-[#FFD600] selection:text-black"
            style={{ height: `${(4 + Math.max(n, 1)) * 100}vh` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Left intro text */}
                <div
                    className="absolute left-[4vw] top-[22vh] hidden md:block"
                    style={{ opacity: 1 - textOut, transform: `translateX(${-textOut * 120}px)` }}
                >
                    <p className="m-0 text-[clamp(1.3rem,1.9vw,1.9rem)] font-semibold leading-tight text-white/55">
                        {introLead}
                    </p>
                    <p className="m-0 text-[clamp(1.6rem,2.4vw,2.4rem)] font-semibold leading-tight">
                        {introMain}
                    </p>
                </div>

                {/* Video window */}
                <div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: clip }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#050505]" />

                    <div
                        className="absolute inset-0 will-change-transform"
                        style={{ transform: `translateY(${-lift * 6}vh) scale(${1 + lift * 0.15})` }}
                    >
                        <div
                            className="absolute inset-0 will-change-transform"
                            style={{ transform: `translateY(${videoShift}vh) scale(${videoScale})` }}
                        >
                            <video
                                ref={videoRef}
                                src={videoSrc}
                                poster={poster}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                disablePictureInPicture
                                aria-hidden
                                tabIndex={-1}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div
                        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/70"
                        style={{ opacity: 1 - expand }}
                    />
                </div>

                {/* White dashed frame: each dash fades on its own, on all four sides */}
                {frameP < 1 && (
                    <div
                        aria-hidden
                        className="pointer-events-none absolute"
                        style={{
                            top: `calc(${card.top}vh - 8px)`,
                            bottom: `calc(${card.bottom}vh - 8px)`,
                            left: `calc(${card.side}vw - 8px)`,
                            right: `calc(${card.side}vw - 8px)`,
                        }}
                    >
                        <div className="absolute inset-x-0 top-0 flex justify-between">
                            {dashes.top.map((th, i) => (
                                <span key={i} className="block h-px w-[7px] bg-white" style={{ opacity: dashOpacity(th) }} />
                            ))}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 flex justify-between">
                            {dashes.bottom.map((th, i) => (
                                <span key={i} className="block h-px w-[7px] bg-white" style={{ opacity: dashOpacity(th) }} />
                            ))}
                        </div>
                        <div className="absolute inset-y-0 left-0 flex flex-col justify-between">
                            {dashes.left.map((th, i) => (
                                <span key={i} className="block h-[7px] w-px bg-white" style={{ opacity: dashOpacity(th) }} />
                            ))}
                        </div>
                        <div className="absolute inset-y-0 right-0 flex flex-col justify-between">
                            {dashes.right.map((th, i) => (
                                <span key={i} className="block h-[7px] w-px bg-white" style={{ opacity: dashOpacity(th) }} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Cover text */}
                <div
                    className="absolute flex flex-col justify-between p-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                    style={{
                        opacity: 1 - textOut,
                        pointerEvents: textOut > 0.9 ? "none" : "auto",
                        top: `${card.top}vh`,
                        bottom: `${card.bottom}vh`,
                        left: `${card.side}vw`,
                        right: `${card.side}vw`,
                    }}
                >
                    <div
                        className={`${label} flex items-center justify-between text-white will-change-transform`}
                        style={{ transform: `translateY(${-textOut * 80}px)` }}
                    >
                        <span>{issue}</span>
                        <span>{first?.date}</span>
                    </div>

                    <h2
                        className="m-0 text-center text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-tight will-change-transform"
                        style={{ transform: `translateY(${-textOut * 180}px)` }}
                    >
                        {heading}
                    </h2>

                    {first && (
                        <div
                            className="max-w-[90%] will-change-transform"
                            style={{ transform: `translateX(${-textOut * 260}px)` }}
                        >
                            <p className={`${label} m-0 text-[#FFD600]`}>Featured, {first.category}</p>
                            <p className="m-0 mt-2 text-[clamp(1.2rem,1.8vw,1.7rem)] font-semibold leading-tight">
                                {first.title}
                            </p>
                            <p className="m-0 mt-2 line-clamp-2 text-xs leading-relaxed text-white/85">
                                {first.excerpt}
                            </p>
                        </div>
                    )}

                    <div className="flex items-end justify-between gap-4">
                        <p
                            className="m-0 max-w-[18ch] text-sm font-medium will-change-transform"
                            style={{ transform: `translateX(${-textOut * 260}px)` }}
                        >
                            {tagline}
                        </p>
                        <div
                            className="border border-[#FFD600] px-3 py-2 text-center will-change-transform"
                            style={{ transform: `translateX(${textOut * 260}px)` }}
                        >
                            <div className="text-3xl font-bold leading-none text-[#FFD600]">{n}</div>
                            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em]">
                                {n === 1 ? "story" : "stories"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side panel: light blur only, no background color */}
                <aside
                    className="absolute bottom-0 left-0 flex h-[52vh] w-full flex-col justify-between p-6 backdrop-blur-md backdrop-brightness-75 will-change-transform md:top-0 md:h-auto md:w-[36vw] md:pb-12 md:pl-16 md:pr-12 md:pt-32"
                    style={{
                        opacity: panel,
                        transform: `translateX(${(1 - panel) * -40}px)`,
                        pointerEvents: panel > 0.8 ? "auto" : "none",
                    }}
                >
                    <div className="grid [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]">
                        {posts.map((post, i) => (
                            <div
                                key={post.slug}
                                aria-hidden={i !== active}
                                className={`col-start-1 row-start-1 transition-all duration-500 motion-reduce:transition-none ${i === active
                                        ? "translate-y-0 opacity-100"
                                        : "pointer-events-none translate-y-3 opacity-0"
                                    }`}
                            >
                                <span className={`${label} text-[#FFD600]`}>
                                    {post.category}, {post.date}
                                </span>
                                <h3 className="mb-4 mt-4 text-[clamp(1.8rem,3.2vw,3rem)] font-bold uppercase leading-[1.05]">
                                    {post.title}
                                </h3>
                                <p className="mb-8 max-w-[44ch] text-base leading-relaxed text-white/90">
                                    {post.excerpt}
                                </p>
                                <a
                                    href={`/blog/${post.slug}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        transition(`/blog/${post.slug}`, post.title);
                                    }}
                                    tabIndex={i === active ? 0 : -1}
                                    className="inline-flex items-center gap-3 bg-[#FFD600] px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors [text-shadow:none] hover:bg-white focus-visible:bg-white focus-visible:outline-none cursor-pointer"
                                >
                                    Read story
                                    <Arrow />
                                </a>
                            </div>
                        ))}
                    </div>

                    <ol className="m-0 hidden list-none flex-col gap-2.5 border-t border-dotted border-[#FFD600]/50 p-0 pt-5 [text-shadow:0_1px_10px_rgba(0,0,0,0.4)] md:flex">
                        {posts.map((post, i) => (
                            <li key={post.slug}>
                                <a
                                    href={`/blog/${post.slug}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        transition(`/blog/${post.slug}`, post.title);
                                    }}
                                    className={`block font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:text-white cursor-pointer ${i === active ? "pl-2 text-[#FFD600]" : "text-white/55"
                                        }`}
                                >
                                    {post.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </aside>

                {/* Opposite side "Read full blogs" button */}
                <div
                    className="absolute top-20 right-5 z-30 will-change-transform md:top-auto md:bottom-12 md:right-14"
                    style={{
                        opacity: panel,
                        transform: `translateY(${(1 - panel) * 20}px)`,
                        pointerEvents: panel > 0.8 ? "auto" : "none",
                    }}
                >
                    <a
                        href={allBlogsHref}
                        onClick={(e) => {
                            e.preventDefault();
                            transition(allBlogsHref, allBlogsLabel);
                        }}
                        className="inline-flex items-center gap-3 bg-[#FFD600] px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white focus-visible:bg-white focus-visible:outline-none shadow-[0_8px_30px_rgba(0,0,0,0.45)] cursor-pointer"
                    >
                        <span>{allBlogsLabel}</span>
                        <Arrow />
                    </a>
                </div>

                {p < 0.05 && (
                    <div
                        className={`${label} absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80`}
                        style={{ opacity: 1 - p * 20 }}
                    >
                        Scroll to continue
                    </div>
                )}
            </div>
        </section>
    );
}