
import React from "react";
import { RouteObject } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";

// Content pages
import Technology from "@/pages/Technology";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Documentation from "@/pages/Documentation";
import Auth from "@/pages/Auth";
import CompleteDocumentation from "@/pages/documentation/CompleteDocumentation";

export const contentRoutes: RouteObject[] = [
  {
    path: "/technology",
    element: <Technology />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
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
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
  }
];

export default contentRoutes;
