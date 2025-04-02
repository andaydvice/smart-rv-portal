
import React from "react";
import { RouteObject } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";

// Model pages
import Models from "@/pages/Models";
import CompactModel from "@/pages/models/CompactModel";
import LuxuryModel from "@/pages/models/LuxuryModel";
import AdventureModel from "@/pages/models/AdventureModel";
import CompareModels from "@/pages/models/CompareModels";

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
    path: "/models/luxury",
    element: <LuxuryModel />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/adventure",
    element: <AdventureModel />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compare",
    element: <CompareModels />,
    errorElement: <ErrorPage />,
  }
];

export default modelRoutes;
