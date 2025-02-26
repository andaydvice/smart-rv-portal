
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface FacilityFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  features: {
    indoor: boolean;
    climate_controlled: boolean;
    "24h_access": boolean;
    security_system: boolean;
    vehicle_washing: boolean;
  };
  price_range: {
    min: number;
    max: number;
    currency: string;
  };
}

const AddFacilityForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FacilityFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: FacilityFormData) => {
    try {
      // Call Geocoding Edge Function to get coordinates
      const { data: geoData, error: geoError } = await supabase.functions.invoke('geocode-address', {
        body: {
          type: 'geocode',
          address: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`
        }
      });

      if (geoError || !geoData?.coordinates) {
        throw new Error('Failed to geocode address');
      }

      const { data: facility, error } = await supabase
        .from('storage_facilities')
        .insert({
          name: data.name,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zipCode,
          latitude: geoData.coordinates[1],
          longitude: geoData.coordinates[0],
          features: data.features,
          price_range: data.price_range
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Facility added successfully",
      });
    } catch (error) {
      console.error('Error adding facility:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add facility. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Facility Name</Label>
          <Input
            id="name"
            className="bg-[#131a2a] border-gray-700 text-white"
            {...register('name', { required: true })}
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            className="bg-[#131a2a] border-gray-700 text-white"
            {...register('address', { required: true })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              className="bg-[#131a2a] border-gray-700 text-white"
              {...register('city', { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Select onValueChange={(value) => setValue('state', value)}>
              <SelectTrigger className="bg-[#131a2a] border-gray-700 text-white">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f2e] border-gray-700">
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="Arizona">Arizona</SelectItem>
                <SelectItem value="Texas">Texas</SelectItem>
                <SelectItem value="Florida">Florida</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            className="bg-[#131a2a] border-gray-700 text-white"
            {...register('zipCode', { required: true })}
          />
        </div>

        <div className="space-y-4">
          <Label>Features</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="indoor"
                onCheckedChange={(checked) => setValue('features.indoor', checked)}
              />
              <Label htmlFor="indoor">Indoor Storage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="climate"
                onCheckedChange={(checked) => setValue('features.climate_controlled', checked)}
              />
              <Label htmlFor="climate">Climate Controlled</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="24h"
                onCheckedChange={(checked) => setValue('features.24h_access', checked)}
              />
              <Label htmlFor="24h">24/7 Access</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="security"
                onCheckedChange={(checked) => setValue('features.security_system', checked)}
              />
              <Label htmlFor="security">Security System</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="washing"
                onCheckedChange={(checked) => setValue('features.vehicle_washing', checked)}
              />
              <Label htmlFor="washing">Vehicle Washing</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-price">Minimum Price</Label>
              <Input
                id="min-price"
                type="number"
                className="bg-[#131a2a] border-gray-700 text-white"
                {...register('price_range.min', { required: true, min: 0 })}
              />
            </div>
            <div>
              <Label htmlFor="max-price">Maximum Price</Label>
              <Input
                id="max-price"
                type="number"
                className="bg-[#131a2a] border-gray-700 text-white"
                {...register('price_range.max', { required: true, min: 0 })}
              />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
        Add Facility
      </Button>
    </form>
  );
};

export default AddFacilityForm;
