
import React, { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Technology = lazy(() => import("../pages/Technology"));
import ErrorPage from "../pages/ErrorPage";
const Blog = lazy(() => import("../pages/Blog"));
const Features = lazy(() => import("../pages/Features"));
const Documentation = lazy(() => import("../pages/Documentation"));
const CompleteDocumentation = lazy(() => import("../pages/documentation/CompleteDocumentation"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const About = lazy(() => import("../pages/About")); // MODIFIED: Added About page import
const Products = lazy(() => import("../pages/Products")); // MODIFIED: Added Products page import
const Pricing = lazy(() => import("../pages/Pricing")); // MODIFIED: Added Pricing page import

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
