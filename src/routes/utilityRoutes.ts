
import { RouteObject } from "react-router-dom";
import ErrorDisplay from "../components/error/ErrorDisplay";

import Auth from "../pages/Auth";
import Calculators from "../pages/Calculators";
import VoiceControl from "../pages/VoiceControl";
import Troubleshooting from "../pages/Troubleshooting";
import RVWeather from "../pages/RVWeather";
import StoragePreparationChecklist from "../pages/StoragePreparationChecklist";
import StorageFacilities from "../pages/StorageFacilities";

export const utilityRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: React.createElement(Auth),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Authentication page not found", statusCode: 404} 
    })
  },
  {
    path: "/calculators",
    element: React.createElement(Calculators),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Calculators page not found", statusCode: 404} 
    })
  },
  {
    path: "/voice-control",
    element: React.createElement(VoiceControl),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Voice Control page not found", statusCode: 404} 
    })
  },
  {
    path: "/troubleshooting",
    element: React.createElement(Troubleshooting),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Troubleshooting page not found", statusCode: 404} 
    })
  },
  {
    path: "/rv-weather",
    element: React.createElement(RVWeather),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "RV Weather page not found", statusCode: 404} 
    })
  },
  {
    path: "/storage-preparation-checklist",
    element: React.createElement(StoragePreparationChecklist),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Storage Preparation Checklist page not found", statusCode: 404} 
    })
  },
  {
    path: "/storage-checklist",
    element: React.createElement(StoragePreparationChecklist),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Storage Checklist page not found", statusCode: 404} 
    })
  },
  {
    path: "/storage-facilities",
    element: React.createElement(StorageFacilities),
    errorElement: React.createElement(ErrorDisplay, { 
      error: {message: "Storage Facilities page not found", statusCode: 404} 
    })
  }
];

export default utilityRoutes;
