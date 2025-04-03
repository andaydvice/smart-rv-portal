
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { Container } from "@/components/ui/container";
import HeroSection from "@/components/rv-weather/HeroSection";
import MainContent from "@/components/rv-weather/MainContent";
import Sidebar from "@/components/rv-weather/Sidebar";

const RVWeather = () => {
  useEffect(() => {
    // Ensure we scroll to top when component mounts
    scrollToTop();
    console.log("RVWeather page mounted and scrolled to top");
    
    // Force a repaint to ensure all elements render properly
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log("Triggered resize event for proper rendering");
    }, 100);
  }, []);

  return (
    <Layout>
      <div className="bg-[#080F1F] min-h-screen w-full overflow-x-hidden rv-weather-page">
        <HeroSection />
        <Container className="mb-12 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <MainContent />
            <Sidebar />
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default RVWeather;
