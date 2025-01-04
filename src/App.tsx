import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouterProvider from "./components/router/RouterProvider";

console.log('Initializing QueryClient...');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Add HMR logging
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('App module updated, HMR accepted');
  });
}

console.log('QueryClient initialized');

const App = () => {
  console.log('Rendering App component');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div>
          <Toaster />
          <Sonner />
          <RouterProvider />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;