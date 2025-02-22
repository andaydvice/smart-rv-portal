
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

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

    try {
      // First, get coordinates from the address
      const { data: geoData, error: geoError } = await supabase.functions.invoke('geocode-address', {
        body: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip
        }
      });

      if (geoError || !geoData) {
        throw new Error(geoError?.message || 'Failed to geocode address');
      }

      // Create the facility using our database function
      const { data, error } = await supabase.rpc(
        'create_storage_facility_with_geocoding',
        {
          facility_name: formData.name,
          facility_address: formData.address,
          facility_city: formData.city,
          facility_state: formData.state,
          facility_zip: formData.zip
        }
      );

      if (error) throw error;

      // Update the coordinates
      const { error: updateError } = await supabase
        .from('storage_facilities')
        .update({
          latitude: geoData.latitude,
          longitude: geoData.longitude
        })
        .eq('id', data);

      if (updateError) throw updateError;

      toast.success('Facility added successfully!');
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      });
    } catch (error) {
      console.error('Error adding facility:', error);
      toast.error(error.message || 'Failed to add facility');
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

        <div>
          <Label htmlFor="zip">ZIP Code</Label>
          <Input
            id="zip"
            value={formData.zip}
            onChange={(e) => setFormData(prev => ({ ...prev, zip: e.target.value }))}
            required
            placeholder="Enter ZIP code"
            pattern="[0-9]{5}"
            className="bg-[#080F1F] border-gray-700"
          />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Facility...
            </>
          ) : (
            'Add Facility'
          )}
        </Button>
      </form>
    </Card>
  );
}
