
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InfiniteLoadingMap from './InfiniteLoadingMap';

interface MapInfiniteLoadingDemoProps {
  mapToken: string;
}

const MapInfiniteLoadingDemo: React.FC<MapInfiniteLoadingDemoProps> = ({
  mapToken
}) => {
  const [showMap, setShowMap] = useState(true);
  const [loadCount, setLoadCount] = useState(1);
  
  const handleReload = () => {
    setShowMap(false);
    setTimeout(() => {
      setShowMap(true);
      setLoadCount(prev => prev + 1);
    }, 500);
  };
  
  const handleMapLoaded = () => {
    console.log('Map fully loaded!');
  };
  
  return (
    <Card className="bg-[#151A22] border-gray-700 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex items-center justify-between">
          <span>Infinite Loading Map Demo</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReload}
            className="text-sm"
          >
            Reload Map
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        {showMap && (
          <InfiniteLoadingMap 
            mapToken={mapToken}
            key={`map-${loadCount}`}
            onMapLoaded={handleMapLoaded}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default MapInfiniteLoadingDemo;
