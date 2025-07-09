
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthProvider';
import { ABTestingProvider } from './components/analytics/ABTestingProvider';
import { WishlistProvider } from './components/personalization/WishlistProvider';
import { PWAProvider } from './components/pwa/PWAProvider';
import PerformanceMonitor from './components/performance/PerformanceMonitor';
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#080F1F] text-white">
      <RouterProvider />
      <Toaster />
    </div>
  );
}

// The main App component - proper function component wrapping
function App() {
  // Set routes available flag for debugging
  (window as any).routesAvailable = true;
  
  console.log('App rendering');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ABTestingProvider>
          <WishlistProvider>
            <PWAProvider>
              <AppContent />
            </PWAProvider>
          </WishlistProvider>
        </ABTestingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
