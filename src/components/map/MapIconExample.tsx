
import React from 'react';
import InteractiveMapIcon from './InteractiveMapIcon';

const MapIconExample = () => {
  const locationDetails = {
    name: "Global Self Storage",
    rating: 4,
    address: "13942 E 96th St, Ste 115, McCordsville, Indiana",
    otherDetails: "Climate controlled indoor storage facility with 24/7 access and security.",
    price: "$229 - $699",
    phone: "(317) 688-1760"
  };

  const handleClick = () => {
    console.log('Map icon clicked');
  };

  return (
    <div className="p-8 bg-[#080F1F] min-h-screen flex items-center justify-center">
      <InteractiveMapIcon
        onClick={handleClick}
        locationDetails={locationDetails}
      />
    </div>
  );
};

export default MapIconExample;
