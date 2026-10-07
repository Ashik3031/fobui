import { BRAND } from '@/lib/constants';

export function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: BRAND.url,
    logo: `${BRAND.url}/logo/fob-logo.jpeg`,
    description: BRAND.description,
    email: BRAND.email,
    sameAs: [
      BRAND.social.instagram,
      BRAND.social.linkedin,
      BRAND.social.facebook,
      BRAND.social.youtube,
      BRAND.social.x,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: BRAND.email,
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: BRAND.url,
    description: BRAND.description,
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      logo: {
        '@type': 'ImageObject',
        url: `${BRAND.url}/logo/fob-logo.jpeg`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
