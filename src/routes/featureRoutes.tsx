
import React, { lazy, Suspense } from "react";
import { RouteObject, Navigate } from "react-router-dom";
import { RouteSkeleton } from "@/components/ui/skeletons";
import { RouteTransition } from "@/components/ui/transitions/RouteTransition";
import ErrorPage from "@/pages/ErrorPage";

// High-traffic routes - synchronous imports
import Features from "@/pages/Features";

// Popular feature pages - synchronous for instant loading
import AudioSystem from "@/pages/features/AudioSystem";
import SmartTV from "@/pages/features/SmartTV";
import InternetConnectivity from "@/pages/features/InternetConnectivity";
import PowerManagement from "@/pages/features/PowerManagement";

// Less popular feature detail pages (lazy)
const SmartKitchen = lazy(() => import("@/pages/features/SmartKitchen"));
const NavigationSystem = lazy(() => import("@/pages/features/NavigationSystem"));
const SecuritySystem = lazy(() => import("@/pages/features/SecuritySystem"));
const AutomatedDriving = lazy(() => import("@/pages/features/AutomatedDriving"));
const WaterSystems = lazy(() => import("@/pages/features/WaterSystems"));
const SmartAutomation = lazy(() => import("@/pages/features/SmartAutomation"));
const ClimateControl = lazy(() => import("@/pages/features/ClimateControl"));
const Entertainment = lazy(() => import("@/pages/features/Entertainment"));
const RemoteControl = lazy(() => import("@/pages/features/RemoteControl"));

export const featureRoutes: RouteObject[] = [
  {
    path: "/features",
    element: (
      <RouteTransition>
        <Features />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  // Feature pages
  {
    path: "/features/audio-system",
    element: (
      <RouteTransition>
        <AudioSystem />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-tv",
    element: (
      <RouteTransition>
        <SmartTV />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-kitchen",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <SmartKitchen />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/power-management",
    element: (
      <RouteTransition>
        <PowerManagement />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/internet-connectivity",
    element: (
      <RouteTransition>
        <InternetConnectivity />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/navigation-system",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <NavigationSystem />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/security-system",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <SecuritySystem />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/automated-driving",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <AutomatedDriving />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/water-systems",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <WaterSystems />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-automation",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <SmartAutomation />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/climate-control",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <ClimateControl />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/entertainment",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <Entertainment />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/remote-control",
    element: (
      <Suspense fallback={<RouteSkeleton type="content" />}>
        <RouteTransition>
          <RemoteControl />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  // Category redirects
  {
    path: "/rv-intelligence",
    element: <Navigate to="/features" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-systems",
    element: <Navigate to="/features" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-tools",
    element: <Navigate to="/calculators" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/support",
    element: <Navigate to="/troubleshooting" replace />,
    errorElement: <ErrorPage />,
  }
];

export default featureRoutes;
