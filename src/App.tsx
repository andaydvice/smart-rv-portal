
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './components/router/RouterProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import { useEffect, useState } from 'react';
import { ensureVisibility } from './utils/visibility';
import './App.css';

// Create a client with simplified options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [isConnected, setIsConnected] = useState(true);
  // CRITICAL FIX: Start with initialLoadAttempted = true to avoid loading indicator
  const [initialLoadAttempted, setInitialLoadAttempted] = useState(true);

  // Simple useEffect with minimal operations
  useEffect(() => {
    console.log('App component mounted');
    
    // Debug visibility immediately
    ensureVisibility();
    
    // Force visibility after a short delay
    setTimeout(() => {
      ensureVisibility();
    }, 500);

    // Simple connectivity check
    const handleOnline = () => {
      console.log('Network connection restored');
      setIsConnected(true);
    };

    const handleOffline = () => {
      console.log('Network connection lost');
      setIsConnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div style={{ visibility: 'visible', display: 'block', opacity: 1 }}>
          {!isConnected && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: '#f44336',
              color: 'white',
              textAlign: 'center',
              padding: '10px',
              zIndex: 9999
            }}>
              Network connection lost. Please check your internet connection.
            </div>
          )}
          <RouterProvider />
          <Toaster />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
