
import React from 'react';
import ResponsiveFacilityMap from './ResponsiveFacilityMap';

const FacilityMapExample: React.FC = () => {
  const facilityName = "Covered RV Solutions";
  const facilityLocation = {
    lat: 36.1699,
    lng: -115.1398
  };
  
  const facilityFeatures = [
    { name: "Indoor Storage", available: true },
    { name: "Climate Controlled", available: true },
    { name: "Security System", available: true },
    { name: "Vehicle Washing", available: true },
    { name: "24/7 Access", available: false }
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
        Featured Storage Location
      </h2>
      
      <ResponsiveFacilityMap
        name={facilityName}
        location={facilityLocation}
        address="456 Safe Harbor Dr, Las Vegas, Nevada"
        phoneNumber="(725) 555-0123"
        features={facilityFeatures}
        description="Explore our premium indoor RV storage facility with climate control and 24/7 security."
        apiKey="AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o"
      />
    </div>
  );
};

export default FacilityMapExample;
