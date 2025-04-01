
import React from "react";
import { RouteObject } from "react-router-dom";

import modelRoutes from "./modelRoutes";
import featureRoutes from "./featureRoutes";
import contentRoutes from "./contentRoutes";
import utilityRoutes from "./utilityRoutes";
import demoRoutes from "./demoRoutes";
import Index from "../pages/Index";
import ErrorDisplay from "../components/error/ErrorDisplay";

// Home route and fallback routes
const coreRoutes: RouteObject[] = [
  {
    path: "/",
    element: React.createElement(Index),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Page not found", statusCode: 404} 
    })
  },
  // Catch-all route for 404s
  {
    path: "*",
    element: React.createElement(ErrorDisplay, { 
      error: {message: "Page not found", statusCode: 404} 
    })
  }
];

// Combine all route categories
export const routes: RouteObject[] = [
  ...coreRoutes,
  ...modelRoutes,
  ...featureRoutes,
  ...contentRoutes,
  ...utilityRoutes,
  ...demoRoutes
];

// For backward compatibility
export default routes;
