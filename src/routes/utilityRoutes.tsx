
import React, { lazy, Suspense } from "react";
import { RouteSkeleton } from "@/components/ui/skeletons";
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
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <RVWeather />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/storage-facilities",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <StorageFacilities />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/storage-preparation-checklist",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
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
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <Troubleshooting />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/voice-control",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <VoiceControl />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/account",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <AccountPage />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/rv-emergency-center",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <RVEmergencyCenter />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/solar-power-guide",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <SolarPowerGuide />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/rv-apps-hub",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <RVAppsHub />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/admin/perf",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <PerformanceDashboard />
        </RouteTransition>
      </Suspense>
    ),
  },
];

export default utilityRoutes;
