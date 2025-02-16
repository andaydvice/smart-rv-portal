
"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import FilterPanel, { FilterState } from './FilterPanel';

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
      return data.map(facility => ({
        id: facility.id,
        name: facility.name,
        address: facility.address,
        city: facility.city,
        state: facility.state,
        latitude: Number(facility.latitude),
        longitude: Number(facility.longitude),
        features: {
          indoor: facility.features?.indoor ?? false,
          climate_controlled: facility.features?.climate_controlled ?? false,
          "24h_access": facility.features?.["24h_access"] ?? false,
          security_system: facility.features?.security_system ?? false,
          vehicle_washing: facility.features?.vehicle_washing ?? false
        },
        price_range: {
          min: facility.price_range?.min ?? 0,
          max: facility.price_range?.max ?? 0,
          currency: facility.price_range?.currency ?? 'USD'
        }
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

  useEffect(() => {
    if (!map.current || !filteredFacilities?.length) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    filteredFacilities.forEach(facility => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-4 bg-[#131a2a] text-white">
          <h3 class="font-bold text-lg mb-2">${facility.name}</h3>
          <p class="text-sm mb-2">${facility.address}, ${facility.city}, ${facility.state}</p>
          <p class="text-sm text-gray-400">Price Range: $${facility.price_range.min} - $${facility.price_range.max}</p>
          <div class="mt-2 text-sm">
            ${Object.entries(facility.features)
              .filter(([_, value]) => value)
              .map(([key, _]) => 
                `<span class="inline-block bg-[#1a2235] px-2 py-1 rounded mr-1 mb-1">
                  ${key.replace(/_/g, ' ')}
                </span>`
              ).join('')}
          </div>
        </div>`
      );

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
