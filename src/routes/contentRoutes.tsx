
import React from "react";
import { RouteObject } from "react-router-dom";

// Import content pages
import BlogIndex from "../pages/BlogIndex";
import BlogPost from "../pages/BlogPost";
import RVWeather from "../pages/RVWeather";

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
];

export default contentRoutes;
