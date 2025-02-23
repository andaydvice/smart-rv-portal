
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

// Convert text to proper boolean values
const getBooleanValue = (value: string | undefined): boolean => {
  if (!value) return false;
  const lowered = value.toLowerCase();
  return lowered === 'yes' || lowered === 'true';
};

// Function to parse price range
const parsePriceRange = (min: string | number, max: string | number) => {
  const minAmount = typeof min === 'number' ? min : 0;
  const maxAmount = typeof max === 'number' ? max : 0;
  return {
    min: minAmount,
    max: maxAmount,
    currency: "USD"
  };
};

export default function AddFacilityForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Sample data for Arizona facilities
    const arizonaFacilities = [
      {
        name: "Arrowhead RV & Boat Storage",
        address: "9701 West Peoria Avenue",
        city: "Peoria",
        state: "AZ",
        zip_code: "85345",
        latitude: 33.5806,
        longitude: -112.2583,
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": true,
          security_system: true,
          vehicle_washing: true
        },
        price_range: parsePriceRange(220, 599),
        contact_phone: "(623) 537-4200",
        contact_email: "info@arrowhead-storage.com",
        avg_rating: 5.0,
        review_count: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        additional_services: null,
        amenities: null,
        availability: null,
        business_hours: null,
        cancellation_policy: null,
        description: "Premium garages with insulation and low-amp power available",
        dimensions: null,
        images: null,
        insurance_requirements: null,
        security_details: "24-hour video surveillance, gated access, motion-activated lighting",
        verified_fields: null,
        website_url: null
      },
      {
        name: "I-10 RV Storage",
        address: "6740 W Germann Rd",
        city: "Chandler",
        state: "AZ",
        zip_code: "85226",
        latitude: 33.2777,
        longitude: -111.9649,
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": true,
          security_system: true,
          vehicle_washing: true
        },
        price_range: parsePriceRange(428, 560),
        contact_phone: "(480) 841-5770",
        contact_email: null,
        avg_rating: null,
        review_count: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        additional_services: null,
        amenities: null,
        availability: null,
        business_hours: null,
        cancellation_policy: null,
        description: null,
        dimensions: null,
        images: null,
        insurance_requirements: null,
        security_details: "Electronic gate, keypad access, 24-hour surveillance",
        verified_fields: null,
        website_url: null
      },
      {
        name: "Carefree Covered RV Storage – Apache Junction",
        address: "535 E 37th Ave",
        city: "Apache Junction",
        state: "AZ",
        zip_code: "85119",
        latitude: 33.3918,
        longitude: -111.5468,
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": false,
          security_system: true,
          vehicle_washing: true
        },
        price_range: parsePriceRange(0, 0),
        contact_phone: "(480) 983-7600",
        contact_email: null,
        avg_rating: 4.99,
        review_count: 745,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        additional_services: null,
        amenities: null,
        availability: null,
        business_hours: "5:00 AM – 10:00 PM",
        cancellation_policy: null,
        description: null,
        dimensions: null,
        images: null,
        insurance_requirements: null,
        security_details: "24-hour surveillance, gated access, on-site manager",
        verified_fields: null,
        website_url: null
      },
      {
        name: "Pecos Storage",
        address: "3087 E Pecos Rd",
        city: "Phoenix",
        state: "AZ",
        zip_code: "85048",
        latitude: 33.2977,
        longitude: -111.9873,
        features: {
          indoor: true,
          climate_controlled: false,
          "24h_access": true,
          security_system: true,
          vehicle_washing: false
        },
        price_range: parsePriceRange(0, 0),
        contact_phone: "(480) 252-6670",
        contact_email: null,
        avg_rating: null,
        review_count: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        additional_services: null,
        amenities: null,
        availability: null,
        business_hours: null,
        cancellation_policy: null,
        description: null,
        dimensions: null,
        images: null,
        insurance_requirements: null,
        security_details: "Gated access with enhanced physical security measures",
        verified_fields: null,
        website_url: null
      },
      {
        name: "Phoenix Bargain Storage",
        address: "4200 N Black Canyon Highway",
        city: "Phoenix",
        state: "AZ",
        zip_code: "85017",
        latitude: 33.4984,
        longitude: -112.0937,
        features: {
          indoor: true,
          climate_controlled: false,
          "24h_access": true,
          security_system: true,
          vehicle_washing: false
        },
        price_range: parsePriceRange(155, 200),
        contact_phone: "(602) 249-1001",
        contact_email: null,
        avg_rating: null,
        review_count: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        additional_services: null,
        amenities: null,
        availability: null,
        business_hours: null,
        cancellation_policy: null,
        description: null,
        dimensions: null,
        images: null,
        insurance_requirements: null,
        security_details: null,
        verified_fields: null,
        website_url: null
      }
    ];

    try {
      // Insert facilities one at a time
      for (const facility of arizonaFacilities) {
        const { error } = await supabase
          .from('storage_facilities')
          .insert(facility);

        if (error) throw error;
      }

      toast.success('Arizona facilities added successfully!');
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      });
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
        <div>
          <Label htmlFor="name">Facility Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            placeholder="Enter facility name"
            className="bg-[#080F1F] border-gray-700"
          />
        </div>
        
        <div>
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            required
            placeholder="Enter street address"
            className="bg-[#080F1F] border-gray-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              required
              placeholder="Enter city"
              className="bg-[#080F1F] border-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              required
              placeholder="Enter state (e.g., AZ)"
              maxLength={2}
              className="bg-[#080F1F] border-gray-700"
            />
          </div>
        </div>

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
            'Add Arizona Facilities'
          )}
        </Button>
      </form>
    </Card>
  );
}
