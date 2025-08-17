import { lazy } from 'react';

// Route preloading cache
const preloadedRoutes = new Set<string>();
const preloadPromises = new Map<string, Promise<any>>();

// Popular routes that should be preloaded based on user context
export const ROUTE_PRELOAD_MAP = {
  '/features': [
    '/features/audio-system',
    '/features/smart-tv',
    '/features/internet-connectivity',
    '/features/power-management'
  ],
  '/models': [
    '/models/compact',
    '/models/luxury',
    '/models/adventure'
  ],
  '/calculators': [
    '/weather',
    '/documentation'
  ]
} as const;

// Lazy imports for preloading
const PRELOADABLE_COMPONENTS = {
  '/features/audio-system': () => import("@/pages/features/AudioSystem"),
  '/features/smart-tv': () => import("@/pages/features/SmartTV"),
  '/features/internet-connectivity': () => import("@/pages/features/InternetConnectivity"),
  '/features/power-management': () => import("@/pages/features/PowerManagement"),
  '/models/compact': () => import("@/pages/models/CompactModel"),
  '/models/luxury': () => import("@/pages/models/LuxuryModel"),
  '/models/adventure': () => import("@/pages/models/AdventureModel"),
  '/weather': () => import("@/pages/WeatherDashboard"),
  '/documentation': () => import("@/pages/Documentation"),
} as const;

/**
 * Preload routes that are likely to be visited next
 */
export const preloadRoutes = (routesToPreload: readonly string[]) => {
  routesToPreload.forEach(route => {
    if (preloadedRoutes.has(route) || !PRELOADABLE_COMPONENTS[route as keyof typeof PRELOADABLE_COMPONENTS]) {
      return;
    }

    const preloadFn = PRELOADABLE_COMPONENTS[route as keyof typeof PRELOADABLE_COMPONENTS];
    if (preloadFn && !preloadPromises.has(route)) {
      const promise = preloadFn();
      preloadPromises.set(route, promise);
      preloadedRoutes.add(route);
    }
  });
};

/**
 * Preload routes based on current location context
 */
export const preloadContextualRoutes = (currentPath: string) => {
  const routesToPreload = ROUTE_PRELOAD_MAP[currentPath as keyof typeof ROUTE_PRELOAD_MAP];
  if (routesToPreload) {
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => preloadRoutes(routesToPreload));
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => preloadRoutes(routesToPreload), 100);
    }
  }
};

/**
 * Hook to use in route components for automatic preloading
 */
export const useRoutePreloader = (currentPath: string) => {
  // Preload contextual routes when component mounts
  if (typeof window !== 'undefined') {
    preloadContextualRoutes(currentPath);
  }
};