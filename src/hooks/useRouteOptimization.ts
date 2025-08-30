import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to optimize SEO for client-side routing
 * Handles canonical URLs, scroll restoration, and route change tracking
 */
export const useRouteOptimization = (title?: string, canonical?: string) => {
  let location;
  let isBot = false;

  // Safely try to get location, handle case where Router context doesn't exist yet
  try {
    location = useLocation();
  } catch (error) {
    // If we're outside Router context, create a minimal location object
    location = { pathname: '/', search: '', hash: '', state: null, key: 'default' };
  }

  // Detect bot outside of Router context
  if (typeof navigator !== 'undefined') {
    isBot = /bot|crawler|spider|crawling/i.test(navigator.userAgent);
  }

  useEffect(() => {
    // Scroll to top on route change (unless hash is present)
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      // Handle hash navigation after a brief delay to allow content to render
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    // Update document title if provided
    if (title) {
      document.title = title;
    }

    // Handle canonical URL updates for dynamic routes
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }

    // Track route changes for analytics (if available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_TRACKING_ID', {
        page_path: location.pathname + location.search
      });
    }

    // Detect and handle bot crawlers for immediate content access
    const isBot = typeof navigator !== 'undefined' && /bot|crawler|spider|crawling/i.test(navigator.userAgent);
    if (isBot) {
      // Remove any loading overlays for bots
      const loadingElements = document.querySelectorAll('.loading-fallback, .spinner, .loading');
      loadingElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    }

  }, [location, title, canonical]);

  return { location, isBot };
};

/**
 * Component to handle global route optimization
 * Should be placed inside Router context
 */
export const RouteOptimizer = () => {
  useRouteOptimization();
  return null;
};