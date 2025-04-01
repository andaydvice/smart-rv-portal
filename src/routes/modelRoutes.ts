
import React from "react";
import { RouteObject } from "react-router-dom";
import ErrorDisplay from "../components/error/ErrorDisplay";

import Models from "../pages/Models";
import CompactModel from "../pages/models/CompactModel";
import LuxuryModel from "../pages/models/LuxuryModel";
import AdventureModel from "../pages/models/AdventureModel";
import CompareModels from "../pages/models/CompareModels";

export const modelRoutes: RouteObject[] = [
  {
    path: "/models",
    element: <Models />,
    errorElement: <ErrorDisplay error={{message: "Models page not found", statusCode: 404}} />
  },
  {
    path: "/models/compact",
    element: <CompactModel />,
    errorElement: <ErrorDisplay error={{message: "Compact Model page not found", statusCode: 404}} />
  },
  {
    path: "/models/compact-model",
    element: <CompactModel />,
    errorElement: <ErrorDisplay error={{message: "Compact Model page not found", statusCode: 404}} />
  },
  {
    path: "/models/luxury",
    element: <LuxuryModel />,
    errorElement: <ErrorDisplay error={{message: "Luxury Model page not found", statusCode: 404}} />
  },
  {
    path: "/models/adventure",
    element: <AdventureModel />,
    errorElement: <ErrorDisplay error={{message: "Adventure Model page not found", statusCode: 404}} />
  },
  {
    path: "/models/compare",
    element: <CompareModels />,
    errorElement: <ErrorDisplay error={{message: "Compare Models page not found", statusCode: 404}} />
  },
  {
    path: "/models/compare-models",
    element: <CompareModels />,
    errorElement: <ErrorDisplay error={{message: "Compare Models page not found", statusCode: 404}} />
  },
  {
    path: "/compare-models",
    element: <CompareModels />,
    errorElement: <ErrorDisplay error={{message: "Compare Models page not found", statusCode: 404}} />
  }
];

export default modelRoutes;
