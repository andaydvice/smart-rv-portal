
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import { ABTestingProvider } from './components/analytics/ABTestingProvider';
import { WishlistProvider } from './components/personalization/WishlistProvider';
import { injectEmergencyStyles } from './utils/markers/styleInjection';
import { forceMapMarkersVisible } from './utils/forceMapMarkers';
import RouterProvider from './components/router/RouterProvider';
import './App.css';
import './styles/animations.css';
import './styles/map-loading.css';
import './styles/map-fixes.css';          
import './styles/emergency-marker-fix.css'; 
import './styles/map-optimizations.css';   
import './styles/force-markers.css';       
import './styles/map/index.css';  // Updated path to use the index file that imports all map styles

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
    
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Apply emergency fixes that bypass React
    injectEmergencyStyles();
    forceMapMarkersVisible();
    
    // Debug current route
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
      console.log('Map instance stored globally');
    });
    
    // Create custom event dispatch system for map
    (window as any).dispatchMapEvent = (eventName: string, detail: any) => {
      document.dispatchEvent(new CustomEvent(eventName, { detail }));
      console.log(`Map event dispatched: ${eventName}`);
    };
    
    // Force all markers to be visible
    setTimeout(() => {
      try {
        const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
        console.log(`Found ${markers.length} markers to make visible`);
        markers.forEach(marker => {
          if (marker instanceof HTMLElement) {
            marker.style.visibility = 'visible';
            marker.style.display = 'block';
            marker.style.opacity = '1';
            marker.style.zIndex = '1000';
          }
        });
      } catch (err) {
        console.error('Error forcing markers visible:', err);
      }
    }, 1000);
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
      <Toaster />
    </React.Suspense>
  );
}

// The main App component - proper function component wrapping
function App() {
  // Set routes available flag for debugging
  (window as any).routesAvailable = true;
  
  console.log('App rendering');
  
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ABTestingProvider>
            <WishlistProvider>
              <AppContent />
            </WishlistProvider>
          </ABTestingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
