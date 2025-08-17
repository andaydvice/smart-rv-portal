/**
 * Advanced Schema Generator for specific content types
 * Provides dynamic schema markup for better SEO and rich snippets
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface ProductInfo {
  name: string;
  description: string;
  brand: string;
  price?: number;
  currency?: string;
  availability?: string;
  condition?: string;
  category?: string;
  image?: string;
  url?: string;
}

interface ReviewInfo {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  itemReviewed: {
    name: string;
    type: string;
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

class AdvancedSchemaGenerator {
  private baseUrl = window.location.origin;

  generateFAQSchema(faqs: FAQItem[], pageUrl?: string): object {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      })),
      "url": pageUrl || window.location.href
    };
  }

  generateHowToSchema(guide: {
    name: string;
    description: string;
    totalTime?: string;
    estimatedCost?: string;
    supply?: string[];
    tool?: string[];
    steps: HowToStep[];
  }): object {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": guide.name,
      "description": guide.description,
      "totalTime": guide.totalTime,
      "estimatedCost": guide.estimatedCost,
      "supply": guide.supply?.map(item => ({
        "@type": "HowToSupply",
        "name": item
      })),
      "tool": guide.tool?.map(item => ({
        "@type": "HowToTool",
        "name": item
      })),
      "step": guide.steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "image": step.image,
        "url": step.url
      }))
    };
  }

  generateProductSchema(product: ProductInfo): object {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      }
    };

    if (product.price) {
      schema.offers = {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": product.currency || "USD",
        "availability": `https://schema.org/${product.availability || 'InStock'}`,
        "itemCondition": `https://schema.org/${product.condition || 'NewCondition'}`,
        "url": product.url || window.location.href
      };
    }

    if (product.category) {
      schema.category = product.category;
    }

    if (product.image) {
      schema.image = product.image;
    }

    return schema;
  }

  generateReviewSchema(review: ReviewInfo): object {
    return {
      "@context": "https://schema.org",
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished,
      "itemReviewed": {
        "@type": review.itemReviewed.type,
        "name": review.itemReviewed.name
      }
    };
  }

  generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]): object {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url.startsWith('http') ? crumb.url : `${this.baseUrl}${crumb.url}`
      }))
    };
  }

  generateVideoSchema(video: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration?: string;
    contentUrl?: string;
    embedUrl?: string;
  }): object {
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": video.name,
      "description": video.description,
      "thumbnailUrl": video.thumbnailUrl,
      "uploadDate": video.uploadDate,
      "duration": video.duration,
      "contentUrl": video.contentUrl,
      "embedUrl": video.embedUrl
    };
  }

  generateOrganizationSchema(organization: {
    name: string;
    url: string;
    logo: string;
    description?: string;
    email?: string;
    phone?: string;
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    socialMedia?: string[];
  }): object {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": organization.name,
      "url": organization.url,
      "logo": organization.logo
    };

    if (organization.description) schema.description = organization.description;
    if (organization.email) schema.email = organization.email;
    if (organization.phone) schema.telephone = organization.phone;

    if (organization.address) {
      schema.address = {
        "@type": "PostalAddress",
        ...organization.address
      };
    }

    if (organization.socialMedia && organization.socialMedia.length > 0) {
      schema.sameAs = organization.socialMedia;
    }

    return schema;
  }

  validateSchema(schema: object): boolean {
    try {
      // Basic validation
      if (!schema || typeof schema !== 'object') return false;
      
      // Check for required @context and @type
      const schemaObj = schema as any;
      if (!schemaObj['@context'] || !schemaObj['@type']) return false;
      
      // Additional validation can be added here
      return true;
    } catch (error) {
      console.error('Schema validation error:', error);
      return false;
    }
  }

  injectSchema(schema: object, id?: string): HTMLScriptElement | null {
    if (!this.validateSchema(schema)) {
      console.error('Invalid schema provided:', schema);
      return null;
    }

    const scriptId = id || `schema-${Date.now()}`;
    
    // Remove existing schema with same ID
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);

    return script;
  }
}

// Create singleton instance
export const advancedSchemaGenerator = new AdvancedSchemaGenerator();

// Convenience functions
export const generateFAQSchema = advancedSchemaGenerator.generateFAQSchema.bind(advancedSchemaGenerator);
export const generateHowToSchema = advancedSchemaGenerator.generateHowToSchema.bind(advancedSchemaGenerator);
export const generateProductSchema = advancedSchemaGenerator.generateProductSchema.bind(advancedSchemaGenerator);
export const generateReviewSchema = advancedSchemaGenerator.generateReviewSchema.bind(advancedSchemaGenerator);
export const generateBreadcrumbSchema = advancedSchemaGenerator.generateBreadcrumbSchema.bind(advancedSchemaGenerator);
export const generateVideoSchema = advancedSchemaGenerator.generateVideoSchema.bind(advancedSchemaGenerator);
export const generateOrganizationSchema = advancedSchemaGenerator.generateOrganizationSchema.bind(advancedSchemaGenerator);
export const validateSchema = advancedSchemaGenerator.validateSchema.bind(advancedSchemaGenerator);
export const injectSchema = advancedSchemaGenerator.injectSchema.bind(advancedSchemaGenerator);