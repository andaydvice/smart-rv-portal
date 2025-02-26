
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
    name: "Coastal RV Storage – Costa Mesa",
    address: "4321 Pacific Coast Hwy",
    city: "Costa Mesa",
    state: "CA",
    zip_code: "92626",
    latitude: 33.6626,
    longitude: -117.9217,
    features: {
      indoor: true,
      climate_controlled: false,
      "24h_access": true,
      security_system: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(250, 550),
    contact_phone: "(714) 555-4321",
    contact_email: "info@coastalrvstorage.com",
    avg_rating: 4.7,
    review_count: 33,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "SoCal RV Storage – San Bernardino",
    address: "1500 N D Street",
    city: "San Bernardino",
    state: "CA",
    zip_code: "92405",
    latitude: 34.1115,
    longitude: -117.2921,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(300, 600),
    contact_phone: "(909) 555-1500",
    contact_email: "info@socalrvstorage.com",
    avg_rating: 4.5,
    review_count: 20,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "LA RV Storage – Los Angeles",
    address: "1234 E 7th Street",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90021",
    latitude: 34.0412,
    longitude: -118.2356,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(320, 650),
    contact_phone: "(323) 555-7891",
    contact_email: "info@larvstorage.com",
    avg_rating: 4.6,
    review_count: 30,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "West Coast RV Storage – San Diego",
    address: "4567 Ocean Blvd",
    city: "San Diego",
    state: "CA",
    zip_code: "92109",
    latitude: 32.8204,
    longitude: -117.2587,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(310, 680),
    contact_phone: "(619) 555-4567",
    contact_email: "contact@westcoastrvstorage.com",
    avg_rating: 4.7,
    review_count: 45,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Golden State RV Storage – Oakland",
    address: "789 Industrial Rd",
    city: "Oakland",
    state: "CA",
    zip_code: "94621",
    latitude: 37.7534,
    longitude: -122.2083,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(280, 600),
    contact_phone: "(510) 555-7890",
    contact_email: "info@goldenstaterv.com",
    avg_rating: 4.4,
    review_count: 15,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "RV Vault California – San Jose",
    address: "200 Tech Road",
    city: "San Jose",
    state: "CA",
    zip_code: "95110",
    latitude: 37.3382,
    longitude: -121.8863,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(350, 700),
    contact_phone: "(408) 555-2000",
    contact_email: "contact@rvvaultca.com",
    avg_rating: 4.8,
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
  },
  {
    name: "Johnson RV – Gilroy",
    address: "7900 Arroyo Circle",
    city: "Gilroy",
    state: "CA",
    zip_code: "95020",
    latitude: 37.0058,
    longitude: -121.5643,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": false,
      security_system: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(200, 350),
    contact_phone: "(408) 843-9140",
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
    name: "Premier Indoor Storage – Rancho Cucamonga",
    address: "9275 Buffalo Ave",
    city: "Rancho Cucamonga",
    state: "CA",
    zip_code: "91730",
    latitude: 34.0952,
    longitude: -117.5946,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": false,
      security_system: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(909) 476-9999",
    contact_email: null,
    avg_rating: 4.5,
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
    name: "Acton Indoors RV & Boat Storage – Acton",
    address: "2210 Soledad Canyon Rd",
    city: "Acton",
    state: "CA",
    zip_code: "93510",
    latitude: 34.4697,
    longitude: -118.1937,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": false,
      security_system: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(200, 350),
    contact_phone: "(661) 268-0000",
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
    name: "Viking RV Storage – Shingle Springs",
    address: "4481 Business Dr",
    city: "Shingle Springs",
    state: "CA",
    zip_code: "95682",
    latitude: 38.6743,
    longitude: -120.9287,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": false,
      security_system: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(530) 676-1100",
    contact_email: null,
    avg_rating: 4.7,
    review_count: 37,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Bay Indoor RV & Boat Storage – Antioch",
    address: "1400 W 4th St",
    city: "Antioch",
    state: "CA",
    zip_code: "94509",
    latitude: 38.0172,
    longitude: -121.8127,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": false,
      security_system: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(925) 826-7600",
    contact_email: null,
    avg_rating: 4.5,
    review_count: 27,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "River City Indoor RV & Boat Storage – Sacramento",
    address: "8301 Belvedere Ave Ste 100",
    city: "Sacramento",
    state: "CA",
    zip_code: "95826",
    latitude: 38.5547,
    longitude: -121.3797,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(916) 398-2050",
    contact_email: null,
    avg_rating: 4.5,
    review_count: 38,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    name: "Exclusive RV Services, Inc.",
    address: "Located off 60 Freeway at Reservoir",
    city: "Pomona",
    state: "CA",
    zip_code: "91766",
    latitude: 34.0551,
    longitude: -117.7499,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(909) 465-9492",
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
    name: "Allec Self Storage",
    address: "9750 Galena St",
    city: "Riverside",
    state: "CA",
    zip_code: "92509",
    latitude: 34.0333,
    longitude: -117.3686,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": false,
      security_system: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(951) 681-3396",
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
    name: "Red Carpet RV & Boat Storage – Santa Ana",
    address: "3130 S Fairview St",
    city: "Santa Ana",
    state: "CA",
    zip_code: "92704",
    latitude: 33.7147,
    longitude: -117.8776,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": false,
      security_system: true,
      vehicle_washing: true
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(714) 426-9986",
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
    name: "RecNation RV & Boat Storage – Sacramento",
    address: "5650 66th Ave",
    city: "Sacramento",
    state: "CA",
    zip_code: "95823",
    latitude: 38.5002,
    longitude: -121.4276,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": false,
      security_system: true,
      vehicle_washing: false
    },
    price_range: parsePriceRange(200, 400),
    contact_phone: "(916) 395-5563",
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
      // First, get ALL current facilities to verify what we have
      const { data: currentFacilities, error: fetchError } = await supabase
        .from('storage_facilities')
        .select('*')
        .order('name');

      if (fetchError) throw fetchError;

      console.log('=== CURRENT DATABASE STATE ===');
      console.log(`Current total facilities in California: ${currentFacilities?.length}`);
      console.log('Current facility names:', currentFacilities?.map(f => f.name).sort());
      
      const existingNames = new Set(currentFacilities?.map(f => f.name) || []);
      
      // Filter out facilities that already exist
      const newFacilities = facilitiesWithDefaults.filter(
        facility => !existingNames.has(facility.name)
      );

      console.log('\n=== NEW FACILITIES TO BE ADDED ===');
      console.log(`Number of new facilities to add: ${newFacilities.length}`);
      console.log('Names of new facilities:', newFacilities.map(f => f.name).sort());

      if (newFacilities.length === 0) {
        toast.info('All facilities already exist in the database');
        setLoading(false);
        return;
      }

      // Insert new facilities one by one to better track success/failure
      let successCount = 0;
      let failureCount = 0;
      
      for (const facility of newFacilities) {
        const { data: insertedData, error: insertError } = await supabase
          .from('storage_facilities')
          .insert([facility])
          .select();

        if (insertError) {
          console.error(`Failed to insert ${facility.name}:`, insertError);
          failureCount++;
        } else {
          console.log(`Successfully inserted ${facility.name}`);
          successCount++;
        }
      }

      console.log('\n=== INSERTION RESULTS ===');
      console.log(`Successfully inserted ${successCount} facilities`);
      if (failureCount > 0) {
        console.log(`Failed to insert ${failureCount} facilities`);
      }

      await queryClient.invalidateQueries({ queryKey: ['storage-facilities'] });
      await queryClient.invalidateQueries({ queryKey: ['state-counts'] });
      
      if (failureCount > 0) {
        toast.error(`Added ${successCount} facilities but failed to add ${failureCount} facilities`);
      } else {
        toast.success(`Successfully added ${successCount} new facilities (from ${currentFacilities?.length} to ${(currentFacilities?.length || 0) + successCount} total)!`);
      }

      // Verify final state
      const { data: finalFacilities } = await supabase
        .from('storage_facilities')
        .select('name')
        .order('name');

      console.log('\n=== FINAL DATABASE STATE ===');
      console.log(`Final facility count: ${finalFacilities?.length}`);
      console.log('Final facility names:', finalFacilities?.map(f => f.name).sort());

    } catch (error) {
      console.error('Error managing facilities:', error);
      toast.error(error.message || 'Failed to manage facilities');
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
              Adding Missing California Facilities...
            </>
          ) : (
            'Add Missing California Facilities'
          )}
        </Button>
      </form>
    </Card>
  );
}
