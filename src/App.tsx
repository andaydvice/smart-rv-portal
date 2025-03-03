
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './components/router/RouterProvider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './components/auth/AuthContext';
import './App.css';

// Create a client with improved error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      // Handle errors globally to prevent unhandled promise rejections
      onError: (error) => {
        console.error('Query error:', error);
      }
    },
    mutations: {
      // Handle mutation errors globally
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    }
  },
});

function App() {
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
