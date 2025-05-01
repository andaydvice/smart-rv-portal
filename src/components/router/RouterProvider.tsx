
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import ErrorBoundary from "../error/ErrorBoundary";
import { useEffect, useState } from "react";
import { scrollToTop } from "@/utils/scrollToTop";
import ErrorPage from "@/pages/ErrorPage";
import EmergencyDebug from "../debug/EmergencyDebug";

// Use a simple component that will always render, even if routing fails
const EmergencyFallback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080F1F] text-white p-4">
      <EmergencyDebug />
      <div className="text-center mt-12">
        <h2 className="text-xl font-semibold mb-4">Router Error</h2>
        <p className="mb-4">The application encountered an error while loading the router.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-[#5B9BD5] text-white rounded hover:bg-[#4A8AC4] transition-colors"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

const RouterProvider = () => {
  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);
  const [routerError, setRouterError] = useState<Error | null>(null);
  
  console.log('RouterProvider - Initialized with routes:', routes.length, 'total routes');
  
  // Store routes on window for emergency access
  (window as any).allRoutes = routes;
  
  useEffect(() => {
    // Create the router asynchronously to split loading code
    const initRouter = async () => {
      try {
        // Create the router from the routes array with better error handling
        const enhancedRoutes = routes.map(route => ({
          ...route,
          // Add a loader to each route to handle scrolling to top
          loader: (args: any) => {
            // Only scroll to top for new navigations, not for replacements
            if (window.history.state?.type !== 'REPLACE') {
              scrollToTop();
            }
            // Return null to not affect data loading
            return null;
          },
          // Ensure all routes have error handling
          errorElement: route.errorElement || <ErrorPage />
        }));
        
        setRouter(createBrowserRouter(enhancedRoutes));
      } catch (error) {
        console.error('Failed to create router:', error);
        setRouterError(error instanceof Error ? error : new Error('Unknown router error'));
      }
    };
    
    initRouter();
  }, []);
  
  // If there was an error creating the router, show emergency fallback
  if (routerError) {
    console.error('Router creation error:', routerError);
    return <EmergencyFallback />;
  }
  
  // While router is initializing, show loading state
  if (!router) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080F1F] text-white p-4">
        <EmergencyDebug />
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5B9BD5] mx-auto"></div>
          <p className="mt-4">Loading routes...</p>
        </div>
      </div>
    );
  }
  
  return (
    <ErrorBoundary>
      <ReactRouterProvider 
        router={router} 
        fallbackElement={
          <div className="min-h-screen flex items-center justify-center bg-[#080F1F] text-white p-4">
            <EmergencyDebug />
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Loading application...</h2>
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5B9BD5] mx-auto"></div>
            </div>
          </div>
        }
      />
    </ErrorBoundary>
  );
};

export default RouterProvider;
