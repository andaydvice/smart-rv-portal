
import React from "react";
import { RouteObject, Navigate } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";

// Feature pages
import Features from "@/pages/Features";
import AudioSystem from "@/pages/features/AudioSystem";
import SmartTV from "@/pages/features/SmartTV";
import SmartKitchen from "@/pages/features/SmartKitchen";
import PowerManagement from "@/pages/features/PowerManagement";
import InternetConnectivity from "@/pages/features/InternetConnectivity";
import NavigationSystem from "@/pages/features/NavigationSystem";
import SecuritySystem from "@/pages/features/SecuritySystem";
import AutomatedDriving from "@/pages/features/AutomatedDriving";
import WaterSystems from "@/pages/features/WaterSystems";
import SmartAutomation from "@/pages/features/SmartAutomation";
import ClimateControl from "@/pages/features/ClimateControl";
import Entertainment from "@/pages/features/Entertainment";
import RemoteControl from "@/pages/features/RemoteControl";

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
