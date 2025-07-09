
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import ErrorBoundary from "../error/ErrorBoundary";

// Create the router with the routes
const router = createBrowserRouter(routes);

const RouterProvider = () => {
  return (
    <ErrorBoundary>
      <ReactRouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default RouterProvider;
