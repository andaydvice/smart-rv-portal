
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './components/router/RouterProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import { useEffect, useState } from 'react';
import { ensureVisibility, debugAnimations, debugConnections } from './utils/visibility';
import './App.css';

// Create a client with improved error handling and retry logic
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 5, // Increase retry attempts
      retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
        }
      },
    },
  },
});

function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [initialLoadAttempted, setInitialLoadAttempted] = useState(false);
  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);

  // Enhanced useEffect to debug performance issues and handle connectivity
  useEffect(() => {
    console.log('App component mounted - initializing with enhanced error recovery');
    
    // Debug visibility immediately and then again after a short delay
    ensureVisibility();
    
    // Force set initialLoadAttempted to true to remove loading indicator
    setTimeout(() => {
      setInitialLoadAttempted(true);
      console.log('Initial load attempted set to true');
    }, 500);
    
    // Schedule multiple visibility checks with increasing delays
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
      }, 500),
      
      setTimeout(() => {
        console.log('Running visibility debugger (third pass)');
        ensureVisibility();
        debugAnimations();
      }, 1500),
      
      setTimeout(() => {
        console.log('Running connection debugger');
        debugConnections();
      }, 1000),
      
      // Additional debug pass
      setTimeout(() => {
        console.log('Running final visibility check');
        ensureVisibility();
        debugAnimations();
        debugConnections();
      }, 3000)
    ];

    // Monitor connectivity status with improved handling
    const handleOnline = () => {
      console.log('Network connection restored');
      setIsConnected(true);
      setReconnectionAttempts(0);
      
      // Force re-render critical components
      ensureVisibility();
      debugAnimations();
      
      // Refresh any failed queries
      queryClient.invalidateQueries();
    };

    const handleOffline = () => {
      console.log('Network connection lost');
      setIsConnected(false);
      
      // Attempt to reconnect periodically
      const reconnectInterval = setInterval(() => {
        if (navigator.onLine) {
          console.log('Reconnection successful');
          clearInterval(reconnectInterval);
          handleOnline();
        } else {
          setReconnectionAttempts(prev => prev + 1);
          console.log(`Reconnection attempt ${reconnectionAttempts + 1}`);
        }
      }, 5000);
      
      // Clear interval after maximum attempts
      if (reconnectionAttempts >= 10) {
        clearInterval(reconnectInterval);
      }
      
      // Store for cleanup
      timeoutIds.push(reconnectInterval);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      console.log('App component unmounting - cleaning up');
      timeoutIds.forEach(id => clearTimeout(id));
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [reconnectionAttempts]);

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
              {reconnectionAttempts > 0 && ` (Reconnection attempts: ${reconnectionAttempts})`}
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
