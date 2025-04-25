
import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { scrollToTop } from "@/utils/scrollToTop";
import HeroSection from "@/components/rv-weather/HeroSection";
import IntroSection from "@/components/rv-weather/IntroSection";
import PlanningSection from "@/components/rv-weather/PlanningSection";
import SeasonalTips from "@/components/rv-weather/SeasonalConsiderations";
import RegionalClimate from "@/components/rv-weather/RegionalClimate";
import WeatherMonitoring from "@/components/rv-weather/sections/MonitoringSection";
import WeatherAlerts from "@/components/rv-weather/sections/AlertsSection";
import PreparednessTips from "@/components/rv-weather/PreparednessTips";
import MaintenanceSection from "@/components/rv-weather/MaintenanceSection";
import HazardsSection from "@/components/rv-weather/sections/HazardsSection";
import "../styles/pages/rv-weather.css";

// Extend Window interface to include our custom property
declare global {
  interface Window {
    isRVWeatherPage?: boolean;
  }
}

const RVWeather = () => {
  // Use React.useEffect instead of useEffect directly
  React.useEffect(() => {
    scrollToTop();
    
    // Load custom fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Set a flag to prevent marker creation on this page
    window.isRVWeatherPage = true;
    
    // Remove any existing emergency markers
    const removeExistingMarkers = () => {
      document.querySelectorAll('.emergency-marker, .mapboxgl-marker').forEach(marker => {
        if (marker.parentNode) {
          marker.parentNode.removeChild(marker);
        }
      });
    };
    
    // Run once and then periodically to ensure no markers appear
    removeExistingMarkers();
    const cleanupInterval = setInterval(removeExistingMarkers, 1000);
    
    return () => {
      // Check if the link is still in the document before removing
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      
      // Remove the flag and stop the cleanup interval
      window.isRVWeatherPage = false;
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <Layout>
      <ScrollArea className="h-full rv-weather-page">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-deeper-background min-h-screen"
        >
          {/* Hero Section with "The Ultimate Weather Guide" heading */}
          <HeroSection />
          
          {/* Why Weather Matters Section */}
          <section id="weather-matters" className="container mx-auto px-4 py-12">
            <IntroSection />
          </section>
          
          {/* Planning Your Trip Section */}
          <section className="container mx-auto px-4 py-12">
            <PlanningSection />
          </section>
          
          {/* Seasonal Tips Section */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-8">
              Seasonal Weather Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SeasonalTips />
            </div>
          </section>
          
          {/* Regional Climate Section */}
          <RegionalClimate />
          
          {/* Weather Monitoring Section */}
          <section className="container mx-auto px-4 py-12">
            <WeatherMonitoring />
          </section>
          
          {/* Weather Alerts Section */}
          <section className="container mx-auto px-4 py-12">
            <WeatherAlerts />
          </section>
          
          {/* Weather Hazards Section */}
          <section className="container mx-auto px-4 py-12">
            <HazardsSection />
          </section>
          
          {/* Preparedness Tips Section */}
          <PreparednessTips />
          
          {/* Maintenance Section */}
          <MaintenanceSection />
        </motion.div>
      </ScrollArea>
    </Layout>
  );
};

export default RVWeather;
