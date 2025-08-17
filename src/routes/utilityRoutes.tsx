
import React, { lazy, Suspense } from "react";
import { MinimalLoader } from "@/components/ui/MinimalLoader";
import { RouteTransition } from "@/components/ui/transitions/RouteTransition";

// High-traffic routes - synchronous imports
import Calculators from "../pages/Calculators";
import Contact from "../pages/Contact";

// Popular utility pages - synchronous for instant loading
import Documentation from "../pages/Documentation";
import WeatherDashboard from "../pages/WeatherDashboard";

// Less common routes - lazy loaded
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
      <RouteTransition>
        <Documentation />
      </RouteTransition>
    ),
  },
  {
    path: "/weather",
    element: (
      <RouteTransition>
        <WeatherDashboard />
      </RouteTransition>
    ),
  },
  {
    path: "/rv-weather",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVWeather />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/storage-facilities",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <StorageFacilities />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/storage-preparation-checklist",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <StoragePreparationChecklist />
        </RouteTransition>
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
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <Troubleshooting />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/voice-control",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <VoiceControl />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/account",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <AccountPage />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/rv-emergency-center",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVEmergencyCenter />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/solar-power-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <SolarPowerGuide />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/rv-apps-hub",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVAppsHub />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/admin/perf",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <PerformanceDashboard />
        </RouteTransition>
      </Suspense>
    ),
  },
];

export default utilityRoutes;
