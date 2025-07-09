
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import ErrorBoundary from "../error/ErrorBoundary";
import { scrollToTop } from "@/utils/scrollToTop";
import ErrorPage from "@/pages/ErrorPage";

// Create the router immediately with enhanced routes
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

const router = createBrowserRouter(enhancedRoutes);

const RouterProvider = () => {
  console.log('RouterProvider - Initialized with routes:', routes.length, 'total routes');
  
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
