
import React from "react";
import { RouteObject, Navigate } from "react-router-dom";

// Import content pages
import BlogIndex from "../pages/BlogIndex";
import BlogPost from "../pages/BlogPost";
import RVWeather from "../pages/RVWeather";
import Technology from "../pages/Technology";

// Define content routes
const contentRoutes: RouteObject[] = [
  {
    path: "/blog",
    element: <BlogIndex />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
  },
  {
    path: "/rv-weather",
    element: <RVWeather />,
  },
  {
    path: "/technology",
    element: <Technology />,
  },
  // Redirects for old blog post URLs
  {
    path: "/blog/solar-power-solutions-for-full-time-rvers",
    element: <Navigate to="/blog/solar-power-solutions" replace />,
  },
];

export default contentRoutes;
