// Emergency fallback data for when Supabase fails
import { StorageFacility } from './types';

export const emergencyFacilityData: StorageFacility[] = [
  {
    id: 'emergency-1',
    name: 'Downtown Storage Solutions',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    latitude: 40.7128,
    longitude: -74.0060,
    features: {
      indoor: true,
      climate_controlled: true,
      security_system: true,
      '24h_access': false,
      vehicle_washing: false
    },
    price_range: {
      min: 150,
      max: 300,
      currency: 'USD'
    },
    contact_phone: '(555) 123-4567',
    contact_email: 'info@downtownstorage.com',
    avg_rating: 4.5,
    review_count: 42,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: true
    }
  },
  {
    id: 'emergency-2',
    name: 'California Coast Storage',
    address: '456 Ocean Blvd',
    city: 'Los Angeles',
    state: 'CA',
    latitude: 34.0522,
    longitude: -118.2437,
    features: {
      indoor: false,
      climate_controlled: false,
      security_system: true,
      '24h_access': true,
      vehicle_washing: true
    },
    price_range: {
      min: 200,
      max: 450,
      currency: 'USD'
    },
    contact_phone: '(555) 987-6543',
    contact_email: 'hello@coaststorage.com',
    avg_rating: 4.8,
    review_count: 89,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: true
    }
  },
  {
    id: 'emergency-3',
    name: 'Texas Secure Storage',
    address: '789 Ranch Rd',
    city: 'Austin',
    state: 'TX',
    latitude: 30.2672,
    longitude: -97.7431,
    features: {
      indoor: true,
      climate_controlled: true,
      security_system: true,
      '24h_access': true,
      vehicle_washing: false
    },
    price_range: {
      min: 100,
      max: 250,
      currency: 'USD'
    },
    contact_phone: '(555) 456-7890',
    contact_email: 'contact@texasstorage.com',
    avg_rating: 4.2,
    review_count: 63,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: true
    }
  }
];

export const getEmergencyMaxPrice = (): number => {
  return Math.max(...emergencyFacilityData.map(f => f.price_range?.max || 0));
};