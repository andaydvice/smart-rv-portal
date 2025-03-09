import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';
import { StorageFacility } from '../types';

interface FacilityListProps {
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onFacilityClick: (facilityId: string) => void;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  onClose?: () => void;
}

const FacilityList: React.FC<FacilityListProps> = ({
  facilities,
  highlightedFacility,
  onFacilityClick,
  scrollAreaRef,
  onClose
}) => {
  // Helper function to find a facility by ID
  const getFacilityById = (id: string): StorageFacility | undefined => {
    return facilities.find(facility => facility.id === id);
  };

  const selectedFacility = highlightedFacility ? getFacilityById(highlightedFacility) : null;

  // If a facility is selected, show its details
  if (selectedFacility) {
    return (
      <div className="p-4 relative">
        <div className="absolute top-2 right-2 z-10">
          <button 
            onClick={onClose}
            className="rounded-full bg-gray-800 hover:bg-gray-700 p-1 text-gray-200"
            aria-label="Close facility details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-2">{selectedFacility.name}</h2>
        <p className="text-gray-300 mb-4">{selectedFacility.address}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-400">Price Range</p>
            <p className="text-lg text-white">${selectedFacility.price_range.min} - ${selectedFacility.price_range.max}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-400">Rating</p>
            <p className="text-lg text-white">{selectedFacility.rating} ★</p>
          </div>
        </div>
        
        <h3 className="text-md font-medium text-white mb-2">Features</h3>
        <ul className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(selectedFacility.features).map(([key, value]) => (
            value ? (
              <li key={key} className="text-sm bg-gray-800 p-2 rounded flex items-center text-gray-300">
                <span className="mr-2 h-2 w-2 rounded-full bg-[#5B9BD5]"></span>
                {key.replace(/_/g, ' ')}
              </li>
            ) : null
          ))}
        </ul>
        
        <h3 className="text-md font-medium text-white mb-2">Contact Information</h3>
        <div className="bg-gray-800 p-3 rounded mb-4">
          <p className="text-gray-300 mb-1">{selectedFacility.phone}</p>
          <p className="text-gray-300">{selectedFacility.email}</p>
        </div>
        
        {selectedFacility.description && (
          <>
            <h3 className="text-md font-medium text-white mb-2">Description</h3>
            <p className="text-gray-300 bg-gray-800 p-3 rounded">{selectedFacility.description}</p>
          </>
        )}
      </div>
    );
  }

  // Otherwise, show the list of facilities
  return (
    <ScrollArea className="h-[600px]" ref={scrollAreaRef}>
      <div className="p-2">
        <div className="text-sm text-gray-400 mb-2 px-2">
          {facilities.length} facilities found
        </div>
        <div className="space-y-2">
          {facilities.map(facility => (
            <Card 
              key={facility.id} 
              className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => onFacilityClick(facility.id)}
            >
              <CardContent className="p-3">
                <h3 className="font-medium text-white">{facility.name}</h3>
                <p className="text-gray-400 text-sm">{facility.address}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-[#5B9BD5]">${facility.price_range.min} - ${facility.price_range.max}</div>
                  <div className="text-gray-400">{facility.rating} ★</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default FacilityList;
