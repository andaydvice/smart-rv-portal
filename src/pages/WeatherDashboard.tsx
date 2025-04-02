
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
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch weather data
  const fetchData = async () => {
    if (!weatherConfig.oneCallApiKey) {
      return;
    }
    
    try {
      setIsLoading(true);
      const data = await fetch(
        `${weatherConfig.baseUrl}/onecall?lat=${currentLocation.lat}&lon=${currentLocation.lon}&appid=${weatherConfig.oneCallApiKey}&units=metric`
      );
      
      if (!data.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const jsonData = await data.json();
      setWeatherData({
        ...jsonData,
        timestamp: Math.floor(Date.now() / 1000),
        current: {
          ...jsonData.current,
          description: jsonData.current.weather[0].description
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching weather data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch weather data when location or API key changes
  useEffect(() => {
    if (weatherConfig.oneCallApiKey) {
      fetchData();
    }
  }, [currentLocation]);

  return (
    <Layout>
      <HeaderImage />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow">
        <div className="mb-8">
          <APIKeyInput onKeySet={() => {
            const oneCallKey = localStorage.getItem("oneCallAPIKey");
            if (oneCallKey) {
              weatherConfig.oneCallApiKey = oneCallKey;
              fetchData();
            }
          }} />
        </div>

        <div className="space-y-8">
          <LocationSearch 
            onLocationSelect={(location) => setCurrentLocation(location)} 
          />

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
        </div>
      </div>
    </Layout>
  );
};

export default WeatherDashboard;
