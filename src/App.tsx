
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
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
import './styles/google-maps.css';  

// CRITICAL: Force all hero images to be visually present immediately
const preloadHeaderImages = () => {
  const criticalHeaderImages = [
    '/lovable-uploads/3efce4a3-d382-4b88-b33e-f96074fb7311.png',
    '/lovable-uploads/ad3dc693-42f4-4635-af2d-b2c4b1aafc43.png',
    '/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png',
    '/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png',
    '/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png',
    '/lovable-uploads/53093373-3df3-49cc-b4cc-91b800c53fa9.png',
    '/lovable-uploads/ff43ed8a-b7cd-42f7-a45e-a3a706d39d07.png',
    '/lovable-uploads/Luxury_RV_Living-min.jpg',
    '/lovable-uploads/Luxury-Class-RVs-min.jpg'
  ];
  
  // Create actual hidden image elements to force browser to load them
  criticalHeaderImages.forEach(src => {
    const img = new Image();
    img.src = src;
    img.style.position = 'absolute';
    img.style.width = '1px';
    img.style.height = '1px';
    img.style.opacity = '0.01';
    img.style.pointerEvents = 'none';
    img.style.left = '-9999px';
    document.body.appendChild(img);
  });
};

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
  React.useEffect(() => {
    console.log('App component mounted');
    
    // IMMEDIATE EXECUTION: Force header images to load
    preloadHeaderImages();
    
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
          <AppContent />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
