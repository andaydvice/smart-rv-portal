import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import { injectEmergencyStyles } from './utils/markers/styleInjection';
import { forceMapMarkersVisible } from './utils/forceMapMarkers';
import RouterProvider from './components/router/RouterProvider';
import PerformanceReporter from './components/perf/PerformanceReporter';
import './App.css';
import './styles/animations.css';
// ... keep existing code (app and general styles)

import { applyAllEmergencyFixes } from './utils/emergency-styles/combined';
import { initializePreloading } from '@/utils/route-preloading';
import { registerServiceWorker } from '@/utils/service-worker';
import { initializeCSSOptimizations } from '@/utils/css-optimization';
import { injectTransitionStyles } from '@/components/transitions/PageTransition';

// Create a client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      // Using the correct error handling API for @tanstack/react-query v5+
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
        }
      }
    },
  },
});

function AppContent() {
  
  useEffect(() => {
    // Guard against StrictMode double-invoke in dev
    if ((window as any).__appEffectRan && import.meta.env.DEV) return;
    (window as any).__appEffectRan = true;
    console.log('App component mounted');
    
    // Enhanced performance optimization sequence
    const initEnhancedOptimizations = async () => {
      try {
        // Initialize service worker for offline capability
        await registerServiceWorker();
        
        // Basic network monitoring
        const handleOnline = () => console.log('✅ Network restored');
        const handleOffline = () => console.log('⚠️ Network lost'); 
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        const cleanupNetworkMonitoring = () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        };
        
        // Initialize CSS optimizations
        initializeCSSOptimizations();
        
        // Inject transition styles
        injectTransitionStyles();
        
        // Initialize route preloading
        initializePreloading();
        
        // Legacy optimization imports for compatibility
        const { injectCriticalCSS, preloadCriticalFonts } = await import('@/utils/critical-css').catch(() => ({
          injectCriticalCSS: () => {},
          preloadCriticalFonts: () => {}
        }));
        injectCriticalCSS();
        preloadCriticalFonts();
        
        // Bundle optimization
        const { preloadCriticalRoutes, monitorBundleSize, addResourceHints, optimizeImages } = await import('@/utils/bundle-optimization');
        preloadCriticalRoutes();
        addResourceHints();
        
        // Monitor performance after a short delay
        setTimeout(() => {
          monitorBundleSize();
          optimizeImages();
        }, 2000);
        
        // Performance monitoring
        if (window.performance && window.performance.mark) {
          window.performance.mark('app_initialization_complete');
        }
        
        // Store cleanup function for unmount
        return () => {
          cleanupNetworkMonitoring();
        };
      } catch (error) {
        console.warn('Some optimizations failed to initialize:', error);
      }
    };
    
    initEnhancedOptimizations();
    
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Wire up the map instance and helpers
    document.addEventListener('mapboxgl.map.created', (e: CustomEvent) => {
      (window as any).mapInstance = e.detail.map;
    });
    
    (window as any).dispatchMapEvent = (eventName: string, detail: any) => {
      document.dispatchEvent(new CustomEvent(eventName, { detail }));
    };

    return () => {
      // no-op
    };
  }, []);
  // Conditionally apply emergency marker fixes only on map routes
  useEffect(() => {
    let cleanup: undefined | (() => void);
    const apply = () => {
      if (cleanup) { cleanup(); cleanup = undefined; }
      const isMapRoute = /storage|map|maps/i.test(window.location.pathname);
      if (isMapRoute) {
        cleanup = applyAllEmergencyFixes();
      }
    };
    apply();
    const onNav = () => apply();
    window.addEventListener('popstate', onNav);
    window.addEventListener('hashchange', onNav);
    window.addEventListener('locationchange', onNav as any);
    return () => {
      window.removeEventListener('popstate', onNav);
      window.removeEventListener('hashchange', onNav);
      window.removeEventListener('locationchange', onNav as any);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <React.Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#080F1F] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5B9BD5] mx-auto"></div>
          <p className="mt-4">Loading application...</p>
        </div>
      </div>
    }>
      <RouterProvider />
      <PerformanceReporter />
      <Toaster />
    </React.Suspense>
  );
}

// The main App component - proper function component wrapping
function App() {
  // Set routes available flag for debugging
  (window as any).routesAvailable = true;
  
  
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
