import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Models from "./pages/Models";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";
import NavigationSystem from "./pages/features/NavigationSystem";
import SecuritySystem from "./pages/features/SecuritySystem";
import PowerManagement from "./pages/features/PowerManagement";
import SmartTV from "./pages/features/SmartTV";
import AudioSystem from "./pages/features/AudioSystem";
import InternetConnectivity from "./pages/features/InternetConnectivity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/navigation" element={<NavigationSystem />} />
          <Route path="/features/security" element={<SecuritySystem />} />
          <Route path="/features/power" element={<PowerManagement />} />
          <Route path="/features/tv" element={<SmartTV />} />
          <Route path="/features/audio" element={<AudioSystem />} />
          <Route path="/features/internet" element={<InternetConnectivity />} />
          <Route path="/models" element={<Models />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;