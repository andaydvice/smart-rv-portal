import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Models from "./pages/Models";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";
import ScheduleDemo from "./pages/ScheduleDemo";
import Troubleshooting from "./pages/Troubleshooting";
import Documentation from "./pages/Documentation";
import CompleteDocumentation from "./pages/documentation/CompleteDocumentation";
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

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <div className="flex-grow">{children}</div>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/features" element={<Layout><Features /></Layout>} />
            <Route path="/features/navigation" element={<Layout><NavigationSystem /></Layout>} />
            <Route path="/features/security" element={<Layout><SecuritySystem /></Layout>} />
            <Route path="/features/power" element={<Layout><PowerManagement /></Layout>} />
            <Route path="/features/tv" element={<Layout><SmartTV /></Layout>} />
            <Route path="/features/audio" element={<Layout><AudioSystem /></Layout>} />
            <Route path="/features/internet" element={<Layout><InternetConnectivity /></Layout>} />
            <Route path="/features/smart-kitchen" element={<Layout><SmartKitchen /></Layout>} />
            <Route path="/features/automated-driving" element={<Layout><AutomatedDriving /></Layout>} />
            <Route path="/models" element={<Layout><Models /></Layout>} />
            <Route path="/models/luxury" element={<Layout><LuxuryModel /></Layout>} />
            <Route path="/models/adventure" element={<Layout><AdventureModel /></Layout>} />
            <Route path="/models/compact" element={<Layout><CompactModel /></Layout>} />
            <Route path="/models/compare" element={<Layout><CompareModels /></Layout>} />
            <Route path="/technology" element={<Layout><Technology /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/schedule-demo" element={<Layout><ScheduleDemo /></Layout>} />
            <Route path="/troubleshooting" element={<Layout><Troubleshooting /></Layout>} />
            <Route path="/documentation" element={<Layout><Documentation /></Layout>} />
            <Route path="/documentation/complete" element={<Layout><CompleteDocumentation /></Layout>} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;