
import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import FacilityMapExample from '@/components/map/FacilityMapExample';

const MapFacilityDemo: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <FacilityMapExample />
      </div>
    </Layout>
  );
};

export default MapFacilityDemo;
