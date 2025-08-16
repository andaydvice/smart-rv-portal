
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import EnhancedErrorBoundary from "../error/EnhancedErrorBoundary";
import { useEffect, useState } from "react";
import { scrollToTop } from "@/utils/scrollToTop";
import Enhanced404Page from "@/components/error/Enhanced404Page";
import { isBot, shouldPrerender } from "@/utils/prerender";
import LoadingStateManager from "@/components/loading/LoadingStateManager";
import { performanceMonitor, measureLoadingTime } from "@/utils/performance-monitoring";
import { safeGtag } from "@/types/analytics";

const RouterProvider = () => {
  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const botDetected = isBot();
  
  console.log('RouterProvider - Initialized with routes:', routes.length, 'total routes');
  
  useEffect(() => {
    // Start performance monitoring
    const loadingTimer = measureLoadingTime('router-initialization');
    loadingTimer.start();

    // Create the router asynchronously to split loading code
    const initRouter = async () => {
      try {
        // Create the router from the routes array with better error handling
        const enhancedRoutes = routes.map(route => ({
          ...route,
          // Add a loader to each route to handle scrolling to top and analytics
          loader: (args: any) => {
            // Track route changes
            performanceMonitor.trackRouteChange(route.path || 'unknown');
            
            // Only scroll to top for new navigations, not for replacements
            if (window.history.state?.type !== 'REPLACE') {
              scrollToTop();
            }
            // Return null to not affect data loading
            return null;
          },
          // Use enhanced 404 page for better UX
          errorElement: route.errorElement || (route.path === '*' ? <Enhanced404Page /> : <Enhanced404Page />)
        }));
        
        setRouter(createBrowserRouter(enhancedRoutes));
        loadingTimer.end();
        
        // Allow time for loading animation to complete
        setTimeout(() => {
          setIsInitializing(false);
        }, 100);
        
      } catch (error) {
        console.error('Router initialization failed:', error);
        loadingTimer.end();
        setIsInitializing(false);
      }
    };
    
    initRouter();
  }, []);
  
  // For bots, show minimal loading or skip entirely
  if (!router || isInitializing) {
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

    // Enhanced loading experience for users
    return (
      <LoadingStateManager
        initialLoading={true}
        onLoadingComplete={() => {
          console.log('Initial loading completed');
        }}
      >
        <div />
      </LoadingStateManager>
    );
  }
  
  return (
    <EnhancedErrorBoundary
      onError={(error, errorInfo) => {
        console.error('Router error boundary triggered:', error);
        
        // Send to analytics
        safeGtag('event', 'exception', {
          description: error.message,
          fatal: false
        });
      }}
    >
      <ReactRouterProvider 
        router={router} 
        fallbackElement={
          <LoadingStateManager
            initialLoading={true}
            showSkeleton={true}
          >
            <div />
          </LoadingStateManager>
        }
      />
    </EnhancedErrorBoundary>
  );
};

export default RouterProvider;
