
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
    element: <Features />,
    errorElement: <ErrorPage />,
  },
  // Feature pages
  {
    path: "/features/audio-system",
    element: <AudioSystem />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-tv",
    element: <SmartTV />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-kitchen",
    element: <SmartKitchen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/power-management",
    element: <PowerManagement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/internet-connectivity",
    element: <InternetConnectivity />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/navigation-system",
    element: <NavigationSystem />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/security-system",
    element: <SecuritySystem />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/automated-driving",
    element: <AutomatedDriving />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/water-systems",
    element: <WaterSystems />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-automation",
    element: <SmartAutomation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/climate-control",
    element: <ClimateControl />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/entertainment",
    element: <Entertainment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/remote-control",
    element: <RemoteControl />,
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
