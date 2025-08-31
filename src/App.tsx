import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import RouterProvider from './components/router/RouterProvider';
import UpdateTestIndicator from './components/UpdateTestIndicator';

// Create a simple client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  // Force visible console update check
  React.useEffect(() => {
    console.log('%c🚀 APP COMPONENT UPDATED 🚀', 
      'background: linear-gradient(45deg, #667eea, #764ba2); color: white; font-size: 24px; padding: 15px; font-weight: bold;'
    );
    console.log('%cApp rendered at:', 'color: #5B9BD5; font-size: 18px; font-weight: bold;', new Date().toISOString());
    console.log('%cBuild version:', 'color: #5B9BD5; font-size: 18px; font-weight: bold;', Date.now());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UpdateTestIndicator />
        <RouterProvider />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
