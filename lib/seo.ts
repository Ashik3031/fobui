import type { Metadata } from 'next';
import { BRAND } from './constants';

export function constructMetadata({
  title = `${BRAND.name} — ${BRAND.tagline}`,
  description = BRAND.description,
  image = '/logo/fob-logo.jpeg',
  canonical = '/',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    metadataBase: new URL(BRAND.url),
    title: {
      default: title,
      template: `%s | ${BRAND.name}`,
    },
    description,
    keywords: [
      'Digital Marketing',
      'Web Development',
      'Creative Technology Agency',
      'SEO Engineering',
      'Brand Architecture',
      'High Performance Websites',
      'Next.js Development',
      'FOB Media',
    ],
    authors: [{ name: BRAND.name, url: BRAND.url }],
    creator: BRAND.name,
    publisher: BRAND.name,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BRAND.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${BRAND.name} — ${BRAND.tagline}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@fobmedia',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/icon.png',
      apple: '/icon.png',
    },
  };
}
