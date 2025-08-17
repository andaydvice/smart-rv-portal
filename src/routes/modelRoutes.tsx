
import React, { lazy, Suspense } from "react";
import { RouteObject, Navigate } from "react-router-dom";
import { RouteSkeleton } from "@/components/ui/skeletons";
import { RouteTransition } from "@/components/ui/transitions/RouteTransition";
import ErrorPage from "@/pages/ErrorPage";

// High-traffic routes - synchronous imports
import Models from "@/pages/Models";

// Model detail pages (lazy)
const CompactModel = lazy(() => import("@/pages/models/CompactModel"));
const LuxuryModel = lazy(() => import("@/pages/models/LuxuryModel"));
const AdventureModel = lazy(() => import("@/pages/models/AdventureModel"));
const CompareModels = lazy(() => import("@/pages/models/CompareModels"));

export const modelRoutes: RouteObject[] = [
  {
    path: "/models",
    element: (
      <RouteTransition>
        <Models />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compact",
    element: (
      <Suspense fallback={<RouteSkeleton type="models" />}>
        <RouteTransition>
          <CompactModel />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compact-model",
    element: <Navigate to="/models/compact" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/luxury",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <LuxuryModel />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/luxury-model",
    element: <Navigate to="/models/luxury" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/luxury-class",
    element: <Navigate to="/models/luxury" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/adventure",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <AdventureModel />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/adventure-model",
    element: <Navigate to="/models/adventure" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compare",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <CompareModels />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compare-models",
    element: <Navigate to="/models/compare" replace />,
    errorElement: <ErrorPage />,
  }
];

export default modelRoutes;
