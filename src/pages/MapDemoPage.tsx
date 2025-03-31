
import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import { Container } from '@/components/ui/container';
import MapExample from '@/components/map/MapExample';
import '../styles/map-modal.css';

const MapDemoPage: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <Container className="py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Google Maps Demo</h1>
        <p className="text-gray-300 mb-8">
          Interactive map showing storage facility locations with detailed information modal.
        </p>
        
        <MapExample />
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">How to Use</h2>
          <p className="text-gray-300">
            Click on any marker to view detailed information about the storage facility.
            The modal window provides comprehensive details including features, pricing,
            contact information and more.
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default MapDemoPage;
