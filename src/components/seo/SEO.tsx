import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  keywords?: string;
  author?: string;
  structuredData?: any[];
  noIndex?: boolean;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  openGraph?: {
    type?: string;
    siteName?: string;
    locale?: string;
    determiner?: string;
  };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage = "/og-image.svg",
  ogImageAlt = "Smart RV Technology Hub",
  ogImageWidth = "1200",
  ogImageHeight = "630",
  keywords,
  author = "Smart RV Technology Hub",
  structuredData = [],
  noIndex = false,
  twitterCard = "summary_large_image",
  twitterSite = "@smartrvtech",
  twitterCreator = "@smartrvtech",
  article,
  openGraph
}) => {
  const siteName = openGraph?.siteName || "Smart RV Technology Hub";
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
  
  // Ensure title includes brand if not already present
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  // Enhanced Open Graph title for social sharing (max 60 chars)
  const ogTitle = fullTitle.length > 60 ? title : fullTitle;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={openGraph?.type || (article ? "article" : "website")} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
      <meta property="og:image:type" content="image/svg+xml" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={openGraph?.locale || "en_US"} />
      {openGraph?.determiner && <meta property="og:determiner" content={openGraph.determiner} />}
      
      {/* Article specific Open Graph */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:domain" content={typeof window !== 'undefined' ? window.location.hostname : ''} />
      {twitterCard === 'summary_large_image' && (
        <>
          <meta name="twitter:image:width" content={ogImageWidth} />
          <meta name="twitter:image:height" content={ogImageHeight} />
        </>
      )}
      
      {/* Additional Technical SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="msapplication-TileColor" content="#5B9BD5" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Language and Geographic Meta */}
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="ICBM" content="39.8283, -98.5795" />
      
      {/* Content Classification */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="classification" content="Technology, RV, Travel" />
      
      {/* Additional Resource Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* Structured Data */}
      {structuredData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;