
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import ErrorBoundary from "../error/ErrorBoundary";
import ErrorPage from "@/pages/ErrorPage";

// Create the router with the routes
const router = createBrowserRouter(routes);

const RouterProvider = () => {
  console.log('RouterProvider - Rendering with routes:', routes.length, 'total routes');
  
  return (
    <ErrorBoundary>
      <ReactRouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default RouterProvider;
