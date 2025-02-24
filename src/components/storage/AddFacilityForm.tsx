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
  const queryClient = useQueryClient();
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
      }
    ];

    try {
      console.log('Starting to add facilities...');
      
      const { data: existingFacilities, error: checkError } = await supabase
        .from('storage_facilities')
        .select('name, state')
        .eq('state', 'AZ');

      if (checkError) {
        throw checkError;
      }

      console.log('Existing AZ facilities:', existingFacilities);

      for (const facility of arizonaFacilities) {
        console.log(`Adding facility: ${facility.name}`);
        
        const { data, error } = await supabase
          .from('storage_facilities')
          .insert(facility)
          .select();

        if (error) {
          console.error(`Error adding ${facility.name}:`, error);
          throw error;
        }

        console.log(`Successfully added ${facility.name}:`, data);
      }

      await queryClient.invalidateQueries({ queryKey: ['storage-facilities'] });
      await queryClient.invalidateQueries({ queryKey: ['state-counts'] });
      
      toast.success('Arizona facilities added successfully!');
      
      const { data: updatedFacilities, error: verifyError } = await supabase
        .from('storage_facilities')
        .select('name, state')
        .eq('state', 'AZ');

      if (verifyError) {
        console.error('Error verifying updated facilities:', verifyError);
      } else {
        console.log('Updated AZ facilities count:', updatedFacilities?.length);
      }

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
