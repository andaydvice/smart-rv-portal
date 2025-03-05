
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './components/router/RouterProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import './App.css';

// Create a client with more permissive settings for development
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
  console.log('Rendering App component');
  
  // Make sure the root is visible
  if (typeof document !== 'undefined') {
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
