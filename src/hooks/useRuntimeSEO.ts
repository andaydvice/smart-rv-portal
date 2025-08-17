import { useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { pageMetadata } from '@/utils/static-generator';

export interface RuntimeSEOConfig {
  dynamicTitle?: string;
  dynamicDescription?: string;
  dynamicKeywords?: string[];
  dynamicImage?: string;
  canonicalOverride?: string;
  noIndex?: boolean;
  schemaData?: any;
}

/**
 * Enhanced runtime SEO hook that automatically manages SEO based on route data
 * Provides dynamic meta tag injection and updates without full page reloads
 */
export const useRuntimeSEO = (config: RuntimeSEOConfig = {}) => {
  const location = useLocation();
  
  const currentPageData = useMemo(() => {
    return pageMetadata[location.pathname] || pageMetadata['/'];
  }, [location.pathname]);

  // Merge static metadata with dynamic config
  const seoData = useMemo(() => ({
    title: config.dynamicTitle || currentPageData.title,
    description: config.dynamicDescription || currentPageData.description,
    keywords: config.dynamicKeywords?.join(', ') || (Array.isArray(currentPageData.keywords) ? currentPageData.keywords.join(', ') : currentPageData.keywords),
    canonical: config.canonicalOverride || `${window.location.origin}${location.pathname}`,
    ogImage: config.dynamicImage || '/og-image.svg',
    noIndex: config.noIndex || false,
    structuredData: config.schemaData || currentPageData.structuredData
  }), [config, currentPageData, location.pathname]);

  // Update document title
  useEffect(() => {
    if (seoData.title) {
      const siteName = "Smart RV Technology Hub";
      const fullTitle = seoData.title.includes(siteName) ? seoData.title : `${seoData.title} | ${siteName}`;
      document.title = fullTitle;
    }
  }, [seoData.title]);

  // Update meta tags
  const updateMetaTag = useCallback((selector: string, content: string, property?: string) => {
    if (!content) return;
    
    let meta = document.querySelector(selector) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', property);
      } else {
        meta.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
      }
      document.head.appendChild(meta);
    }
    meta.content = content;
  }, []);

  // Update structured data
  const updateStructuredData = useCallback((data: any) => {
    if (!data) return;

    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-runtime-seo]');
    existingScripts.forEach(script => script.remove());

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-runtime-seo', 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }, []);

  // Update canonical link
  const updateCanonical = useCallback((url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, []);

  // Apply all SEO updates
  useEffect(() => {
    // Basic meta tags
    updateMetaTag('meta[name="description"]', seoData.description);
    updateMetaTag('meta[name="keywords"]', seoData.keywords);
    
    // Robots meta
    if (seoData.noIndex) {
      updateMetaTag('meta[name="robots"]', 'noindex,nofollow');
    } else {
      updateMetaTag('meta[name="robots"]', 'index,follow,max-image-preview:large');
    }
    
    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', seoData.title, 'og:title');
    updateMetaTag('meta[property="og:description"]', seoData.description, 'og:description');
    updateMetaTag('meta[property="og:url"]', seoData.canonical, 'og:url');
    if (seoData.ogImage) {
      const fullImageUrl = seoData.ogImage.startsWith('http') ? seoData.ogImage : `${window.location.origin}${seoData.ogImage}`;
      updateMetaTag('meta[property="og:image"]', fullImageUrl, 'og:image');
    }
    
    // Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', seoData.title);
    updateMetaTag('meta[name="twitter:description"]', seoData.description);
    updateMetaTag('meta[name="twitter:url"]', seoData.canonical);
    if (seoData.ogImage) {
      const fullImageUrl = typeof seoData.ogImage === 'string' && seoData.ogImage.startsWith('http') ? seoData.ogImage : `${window.location.origin}${seoData.ogImage}`;
      updateMetaTag('meta[name="twitter:image"]', fullImageUrl);
    }
    
    // Canonical URL
    updateCanonical(seoData.canonical);
    
    // Structured data
    if (seoData.structuredData) {
      updateStructuredData(seoData.structuredData);
    }
    
    // Notify analytics about page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: seoData.title,
        page_location: seoData.canonical,
        page_path: location.pathname + location.search
      });
    }
  }, [seoData, updateMetaTag, updateCanonical, updateStructuredData, location]);

  // Return current SEO state and update functions
  return {
    seoData,
    updateSEO: useCallback((newConfig: RuntimeSEOConfig) => {
      // This will trigger a re-render with new config
      return { ...config, ...newConfig };
    }, [config]),
    currentPageData
  };
};