import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Models from "./pages/Models";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";
import ScheduleDemo from "./pages/ScheduleDemo";
import NavigationSystem from "./pages/features/NavigationSystem";
import SecuritySystem from "./pages/features/SecuritySystem";
import PowerManagement from "./pages/features/PowerManagement";
import SmartTV from "./pages/features/SmartTV";
import AudioSystem from "./pages/features/AudioSystem";
import InternetConnectivity from "./pages/features/InternetConnectivity";
import SmartKitchen from "./pages/features/SmartKitchen";
import AutomatedDriving from "./pages/features/AutomatedDriving";
import LuxuryModel from "./pages/models/LuxuryModel";
import AdventureModel from "./pages/models/AdventureModel";
import CompactModel from "./pages/models/CompactModel";
import CompareModels from "./pages/models/CompareModels";

const queryClient = new QueryClient();

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <ScrollRestoration />
    <div className="flex-grow">
      <Outlet />
    </div>
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/features", element: <Features /> },
      { path: "/features/navigation", element: <NavigationSystem /> },
      { path: "/features/security", element: <SecuritySystem /> },
      { path: "/features/power", element: <PowerManagement /> },
      { path: "/features/tv", element: <SmartTV /> },
      { path: "/features/audio", element: <AudioSystem /> },
      { path: "/features/internet", element: <InternetConnectivity /> },
      { path: "/features/smart-kitchen", element: <SmartKitchen /> },
      { path: "/features/automated-driving", element: <AutomatedDriving /> },
      { path: "/models", element: <Models /> },
      { path: "/models/luxury", element: <LuxuryModel /> },
      { path: "/models/adventure", element: <AdventureModel /> },
      { path: "/models/compact", element: <CompactModel /> },
      { path: "/models/compare", element: <CompareModels /> },
      { path: "/technology", element: <Technology /> },
      { path: "/contact", element: <Contact /> },
      { path: "/schedule-demo", element: <ScheduleDemo /> },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;