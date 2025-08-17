
import React, { lazy, Suspense } from "react";
import { RouteSkeleton } from "@/components/ui/skeletons";
import { RouteTransition } from "@/components/ui/transitions/RouteTransition";

// High-traffic routes - synchronous imports
import Calculators from "../pages/Calculators";
import Contact from "../pages/Contact";

// Less common routes - lazy loaded
const Documentation = lazy(() => import("../pages/Documentation"));
const WeatherDashboard = lazy(() => import("../pages/WeatherDashboard")); 
const StorageFacilities = lazy(() => import("../pages/StorageFacilities"));
const StoragePreparationChecklist = lazy(() => import("../pages/StoragePreparationChecklist"));
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
    element: (
      <RouteTransition>
        <Calculators />
      </RouteTransition>
    ),
  },
  {
    path: "/documentation",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <Documentation />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/weather",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <WeatherDashboard />
      </Suspense>
    ),
  },
  {
    path: "/rv-weather",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <RVWeather />
      </Suspense>
    ),
  },
  {
    path: "/storage-facilities",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <StorageFacilities />
      </Suspense>
    ),
  },
  {
    path: "/storage-preparation-checklist",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <StoragePreparationChecklist />
      </Suspense>
    ),
  },
  {
    path: "/contact",
    element: (
      <RouteTransition>
        <Contact />
      </RouteTransition>
    ),
  },
  {
    path: "/troubleshooting",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <Troubleshooting />
      </Suspense>
    ),
  },
  {
    path: "/voice-control",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <VoiceControl />
      </Suspense>
    ),
  },
  {
    path: "/account",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <AccountPage />
      </Suspense>
    ),
  },
  {
    path: "/rv-emergency-center",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <RVEmergencyCenter />
      </Suspense>
    ),
  },
  {
    path: "/solar-power-guide",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <SolarPowerGuide />
      </Suspense>
    ),
  },
  {
    path: "/rv-apps-hub",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <RVAppsHub />
      </Suspense>
    ),
  },
  {
    path: "/admin/perf",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <PerformanceDashboard />
      </Suspense>
    ),
  },
];

export default utilityRoutes;
