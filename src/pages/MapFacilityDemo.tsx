
import React from 'react';
import Layout from '@/components/layout/Layout';
import FacilityMapExample from '@/components/map/FacilityMapExample';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';

const MapFacilityDemo: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
        <FacilityMapExample />
        
        <div className="mt-12">
          <OptimizedAffiliateGrid
            title="Storage & Location Services"
            subtitle="Find the perfect storage solutions and location-based services for your RV adventures."
            partners={[
              {
                partner: 'goodsam',
                title: 'Storage Facility Network',
                description: 'Access to trusted storage facilities nationwide with verified security and climate control',
                features: ['Verified facilities', 'Security monitoring', 'Climate control', 'Nationwide network']
              },
              {
                partner: 'rvlife',
                title: 'Location Planning Tools',
                description: 'Advanced mapping and location tools for finding the best storage and camping spots',
                features: ['Interactive maps', 'Location reviews', 'Facility ratings', 'Route planning']
              },
              {
                partner: 'rvlife',
                title: 'Storage Monitoring Systems',
                description: 'Smart monitoring technology to keep track of your RV while in storage',
                features: ['Remote monitoring', 'Security alerts', 'Climate tracking', 'Peace of mind']
              }
            ]}
            gridCols="3"
          />
        </div>
      </div>
    </Layout>
  );
};

export default MapFacilityDemo;
