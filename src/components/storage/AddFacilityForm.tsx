
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
  },
  {
    name: "Central Valley RV Storage – Fresno",
    address: "2345 West Elm Avenue",
    city: "Fresno",
    state: "CA",
    zip_code: "93706",
    latitude: 36.7378,
    longitude: -119.7871,
    features: {
      indoor: true,
      "24h_access": false,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(220, 480),
    contact_phone: "(559) 555-2345",
    contact_email: "info@centralvalleyrvstorage.com",
    avg_rating: 4.6,
    review_count: 22,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Bay Area RV Storage – San Francisco",
    address: "789 Market Street, Unit 5",
    city: "San Francisco",
    state: "CA",
    zip_code: "94103",
    latitude: 37.7749,
    longitude: -122.4194,
    features: {
      indoor: true,
      "24h_access": true,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(350, 700),
    contact_phone: "(415) 555-7890",
    contact_email: "info@bayarearvstorage.com",
    avg_rating: 4.8,
    review_count: 40,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Valley Indoor RV Storage – Chatsworth",
    address: "20701 Plummer Street",
    city: "Chatsworth",
    state: "CA",
    zip_code: "91311",
    latitude: 34.2506,
    longitude: -118.5982,
    features: {
      indoor: true,
      "24h_access": false,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(265, 565),
    contact_phone: "(818) 701-6500",
    contact_email: "info@valleyindoorrvstorage.com",
    avg_rating: 4.8,
    review_count: 66,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "24 Hour Recreational Storage – Rocklin",
    address: "3500 Cincinnati Ave, Suite 200",
    city: "Rocklin",
    state: "CA",
    zip_code: "95765",
    latitude: 38.7907,
    longitude: -121.2358,
    features: {
      indoor: true,
      "24h_access": true,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(165, 505),
    contact_phone: "(916) 630-9000",
    contact_email: null,
    avg_rating: 4.9,
    review_count: 12,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "RV Storage Depot – Norwalk",
    address: "13555 Excelsior Dr",
    city: "Norwalk",
    state: "CA",
    zip_code: "90650",
    latitude: 33.9019,
    longitude: -118.0829,
    features: {
      indoor: true,
      "24h_access": false,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(184, 379),
    contact_phone: "(562) 868-0000",
    contact_email: null,
    avg_rating: null,
    review_count: null,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "RV Storage Depot – Santa Ana",
    address: "1316 E. Warner Ave",
    city: "Santa Ana",
    state: "CA",
    zip_code: "92705",
    latitude: 33.7175,
    longitude: -117.8311,
    features: {
      indoor: true,
      "24h_access": false,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(714) 547-0000",
    contact_email: null,
    avg_rating: null,
    review_count: null,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "RV Storage Depot – McClellan Park",
    address: "4805 Urbani Way",
    city: "McClellan Park",
    state: "CA",
    zip_code: "95652",
    latitude: 38.6677,
    longitude: -121.4011,
    features: {
      indoor: true,
      "24h_access": false,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(916) 630-9000",
    contact_email: null,
    avg_rating: null,
    review_count: null,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Big Toy Depot – San Diego",
    address: "7515 Britannia Ct",
    city: "San Diego",
    state: "CA",
    zip_code: "92154",
    latitude: 32.5556,
    longitude: -117.0778,
    features: {
      indoor: true,
      "24h_access": true,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(619) 661-8300",
    contact_email: "info@bigtoydepot.com",
    avg_rating: 4.9,
    review_count: 71,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Discovery Indoor Boat & RV Storage",
    address: "141 Commerce Cir",
    city: "Sacramento",
    state: "CA",
    zip_code: "95815",
    latitude: 38.5974,
    longitude: -121.4504,
    features: {
      indoor: true,
      "24h_access": false,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(916) 246-9100",
    contact_email: null,
    avg_rating: 4.8,
    review_count: 25,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Power Sports Indoor RV & Boat Storage",
    address: "22324 Temescal Canyon Rd STE B",
    city: "Corona",
    state: "CA",
    zip_code: "92883",
    latitude: 33.8347,
    longitude: -117.5159,
    features: {
      indoor: true,
      "24h_access": true,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(951) 603-0884",
    contact_email: null,
    avg_rating: 4.6,
    review_count: 19,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Beach Cities RV Storage – Costa Mesa",
    address: "392 W Wilson St",
    city: "Costa Mesa",
    state: "CA",
    zip_code: "92627",
    latitude: 33.6472,
    longitude: -117.9247,
    features: {
      indoor: true,
      "24h_access": false,
      security_system: true,
      climate_controlled: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(200, 200),
    contact_phone: "(714) 210-2588",
    contact_email: null,
    avg_rating: null,
    review_count: null,
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
      
      toast.success('All 14 California facilities added successfully!');
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
              Adding 14 California Facilities...
            </>
          ) : (
            'Add 14 California Facilities'
          )}
        </Button>
      </form>
    </Card>
  );
};
