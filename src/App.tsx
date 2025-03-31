
import React, { Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './components/router/RouterProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import { injectEmergencyStyles } from './utils/markers/styleInjection';
import { forceMapMarkersVisible } from './utils/forceMapMarkers';
import { Spinner } from './components/ui/spinner';
import './App.css';
import './styles/animations.css';
import './styles/map-loading.css';
import './styles/auto-refresh.css';

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
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    console.log('App component mounted');
    
    try {
      // Apply emergency fixes that bypass React
      injectEmergencyStyles();
      forceMapMarkersVisible();
      
      // Log the current URL for debugging
      console.log('Current URL:', window.location.href);
      console.log('Current pathname:', window.location.pathname);
      
      // Verify routes are available
      if ((window as any).routesAvailable) {
        console.log('Routes confirmed available');
      } else {
        console.warn('Routes may not be properly configured');
      }
      
      // Store map instance globally for emergency access
      document.addEventListener('mapboxgl.map.created', (e: CustomEvent) => {
        (window as any).mapInstance = e.detail.map;
      });
      
      // Create custom event dispatch system for map
      (window as any).dispatchMapEvent = (eventName: string, detail: any) => {
        document.dispatchEvent(new CustomEvent(eventName, { detail }));
      };

      // Mark app as ready after a short delay
      setTimeout(() => {
        setAppReady(true);
      }, 500);
    } catch (err) {
      console.error("Error during app initialization:", err);
      // Set app as ready even if there are errors, to avoid infinite loading
      setAppReady(true);
    }
  }, []);

  // Show a minimal loading state while initializing
  if (!appReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#080F1F] text-white">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p>Initializing application...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#080F1F] text-white">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p>Loading application components...</p>
        </div>
      </div>
    }>
      <RouterProvider />
      <Toaster />
    </Suspense>
  );
}

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
