import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import ErrorBoundary from "../error/ErrorBoundary";
import ErrorPage from "@/pages/ErrorPage";

// Create router immediately - no async needed
const router = createBrowserRouter(
  routes.map(route => ({
    ...route,
    errorElement: route.errorElement || <ErrorPage />
  }))
);

const RouterProvider = () => {
  return (
    <ErrorBoundary>
      <ReactRouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default RouterProvider;