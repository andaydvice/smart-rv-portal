import { lazy } from 'react';

/**
 * Bundle optimization utilities
 * Implements code splitting and lazy loading strategies
 */

// Lazy load heavy components
export const LazyEnhancedAnalyticsDashboard = lazy(() => 
  import('../pages/EnhancedAnalyticsDashboard').then(module => ({
    default: module.default
  }))
);

export const LazyMapComponents = lazy(() => 
  import('../components/storage/GoogleMapFacilitiesView').then(module => ({
    default: module.default
  }))
);

export const LazyBlogComponents = lazy(() => 
  import('../components/blog/BlogGrid').then(module => ({
    default: module.default
  }))
);

// Dynamic imports for feature modules
export const loadMapFeatures = () => import('../components/map/ResponsiveMap');
export const loadAnalyticsFeatures = () => import('../components/analytics/AdvancedAnalyticsDashboard');
export const loadStorageFeatures = () => import('../components/storage/StorageFacilitiesMap');

// Code splitting for routes
export const loadAuthPages = () => import('../pages/Auth');
export const loadAdminPages = () => import('../pages/AdminDashboard');
export const loadCalculatorPages = () => import('../pages/Calculators');

// Preload critical modules based on user behavior
export const preloadCriticalModules = () => {
  // Preload commonly accessed features
  const criticalModules = [
    () => import('../components/navigation/ResponsiveNavbar'),
    () => import('../components/sections/HeroSection'),
    () => import('../components/ui/button'),
    () => import('../components/ui/card')
  ];

  criticalModules.forEach(loadModule => {
    setTimeout(loadModule, 100);
  });
};

// Bundle analysis
export const analyzeBundleUsage = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available in production builds');
    return;
  }

  // Monitor component usage
  const componentUsage = new Map();
  
  return {
    trackComponentUsage: (componentName: string) => {
      const count = componentUsage.get(componentName) || 0;
      componentUsage.set(componentName, count + 1);
    },
    getUsageReport: () => {
      return Array.from(componentUsage.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    }
  };
};

// Tree shaking helpers
export const removeUnusedImports = () => {
  console.log('Tree shaking enabled in production build');
};