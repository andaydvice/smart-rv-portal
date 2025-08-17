
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
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <Technology />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <Blog />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog/:slug",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <BlogPost />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/documentation",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <Documentation />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/documentation/complete",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <CompleteDocumentation />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  { // MODIFIED: Added About page route
    path: "/about",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <About />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  { // MODIFIED: Added Products page route
    path: "/products", 
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <Products />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  { // MODIFIED: Added Pricing page route
    path: "/pricing",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <Pricing />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
];

export default contentRoutes;
