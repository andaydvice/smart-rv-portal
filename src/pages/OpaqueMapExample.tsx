
import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OpaqueMapModal, { LocationData } from '@/components/maps/OpaqueMapModal';
import '../styles/opaque-map-modal.css'; // Import the styles

const OpaqueMapExample: React.FC = () => {
  // Sample location data
  const locations: LocationData[] = [
    {
      id: '1',
      lat: 44.9778, 
      lng: -93.2650,
      name: 'Paul Bunyan Mini Storage',
      address: '3050 Irvine Ave NW, Bemidji, Minnesota',
      price: '$85 - $177',
      phone: '(218) 751-1064',
      features: ['Indoor', 'Climate Controlled', '24/7 Access', 'Security'],
      description: 'A secure storage facility with multiple unit sizes available for both short and long-term rentals.'
    },
    {
      id: '2',
      lat: 41.8781,
      lng: -87.6298,
      name: 'Chicago Metro Storage',
      address: '123 Michigan Ave, Chicago, IL',
      price: '$95 - $250',
      phone: '(312) 555-1234',
      features: ['Climate Controlled', 'Security', 'Drive-up Access'],
      description: 'Centrally located storage facility in Chicago with easy access from major highways.'
    },
    {
      id: '3',
      lat: 34.0522,
      lng: -118.2437,
      name: 'LA Downtown Storage Solutions',
      address: '456 Main St, Los Angeles, CA',
      price: '$110 - $350',
      phone: '(213) 555-6789',
      features: ['24/7 Access', 'Indoor', 'Vehicle Storage'],
      description: 'Premium storage units in downtown Los Angeles with flexible access hours.'
    }
  ];

  // This API key is already exposed in your HTML, so we're using the same one
  const apiKey = 'AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o';

  return (
    <Layout>
      <Navbar />
      <Container className="py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Storage Facilities Map</h1>
        <p className="text-gray-300 mb-8">
          Interactive map showing storage facility locations with fully opaque information modals.
        </p>
        
        <Card className="bg-[#080F1F] border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Storage Facilities Map</CardTitle>
          </CardHeader>
          <CardContent>
            <OpaqueMapModal 
              locations={locations} 
              apiKey={apiKey}
              mapCenter={{ lat: 39.8283, lng: -98.5795 }}
              mapZoom={4}
            />
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">How to Use</h2>
          <p className="text-gray-300">
            Click on any marker to view detailed information about the storage facility.
            The modal window provides comprehensive details with guaranteed visibility against the map background.
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default OpaqueMapExample;
