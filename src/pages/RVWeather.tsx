
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { Container } from "@/components/ui/container";
import HeroSection from "@/components/rv-weather/HeroSection";
import MainContent from "@/components/rv-weather/MainContent";
import Sidebar from "@/components/rv-weather/Sidebar";

const RVWeather = () => {
  useEffect(() => {
    scrollToTop();
    console.log("RVWeather page mounted");
  }, []);

  return (
    <Layout>
      <HeroSection />
      <Container>
        <div className="grid gap-8 lg:grid-cols-3">
          <MainContent />
          <Sidebar />
        </div>
      </Container>
    </Layout>
  );
};

export default RVWeather;
