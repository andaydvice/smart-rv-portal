
"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface StorageFacility {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  features: any;
  price_range: any;
}

const StorageFacilitiesMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = useState<string>('');

  const { data: facilities } = useQuery({
    queryKey: ['storage-facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('storage_facilities')
        .select('*');
      
      if (error) throw error;
      return data as StorageFacility[];
    }
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
    if (!map.current || !facilities?.length) return;

    facilities.forEach(facility => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-bold">${facility.name}</h3>
          <p class="text-sm">${facility.address}, ${facility.city}, ${facility.state}</p>
        </div>`
      );

      new mapboxgl.Marker()
        .setLngLat([facility.longitude, facility.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [facilities]);

  return (
    <Card className="w-full h-[600px] bg-[#080F1F] relative overflow-hidden">
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
  );
};

export default StorageFacilitiesMap;
