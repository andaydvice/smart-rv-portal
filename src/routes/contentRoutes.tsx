
import React, { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { MinimalLoader } from "@/components/ui/MinimalLoader";
import { RouteTransition } from "@/components/ui/transitions/RouteTransition";

// High-traffic routes - synchronous imports for faster loading
import About from "../pages/About";
import Products from "../pages/Products";
import Pricing from "../pages/Pricing";
import ErrorPage from "../pages/ErrorPage";
import Blog from "../pages/Blog";

// Less common routes - lazy loaded
const Technology = lazy(() => import("../pages/Technology"));
const Features = lazy(() => import("../pages/Features"));
const Documentation = lazy(() => import("../pages/Documentation"));
const CompleteDocumentation = lazy(() => import("../pages/documentation/CompleteDocumentation"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const RVComfortGuide = lazy(() => import("../pages/RVComfortGuide"));
const RVMarketplace = lazy(() => import("../pages/RVMarketplace"));
const RVTechnologyGuide = lazy(() => import("../pages/RVTechnologyGuide"));
const Tools = lazy(() => import("../pages/Tools"));
const ReadinessAssessment = lazy(() => import("../pages/tools/ReadinessAssessment"));

const contentRoutes: RouteObject[] = [
  {
    path: "/technology",
    element: (
      <Suspense fallback={<MinimalLoader />}>
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
      <RouteTransition>
        <Blog />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog/:slug",
    element: (
      <Suspense fallback={<MinimalLoader />}>
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
      <Suspense fallback={<MinimalLoader />}>
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
      <Suspense fallback={<MinimalLoader />}>
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
  {
    path: "/rv-comfort-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVComfortGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-marketplace",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVMarketplace />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-technology-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVTechnologyGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tools",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <Tools />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tools/readiness-assessment",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <ReadinessAssessment />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
];

export default contentRoutes;
