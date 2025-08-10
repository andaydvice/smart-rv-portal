
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
    element: <Models />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compact",
    element: <CompactModel />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compact-model",
    element: <Navigate to="/models/compact" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/luxury",
    element: <LuxuryModel />,
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
    element: <AdventureModel />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/adventure-model",
    element: <Navigate to="/models/adventure" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compare",
    element: <CompareModels />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compare-models",
    element: <Navigate to="/models/compare" replace />,
    errorElement: <ErrorPage />,
  }
];

export default modelRoutes;
