import React from 'react';
import { Helmet } from 'react-helmet';

interface InvisibleSEOProps {
  pageType: 'homepage' | 'blog' | 'product' | 'category' | 'guide' | 'documentation';
  pageTitle: string;
  pageContent: string;
  category?: string;
  customData?: any;
}

const InvisibleSEO: React.FC<InvisibleSEOProps> = ({
  pageType,
  pageTitle,
  pageContent,
  category,
  customData = {}
}) => {
  const getPageSpecificSEO = () => {
    switch (pageType) {
      case 'homepage':
        return {
          aeoQuestion: "What makes Smart RV Technology different from traditional RV solutions?",
          aeoAnswer: "Smart RV Technology integrates cutting-edge AI, IoT sensors, and automated systems to create an intelligent mobile living experience with voice control, predictive maintenance, and comprehensive emergency services.",
          voiceQueries: [
            "What's the best smart RV technology for beginners",
            "How much does a smart RV system cost",
            "Which RV apps are most useful for travel"
          ]
        };

      case 'blog':
        return {
          aeoQuestion: `What should I know about ${pageTitle}?`,
          aeoAnswer: pageContent.substring(0, 200) + "...",
          voiceQueries: [
            `How to ${pageTitle.toLowerCase()}`,
            `Best practices for ${pageTitle.toLowerCase()}`,
            `${pageTitle.toLowerCase()} tips and tricks`
          ]
        };

      case 'product':
      case 'category':
        return {
          aeoQuestion: `What are the benefits of ${pageTitle}?`,
          aeoAnswer: pageContent.substring(0, 200) + "...",
          voiceQueries: [
            `Best ${pageTitle.toLowerCase()} for RVs`,
            `How to choose ${pageTitle.toLowerCase()}`,
            `${pageTitle.toLowerCase()} reviews and comparison`
          ]
        };

      default:
        return {
          aeoQuestion: `What is ${pageTitle}?`,
          aeoAnswer: pageContent.substring(0, 200) + "...",
          voiceQueries: [`About ${pageTitle.toLowerCase()}`]
        };
    }
  };

  const seoConfig = getPageSpecificSEO();

  // FAQ Schema for Answer Engine Optimization
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": seoConfig.aeoQuestion,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": seoConfig.aeoAnswer
        }
      }
    ]
  };

  // Speakable Schema for Voice Search
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "cssSelector": [".voice-optimized-content", ".featured-snippet"],
    "xpath": [
      "/html/head/title",
      "//*[@class='voice-optimized-content']"
    ]
  };

  return (
    <>
      <Helmet>
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        
        {/* Speakable Schema */}
        <script type="application/ld+json">
          {JSON.stringify(speakableSchema)}
        </script>
        
        {/* Voice Search Meta Tags */}
        <meta name="voice-search-optimized" content="true" />
        <meta name="conversational-queries" content={seoConfig.voiceQueries.join(', ')} />
        
        {/* Content Optimization Meta Tags */}
        <meta name="page-type" content={pageType} />
        <meta name="content-category" content={category || 'general'} />
      </Helmet>

      {/* Hidden content for voice search optimization */}
      <div className="voice-optimized-content sr-only">
        <h2>{seoConfig.aeoQuestion}</h2>
        <p>{seoConfig.aeoAnswer}</p>
        {seoConfig.voiceQueries.map((query, index) => (
          <p key={index}>{query}</p>
        ))}
      </div>

      {/* Featured snippet content (hidden) */}
      <div className="featured-snippet sr-only">
        {pageContent.substring(0, 160)}
      </div>
    </>
  );
};

export default InvisibleSEO;