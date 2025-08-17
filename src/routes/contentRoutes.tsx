
import React, { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { RouteSkeleton } from "@/components/ui/skeletons";
import { RouteTransition } from "@/components/ui/transitions/RouteTransition";

// High-traffic routes - synchronous imports for faster loading
import About from "../pages/About";
import Products from "../pages/Products";
import Pricing from "../pages/Pricing";
import ErrorPage from "../pages/ErrorPage";

// Less common routes - lazy loaded
const Technology = lazy(() => import("../pages/Technology"));
const Blog = lazy(() => import("../pages/Blog"));
const Features = lazy(() => import("../pages/Features"));
const Documentation = lazy(() => import("../pages/Documentation"));
const CompleteDocumentation = lazy(() => import("../pages/documentation/CompleteDocumentation"));
const BlogPost = lazy(() => import("../pages/BlogPost"));

const contentRoutes: RouteObject[] = [
  {
    path: "/technology",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <Technology />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <Blog />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog/:slug",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <BlogPost />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/documentation",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <Documentation />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/documentation/complete",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <CompleteDocumentation />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: (
      <RouteTransition>
        <About />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/products", 
    element: (
      <RouteTransition>
        <Products />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/pricing",
    element: (
      <RouteTransition>
        <Pricing />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
];

export default contentRoutes;
