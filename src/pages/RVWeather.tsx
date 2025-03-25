
import React, { useState } from "react";
import { AlertTriangle, LogIn } from "lucide-react";
import { APIKeyInput } from "@/components/weather/APIKeyInput";
import AlertCard from "@/components/weather/AlertCard";
import SafetyInsights from "@/components/weather/SafetyInsights";
import WeatherHeader from "@/components/weather/WeatherHeader";
import LocationSearch from "@/components/weather/LocationSearch";
import TripImpact from "@/components/weather/TripImpact";
import { Alert, AlertDescription } from "@/components/ui/alert";
import HeaderImage from "@/components/weather/HeaderImage";
import Footer2 from "@/components/ui/Footer2";
import WeatherDataProvider from "@/components/weather/WeatherDataProvider";
import WeatherCardsSection from "@/components/weather/WeatherCardsSection";
import { Location } from "@/types/weather";
import { weatherConfig } from "@/utils/weatherAPI";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const RVWeather = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Define the footer links and socials for this page
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/" },
        { text: "Features", href: "/features" },
        { text: "Models", href: "/models" }
      ]
    },
    {
      title: "Tools",
      links: [
        { text: "Calculators", href: "/calculators" },
        { text: "Storage", href: "/storage-facilities" },
        { text: "Documentation", href: "/documentation" }
      ]
    }
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];

  console.log("[RVWeather] Rendering");
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
    <div className="min-h-screen w-full flex flex-col bg-gradient-dark text-white">
      <Navbar />
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
            {({ weatherData, isLoading, error, isActivationError }) => (
              <>
                {!user && (
                  <Alert className="mb-8 bg-blue-500/10 border-blue-500/50">
                    <LogIn className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-blue-400 flex items-center justify-between">
                      <span>Sign up for free to get personalized weather alerts and save your favorite locations.</span>
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/auth')}
                        className="ml-4 bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Sign Up
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {isActivationError && (
                  <Alert className="mb-8 bg-yellow-500/10 border-yellow-500/50">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <AlertDescription className="text-yellow-500">
                      Your API key is not active yet. This can take up to 2 hours after creation. 
                      The page will automatically update when the key is activated. 
                      You can check your key status at openweathermap.org
                    </AlertDescription>
                  </Alert>
                )}

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
                    src="lovable-uploads/250845cf-7e19-45a5-a1e0-138f24126cfa.png"
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
      <Footer2 
        links={footerLinks}
        socials={footerSocials}
        description="Stay ahead of weather conditions for safer and smarter RV travel"
      />
    </div>
  );
};

export default RVWeather;
