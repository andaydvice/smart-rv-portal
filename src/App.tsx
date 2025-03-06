
import React, { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './components/router/RouterProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import './App.css';

// Create a client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => {
        console.error('Query error:', error);
      }
    },
  },
});

function AppContent() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading application...</div>}>
      <RouterProvider />
      <Toaster />
    </Suspense>
  );
}

function App() {
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
