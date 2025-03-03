
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './components/router/RouterProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import { useEffect, useState } from 'react';
import { ensureVisibility, debugAnimations } from './utils/visibilityDebugger';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 3, // Add retry logic for failed queries
    },
  },
});

function App() {
  const [isConnected, setIsConnected] = useState(true);

  // Add useEffect to debug performance issues and handle connectivity
  useEffect(() => {
    console.log('App component mounted');
    
    // Debug visibility after initial render
    const timeoutId = setTimeout(() => {
      console.log('Running visibility debugger');
      ensureVisibility();
      debugAnimations();
    }, 500);

    // Monitor connectivity status
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
      console.log('App component unmounted');
      clearTimeout(timeoutId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div style={{ visibility: 'visible', display: 'block' }}>
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
