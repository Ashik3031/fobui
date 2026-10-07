export interface Service {
  id: string;
  number: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'digital-marketing',
    number: '01',
    title: 'DIGITAL MARKETING',
    slug: 'digital-marketing',
    tagline: 'High-Impact Brand Velocity & Customer Acquisition',
    description:
      'We architect holistic, multi-channel marketing ecosystems that connect vision with commercial performance, transforming traffic into sustained brand affinity.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    deliverables: ['Omnichannel Strategy', 'Integrated Campaigns', 'Marketing Automation', 'Lifecycle Architecture'],
  },
  {
    id: 'web-development',
    number: '02',
    title: 'WEB DEVELOPMENT',
    slug: 'web-development',
    tagline: 'High-Performance Creative Engineering & Web Platforms',
    description:
      'Engineered for speed, craft, and conversion. We build bespoke digital flagship platforms using modern frameworks that load instantaneously and captivate users.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    deliverables: ['Custom Web Applications', 'Next.js Platforms', 'Headless CMS Integration', 'Design System Engineering'],
  },
  {
    id: 'seo',
    number: '03',
    title: 'SEO',
    slug: 'seo',
    tagline: 'Algorithmic Authority & High-Intent Organic Growth',
    description:
      'Technical architecture combined with deep search intent intelligence. We guarantee visibility that dominates search rankings and compounds over quarters.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    deliverables: ['Technical SEO Audits', 'Core Web Vitals Optimization', 'Entity & Semantic SEO', 'Content Engineering'],
  },
  {
    id: 'branding',
    number: '04',
    title: 'BRANDING',
    slug: 'branding',
    tagline: 'Systemic Identity, Typography & Art Direction',
    description:
      'Visual languages designed to command presence. We create editorial identity systems, type hierarchies, and brand guidelines that feel impossible to ignore.',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    deliverables: ['Visual Identity Systems', 'Typography Direction', 'Design Tokens', 'Brand Playbooks'],
  },
  {
    id: 'social-media',
    number: '05',
    title: 'SOCIAL MEDIA',
    slug: 'social-media',
    tagline: 'Kinetic Content & Cultural Discourse',
    description:
      'Modern brands belong in the cultural conversation. We produce arresting motion, provocative editorial feeds, and community strategies that foster genuine loyalty.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    deliverables: ['Creative Direction', 'Motion Graphics', 'Community Orchestration', 'Influencer Architecture'],
  },
  {
    id: 'performance-marketing',
    number: '06',
    title: 'PERFORMANCE MARKETING',
    slug: 'performance-marketing',
    tagline: 'Algorithmic Media Buying & Conversion Science',
    description:
      'Data-driven experimentation meets creative rigor. We scale paid media with obsessive CAC and ROAS accountability across Meta, Google, and emerging channels.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    deliverables: ['Paid Search & Social', 'Funnel Optimization', 'Creative Iteration Loops', 'Attribution Modeling'],
  },
];
