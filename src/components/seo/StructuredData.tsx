import React from 'react';
import { Helmet } from 'react-helmet';

interface StructuredDataProps {
  type: 'Organization' | 'Product' | 'Article' | 'FAQPage' | 'BreadcrumbList' | 'Review';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type,
      ...data
    };

    switch (type) {
      case 'Organization':
        return {
          ...baseSchema,
          "@type": "Organization",
          name: data.name || "Smart RV Technology",
          url: data.url || "https://yourdomain.com",
          logo: data.logo || "https://yourdomain.com/logo.png",
          description: data.description || "Leading provider of smart RV technology and luxury mobile living solutions",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: data.telephone || "+1-800-SMART-RV",
            contactType: "customer service",
            availableLanguage: "English"
          },
          sameAs: data.sameAs || [
            "https://facebook.com/smartrvtech",
            "https://twitter.com/smartrvtech",
            "https://linkedin.com/company/smartrvtech"
          ]
        };

      case 'Product':
        return {
          ...baseSchema,
          "@type": "Product",
          name: data.name,
          description: data.description,
          image: data.image,
          brand: {
            "@type": "Brand",
            name: data.brand || "Smart RV Technology"
          },
          offers: {
            "@type": "Offer",
            price: data.price,
            priceCurrency: data.currency || "USD",
            availability: data.availability || "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "Smart RV Technology"
            }
          },
          aggregateRating: data.aggregateRating && {
            "@type": "AggregateRating",
            ratingValue: data.aggregateRating.ratingValue,
            reviewCount: data.aggregateRating.reviewCount
          }
        };

      case 'Article':
        return {
          ...baseSchema,
          "@type": "Article",
          headline: data.headline,
          description: data.description,
          image: data.image,
          author: {
            "@type": "Person",
            name: data.author || "Smart RV Technology Team"
          },
          publisher: {
            "@type": "Organization",
            name: "Smart RV Technology",
            logo: {
              "@type": "ImageObject",
              url: "https://yourdomain.com/logo.png"
            }
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.url
          }
        };

      case 'FAQPage':
        return {
          ...baseSchema,
          "@type": "FAQPage",
          mainEntity: data.questions?.map((q: any) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer
            }
          }))
        };

      case 'BreadcrumbList':
        return {
          ...baseSchema,
          "@type": "BreadcrumbList",
          itemListElement: data.items?.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };

      case 'Review':
        return {
          ...baseSchema,
          "@type": "Review",
          itemReviewed: {
            "@type": data.itemType || "Product",
            name: data.itemName
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: data.ratingValue,
            bestRating: data.bestRating || 5
          },
          author: {
            "@type": "Person",
            name: data.author
          },
          reviewBody: data.reviewBody,
          datePublished: data.datePublished
        };

      default:
        return baseSchema;
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchema())}
      </script>
    </Helmet>
  );
};

export default StructuredData;