import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Simple route cache to prevent re-showing skeletons for visited routes
const visitedRoutes = new Set<string>();
const routeCache = new Map<string, boolean>();

export const useRouteCache = () => {
  const location = useLocation();
  const previousPath = useRef<string>('');
  
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Mark current route as visited
    visitedRoutes.add(currentPath);
    routeCache.set(currentPath, true);
    
    // Store previous path for back navigation optimization
    if (previousPath.current) {
      routeCache.set(previousPath.current, true);
    }
    
    previousPath.current = currentPath;
  }, [location.pathname]);

  return {
    isRouteVisited: (path: string) => visitedRoutes.has(path),
    isRouteCached: (path: string) => routeCache.has(path),
    clearCache: () => {
      visitedRoutes.clear();
      routeCache.clear();
    }
  };
};

export const isRouteVisited = (path: string) => visitedRoutes.has(path);