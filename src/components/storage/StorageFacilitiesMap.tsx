"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import FilterPanel, { FilterState } from './FilterPanel';
import { Phone, Mail, MapPin } from 'lucide-react';

interface StorageFacility {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  features: {
    indoor: boolean;
    climate_controlled: boolean;
    "24h_access": boolean;
    security_system: boolean;
    vehicle_washing: boolean;
  };
  price_range: {
    min: number;
    max: number;
    currency: string;
  };
  contact_phone?: string;
  contact_email?: string;
}

// Define the shape of the raw data from Supabase
interface RawStorageFacility {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: string | number;
  longitude: string | number;
  features: {
    indoor: boolean;
    climate_controlled: boolean;
    "24h_access": boolean;
    security_system: boolean;
    vehicle_washing: boolean;
  };
  price_range: {
    min: number;
    max: number;
    currency: string;
  };
  contact_phone?: string;
  contact_email?: string;
}

const StorageFacilitiesMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapToken, setMapToken] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({
    features: {
      indoor: false,
      climate_controlled: false,
      "24h_access": false,
      security_system: false,
      vehicle_washing: false
    },
    priceRange: [0, 1000]
  });

  const { data: facilities } = useQuery({
    queryKey: ['storage-facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('storage_facilities')
        .select('*');
      
      if (error) throw error;
      
      // Cast the data to ensure type safety
      return (data as RawStorageFacility[]).map(facility => ({
        id: facility.id,
        name: facility.name,
        address: facility.address,
        city: facility.city,
        state: facility.state,
        latitude: Number(facility.latitude),
        longitude: Number(facility.longitude),
        features: {
          indoor: Boolean(facility.features?.indoor),
          climate_controlled: Boolean(facility.features?.climate_controlled),
          "24h_access": Boolean(facility.features?.["24h_access"]),
          security_system: Boolean(facility.features?.security_system),
          vehicle_washing: Boolean(facility.features?.vehicle_washing)
        },
        price_range: {
          min: Number(facility.price_range?.min) || 0,
          max: Number(facility.price_range?.max) || 0,
          currency: facility.price_range?.currency || 'USD'
        },
        contact_phone: facility.contact_phone,
        contact_email: facility.contact_email
      })) as StorageFacility[];
    }
  });

  const filteredFacilities = facilities?.filter(facility => {
    // Check if facility price is within range
    const facilityMaxPrice = facility.price_range.max;
    if (facilityMaxPrice < filters.priceRange[0] || facilityMaxPrice > filters.priceRange[1]) {
      return false;
    }

    // Check if facility has all selected features
    return Object.entries(filters.features).every(([feature, isSelected]) => {
      if (!isSelected) return true; // Skip check if feature is not selected
      return facility.features[feature as keyof typeof facility.features];
    });
  });

  const createPopupHTML = (facility: StorageFacility) => {
    const featureLabels = {
      indoor: 'Indoor Storage',
      climate_controlled: 'Climate Controlled',
      "24h_access": '24/7 Access',
      security_system: 'Security System',
      vehicle_washing: 'Vehicle Washing'
    };

    const activeFeatures = Object.entries(facility.features)
      .filter(([_, value]) => value)
      .map(([key, _]) => featureLabels[key as keyof typeof featureLabels]);

    return `
      <div class="p-6 bg-[#131a2a] text-white rounded-lg max-w-md">
        <h3 class="font-bold text-xl mb-3 text-[#60A5FA]">${facility.name}</h3>
        
        <div class="space-y-2 mb-4">
          <div class="flex items-start gap-2 text-gray-300">
            <svg class="w-5 h-5 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="text-sm">${facility.address}, ${facility.city}, ${facility.state}</span>
          </div>
          
          ${facility.contact_phone ? `
            <div class="flex items-center gap-2 text-gray-300">
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span class="text-sm">${facility.contact_phone}</span>
            </div>
          ` : ''}
          
          ${facility.contact_email ? `
            <div class="flex items-center gap-2 text-gray-300">
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span class="text-sm">${facility.contact_email}</span>
            </div>
          ` : ''}
        </div>

        <div class="flex justify-between items-center py-3 border-y border-gray-700">
          <div>
            <span class="text-sm text-gray-400">Price Range</span>
            <div class="font-semibold text-[#60A5FA]">
              $${facility.price_range.min} - $${facility.price_range.max}
            </div>
          </div>
        </div>

        ${activeFeatures.length > 0 ? `
          <div class="mt-4">
            <span class="text-sm text-gray-400 block mb-2">Features</span>
            <div class="flex flex-wrap gap-2">
              ${activeFeatures.map(feature => `
                <span class="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-[#1a2235] text-[#60A5FA]">
                  ${feature}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  };

  useEffect(() => {
    if (!map.current || !filteredFacilities?.length) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    filteredFacilities.forEach(facility => {
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        maxWidth: '400px',
        className: 'storage-facility-popup'
      }).setHTML(createPopupHTML(facility));

      const marker = new mapboxgl.Marker({ color: '#60A5FA' })
        .setLngLat([facility.longitude, facility.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });

    // Fit map to markers if there are any
    if (markers.current.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredFacilities.forEach(facility => {
        bounds.extend([facility.longitude, facility.latitude]);
      });
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }, [filteredFacilities]);

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98.5795, 39.8283], // Center of USA
      zoom: 3
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    return () => {
      map.current?.remove();
    };
  }, [mapToken]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-1">
        <FilterPanel onFilterChange={setFilters} />
      </div>
      <Card className="md:col-span-3 h-[600px] bg-[#080F1F] relative overflow-hidden">
        {!mapToken && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#080F1F]/80 backdrop-blur-sm z-10">
            <input
              type="text"
              placeholder="Enter your Mapbox public token"
              className="w-96 px-4 py-2 rounded border border-gray-600 bg-[#131a2a] text-white"
              onChange={(e) => setMapToken(e.target.value)}
            />
          </div>
        )}
        <div ref={mapContainer} className="w-full h-full" />
      </Card>
    </div>
  );
};

export default StorageFacilitiesMap;
