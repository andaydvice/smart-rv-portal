
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthProvider';
import { ABTestingProvider } from './components/analytics/ABTestingProvider';
import { WishlistProvider } from './components/personalization/WishlistProvider';
import { PWAProvider } from './components/pwa/PWAProvider';
import PerformanceMonitor from './components/performance/PerformanceMonitor';
import RouterProvider from './components/router/RouterProvider';
import './App.css';

// Create a client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  useEffect(() => {
    console.log('App component mounted');
    window.scrollTo(0, 0);
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
      <PerformanceMonitor />
      <RouterProvider />
      <Toaster />
    </React.Suspense>
  );
}

function App() {
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
