import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useQueryClient } from '@tanstack/react-query';

const getBooleanValue = (value: string | undefined): boolean => {
  if (!value) return false;
  const lowered = value.toLowerCase();
  return lowered === 'yes' || lowered === 'true';
};

const parsePriceRange = (min: string | number | null, max: string | number | null) => {
  const minAmount = typeof min === 'number' ? min : min ? parseInt(min) : 0;
  const maxAmount = typeof max === 'number' ? max : max ? parseInt(max) : 0;
  return {
    min: minAmount,
    max: maxAmount,
    currency: "USD"
  };
};

export default function AddFacilityForm() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const californiaFacilities = [
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
        review_count: 35
      },
      {
        name: "Beach Cities RV Storage – Costa Mesa",
        address: "392 W Wilson St",
        city: "Costa Mesa",
        state: "CA",
        zip_code: "92627",
        latitude: 33.6455,
        longitude: -117.9178,
        features: {
          indoor: false,
          climate_controlled: false,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        price_range: parsePriceRange(200, 200),
        contact_phone: "(714) 210-2588",
        avg_rating: null,
        review_count: null
      }
    ];

    try {
      const { data, error } = await supabase
        .from('storage_facilities')
        .insert(californiaFacilities)
        .select();

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['storage-facilities'] });
      await queryClient.invalidateQueries({ queryKey: ['state-counts'] });
      
      toast.success('California facilities added successfully!');
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
              Adding California Facilities...
            </>
          ) : (
            'Add 31 California Facilities'
          )}
        </Button>
      </form>
    </Card>
  );
};
