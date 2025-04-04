
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Container } from "@/components/ui/container";
import { scrollToTop } from "@/utils/scrollToTop";
import HeroSection from "@/components/rv-weather/HeroSection";
import WhyWeatherMatters from "@/components/rv-weather/WhyWeatherMatters";
import PlanningSection from "@/components/rv-weather/PlanningSection";
import SeasonalTips from "@/components/rv-weather/SeasonalTips";
import RegionalClimate from "@/components/rv-weather/RegionalClimate";
import WeatherMonitoring from "@/components/rv-weather/WeatherMonitoring";
import WeatherAlerts from "@/components/rv-weather/WeatherAlerts";
import PreparednessTips from "@/components/rv-weather/PreparednessTips";
import MaintenanceSection from "@/components/rv-weather/MaintenanceSection";

const RVWeather = () => {
  useEffect(() => {
    scrollToTop();
    
    // Load custom fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Layout>
      <ScrollArea className="h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-deeper-background min-h-screen pb-16"
        >
          <HeroSection />
          
          <Container>
            <WhyWeatherMatters />
            <PlanningSection />
            <SeasonalTips />
            <RegionalClimate />
            <WeatherMonitoring />
            <WeatherAlerts />
            <PreparednessTips />
            <MaintenanceSection />
          </Container>
        </motion.div>
      </ScrollArea>
    </Layout>
  );
};

export default RVWeather;
