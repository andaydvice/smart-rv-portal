
import React, { lazy, Suspense } from "react";
import { RouteObject, Navigate } from "react-router-dom";
import { MinimalLoader } from "@/components/ui/MinimalLoader";
import { RouteTransition } from "@/components/ui/transitions/RouteTransition";
import ErrorPage from "@/pages/ErrorPage";

// High-traffic routes - synchronous imports
import Models from "@/pages/Models";

// Popular model pages - synchronous for instant loading
import CompactModel from "@/pages/models/CompactModel";
import LuxuryModel from "@/pages/models/LuxuryModel";
import AdventureModel from "@/pages/models/AdventureModel";

// Less popular model pages (lazy)
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
      <RouteTransition>
        <CompactModel />
      </RouteTransition>
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
      <RouteTransition>
        <LuxuryModel />
      </RouteTransition>
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
      <RouteTransition>
        <AdventureModel />
      </RouteTransition>
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
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <CompareModels />
        </RouteTransition>
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
