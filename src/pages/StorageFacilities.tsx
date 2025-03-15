
import { Container } from "@/components/ui/container";
import StorageFacilitiesMap from "@/components/storage/StorageFacilitiesMap";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Warehouse } from "lucide-react";
import { useEffect } from 'react';
import "../styles/force-markers.css"; // Only load the minimal, clean CSS

export default function StorageFacilities() {
  useEffect(() => {
    console.log("StorageFacilities: Component mounted");
    
    // Create emergency markers directly in the page component
    const createEmergencyMarkers = () => {
      console.log("Creating emergency markers directly");
      
      // Emergency marker data - hardcoded to ensure visibility
      const emergencyLocations = [
        { id: "em1", lat: 33.4484, lng: -112.0740, name: "Arizona Storage", state: "Arizona" }
      ];
      
      // Find all map elements
      const mapElements = document.querySelectorAll('.mapboxgl-map');
      console.log(`Found ${mapElements.length} map elements`);
      
      mapElements.forEach((mapElement, mapIndex) => {
        // For each emergency location, create a marker
        emergencyLocations.forEach((location, index) => {
          // Check if we already have a marker with this ID
          const existingMarker = document.getElementById(`emergency-marker-${location.id}-${mapIndex}`);
          if (existingMarker) {
            console.log(`Marker ${location.id} already exists, skipping`);
            return;
          }
          
          // Create marker element
          const marker = document.createElement('div');
          marker.className = 'emergency-marker';
          marker.id = `emergency-marker-${location.id}-${mapIndex}`;
          marker.setAttribute('data-lat', location.lat.toString());
          marker.setAttribute('data-lng', location.lng.toString());
          marker.setAttribute('data-state', location.state);
          
          // Set critical inline styles to guarantee visibility
          marker.style.cssText = `
            position: absolute !important;
            left: ${50 + (index * 5)}% !important;
            top: ${50 + (index % 3) * 10}% !important;
            width: 24px !important;
            height: 24px !important;
            background-color: #F97316 !important;
            border-radius: 50% !important;
            border: 2px solid white !important;
            box-shadow: 0 0 10px rgba(0,0,0,0.5) !important;
            cursor: pointer !important;
            z-index: 9999 !important;
            visibility: visible !important;
            display: block !important;
            opacity: 1 !important;
            transform: translate(-50%, -50%) !important;
          `;
          
          // Add to the map
          mapElement.appendChild(marker);
          
          // Create a simple popup element
          const popup = document.createElement('div');
          popup.className = 'emergency-popup mapboxgl-popup';
          popup.id = `popup-${location.id}-${mapIndex}`;
          popup.style.cssText = `
            position: absolute;
            left: ${50 + (index * 5)}%;
            top: ${40 + (index % 3) * 10}%;
            background-color: #151A22;
            color: white;
            padding: 10px;
            border-radius: 4px;
            max-width: 200px;
            z-index: 10000;
            display: none;
            visibility: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          `;
          popup.innerHTML = `
            <h3 style="margin: 0; font-size: 14px; font-weight: bold;">${location.name}</h3>
            <p style="margin: 5px 0 0; font-size: 12px;">Lat: ${location.lat}, Lng: ${location.lng}</p>
          `;
          
          mapElement.appendChild(popup);
          
          // Add click handler to marker
          marker.addEventListener('click', () => {
            // Toggle popup visibility
            const isVisible = popup.style.display === 'block';
            popup.style.display = isVisible ? 'none' : 'block';
            popup.style.visibility = isVisible ? 'hidden' : 'visible';
            
            // Log click for debugging
            console.log(`Clicked marker ${location.id} at ${location.lat}, ${location.lng}`);
          });
        });
        
        console.log(`Added ${emergencyLocations.length} emergency markers to map ${mapIndex}`);
      });
    };
    
    // Run immediately and with a slight delay to ensure map is loaded
    setTimeout(createEmergencyMarkers, 1000);
    setTimeout(createEmergencyMarkers, 3000);
    
    // Also run periodically to handle any new maps that might be created
    const intervalId = setInterval(createEmergencyMarkers, 5000);
    
    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen w-full bg-[#080F1F] text-white">
        {/* Hero Header with Image */}
        <div className="relative w-full h-[400px]">
          <img 
            src="/lovable-uploads/e9503bf4-354a-4790-8a83-fefea32abc5b.png" 
            alt="Indoor RV Storage Facility" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] to-transparent">
            <Container className="h-full flex flex-col justify-center items-center" fullWidth>
              <div className="text-center max-w-3xl bg-black/40 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#F97316] rounded-full border-2 border-white shadow-lg animate-pulse fixed-orange-marker hero-marker"></div>
                  <Warehouse className="h-7 w-7 text-[#F97316]" />
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Indoor RV Storage Facilities
                  </h1>
                </div>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Find the perfect indoor storage solution for your RV across the USA including Oregon, Pennsylvania, New York, Minnesota, Iowa, Wisconsin, California, Arizona, Colorado, Texas, Florida, Georgia and Nevada.
                </p>
              </div>
            </Container>
          </div>
        </div>
        
        <Container fullWidth className="px-2 md:px-4">
          <div className="py-8">
            <StorageFacilitiesMap />
          </div>
        </Container>
        
        {/* Direct emergency fallback markers - these will be displayed directly in the DOM */}
        <div id="emergency-markers-container" className="hidden">
          {/* Emergency markers will be injected here by the useEffect hook */}
        </div>
      </div>
    </Layout>
  );
}
