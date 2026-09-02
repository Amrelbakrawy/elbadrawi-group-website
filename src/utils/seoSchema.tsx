import { siteConfig } from '../config/site';

const organizationAddress = {
  '@type': 'PostalAddress',
  streetAddress: 'Block 13, 1st Industrial Zone, El-Obour',
  addressLocality: 'Cairo',
  addressRegion: 'Cairo',
  postalCode: '13041',
  addressCountry: 'EG',
};

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.companyName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/favicon.png`,
    description:
      'Egyptian home textile manufacturer serving hospitality, retail, wholesale, private label, and export clients since 1976.',
    foundingDate: String(siteConfig.foundedYear),
    sameAs: [siteConfig.linkedInUrl],
    address: organizationAddress,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Business Development',
      telephone: siteConfig.contactPhoneDisplay,
      email: siteConfig.contactEmail,
      availableLanguage: ['English', 'Arabic'],
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.companyName,
    image: `${siteConfig.siteUrl}/favicon.png`,
    description: 'Premium bedding and home textile manufacturing in Egypt',
    url: siteConfig.siteUrl,
    address: organizationAddress,
    telephone: siteConfig.contactPhoneDisplay,
    email: siteConfig.contactEmail,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function BreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function ProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price?: string;
  currency?: string;
}) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: siteConfig.companyName,
    },
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.currency || 'USD',
      },
    }),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function FAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
