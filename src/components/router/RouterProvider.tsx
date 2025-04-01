
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import ErrorBoundary from "../error/ErrorBoundary";
import ErrorDisplay from "../error/ErrorDisplay";
import { useEffect } from "react";
import { scrollToTop } from "@/utils/scrollToTop";

// Create the router from the routes array with better error handling
const router = createBrowserRouter(
  routes.map(route => ({
    ...route,
    // Add a loader to each route to handle scrolling to top
    loader: (args) => {
      // Only scroll to top for new navigations, not for replacements
      if (window.history.state?.type !== 'REPLACE') {
        scrollToTop();
      }
      // Return null to not affect data loading
      return null;
    },
    // Add better error element handling
    errorElement: route.errorElement || <ErrorDisplay error={{message: "Page not found", statusCode: 404}} />
  }))
);

// Modified structure to properly handle React Router Provider
const RouterProvider = () => {
  console.log('RouterProvider - Initialized with routes:', routes.map(route => route.path));
  console.log('RouterProvider - Current location:', window.location.pathname);
  
  // Log any missing route matches
  const currentPath = window.location.pathname;
  const routeFound = routes.some(route => {
    if (route.path === '*') return false;
    if (route.path === currentPath) return true;
    // Handle parameterized routes
    if (route.path.includes(':') && currentPath.startsWith(route.path.split(':')[0])) return true;
    return false;
  });
  
  if (!routeFound) {
    console.warn(`No exact route match found for: ${currentPath}`);
    if (currentPath === '/compare-models' || currentPath === '/models/compare') {
      console.error(`Critical routing error: ${currentPath} is defined but not matching!`);
    }
  }
  
  return (
    <ErrorBoundary>
      <ReactRouterProvider 
        router={router} 
        fallbackElement={
          <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="text-center">
              <div className="mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              </div>
              <p className="text-xl">Loading application...</p>
            </div>
          </div>
        }
      />
    </ErrorBoundary>
  );
};

export default RouterProvider;
