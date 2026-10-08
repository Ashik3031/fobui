export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  slug: string;
  category: string;
  tags: string[];
  image: string;
  year: string;
  description: string;
  accent: string;
}

export interface ApproachStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Article {
  id: string;
  number: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
}

export const HERO_DATA = {
  eyebrow: 'F O B   M E D I A',
  headline: {
    line1: 'WE MAKE IDEAS',
    line2: 'IMPOSSIBLE',
    line3: 'TO IGNORE.',
  },
  statement:
    'Digital experiences, campaigns and stories built to move brands forward.',
  primaryCta: {
    label: "Let's talk",
    href: '#contact',
  },
  visual: {
    src: '/images/hero-visual.jpg',
    alt: 'FOB Media creative technology visual',
  },
};

export const BRAND_STATEMENT_DATA = {
  label: '01 / WHY FOB',
  headline: 'WE BUILD DIGITAL EXPERIENCES THAT MOVE BUSINESS.',
  copy: 'We combine strategy, creativity and technology to create digital experiences that help ambitious brands move forward. In an ecosystem saturated with noise, we engineer clarity, cultural resonance, and measurable market dominance.We combine strategy, creativity and technology to create digital experiences that help ambitious brands move forward.',
  metrics: [
    { label: 'DISCIPLINE', value: 'FULL-STACK' },
    { label: 'EXECUTION', value: 'SUB-SECOND' },
    { label: 'MINDSET', value: 'IMPACT-FIRST' },
  ],
};

export const SELECTED_PROJECTS: Project[] = [
  {
    id: 'tajseel',
    number: 'PROJECT 01',
    title: 'TAJSEEL',
    client: 'Sample Case Study // Mobility Flagship',
    slug: 'tajseel',
    category: 'Branding & Web Development',
    tags: ['Brand Architecture', 'Next.js Platform', 'Performance Engineering'],
    image: '/images/project-tajseel.jpg',
    year: '2025',
    description:
      'A bespoke digital flagship and brand architecture designed for high-performance automotive and luxury mobility clientele.',
    accent: '#FFD600',
  },
  {
    id: 'kronos',
    number: 'PROJECT 02',
    title: 'KRONOS ARCHITECTURE',
    client: 'Sample Case Study // Spatial Design',
    slug: 'kronos-architecture',
    category: 'Digital Experience & Identity',
    tags: ['Editorial Publication', 'Spatial Brand System', 'Technical SEO'],
    image: '/images/project-kronos.jpg',
    year: '2025',
    description:
      'Minimalist, monumental digital showroom highlighting brutalist architecture with fluid spatial pacing and museum-grade imagery.',
    accent: '#F7F7F5',
  },
  {
    id: 'vortex',
    number: 'PROJECT 03',
    title: 'VORTEX LABS',
    client: 'Sample Case Study // Creative Computing',
    slug: 'vortex-labs',
    category: 'Web Platform & Creative Tech',
    tags: ['Generative Interface', 'Cloud Architecture', 'Algorithmic Marketing'],
    image: '/images/project-vortex.jpg',
    year: '2026',
    description:
      'Autonomous interface architecture and realtime computing system delivering generative brand assets and low-latency interaction.',
    accent: '#FFD600',
  },
];

export const APPROACH_DATA = {
  label: '04 / OUR APPROACH',
  heading: 'THINK. MAKE. MOVE.',
  copy: 'A collaborative process built around strategy, creativity, and technology transforming ambitious ideas into meaningful digital experiences, measurable growth, and lasting business impact.A collaborative process built around strategy, creativity, and technology transforming ambitious.',
  steps: [
    {
      step: '01',
      title: 'DISCOVER',
      subtitle: 'Research & Signals',
      description:
        'Unearthing commercial truths, market white space, and behavioral audience signals before writing a single line of code.',
    },
    {
      step: '02',
      title: 'DEFINE',
      subtitle: 'Strategy & Architecture',
      description:
        'Forging the brand thesis, technical stack parameters, and performance benchmarks that ensure clarity throughout execution.',
    },
    {
      step: '03',
      title: 'DESIGN',
      subtitle: 'Visual & Kinetic Systems',
      description:
        'Sculpting high-impact editorial typography, deliberate spatial composition, and micro-interactions that feel alive.',
    },
    {
      step: '04',
      title: 'BUILD',
      subtitle: 'Modern Web Engineering',
      description:
        'Crafting clean, accessible, zero-bloat code with instantaneous page speeds, fluid animations, and bulletproof infrastructure.',
    },
    {
      step: '05',
      title: 'GROW',
      subtitle: 'Dominance & Compounding',
      description:
        'Deploying search authority, lifecycle retention loops, and high-conversion paid media engines that compound quarter after quarter.',
    },
  ] as ApproachStep[],
};

export const IDEAS_DATA = {
  label: '04 / IDEAS',
  heading: 'THINKING FORWARD.',
  featured: {
    id: 'future-of-digital-growth',
    number: '01',
    title: 'THE FUTURE OF DIGITAL GROWTH',
    slug: 'future-of-digital-growth',
    category: 'STRATEGY & SCALE',
    readTime: '6 MIN READ',
    date: 'MARCH 2026',
    excerpt:
      'Why the era of generic marketing funnels has collapsed, and how modern brands combine visceral editorial gravity with high-velocity web engineering to win market dominance.',
    image: '/images/article-future-growth.jpg',
  } as Article,
  secondary: [
    {
      id: 'systemic-branding-over-campaigns',
      number: '02',
      title: 'WHY SYSTEMIC BRANDING BEATS DISPOSABLE CAMPAIGN CYCLES',
      slug: 'systemic-branding-over-campaigns',
      category: 'BRAND IDENTITY',
      readTime: '4 MIN READ',
      date: 'FEBRUARY 2026',
      excerpt:
        'Campaigns expire; brand design systems compound. How persistent visual languages reduce customer acquisition friction across every touchpoint.',
      image: '/images/article-systemic-branding.jpg',
    },
    {
      id: 'engineering-velocity-modern-web',
      number: '03',
      title: 'ENGINEERING VELOCITY IN NEXT-GEN WEB PLATFORMS',
      slug: 'engineering-velocity-modern-web',
      category: 'CREATIVE TECHNOLOGY',
      readTime: '5 MIN READ',
      date: 'JANUARY 2026',
      excerpt:
        'Sub-second load times are not a vanity metric—they are the highest-converting marketing lever. A breakdown of modern App Router performance architecture.',
      image: '/images/article-engineering-velocity.jpg',
    },
  ] as Article[],
};

export const FINAL_CTA_DATA = {
  label: '07 / START A PROJECT',
  heading: "LET'S MAKE SOMETHING MATTER.",
  copy: "Have a project in mind? Let's build something worth talking about.",
  ctaText: "LET'S TALK",
  ctaHref: '#contact',
};
