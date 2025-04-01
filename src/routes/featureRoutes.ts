
import React from "react";
import { RouteObject } from "react-router-dom";
import ErrorDisplay from "../components/error/ErrorDisplay";

import Features from "../pages/Features";
import AudioSystem from "../pages/features/AudioSystem";
import SmartTV from "../pages/features/SmartTV";
import SmartKitchen from "../pages/features/SmartKitchen";
import PowerManagement from "../pages/features/PowerManagement";
import InternetConnectivity from "../pages/features/InternetConnectivity";
import NavigationSystem from "../pages/features/NavigationSystem";
import SecuritySystem from "../pages/features/SecuritySystem";
import AutomatedDriving from "../pages/features/AutomatedDriving";
import SmartAutomation from "../pages/features/SmartAutomation";
import Entertainment from "../pages/features/Entertainment";
import WaterSystems from "../pages/features/WaterSystems";

export const featureRoutes: RouteObject[] = [
  {
    path: "/features",
    element: <Features />,
    errorElement: <ErrorDisplay error={{message: "Features page not found", statusCode: 404}} />
  },
  {
    path: "/features/audio-system",
    element: <AudioSystem />,
    errorElement: <ErrorDisplay error={{message: "Audio System page not found", statusCode: 404}} />
  },
  {
    path: "/features/smart-tv",
    element: <SmartTV />,
    errorElement: <ErrorDisplay error={{message: "Smart TV page not found", statusCode: 404}} />
  },
  {
    path: "/features/smart-kitchen",
    element: <SmartKitchen />,
    errorElement: <ErrorDisplay error={{message: "Smart Kitchen page not found", statusCode: 404}} />
  },
  {
    path: "/features/power-management",
    element: <PowerManagement />,
    errorElement: <ErrorDisplay error={{message: "Power Management page not found", statusCode: 404}} />
  },
  {
    path: "/features/internet-connectivity",
    element: <InternetConnectivity />,
    errorElement: <ErrorDisplay error={{message: "Internet Connectivity page not found", statusCode: 404}} />
  },
  {
    path: "/features/navigation-system",
    element: <NavigationSystem />,
    errorElement: <ErrorDisplay error={{message: "Navigation System page not found", statusCode: 404}} />
  },
  {
    path: "/features/security-system",
    element: <SecuritySystem />,
    errorElement: <ErrorDisplay error={{message: "Security System page not found", statusCode: 404}} />
  },
  {
    path: "/features/automated-driving",
    element: <AutomatedDriving />,
    errorElement: <ErrorDisplay error={{message: "Automated Driving page not found", statusCode: 404}} />
  },
  {
    path: "/features/smart-automation",
    element: <SmartAutomation />,
    errorElement: <ErrorDisplay error={{message: "Smart Automation page not found", statusCode: 404}} />
  },
  {
    path: "/features/entertainment",
    element: <Entertainment />,
    errorElement: <ErrorDisplay error={{message: "Entertainment page not found", statusCode: 404}} />
  },
  {
    path: "/features/water-systems",
    element: <WaterSystems />,
    errorElement: <ErrorDisplay error={{message: "Water Systems page not found", statusCode: 404}} />
  }
];

export default featureRoutes;
