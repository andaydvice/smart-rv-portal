
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
    element: React.createElement(Models),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Models page not found", statusCode: 404} 
    })
  },
  {
    path: "/models/compact",
    element: React.createElement(CompactModel),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Compact Model page not found", statusCode: 404} 
    })
  },
  {
    path: "/models/compact-model",
    element: React.createElement(CompactModel),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Compact Model page not found", statusCode: 404} 
    })
  },
  {
    path: "/models/luxury",
    element: React.createElement(LuxuryModel),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Luxury Model page not found", statusCode: 404} 
    })
  },
  {
    path: "/models/adventure",
    element: React.createElement(AdventureModel),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Adventure Model page not found", statusCode: 404} 
    })
  },
  {
    path: "/models/compare",
    element: React.createElement(CompareModels),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Compare Models page not found", statusCode: 404} 
    })
  },
  {
    path: "/models/compare-models",
    element: React.createElement(CompareModels),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Compare Models page not found", statusCode: 404} 
    })
  },
  {
    path: "/compare-models",
    element: React.createElement(CompareModels),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Compare Models page not found", statusCode: 404} 
    })
  }
];

export default modelRoutes;
