
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import ErrorBoundary from "../error/ErrorBoundary";

// Create the router from the routes array
const router = createBrowserRouter(routes);

const RouterProvider = () => {
  console.log('RouterProvider - Available Routes:', router.routes);
  
  return (
    <ErrorBoundary>
      <ReactRouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default RouterProvider;
