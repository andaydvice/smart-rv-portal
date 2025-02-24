
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
        name: "Prime RV Storage – San Diego",
        address: "5678 Harbor Drive",
        city: "San Diego",
        state: "CA",
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
        review_count: 50
      },
      {
        name: "Inland RV Storage – Sacramento",
        address: "9101 Industrial Parkway",
        city: "Sacramento",
        state: "CA",
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
        review_count: 28
      },
      {
        name: "Central Valley RV Storage – Fresno",
        address: "2345 West Elm Avenue",
        city: "Fresno",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        price_range: parsePriceRange(220, 480),
        contact_phone: "(559) 555-2345",
        contact_email: "info@centralvalleyrvstorage.com",
        avg_rating: 4.6,
        review_count: 22
      },
      {
        name: "Bay Area RV Storage – San Francisco",
        address: "789 Market Street, Unit 5",
        city: "San Francisco",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": true,
          security_system: true,
          vehicle_washing: true
        },
        price_range: parsePriceRange(350, 700),
        contact_phone: "(415) 555-7890",
        contact_email: "info@bayarearvstorage.com",
        avg_rating: 4.8,
        review_count: 40
      },
      {
        name: "Coastal RV Storage – Costa Mesa",
        address: "4321 Pacific Coast Hwy",
        city: "Costa Mesa",
        state: "CA",
        features: {
          indoor: false,
          climate_controlled: false,
          "24h_access": true,
          security_system: true,
          vehicle_washing: false
        },
        price_range: parsePriceRange(250, 550),
        contact_phone: "(714) 555-4321",
        contact_email: "info@coastalrvstorage.com",
        avg_rating: 4.7,
        review_count: 33
      },
      {
        name: "SoCal RV Storage – San Bernardino",
        address: "1500 N D Street",
        city: "San Bernardino",
        state: "CA",
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
        review_count: 20
      },
      {
        name: "LA RV Storage – Los Angeles",
        address: "1234 E 7th Street",
        city: "Los Angeles",
        state: "CA",
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
        review_count: 30
      },
      {
        name: "West Coast RV Storage – San Diego",
        address: "4567 Ocean Blvd",
        city: "San Diego",
        state: "CA",
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
        review_count: 45
      },
      {
        name: "Golden State RV Storage – Oakland",
        address: "789 Industrial Rd",
        city: "Oakland",
        state: "CA",
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
        review_count: 15
      },
      {
        name: "RV Vault California – San Jose",
        address: "200 Tech Road",
        city: "San Jose",
        state: "CA",
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
        review_count: 22
      },
      {
        name: "Valley Indoor RV Storage – Chatsworth",
        address: "20701 Plummer Street",
        city: "Chatsworth",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        price_range: parsePriceRange(265, 565),
        contact_phone: "(818) 701-6500",
        contact_email: "info@valleyindoorrvstorage.com",
        avg_rating: 4.8,
        review_count: 66
      },
      {
        name: "24 Hour Recreational Storage – Rocklin",
        address: "3500 Cincinnati Ave, Suite 200",
        city: "Rocklin",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": true,
          security_system: true,
          vehicle_washing: true
        },
        price_range: parsePriceRange(165, 505),
        contact_phone: "(916) 630-9000",
        avg_rating: 4.9,
        review_count: 12
      },
      {
        name: "RV Storage Depot – Norwalk",
        address: "13555 Excelsior Dr",
        city: "Norwalk",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        price_range: parsePriceRange(184, 379),
        contact_phone: "(562) 868-0000"
      },
      {
        name: "RV Storage Depot – Santa Ana",
        address: "1316 E. Warner Ave",
        city: "Santa Ana",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        contact_phone: "(714) 547-0000",
        price_range: parsePriceRange(0, 0)
      },
      {
        name: "RV Storage Depot – McClellan Park",
        address: "4805 Urbani Way",
        city: "McClellan Park",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        contact_phone: "(916) 630-9000",
        price_range: parsePriceRange(0, 0)
      },
      {
        name: "Johnson RV – Gilroy",
        address: "7900 Arroyo Circle",
        city: "Gilroy",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: true
        },
        contact_phone: "(408) 843-9140",
        price_range: parsePriceRange(200, 350)
      },
      {
        name: "Premier Indoor Storage – Rancho Cucamonga",
        address: "9275 Buffalo Ave",
        city: "Rancho Cucamonga",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: true
        },
        price_range: parsePriceRange(200, 400),
        contact_phone: "(909) 476-9999",
        avg_rating: 4.5,
        review_count: 40
      },
      {
        name: "Acton Indoors RV & Boat Storage – Acton",
        address: "2210 Soledad Canyon Rd",
        city: "Acton",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        contact_phone: "(661) 268-0000",
        price_range: parsePriceRange(200, 350)
      },
      {
        name: "Big Toy Depot – San Diego",
        address: "7515 Britannia Ct",
        city: "San Diego",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": true,
          security_system: true,
          vehicle_washing: true
        },
        contact_phone: "(619) 661-8300",
        contact_email: "info@bigtoydepot.com",
        price_range: parsePriceRange(200, 400),
        avg_rating: 4.9,
        review_count: 71
      },
      {
        name: "Discovery Indoor Boat & RV Storage",
        address: "141 Commerce Cir",
        city: "Sacramento",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: false,
          "24h_access": false,
          security_system: true,
          vehicle_washing: true
        },
        contact_phone: "(916) 246-9100",
        price_range: parsePriceRange(0, 0),
        avg_rating: 4.8,
        review_count: 25
      },
      {
        name: "Power Sports Indoor RV & Boat Storage",
        address: "22324 Temescal Canyon Rd STE B",
        city: "Corona",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: false,
          "24h_access": true,
          security_system: true,
          vehicle_washing: true
        },
        contact_phone: "(951) 603-0884",
        price_range: parsePriceRange(0, 0),
        avg_rating: 4.6,
        review_count: 19
      },
      {
        name: "Viking RV Storage – Shingle Springs",
        address: "4481 Business Dr",
        city: "Shingle Springs",
        state: "CA",
        features: {
          indoor: false,
          climate_controlled: false,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        contact_phone: "(530) 676-1100",
        price_range: parsePriceRange(0, 0),
        avg_rating: 4.7,
        review_count: 37
      },
      {
        name: "Bay Indoor RV & Boat Storage – Antioch",
        address: "1400 W 4th St",
        city: "Antioch",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: false,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        contact_phone: "(925) 826-7600",
        price_range: parsePriceRange(0, 0),
        avg_rating: 4.5,
        review_count: 27
      },
      {
        name: "River City Indoor RV & Boat Storage – Sacramento",
        address: "8301 Belvedere Ave Ste 100",
        city: "Sacramento",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: false,
          "24h_access": true,
          security_system: true,
          vehicle_washing: false
        },
        contact_phone: "(916) 398-2050",
        price_range: parsePriceRange(0, 0),
        avg_rating: 4.5,
        review_count: 38
      },
      {
        name: "Exclusive RV Services, Inc.",
        address: "1234 Reservoir St",
        city: "Pomona",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": true,
          security_system: true,
          vehicle_washing: true
        },
        contact_phone: "(909) 465-9492",
        price_range: parsePriceRange(0, 0)
      },
      {
        name: "Allec Self Storage",
        address: "9750 Galena St",
        city: "Riverside",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        contact_phone: "(951) 681-3396",
        price_range: parsePriceRange(0, 0)
      },
      {
        name: "Anaheim RV Storage",
        address: "1234 Storage Way",
        city: "Anaheim",
        state: "CA",
        features: {
          indoor: false,
          climate_controlled: false,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        price_range: parsePriceRange(0, 0)
      },
      {
        name: "Red Carpet RV & Boat Storage – Santa Ana",
        address: "3130 S Fairview St",
        city: "Santa Ana",
        state: "CA",
        features: {
          indoor: false,
          climate_controlled: false,
          "24h_access": false,
          security_system: true,
          vehicle_washing: true
        },
        contact_phone: "(714) 426-9986",
        price_range: parsePriceRange(0, 0)
      },
      {
        name: "RecNation RV & Boat Storage – Sacramento",
        address: "5650 66th Ave",
        city: "Sacramento",
        state: "CA",
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        contact_phone: "(916) 395-5563",
        price_range: parsePriceRange(0, 0)
      },
      {
        name: "Beach Cities RV Storage – Costa Mesa",
        address: "392 W Wilson St",
        city: "Costa Mesa",
        state: "CA",
        features: {
          indoor: false,
          climate_controlled: false,
          "24h_access": false,
          security_system: true,
          vehicle_washing: false
        },
        price_range: parsePriceRange(200, 200),
        contact_phone: "(714) 210-2588"
      }
    ];

    try {
      const facilitiesWithDefaults = californiaFacilities.map(facility => ({
        ...facility,
        // Ensure required fields are present
        latitude: facility.latitude || 0,
        longitude: facility.longitude || 0,
        zip_code: facility.zip_code || '00000',
        verified_fields: {
          features: true,
          price_range: true,
          contact_info: true,
          location: true,
          business_hours: false
        }
      }));

      const { data, error } = await supabase
        .from('storage_facilities')
        .insert(facilitiesWithDefaults)
        .select();

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['storage-facilities'] });
      await queryClient.invalidateQueries({ queryKey: ['state-counts'] });
      
      toast.success('All 31 California facilities added successfully!');
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
              Adding 31 California Facilities...
            </>
          ) : (
            'Add 31 California Facilities'
          )}
        </Button>
      </form>
    </Card>
  );
};
