
import React, { lazy, Suspense } from "react";
import { RouteObject, Navigate } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";

// Model pages (lazy)
const Models = lazy(() => import("@/pages/Models"));
const CompactModel = lazy(() => import("@/pages/models/CompactModel"));
const LuxuryModel = lazy(() => import("@/pages/models/LuxuryModel"));
const AdventureModel = lazy(() => import("@/pages/models/AdventureModel"));
const CompareModels = lazy(() => import("@/pages/models/CompareModels"));

export const modelRoutes: RouteObject[] = [
  {
    path: "/models",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <Models />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compact",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <CompactModel />
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
