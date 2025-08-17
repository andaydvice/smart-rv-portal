import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to manage proper HTTP status codes on the client side
 * This helps with SEO and proper error handling
 */
export function usePageStatus(statusCode: number = 200) {
  const location = useLocation();

  useEffect(() => {
    // Update document title and meta tags based on status
    if (statusCode === 404) {
      document.title = "Page Not Found (404) | Smart RV Technology Hub";
      
      // Add noindex meta tag for 404 pages
      let noindexMeta = document.querySelector('meta[name="robots"]');
      if (!noindexMeta) {
        noindexMeta = document.createElement('meta');
        noindexMeta.setAttribute('name', 'robots');
        document.head.appendChild(noindexMeta);
      }
      noindexMeta.setAttribute('content', 'noindex, nofollow');
      
      // Add canonical tag pointing to homepage for 404s
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', window.location.origin);
    }
  }, [statusCode, location.pathname]);

  return { statusCode };
}