
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";

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
  const rating = Math.min(Math.max(locationDetails.rating, 1), 5);

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
          
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                }`}
              />
            ))}
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
