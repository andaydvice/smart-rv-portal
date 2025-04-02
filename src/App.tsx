
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

// Better error handling for dynamic imports
window.addEventListener('error', function(event) {
  console.error('Global error caught:', event.error);
  if (event.error && event.error.message && event.error.message.includes('Failed to fetch dynamically imported module')) {
    console.error('Module import failure detected - forcing page reload');
    // Add a timestamp to prevent browser cache issues
    window.location.href = window.location.pathname + '?reload=' + Date.now();
  }
});

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
    
    // Emergency handling for blank screens
    const checkForBlankScreen = () => {
      const mainContent = document.querySelector('main, .min-h-screen, .page-transition');
      if (!mainContent) {
        console.warn('Blank screen detected, forcing page initialization');
        const rootElement = document.getElementById('root');
        if (rootElement) {
          rootElement.style.backgroundColor = '#080F1F';
          rootElement.style.visibility = 'visible';
          rootElement.style.opacity = '1';
          
          // Add emergency content if the screen is really blank
          if (rootElement.children.length === 0 || rootElement.innerHTML.trim() === '') {
            rootElement.innerHTML = `
              <div class="flex items-center justify-center h-screen bg-[#080F1F] text-white">
                <div class="text-center">
                  <p class="text-xl mb-4">Loading content...</p>
                  <p>If this message persists, please <a href="${window.location.pathname}?reload=${Date.now()}" class="text-blue-400 underline">click here to reload</a></p>
                </div>
              </div>
            `;
          }
        }
      }
    };
    
    // Check for blank screen after a delay
    setTimeout(checkForBlankScreen, 3000);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('lovable-navigation', handleRouteChange);
    };
  }, []);

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#080F1F] text-white">
        <div className="text-center">
          <p className="text-lg">Loading content...</p>
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
