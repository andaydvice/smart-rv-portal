
import React from "react";
import { RouteObject } from "react-router-dom";
import ErrorDisplay from "../components/error/ErrorDisplay";

import Auth from "../pages/Auth";
import Calculators from "../pages/Calculators";
import VoiceControl from "../pages/VoiceControl";
import Troubleshooting from "../pages/Troubleshooting";
import RVWeather from "../pages/RVWeather";
import StoragePreparationChecklist from "../pages/StoragePreparationChecklist";
import StorageFacilities from "../pages/StorageFacilities";

export const utilityRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorDisplay error={{message: "Authentication page not found", statusCode: 404}} />
  },
  {
    path: "/calculators",
    element: <Calculators />,
    errorElement: <ErrorDisplay error={{message: "Calculators page not found", statusCode: 404}} />
  },
  {
    path: "/voice-control",
    element: <VoiceControl />,
    errorElement: <ErrorDisplay error={{message: "Voice Control page not found", statusCode: 404}} />
  },
  {
    path: "/troubleshooting",
    element: <Troubleshooting />,
    errorElement: <ErrorDisplay error={{message: "Troubleshooting page not found", statusCode: 404}} />
  },
  {
    path: "/rv-weather",
    element: <RVWeather />,
    errorElement: <ErrorDisplay error={{message: "RV Weather page not found", statusCode: 404}} />
  },
  {
    path: "/storage-preparation-checklist",
    element: <StoragePreparationChecklist />,
    errorElement: <ErrorDisplay error={{message: "Storage Preparation Checklist page not found", statusCode: 404}} />
  },
  {
    path: "/storage-checklist",
    element: <StoragePreparationChecklist />,
    errorElement: <ErrorDisplay error={{message: "Storage Checklist page not found", statusCode: 404}} />
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />,
    errorElement: <ErrorDisplay error={{message: "Storage Facilities page not found", statusCode: 404}} />
  }
];

export default utilityRoutes;
