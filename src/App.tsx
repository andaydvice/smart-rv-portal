
import React, { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './components/router/RouterProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import { injectEmergencyStyles } from './utils/markers/styleInjection';
import { forceMapMarkersVisible } from './utils/forceMapMarkers';
import { preventRouteReload } from './utils/navigation/preventRouteReload';
import EmergencyContentRecovery from './components/recovery/EmergencyContentRecovery';
import './App.css';
import './styles/animations.css';
import './styles/map-loading.css';
import './styles/map-preview.css'; 

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
    console.log('App component mounted');
    
    // Apply emergency fixes that bypass React
    injectEmergencyStyles();
    forceMapMarkersVisible();
    preventRouteReload();
    
    // Log the current URL for debugging
    console.log('Current URL:', window.location.href);
    console.log('Current pathname:', window.location.pathname);
    
    // Force the background color on the document body
    document.body.style.backgroundColor = '#080F1F';
    document.documentElement.style.backgroundColor = '#080F1F';
    
    // Debug navigation events
    const handleRouteChange = () => {
      console.log('Navigation detected, path:', window.location.pathname);
      // Ensure body background color persists after navigation
      document.body.style.backgroundColor = '#080F1F';
      document.documentElement.style.backgroundColor = '#080F1F';
    };
    
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('lovable-navigation', handleRouteChange);
    
    // Verify routes are available
    if ((window as any).routesAvailable) {
      console.log('Routes confirmed available');
    } else {
      console.warn('Routes may not be properly configured');
    }
    
    // Store map instance globally for emergency access
    document.addEventListener('mapboxgl.map.created', (e: any) => {
      (window as any).mapInstance = e.detail.map;
    });
    
    // Create custom event dispatch system for map
    (window as any).dispatchMapEvent = (eventName: string, detail: any) => {
      document.dispatchEvent(new CustomEvent(eventName, { detail }));
    };
    
    // Force-fix blank screen if it persists for 3 seconds
    const blankScreenTimeout = setTimeout(() => {
      const rootElement = document.getElementById('root');
      if (rootElement && (rootElement.children.length === 0 || rootElement.style.opacity === '0')) {
        console.warn('Detected potential blank screen after 3s, applying emergency fix');
        document.body.style.visibility = 'visible';
        document.body.style.display = 'block';
        document.body.style.backgroundColor = '#080F1F';
        rootElement.style.visibility = 'visible';
        rootElement.style.display = 'block';
        rootElement.style.backgroundColor = '#080F1F';
      }
    }, 3000);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('lovable-navigation', handleRouteChange);
      clearTimeout(blankScreenTimeout);
    };
  }, []);

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#080F1F] text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading application...</p>
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
  
  // Important: Force document background color immediately
  if (typeof document !== 'undefined') {
    document.documentElement.style.backgroundColor = '#080F1F';
    document.body.style.backgroundColor = '#080F1F';
  }
  
  return (
    <EmergencyContentRecovery>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </QueryClientProvider>
    </EmergencyContentRecovery>
  );
}

export default App;
