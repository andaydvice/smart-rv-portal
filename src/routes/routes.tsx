
import React, { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Import root page (lazy)
const Index = lazy(() => import("../pages/Index"));
import ErrorPage from "../pages/ErrorPage";
const SearchResults = lazy(() => import("../pages/SearchResults"));

// Import route groups
import featureRoutes from "./featureRoutes";
import modelRoutes from "./modelRoutes";
import utilityRoutes from "./utilityRoutes";
import contentRoutes from "./contentRoutes";

// Define routes
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <SearchResults />,
    errorElement: <ErrorPage />,
  },
  ...modelRoutes,
  ...featureRoutes,
  ...contentRoutes,
  ...utilityRoutes,
  // Add a catch-all route for 404 pages
  {
    path: "*",
    element: <ErrorPage />,
  }
];

// For backward compatibility
export default routes;
