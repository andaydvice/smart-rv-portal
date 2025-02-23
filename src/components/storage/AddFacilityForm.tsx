
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
        name: "Octane Marine Indoor Boat & RV Storage",
        address: "N/A (North Phoenix area)",
        city: "Phoenix",
        state: "AZ",
        zip_code: "85001", // Default Phoenix zip
        latitude: 33.4484, // Phoenix coordinates
        longitude: -112.0740,
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": true,
          security_system: true,
          vehicle_washing: false
        },
        price_range: parsePriceRange(0, 0),
        contact_phone: null,
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
      },
      {
        name: "National Indoor RV Centers – Phoenix",
        address: "11280 N Solar Canyon Way",
        city: "Surprise",
        state: "AZ",
        zip_code: "85378",
        latitude: 33.6292, // Surprise coordinates
        longitude: -112.3680,
        features: {
          indoor: true,
          climate_controlled: true,
          "24h_access": true,
          security_system: true,
          vehicle_washing: true
        },
        price_range: parsePriceRange(0, 0),
        contact_phone: "520-442-2500",
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
