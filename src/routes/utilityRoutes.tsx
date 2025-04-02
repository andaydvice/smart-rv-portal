
import React from "react";
import { RouteObject } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";

// Utility pages
import Calculators from "@/pages/Calculators";
import VoiceControl from "@/pages/VoiceControl";
import Troubleshooting from "@/pages/Troubleshooting";
import WeatherDashboard from "@/pages/WeatherDashboard";
import RVWeather from "@/pages/RVWeather";
import StoragePreparationChecklist from "@/pages/StoragePreparationChecklist";
import StorageFacilities from "@/pages/StorageFacilities";
import MapIconDemo from "@/pages/MapIconDemo";
import ScheduleDemo from "@/pages/ScheduleDemo";
import MapFacilityDemo from "@/pages/MapFacilityDemo";

export const utilityRoutes: RouteObject[] = [
  {
    path: "/calculators",
    element: <Calculators />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/voice-control",
    element: <VoiceControl />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/troubleshooting",
    element: <Troubleshooting />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/weather-dashboard",
    element: <WeatherDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-weather",
    element: <RVWeather />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/storage-checklist",
    element: <StoragePreparationChecklist />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/map-icon-demo",
    element: <MapIconDemo />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/schedule-demo",
    element: <ScheduleDemo />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/facility-map-demo",
    element: <MapFacilityDemo />,
    errorElement: <ErrorPage />,
  }
];

export default utilityRoutes;
