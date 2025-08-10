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
    
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Apply emergency fixes that bypass React
    const cleanup = applyAllEmergencyFixes();
    
    // Wire up the map instance and helpers
    document.addEventListener('mapboxgl.map.created', (e: CustomEvent) => {
      (window as any).mapInstance = e.detail.map;
    });
    
    (window as any).dispatchMapEvent = (eventName: string, detail: any) => {
      document.dispatchEvent(new CustomEvent(eventName, { detail }));
    };

    return () => {
      if (typeof cleanup === 'function') cleanup();
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
