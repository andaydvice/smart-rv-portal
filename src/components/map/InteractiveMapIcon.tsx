
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StarRating from "@/components/ui/star-rating";

interface LocationDetails {
  name: string;
  rating: number;
  address: string;
  otherDetails: string;
  price?: string;
  phone?: string;
}

interface InteractiveMapIconProps {
  onClick: () => void;
  locationDetails: LocationDetails;
}

const InteractiveMapIcon: React.FC<InteractiveMapIconProps> = ({
  onClick,
  locationDetails
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setShowModal(true);
    onClick();

    // Reset the clicked state after animation
    setTimeout(() => setIsClicked(false), 300);
  };

  // Validate rating
  const rating = Math.min(Math.max(locationDetails.rating, 0), 5);

  // Get rating description based on the facility type
  const getRatingDescription = () => {
    if (locationDetails.name.includes("Indoor")) {
      return "Indoor storage quality rating";
    } else if (locationDetails.name.includes("Security")) {
      return "Security features rating";
    } else {
      return "Overall facility rating";
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`
          transition-all duration-300 cursor-pointer
          ${isClicked ? 'scale-110' : 'scale-100 hover:scale-105'}
        `}
      >
        <MapPin
          className={`w-8 h-8 ${
            isClicked ? 'text-[#F97316]' : 'text-[#60A5FA]'
          } transition-colors duration-300`}
        />
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] bg-[#131a2a] text-white border-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#60A5FA] mb-2">
              {locationDetails.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mb-4">
            <StarRating 
              rating={rating} 
              description={getRatingDescription()}
              readonly
              size="lg"
              className="mb-1"
            />
          </div>

          <div className="space-y-4">
            <p className="text-lg">{locationDetails.address}</p>
            
            {locationDetails.price && (
              <p className="text-xl font-medium text-[#F97316]">
                Price: {locationDetails.price}
              </p>
            )}
            
            {locationDetails.phone && (
              <p className="text-lg">
                Phone: {locationDetails.phone}
              </p>
            )}
            
            <p className="text-gray-300">
              {locationDetails.otherDetails}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InteractiveMapIcon;
