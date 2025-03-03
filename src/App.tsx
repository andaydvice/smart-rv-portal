
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './components/router/RouterProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import { useEffect, useState } from 'react';
import { ensureVisibility, debugAnimations, debugConnections } from './utils/visibilityDebugger';
import './App.css';

// Create a client with improved error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 5, // Increase retry attempts
      retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
      onError: (error) => {
        console.error('Query error:', error);
      },
    },
  },
});

function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [initialLoadAttempted, setInitialLoadAttempted] = useState(false);

  // Add useEffect to debug performance issues and handle connectivity
  useEffect(() => {
    console.log('App component mounted');
    
    // Debug visibility immediately and then again after a short delay
    ensureVisibility();
    
    const timeoutIds = [
      setTimeout(() => {
        console.log('Running visibility debugger (first pass)');
        ensureVisibility();
        debugAnimations();
      }, 100),
      
      setTimeout(() => {
        console.log('Running visibility debugger (second pass)');
        ensureVisibility();
        debugAnimations();
        setInitialLoadAttempted(true);
      }, 500),
      
      setTimeout(() => {
        console.log('Running connection debugger');
        debugConnections();
      }, 1000)
    ];

    // Monitor connectivity status
    const handleOnline = () => {
      console.log('Network connection restored');
      setIsConnected(true);
      // Force re-render critical components
      ensureVisibility();
      debugAnimations();
    };

    const handleOffline = () => {
      console.log('Network connection lost');
      setIsConnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      console.log('App component unmounted');
      timeoutIds.forEach(id => clearTimeout(id));
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
          {!initialLoadAttempted && (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '20px',
              borderRadius: '8px',
              zIndex: 9000
            }}>
              Loading application...
            </div>
          )}
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
