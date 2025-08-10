
import React from "react";
import { RouteObject } from "react-router-dom";

import Technology from "../pages/Technology";
import ErrorPage from "../pages/ErrorPage";
import Blog from "../pages/Blog";
import Features from "../pages/Features";
import Documentation from "../pages/Documentation";
import CompleteDocumentation from "../pages/documentation/CompleteDocumentation";
import BlogPost from "../pages/BlogPost";
import About from "../pages/About"; // MODIFIED: Added About page import
import Products from "../pages/Products"; // MODIFIED: Added Products page import
import Pricing from "../pages/Pricing"; // MODIFIED: Added Pricing page import

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
  { // MODIFIED: Added About page route
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  { // MODIFIED: Added Products page route
    path: "/products", 
    element: <Products />,
    errorElement: <ErrorPage />,
  },
  { // MODIFIED: Added Pricing page route
    path: "/pricing",
    element: <Pricing />,
    errorElement: <ErrorPage />,
  },
];

export default contentRoutes;
