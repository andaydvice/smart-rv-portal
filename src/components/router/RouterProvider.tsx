
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import ErrorBoundary from "../error/ErrorBoundary";
import ErrorDisplay from "../error/ErrorDisplay";
import { useEffect } from "react";
import { scrollToTop } from "@/utils/scrollToTop";
import ErrorPage from "@/pages/ErrorPage";

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
    // Ensure all routes have error handling
    errorElement: route.errorElement || <ErrorPage />
  }))
);

// Modified structure to properly handle React Router Provider
const RouterProvider = () => {
  console.log('RouterProvider - Initialized with routes:', routes.length, 'total routes');
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
  
  if (!routeFound && currentPath !== '/') {
    console.warn(`No exact route match found for: ${currentPath}`);
    
    // Log potential partial matches for debugging
    const potentialMatches = routes
      .filter(route => {
        if (currentPath.includes(route.path) && route.path !== '/' && route.path !== '*') 
          return true;
        return false;
      })
      .map(route => route.path);
    
    if (potentialMatches.length > 0) {
      console.log('Potential partial matches:', potentialMatches);
    }
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
