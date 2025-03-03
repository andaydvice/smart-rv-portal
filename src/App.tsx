
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './components/router/RouterProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import { useEffect } from 'react';
import { ensureVisibility, debugAnimations } from './utils/visibilityDebugger';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Add useEffect to debug performance issues
  useEffect(() => {
    console.log('App component mounted');
    
    // Debug visibility after initial render
    const timeoutId = setTimeout(() => {
      console.log('Running visibility debugger');
      ensureVisibility();
      debugAnimations();
    }, 500);
    
    return () => {
      console.log('App component unmounted');
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div style={{ visibility: 'visible', display: 'block' }}>
          <RouterProvider />
          <Toaster />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
