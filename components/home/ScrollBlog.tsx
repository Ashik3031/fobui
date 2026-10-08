import ScrollBlogShowcase, { type BlogPost } from "@/components/ui/ScrollBlogShowcase";

const VIDEO_URL =
    "https://res.cloudinary.com/dugtxybef/video/upload/v1791438718/Plant_leaves_swaying_in_breeze_20261008112120_zufm3q.mp4";

// Cloudinary: auto format and quality for the video (smaller file, faster start)
const VIDEO = VIDEO_URL.replace("/upload/", "/upload/f_auto,q_auto/");

// Still frame from the same video, shown until playback starts
const POSTER = VIDEO_URL.replace("/upload/", "/upload/so_0,f_auto,q_auto,w_1600/").replace(
    /\.mp4$/,
    ".jpg"
);

// Replace titles, text and dates with your real posts
const posts: BlogPost[] = [
    {
        slug: "growth-starts-with-a-clear-brand",
        title: "Growth starts with a clear brand",
        excerpt:
            "Before you spend on ads, get the story straight. Here is how we shape a brand that people remember and campaigns can build on.",
        category: "Brand",
        date: "Oct 2026",
    },
    {
        slug: "what-we-measure-and-why",
        title: "What we measure, and why",
        excerpt:
            "Most dashboards track too much. These are the few numbers we check every week to decide where the next dirham goes.",
        category: "Performance",
        date: "Sep 2026",
    },
    {
        slug: "content-that-earns-attention",
        title: "Content that earns attention",
        excerpt:
            "A simple way to plan content around what your audience is already searching for, instead of what you want to say.",
        category: "Content",
        date: "Aug 2026",
    },
    {
        slug: "launching-in-the-gcc",
        title: "Launching in the GCC",
        excerpt:
            "Language, timing and channels all change across the region. What to localise first when you enter a new market.",
        category: "Strategy",
        date: "Jul 2026",
    },
];

export default function Page() {
    return (
        <main>
            <ScrollBlogShowcase
                videoSrc={VIDEO}
                poster={POSTER}
                posts={posts}
                heading="Blogs"
                tagline="Notes on growth, brand and performance"
                issue="Issue 01"
                introLead="Fresh thinking,"
                introMain="worth the scroll"
                allBlogsHref="/blogs"
                allBlogsLabel="Read full blogs"
            />
        </main>
    );
}