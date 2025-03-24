
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import MapboxReliableLoader from './MapboxReliableLoader';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ReliableMapExampleProps {
  mapToken: string;
  className?: string;
}

const ReliableMapExample: React.FC<ReliableMapExampleProps> = ({
  mapToken,
  className
}) => {
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey(prev => prev + 1);
    toast.info("Reloading map...");
  };
  
  const handleMapLoaded = () => {
    toast.success("Map successfully loaded");
  };

  return (
    <Card className={`bg-[#080F1F] border-gray-700 ${className}`}>
      <div className="flex flex-col">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Reliable MapBox Map</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReload}
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            Reload Map
          </Button>
        </div>
        
        <div className="p-0">
          {/* Key prop forces complete re-render when reloaded */}
          <MapboxReliableLoader 
            key={reloadKey}
            mapToken={mapToken}
            onMapLoaded={handleMapLoaded}
            className="h-[650px]"
          />
        </div>
      </div>
    </Card>
  );
};

export default ReliableMapExample;
