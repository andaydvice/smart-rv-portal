
import React from "react";
import { RouteObject } from "react-router-dom";
import ErrorDisplay from "../components/error/ErrorDisplay";

import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Technology from "../pages/Technology";
import Contact from "../pages/Contact";
import Documentation from "../pages/Documentation";
import CompleteDocumentation from "../pages/documentation/CompleteDocumentation";

export const contentRoutes: RouteObject[] = [
  {
    path: "/technology",
    element: <Technology />,
    errorElement: <ErrorDisplay error={{message: "Technology page not found", statusCode: 404}} />
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorDisplay error={{message: "Contact page not found", statusCode: 404}} />
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <ErrorDisplay error={{message: "Blog page not found", statusCode: 404}} />
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
    errorElement: <ErrorDisplay error={{message: "Blog post not found", statusCode: 404}} />
  },
  {
    path: "/documentation",
    element: <Documentation />,
    errorElement: <ErrorDisplay error={{message: "Documentation page not found", statusCode: 404}} />
  },
  {
    path: "/documentation/complete",
    element: <CompleteDocumentation />,
    errorElement: <ErrorDisplay error={{message: "Complete Documentation page not found", statusCode: 404}} />
  }
];

export default contentRoutes;
