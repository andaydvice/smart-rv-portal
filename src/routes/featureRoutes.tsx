
import React, { lazy, Suspense } from "react";
import { RouteObject, Navigate } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";

// Feature pages (lazy)
const Features = lazy(() => import("@/pages/Features"));
const AudioSystem = lazy(() => import("@/pages/features/AudioSystem"));
const SmartTV = lazy(() => import("@/pages/features/SmartTV"));
const SmartKitchen = lazy(() => import("@/pages/features/SmartKitchen"));
const PowerManagement = lazy(() => import("@/pages/features/PowerManagement"));
const InternetConnectivity = lazy(() => import("@/pages/features/InternetConnectivity"));
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
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <Features />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  // Feature pages
  {
    path: "/features/audio-system",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <AudioSystem />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-tv",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <SmartTV />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-kitchen",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <SmartKitchen />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/power-management",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <PowerManagement />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/internet-connectivity",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <InternetConnectivity />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/navigation-system",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <NavigationSystem />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/security-system",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <SecuritySystem />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/automated-driving",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <AutomatedDriving />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/water-systems",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <WaterSystems />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-automation",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <SmartAutomation />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/climate-control",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <ClimateControl />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/entertainment",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <Entertainment />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/remote-control",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-deeper-background flex items-center justify-center"><div className="animate-pulse h-64 w-full max-w-6xl bg-gray-200/10 rounded"></div></div>}>
        <RemoteControl />
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
