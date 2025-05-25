
import React from "react";
import { RouteObject } from "react-router-dom";

import Technology from "../pages/Technology";
import ErrorPage from "../pages/ErrorPage";
import Blog from "../pages/Blog";
import Features from "../pages/Features";
import Documentation from "../pages/Documentation";
import CompleteDocumentation from "../pages/documentation/CompleteDocumentation";
import BlogPost from "../pages/BlogPost"; // MODIFIED: Import BlogPost component

// Note: Only importing pages that actually exist in the project
const contentRoutes: RouteObject[] = [
  {
    path: "/technology",
    element: <Technology />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <ErrorPage />,
  },
  { // MODIFIED: Added route for individual blog posts
    path: "/blog/:slug",
    element: <BlogPost />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features",
    element: <Features />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/documentation/complete",
    element: <CompleteDocumentation />,
    errorElement: <ErrorPage />,
  },
];

export default contentRoutes;
