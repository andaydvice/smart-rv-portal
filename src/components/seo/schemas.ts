// Common structured data schemas for the RV Technology Hub

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Smart RV Technology Hub',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  logo: typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : '',
  description: 'Leading resource for smart RV technology, connectivity solutions, and digital nomad tools',
  foundingDate: '2023',
  knowsAbout: ['RV Technology', 'Smart Systems', 'Digital Nomad Living', 'RV Connectivity', 'Solar Power Systems'],
  sameAs: [
    'https://twitter.com/smartrvtech',
    'https://facebook.com/smartrvtech',
    'https://linkedin.com/company/smartrvtech'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'English',
    areaServed: 'US'
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressRegion: 'National'
  }
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Smart RV Technology Hub',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  potentialAction: {
    '@type': 'SearchAction',
    target: typeof window !== 'undefined' ? `${window.location.origin}/search?q={search_term_string}` : '',
    'query-input': 'required name=search_term_string'
  }
};

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const articleSchema = (article: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  url: string;
  category: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image || (typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''),
  datePublished: article.publishedTime,
  dateModified: article.modifiedTime || article.publishedTime,
  author: {
    '@type': 'Person',
    name: article.author
  },
  publisher: organizationSchema,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url
  },
  articleSection: article.category
});

export const productSchema = (product: {
  name: string;
  description: string;
  image?: string;
  url: string;
  brand?: string;
  category?: string;
  offers?: {
    price?: string;
    currency?: string;
    availability?: string;
    url?: string;
  };
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  url: product.url,
  brand: product.brand ? {
    '@type': 'Brand',
    name: product.brand
  } : undefined,
  category: product.category,
  offers: product.offers ? {
    '@type': 'Offer',
    price: product.offers.price,
    priceCurrency: product.offers.currency || 'USD',
    availability: product.offers.availability || 'https://schema.org/InStock',
    url: product.offers.url || product.url
  } : undefined
});

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const howToSchema = (guide: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  steps: Array<{name: string, text: string, image?: string}>;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: guide.name,
  description: guide.description,
  image: guide.image,
  totalTime: guide.totalTime,
  step: guide.steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
    image: step.image
  }))
});

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': typeof window !== 'undefined' ? `${window.location.origin}/#organization` : '',
  name: 'Smart RV Technology Hub',
  image: typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : '',
  description: 'Expert RV technology consulting, reviews, and smart system solutions for modern travelers',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  telephone: '+1-800-SMART-RV',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressRegion: 'National Service'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.8283,
    longitude: -98.5795
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday', 
      'Wednesday',
      'Thursday',
      'Friday'
    ],
    opens: '09:00',
    closes: '17:00'
  },
  serviceArea: {
    '@type': 'Country',
    name: 'United States'
  }
};

export const serviceSchema = (service: {
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  serviceType?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: service.provider
  },
  areaServed: service.areaServed || 'United States',
  serviceType: service.serviceType || 'Technology Consulting'
});

export const techArticleSchema = (article: {
  headline: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: article.headline,
  description: article.description,
  image: article.image || (typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''),
  datePublished: article.publishedDate,
  dateModified: article.modifiedDate || article.publishedDate,
  author: {
    '@type': 'Person',
    name: article.author
  },
  publisher: organizationSchema,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url
  }
});