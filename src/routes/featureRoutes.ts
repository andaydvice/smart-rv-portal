
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
    element: React.createElement(Features),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Features page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/audio-system",
    element: React.createElement(AudioSystem),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Audio System page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/smart-tv",
    element: React.createElement(SmartTV),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Smart TV page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/smart-kitchen",
    element: React.createElement(SmartKitchen),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Smart Kitchen page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/power-management",
    element: React.createElement(PowerManagement),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Power Management page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/internet-connectivity",
    element: React.createElement(InternetConnectivity),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Internet Connectivity page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/navigation-system",
    element: React.createElement(NavigationSystem),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Navigation System page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/security-system",
    element: React.createElement(SecuritySystem),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Security System page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/automated-driving",
    element: React.createElement(AutomatedDriving),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Automated Driving page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/smart-automation",
    element: React.createElement(SmartAutomation),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Smart Automation page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/entertainment",
    element: React.createElement(Entertainment),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Entertainment page not found", statusCode: 404} 
    })
  },
  {
    path: "/features/water-systems",
    element: React.createElement(WaterSystems),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Water Systems page not found", statusCode: 404} 
    })
  }
];

export default featureRoutes;
