
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { Container } from "@/components/ui/container";
import { 
  Cloud, Shield, Home, Wrench, Sun, Leaf, 
  Snowflake, CloudRain, MapPin, Route, Wind, 
  AlertTriangle, Info, CalendarDays, CheckSquare, Map
} from "lucide-react";
import MainContent from "@/components/rv-weather/MainContent";
import Sidebar from "@/components/rv-weather/Sidebar";
import HeroSection from "@/components/rv-weather/HeroSection";

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

    // Add custom fonts for the RV Weather page
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      // Clean up the added font link when component unmounts
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Layout>
      <div className="bg-[#f8fafc] min-h-screen w-full overflow-x-hidden rv-weather-page">
        {/* Hero Section with Parallax Effect */}
        <HeroSection />

        {/* Why Weather Matters Section */}
        <section id="weather-matters" className="py-12 bg-white">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 relative font-playfair text-left">
              Why Weather Matters for RV Travel
              <span className="absolute bottom-[-10px] left-0 w-16 h-1 bg-[#5B9BD5]"></span>
            </h2>
            <p className="text-lg mb-8 text-left">Weather directly affects your safety on the road, comfort at your campsite and the longevity of your vehicle. Understanding how to track, plan for, and respond to weather is essential for every RV owner.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-[#f8fafc] p-6 rounded-lg shadow-sm transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  <Shield className="h-10 w-10 text-[#5B9BD5]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center font-playfair">Safety First</h3>
                <p className="text-[#4a5568] text-left">Weather conditions directly impact road safety. High winds, heavy rain, and ice can make driving hazardous, especially for high-profile vehicles like RVs.</p>
              </div>
              
              <div className="bg-[#f8fafc] p-6 rounded-lg shadow-sm transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  <Home className="h-10 w-10 text-[#5B9BD5]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center font-playfair">Campsite Comfort</h3>
                <p className="text-[#4a5568] text-left">Temperature extremes, precipitation, and wind can drastically affect your comfort level while camping, potentially turning a pleasant trip into a stressful experience.</p>
              </div>
              
              <div className="bg-[#f8fafc] p-6 rounded-lg shadow-sm transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  <Wrench className="h-10 w-10 text-[#5B9BD5]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center font-playfair">Vehicle Longevity</h3>
                <p className="text-[#4a5568] text-left">Extreme weather can cause accelerated wear and tear on your RV. UV damage, freezing temperatures, and humidity all affect different components of your vehicle.</p>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Main Content with Sidebar */}
        <section className="py-12 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <MainContent />
              <Sidebar />
            </div>
          </Container>
        </section>

        {/* Weather Alert Section */}
        <section className="py-12 bg-white">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 relative font-playfair text-left">
              Understanding Weather Alerts
              <span className="absolute bottom-[-10px] left-0 w-16 h-1 bg-[#5B9BD5]"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-yellow-50 rounded-lg border-t-4 border-yellow-400 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center font-playfair">
                  <AlertTriangle className="text-yellow-500 mr-2 h-5 w-5" />
                  Watch
                </h3>
                <p className="font-bold mb-2 text-left">What It Means:</p>
                <p className="mb-4 text-left">Conditions are favorable for severe weather</p>
                <p className="font-bold mb-2 text-left">Action:</p>
                <p className="text-left">Stay informed</p>
              </div>
              
              <div className="bg-red-50 rounded-lg border-t-4 border-red-500 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center font-playfair">
                  <AlertTriangle className="text-red-500 mr-2 h-5 w-5" />
                  Warning
                </h3>
                <p className="font-bold mb-2 text-left">What It Means:</p>
                <p className="mb-4 text-left">Severe weather is imminent or occurring</p>
                <p className="font-bold mb-2 text-left">Action:</p>
                <p className="text-left">Take immediate protective action</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg border-t-4 border-blue-400 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center font-playfair">
                  <Info className="text-blue-500 mr-2 h-5 w-5" />
                  Advisory
                </h3>
                <p className="font-bold mb-2 text-left">What It Means:</p>
                <p className="mb-4 text-left">Less dangerous hazardous conditions</p>
                <p className="font-bold mb-2 text-left">Action:</p>
                <p className="text-left">Use caution, possibly adjust travel plans</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Seasonal Weather Tips */}
        <section className="py-12 bg-gray-50">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 relative font-playfair text-left">
              Seasonal Weather Tips
              <span className="absolute bottom-[-10px] left-0 w-16 h-1 bg-[#5B9BD5]"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="card bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  <Sun className="h-10 w-10 text-[#5B9BD5]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center font-playfair">Summer</h3>
                <p className="text-[#4a5568] text-left">Heavy AC? You'll need a desert wash. Keep RV cool by parking in shade. Use smart thermostat for efficiency.</p>
              </div>
              
              <div className="card bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  <Leaf className="h-10 w-10 text-[#5B9BD5]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center font-playfair">Fall</h3>
                <p className="text-[#4a5568] text-left">Check weather forecasts frequently every 12 hours for updates. Prepare for changing conditions as seasons transition.</p>
              </div>
              
              <div className="card bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  <Snowflake className="h-10 w-10 text-[#5B9BD5]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center font-playfair">Winter</h3>
                <p className="text-[#4a5568] text-left">Propane usage increases in colder weather. Extra RV roof sealant prep in snow. Prepare for electricity outages.</p>
              </div>
              
              <div className="card bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  <CloudRain className="h-10 w-10 text-[#5B9BD5]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center font-playfair">Spring</h3>
                <p className="text-[#4a5568] text-left">Watch for thunderstorms and flooding. Variable weather requires flexible planning and regular forecast checking.</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Regional Climate Highlights */}
        <section className="py-12 bg-white">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 relative font-playfair text-left">
              Regional Climate Highlights
              <span className="absolute bottom-[-10px] left-0 w-16 h-1 bg-[#5B9BD5]"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-lg overflow-hidden shadow-lg relative">
                <div className="bg-[#5B9BD5] text-white text-xs font-bold px-2 py-1 absolute right-0">Hot & Dry</div>
                <div className="p-4">
                  <h4 className="font-semibold text-[#1a202c] text-left font-playfair">Southwest</h4>
                  <p className="text-sm text-[#4a5568] text-left mt-2">Hot, dry summers with monsoon season (July-Sept). Mild winters in lower elevations, snow at higher altitudes.</p>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-lg relative">
                <div className="bg-[#5B9BD5] text-white text-xs font-bold px-2 py-1 absolute right-0">Wet & Mild</div>
                <div className="p-4">
                  <h4 className="font-semibold text-[#1a202c] text-left font-playfair">Pacific Northwest</h4>
                  <p className="text-sm text-[#4a5568] text-left mt-2">Mild, wet winters and dry summers. Significant precipitation along the coast, less inland.</p>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-lg relative">
                <div className="bg-[#5B9BD5] text-white text-xs font-bold px-2 py-1 absolute right-0">Four Seasons</div>
                <div className="p-4">
                  <h4 className="font-semibold text-[#1a202c] text-left font-playfair">Northeast</h4>
                  <p className="text-sm text-[#4a5568] text-left mt-2">Four distinct seasons with cold, snowy winters and warm, humid summers. Fall foliage is spectacular.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Weather Preparedness Checklist */}
        <section className="py-12 bg-[#f8fafc] mb-12">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 relative font-playfair text-left">
              Weather Preparedness
              <span className="absolute bottom-[-10px] left-0 w-16 h-1 bg-[#5B9BD5]"></span>
            </h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-[#4a5568] text-left">Download weather apps before traveling</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-[#4a5568] text-left">Create emergency contact list</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-[#4a5568] text-left">Pack emergency weather supplies</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-[#4a5568] text-left">Know your RV's wind resistance limits</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-[#4a5568] text-left">Review evacuation routes for each stay</span>
              </li>
            </ul>
          </Container>
        </section>
      </div>
    </Layout>
  );
};

export default RVWeather;
