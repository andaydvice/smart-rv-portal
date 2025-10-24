
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { scrollToTop } from "@/utils/scrollToTop";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import RVWeatherHero from "@/components/rv-weather/RVWeatherHero";
import IntroSection from "@/components/rv-weather/IntroSection";
import PlanningSection from "@/components/rv-weather/PlanningSection";
import SeasonalTips from "@/components/rv-weather/SeasonalTips";
import SeasonalConsiderations from "@/components/rv-weather/SeasonalConsiderations";
import RegionalClimate from "@/components/rv-weather/RegionalClimate";
import WeatherMonitoring from "@/components/rv-weather/sections/MonitoringSection";
import AlertsSection from "@/components/rv-weather/sections/AlertsSection";
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
    console.log("RV Weather page loading - forcing content refresh");
    scrollToTop();
    
    // Force page to scroll to top on load
    window.scrollTo(0, 0);
    
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
    
    // Force a content refresh after a short delay
    const refreshTimer = setTimeout(() => {
      console.log("Forcing content refresh");
      const contentContainer = document.querySelector('.rv-weather-page');
      if (contentContainer) {
        // Toggle a class to force re-render
        contentContainer.classList.add('content-refreshed');
        // Force layout recalculation
        window.dispatchEvent(new Event('resize'));
      }
    }, 100);
    
    return () => {
      // Check if the link is still in the document before removing
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      
      // Remove the flag and stop the cleanup interval
      window.isRVWeatherPage = false;
      clearInterval(cleanupInterval);
      clearTimeout(refreshTimer);
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
          key="rv-weather-content" // Add key to force re-render
        >
          {/* Hero Section */}
          <RVWeatherHero />
          
          {/* Why Weather Matters Section */}
          <section id="weather-matters" className="container mx-auto px-4 py-12">
            <IntroSection />
          </section>
          
          {/* Planning Your Trip Section */}
          <section className="container mx-auto px-4 py-12">
            <PlanningSection />
          </section>
          
          {/* Seasonal Tips Section */}
          <section className="py-12 bg-[#080F1F]">
            <SeasonalTips />
          </section>
          
          {/* Seasonal Considerations - More Detailed Section */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-8">
              Seasonal Weather Considerations
            </h2>
            <SeasonalConsiderations />
          </section>
          
          {/* Regional Climate Section */}
          <RegionalClimate />
          
          {/* Weather Monitoring Section */}
          <section className="container mx-auto px-4 py-12">
            <WeatherMonitoring />
          </section>
          
          {/* Weather Alerts Section */}
          <section className="container mx-auto px-4 py-12">
            <AlertsSection />
          </section>
          
          {/* Weather Hazards Section */}
          <section className="container mx-auto px-4 py-12">
            <HazardsSection />
          </section>
          
          {/* Preparedness Tips Section */}
          <PreparednessTips />
          
          {/* Maintenance Section */}
          <MaintenanceSection />
          
          {/* Trusted Weather Tools and Services */}
          <section className="container mx-auto px-4 py-12">
            <OptimizedAffiliateGrid
              title="Essential Weather Tools & Services"
              subtitle="Get accurate forecasts, emergency assistance, and professional weather monitoring for safer Smart RV travels."
              partners={[
                {
                  name: 'Good Sam',
                  url: 'https://goodsam.com',
                  title: 'Emergency Weather Support',
                  description: 'Get 24/7 emergency roadside assistance and weather-related travel support when severe conditions hit.',
                  features: ['24/7 Emergency Line', 'Severe Weather Assistance', 'Trip Interruption Coverage', 'Professional Guidance'],
                  buttonText: 'Get Weather Protection'
                },
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'Advanced Weather Planning',
                  description: 'Professional trip planning with detailed weather forecasts, route optimization, and real-time alerts.',
                  features: ['Advanced Weather Radar', 'Route Weather Analysis', 'Real-Time Alerts', 'Historical Data'],
                  buttonText: 'Plan Weather-Safe Routes'
                },
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'Weather Monitoring Systems',
                  description: 'Smart weather stations and monitoring equipment to track conditions around your RV in real-time.',
                  features: ['Professional Weather Stations', 'Smart Monitoring', 'Mobile Alerts', 'Expert Installation'],
                  buttonText: 'Shop Weather Tech'
                }
              ]}
              gridCols="3"
            />

            <AffiliateDisclosure className="mt-8" />

            {/* Related Navigation */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mt-12 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Explore More</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/tools">
                  <Button variant="outline" className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Planning Tools
                  </Button>
                </Link>
                <Link to="/storage-facilities">
                  <Button variant="outline" className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Storage Facilities
                  </Button>
                </Link>
                <Link to="/calculators">
                  <Button variant="outline" className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    RV Calculators
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </motion.div>
      </ScrollArea>
    </Layout>
  );
};

export default RVWeather;
