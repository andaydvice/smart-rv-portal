
import React from 'react';
import GoogleMapWithModal, { Location } from './GoogleMapWithModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MapExample: React.FC = () => {
  // Sample location data
  const locations: Location[] = [
    {
      id: '1',
      lat: 44.9778, 
      lng: -93.2650,
      name: 'Paul Bunyan Mini Storage',
      description: 'A secure storage facility with multiple unit sizes available for both short and long-term rentals. Our facility features 24/7 surveillance and climate-controlled units.',
      address: '3050 Irvine Ave NW, Bemidji, Minnesota',
      features: ['Indoor', 'Climate Controlled', '24/7 Access', 'Security'],
      price: '$85 - $177',
      phone: '(218) 751-1064'
    },
    {
      id: '2',
      lat: 41.8781,
      lng: -87.6298,
      name: 'Chicago Metro Storage',
      description: 'Centrally located storage facility in Chicago with easy access from major highways. Offering various unit sizes with premium security features.',
      address: '123 Michigan Ave, Chicago, IL',
      features: ['Climate Controlled', 'Security', 'Drive-up Access'],
      price: '$95 - $250',
      phone: '(312) 555-1234'
    },
    {
      id: '3',
      lat: 34.0522,
      lng: -118.2437,
      name: 'LA Downtown Storage Solutions',
      description: 'Premium storage units in downtown Los Angeles. Convenient location with flexible access hours and professional management.',
      address: '456 Main St, Los Angeles, CA',
      features: ['24/7 Access', 'Indoor', 'Vehicle Storage'],
      price: '$110 - $350',
      phone: '(213) 555-6789'
    }
  ];

  return (
    <Card className="bg-[#080F1F] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Storage Facilities Map</CardTitle>
      </CardHeader>
      <CardContent>
        <GoogleMapWithModal 
          locations={locations} 
          mapCenter={{ lat: 39.8283, lng: -98.5795 }} 
          mapZoom={4}
        />
      </CardContent>
    </Card>
  );
};

export default MapExample;
