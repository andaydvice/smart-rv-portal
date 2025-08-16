
import React from 'react';
import Layout from '@/components/layout/Layout';
import FacilityMapExample from '@/components/map/FacilityMapExample';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import SEO from "@/components/seo/SEO";
import { organizationSchema, breadcrumbSchema, localBusinessSchema, serviceSchema } from "@/components/seo/schemas";

const MapFacilityDemo: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="RV Facility Map Demo | Interactive Storage & Service Locations"
        description="Explore our interactive RV facility map demo featuring storage locations, service centers, and location-based services for smart RV travel planning."
        keywords="RV facility map, RV storage locations, RV service centers, interactive RV map, RV facility finder, location services"
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/map-facility-demo` : ''}
        ogImage="/og-image.svg"
        ogImageAlt="Interactive RV Facility Map Demo"
        twitterCard="summary_large_image"
        openGraph={{
          type: "website"
        }}
        structuredData={[
          organizationSchema,
          localBusinessSchema,
          breadcrumbSchema([
            { name: 'Home', url: typeof window !== 'undefined' ? window.location.origin : '' },
            { name: 'Map Demo', url: typeof window !== 'undefined' ? `${window.location.origin}/map-facility-demo` : '' }
          ]),
          serviceSchema({
            name: "RV Facility Location Services",
            description: "Interactive mapping and location services for RV storage facilities and service centers",
            provider: "Smart RV Technology Hub",
            serviceType: "Location Services"
          })
        ]}
      />
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
                partner: 'technorv',
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
