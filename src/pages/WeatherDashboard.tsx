
import React, { useEffect, useState } from "react";
import { scrollToTop } from "@/utils/scrollToTop";
import Layout from "@/components/layout/Layout";
import { Location } from "@/types/weather";
import { weatherConfig } from "@/utils/weatherAPI";

// Import weather components
import { APIKeyInput } from "@/components/weather/APIKeyInput";
import AlertCard from "@/components/weather/AlertCard";
import SafetyInsights from "@/components/weather/SafetyInsights";
import WeatherHeader from "@/components/weather/WeatherHeader";
import LocationSearch from "@/components/weather/LocationSearch";
import TripImpact from "@/components/weather/TripImpact";
import HeaderImage from "@/components/weather/HeaderImage";
import WeatherDataProvider from "@/components/weather/WeatherDataProvider";
import WeatherCardsSection from "@/components/weather/WeatherCardsSection";

const WeatherDashboard = () => {
  // Scroll to top on component mount
  useEffect(() => {
    scrollToTop();
  }, []);

  const [currentLocation, setCurrentLocation] = useState<Location>(() => {
    const savedLocation = localStorage.getItem('weatherLocation');
    return savedLocation ? JSON.parse(savedLocation) : {
      lat: 37.8651,
      lon: -119.5383,
      name: "Yosemite Valley, CA"
    };
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Layout>
      <HeaderImage />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow">
        <div className="mb-8">
          <APIKeyInput onKeySet={() => {
            const oneCallKey = localStorage.getItem("oneCallAPIKey");
            if (oneCallKey) {
              weatherConfig.oneCallApiKey = oneCallKey;
            }
          }} />
        </div>

        <div className="space-y-8">
          <LocationSearch 
            onLocationSelect={(location) => setCurrentLocation(location)} 
          />

          <WeatherDataProvider currentLocation={currentLocation}>
            {({ weatherData, isLoading, error }) => (
              <>
                <WeatherHeader 
                  locationName={currentLocation.name}
                  timestamp={weatherData?.timestamp}
                />

                <WeatherCardsSection 
                  weatherData={weatherData}
                  isLoading={isLoading}
                />

                {weatherData && (
                  <TripImpact weatherData={weatherData} className="mb-8" />
                )}

                <div className="relative w-full h-64 mb-8 bg-background-secondary/50 rounded-lg overflow-hidden">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img 
                    src="/lovable-uploads/250845cf-7e19-45a5-a1e0-138f24126cfa.png"
                    alt="RV in neon lighting"
                    className={`w-full h-full rounded-lg object-cover shadow-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Active Weather Alerts</h2>
                  <div className="space-y-4">
                    <AlertCard
                      severity="medium"
                      title="Strong Wind Advisory"
                      description="Wind gusts up to 25 mph expected between 4 PM - 8 PM. Consider securing awnings and outdoor equipment."
                    />
                    <AlertCard
                      severity="low"
                      title="Rain Forecast"
                      description="Light rain expected overnight. Check roof seals and window caulking."
                    />
                  </div>
                </section>

                <SafetyInsights />
              </>
            )}
          </WeatherDataProvider>
        </div>
      </div>
    </Layout>
  );
};

export default WeatherDashboard;
