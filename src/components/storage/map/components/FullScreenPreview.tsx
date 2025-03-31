
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import GoogleMapView from '../GoogleMapView';
import { StorageFacility } from '../../types';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface FullScreenPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  apiKey?: string;
  selectedState?: string | null;
  highlightedFacility?: string | null;
  onMarkerClick?: (facilityId: string) => void;
}

export function FullScreenPreview({
  isOpen,
  onClose,
  facilities,
  recentlyViewedFacilityIds,
  apiKey,
  selectedState,
  highlightedFacility,
  onMarkerClick
}: FullScreenPreviewProps) {
  // Use responsive layout based on screen size
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  // Handle escape key to close the preview
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // Create a mobile drawer or desktop dialog based on screen size
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] h-[95vh] p-0 bg-[#080F1F]">
          <div className="relative w-full h-full">
            <button 
              className="absolute top-4 right-4 z-50 bg-black/60 text-white rounded-full p-2"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="w-full h-full">
              <GoogleMapView
                facilities={facilities}
                recentlyViewedFacilityIds={recentlyViewedFacilityIds}
                onMarkerClick={onMarkerClick}
                apiKey={apiKey}
                selectedState={selectedState}
                fullScreenMode={true}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[95vh] bg-[#080F1F]">
        <div className="relative w-full h-full p-0">
          <button 
            className="absolute top-4 right-4 z-50 bg-black/60 text-white rounded-full p-2"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="w-full h-full pt-2">
            <GoogleMapView
              facilities={facilities}
              recentlyViewedFacilityIds={recentlyViewedFacilityIds}
              onMarkerClick={onMarkerClick}
              apiKey={apiKey}
              selectedState={selectedState}
              fullScreenMode={true}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default FullScreenPreview;
