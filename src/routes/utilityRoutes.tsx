
import React from "react";
import { RouteObject } from "react-router-dom";

// Import utility pages
import Auth from "../pages/Auth";
import Calculators from "../pages/Calculators";
import Contact from "../pages/Contact";
import WeatherDashboard from "../pages/WeatherDashboard";
import ScheduleDemo from "../pages/ScheduleDemo";
import StorageFacilities from "../pages/StorageFacilities";
import StoragePreparationChecklist from "../pages/StoragePreparationChecklist";
import VoiceControl from "../pages/VoiceControl";
import Documentation from "../pages/Documentation";
import Troubleshooting from "../pages/Troubleshooting";
import ErrorPage from "../pages/ErrorPage";

// Define utility routes
const utilityRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/calculators",
    element: <Calculators />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/weather",
    element: <WeatherDashboard />,
  },
  {
    path: "/schedule-demo",
    element: <ScheduleDemo />,
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />,
  },
  {
    path: "/storage-preparation-checklist",
    element: <StoragePreparationChecklist />,
  },
  {
    path: "/voice-control",
    element: <VoiceControl />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
  },
  {
    path: "/troubleshooting",
    element: <Troubleshooting />,
  },
];

export default utilityRoutes;
