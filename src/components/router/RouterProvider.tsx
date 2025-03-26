
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import ErrorBoundary from "../error/ErrorBoundary";
import ErrorDisplay from "../error/ErrorDisplay";

// Create the router from the routes array
const router = createBrowserRouter(routes);

const RouterProvider = () => {
  console.log('RouterProvider - Initialized with routes:', routes.map(route => route.path));
  console.log('RouterProvider - Current location:', window.location.pathname);
  
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
