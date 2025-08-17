import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { preloadContextualRoutes } from '@/utils/routePreloader';
import { useRouteCache } from '@/hooks/useRouteCache';

/**
 * Smart route preloader component that automatically preloads
 * likely next routes based on the current location
 */
export const RoutePreloader = () => {
  const location = useLocation();
  const { isRouteVisited } = useRouteCache();

  useEffect(() => {
    // Only preload if we're not in a loading state
    const timer = setTimeout(() => {
      preloadContextualRoutes(location.pathname);
    }, 200); // Small delay to avoid interfering with current route loading

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Preload likely routes on link hover (for desktop users)
  useEffect(() => {
    const handleLinkHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href.includes(window.location.origin)) {
        const path = new URL(link.href).pathname;
        
        // Only preload if route hasn't been visited and is in our preloadable routes
        if (!isRouteVisited(path)) {
          import('@/utils/routePreloader').then(({ preloadRoutes }) => {
            preloadRoutes([path]);
          });
        }
      }
    };

    // Add hover preloading for better UX on desktop
    document.addEventListener('mouseover', handleLinkHover);
    
    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
    };
  }, [isRouteVisited]);

  return null; // This component doesn't render anything
};