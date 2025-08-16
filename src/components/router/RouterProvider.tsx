
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import EnhancedErrorBoundary from "../error/EnhancedErrorBoundary";
import { scrollToTop } from "@/utils/scrollToTop";
import Enhanced404Page from "@/components/error/Enhanced404Page";
import { safeGtag } from "@/types/analytics";

const RouterProvider = () => {
  console.log('RouterProvider - Creating router with', routes.length, 'routes');
  
  // Create router immediately without async complexity
  const router = createBrowserRouter(
    routes.map(route => ({
      ...route,
      // Add a loader to each route to handle scrolling to top
      loader: () => {
        // Only scroll to top for new navigations, not for replacements
        if (window.history.state?.type !== 'REPLACE') {
          scrollToTop();
        }
        return null;
      },
      // Use enhanced 404 page for better UX
      errorElement: route.errorElement || <Enhanced404Page />
    }))
  );
  
  console.log('RouterProvider - Router created successfully');
  
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
          <div className="min-h-screen bg-[#080F1F] text-white flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#5B9BD5] mb-2">Loading...</h2>
              <p className="text-[#E2E8FF]">Preparing your content</p>
            </div>
          </div>
        }
      />
    </EnhancedErrorBoundary>
  );
};

export default RouterProvider;
