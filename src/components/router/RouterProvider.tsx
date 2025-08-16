
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import ErrorBoundary from "../error/ErrorBoundary";
import { useEffect, useState } from "react";
import { scrollToTop } from "@/utils/scrollToTop";
import ErrorPage from "@/pages/ErrorPage";
import { isBot, shouldPrerender } from "@/utils/prerender";
import { useRouteOptimization } from "@/hooks/useRouteOptimization";

const RouterProvider = () => {
  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);
  const { isBot: botDetected } = useRouteOptimization();
  
  console.log('RouterProvider - Initialized with routes:', routes.length, 'total routes');
  
  useEffect(() => {
    // Create the router asynchronously to split loading code
    const initRouter = async () => {
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
    };
    
    initRouter();
  }, []);
  
  // For bots, show minimal loading or skip entirely
  if (!router) {
    if (botDetected || isBot()) {
      // Minimal loading for bots - they need immediate content access
      return (
        <div className="min-h-screen bg-[#080F1F] text-white">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-[#5B9BD5] mb-4">Smart RV Technology Hub</h1>
            <p className="text-[#E2E8FF] mb-4">Loading content...</p>
            <nav className="space-y-2">
              <a href="/" className="block text-[#5B9BD5] hover:underline">Home</a>
              <a href="/about" className="block text-[#5B9BD5] hover:underline">About</a>
              <a href="/products" className="block text-[#5B9BD5] hover:underline">Products</a>
              <a href="/blog" className="block text-[#5B9BD5] hover:underline">Blog</a>
              <a href="/features" className="block text-[#5B9BD5] hover:underline">Features</a>
              <a href="/models" className="block text-[#5B9BD5] hover:underline">Models</a>
            </nav>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080F1F] text-white p-4">
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
