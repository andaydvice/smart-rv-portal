
import React, { lazy, Suspense } from "react";

const Calculators = lazy(() => import("../pages/Calculators"));
const Documentation = lazy(() => import("../pages/Documentation"));
const WeatherDashboard = lazy(() => import("../pages/WeatherDashboard")); 
const StorageFacilities = lazy(() => import("../pages/StorageFacilities"));
const StoragePreparationChecklist = lazy(() => import("../pages/StoragePreparationChecklist"));
const Contact = lazy(() => import("../pages/Contact"));
const Troubleshooting = lazy(() => import("../pages/Troubleshooting"));

const VoiceControl = lazy(() => import("../pages/VoiceControl"));
const AccountPage = lazy(() => import("@/pages/Account"));
const RVWeather = lazy(() => import("../pages/RVWeather"));
const RVEmergencyCenter = lazy(() => import("../pages/RVEmergencyCenter"));
const SolarPowerGuide = lazy(() => import("../pages/SolarPowerGuide"));
const RVAppsHub = lazy(() => import("../pages/RVAppsHub"));
const PerformanceDashboard = lazy(() => import("../pages/admin/PerformanceDashboard"));

const utilityRoutes = [
  {
    path: "/calculators",
    element: <Calculators />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
  },
  {
    path: "/weather",
    element: <WeatherDashboard />,
  },
  {
    path: "/rv-weather",
    element: <RVWeather />,
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
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/troubleshooting",
    element: <Troubleshooting />,
  },
  {
    path: "/voice-control",
    element: <VoiceControl />,
  },
  {
    path: "/account",
    element: <AccountPage />,
  },
  {
    path: "/rv-emergency-center",
    element: <RVEmergencyCenter />,
  },
  {
    path: "/solar-power-guide",
    element: <SolarPowerGuide />,
  },
  {
    path: "/rv-apps-hub",
    element: <RVAppsHub />,
  },
  {
    path: "/admin/perf",
    element: <PerformanceDashboard />,
  },
];

export default utilityRoutes;
