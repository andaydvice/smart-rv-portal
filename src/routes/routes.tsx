
import React from "react";
import { RouteObject } from "react-router-dom";

// Import root page
import Index from "../pages/Index";
import ErrorPage from "../pages/ErrorPage";

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
