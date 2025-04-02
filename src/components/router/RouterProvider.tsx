
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
    }
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
  
  // Custom error handler for 404 and other routing errors
  const handleRouteError = (error: any) => {
    console.error('Route error:', error);
    // Check if it's a 404 error
    if (error.statusCode === 404 || error.status === 404 || error.message?.includes('Not Found')) {
      return {
        message: "The page you're looking for doesn't exist or has been moved",
        statusCode: 404
      };
    }
    return {
      message: error.message || 'An unexpected routing error occurred',
      statusCode: error.statusCode || error.status || 500,
      stack: error.stack
    };
  };
  
  return (
    <ErrorBoundary>
      <ReactRouterProvider 
        router={router} 
        fallbackElement={
          <ErrorDisplay 
            error={{
              message: "Loading application...",
              statusCode: 0
            }}
          />
        }
      />
    </ErrorBoundary>
  );
};

export default RouterProvider;
