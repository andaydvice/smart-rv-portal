
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
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <Index />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <SearchResults />
      </Suspense>
    ),
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
