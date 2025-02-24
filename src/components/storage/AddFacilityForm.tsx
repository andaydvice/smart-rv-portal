
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useQueryClient } from '@tanstack/react-query';

const parsePriceRange = (min: string | number | null, max: string | number | null) => {
  const minAmount = typeof min === 'number' ? min : min ? parseInt(min) : 0;
  const maxAmount = typeof max === 'number' ? max : max ? parseInt(max) : 0;
  return {
    min: minAmount,
    max: maxAmount,
    currency: "USD"
  };
};

const facilitiesWithDefaults = [
  {
    name: "California Indoor RV Storage – Los Angeles",
    address: "1234 West 6th Street",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90017",
    latitude: 34.0522,
    longitude: -118.2437,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(250, 500),
    contact_phone: "(323) 555-1234",
    contact_email: "info@californiarvstorage.com",
    avg_rating: 4.7,
    review_count: 35,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Prime RV Storage – San Diego",
    address: "5678 Harbor Drive",
    city: "San Diego",
    state: "CA",
    zip_code: "92101",
    latitude: 32.7157,
    longitude: -117.1611,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(300, 600),
    contact_phone: "(619) 555-5678",
    contact_email: "contact@primervstorage.com",
    avg_rating: 4.8,
    review_count: 50,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Inland RV Storage – Sacramento",
    address: "9101 Industrial Parkway",
    city: "Sacramento",
    state: "CA",
    zip_code: "95814",
    latitude: 38.5816,
    longitude: -121.4944,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(200, 450),
    contact_phone: "(916) 555-9101",
    contact_email: "info@inlandrvstorage.com",
    avg_rating: 4.5,
    review_count: 28,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  }
];

export default function AddFacilityForm() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('storage_facilities')
        .insert(facilitiesWithDefaults)
        .select();

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['storage-facilities'] });
      await queryClient.invalidateQueries({ queryKey: ['state-counts'] });
      
      toast.success('All facilities added successfully!');
    } catch (error) {
      console.error('Error adding facilities:', error);
      toast.error(error.message || 'Failed to add facilities');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-[#131a2a] border-gray-800">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Facilities...
            </>
          ) : (
            'Add California Facilities'
          )}
        </Button>
      </form>
    </Card>
  );
};
