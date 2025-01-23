import { RouteObject } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import Features from "@/pages/Features";
import Models from "@/pages/Models";
import Technology from "@/pages/Technology";
import Contact from "@/pages/Contact";
import ScheduleDemo from "@/pages/ScheduleDemo";
import Troubleshooting from "@/pages/Troubleshooting";
import Documentation from "@/pages/Documentation";
import Calculators from "@/pages/Calculators";
import VoiceControl from "@/pages/VoiceControl";
import CompleteDocumentation from "@/pages/documentation/CompleteDocumentation";
import NavigationSystem from "@/pages/features/NavigationSystem";
import SecuritySystem from "@/pages/features/SecuritySystem";
import PowerManagement from "@/pages/features/PowerManagement";
import SmartTV from "@/pages/features/SmartTV";
import AudioSystem from "@/pages/features/AudioSystem";
import InternetConnectivity from "@/pages/features/InternetConnectivity";
import SmartKitchen from "@/pages/features/SmartKitchen";
import AutomatedDriving from "@/pages/features/AutomatedDriving";
import LuxuryModel from "@/pages/models/LuxuryModel";
import AdventureModel from "@/pages/models/AdventureModel";
import CompactModel from "@/pages/models/CompactModel";
import CompareModels from "@/pages/models/CompareModels";

export const routes: RouteObject[] = [
  { 
    path: "/", 
    element: <Layout><Index /></Layout> 
  },
  { 
    path: "/features", 
    element: <Layout><Features /></Layout> 
  },
  { 
    path: "/voice-control", 
    element: <VoiceControl /> 
  },
  { 
    path: "/features/navigation", 
    element: <Layout><NavigationSystem /></Layout> 
  },
  { 
    path: "/features/security", 
    element: <Layout><SecuritySystem /></Layout> 
  },
  { 
    path: "/features/power", 
    element: <Layout><PowerManagement /></Layout> 
  },
  { 
    path: "/features/tv", 
    element: <Layout><SmartTV /></Layout> 
  },
  { 
    path: "/features/audio", 
    element: <Layout><AudioSystem /></Layout> 
  },
  { 
    path: "/features/internet", 
    element: <Layout><InternetConnectivity /></Layout> 
  },
  { 
    path: "/features/smart-kitchen", 
    element: <Layout><SmartKitchen /></Layout> 
  },
  { 
    path: "/features/automated-driving", 
    element: <Layout><AutomatedDriving /></Layout> 
  },
  { 
    path: "/models", 
    element: <Layout><Models /></Layout> 
  },
  { 
    path: "/models/luxury", 
    element: <Layout><LuxuryModel /></Layout> 
  },
  { 
    path: "/models/adventure", 
    element: <Layout><AdventureModel /></Layout> 
  },
  { 
    path: "/models/compact", 
    element: <Layout><CompactModel /></Layout> 
  },
  { 
    path: "/models/compare", 
    element: <Layout><CompareModels /></Layout> 
  },
  { 
    path: "/technology", 
    element: <Layout><Technology /></Layout> 
  },
  { 
    path: "/contact", 
    element: <Layout><Contact /></Layout> 
  },
  { 
    path: "/schedule-demo", 
    element: <Layout><ScheduleDemo /></Layout> 
  },
  { 
    path: "/troubleshooting", 
    element: <Layout><Troubleshooting /></Layout> 
  },
  { 
    path: "/documentation", 
    element: <Layout><Documentation /></Layout> 
  },
  { 
    path: "/documentation/complete", 
    element: <Layout><CompleteDocumentation /></Layout> 
  },
  { 
    path: "/calculators", 
    element: <Layout><Calculators /></Layout> 
  },
];