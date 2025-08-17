
import React from 'react';
import { ProgressiveLoader } from '@/components/ui/ProgressiveLoader';

const LoadingState: React.FC = () => {
  return (
    <div className="bg-[#091020] rounded-lg p-6 border border-[#1a202c] flex items-center justify-center h-[350px]">
      <ProgressiveLoader
        isLoading={true}
        variant="default"
        estimatedTime={1500}
        stages={[
          { id: 'map', label: 'Loading map tiles...', duration: 600, weight: 0.4 },
          { id: 'data', label: 'Loading location data...', duration: 500, weight: 0.3 },
          { id: 'render', label: 'Rendering map...', duration: 400, weight: 0.3 }
        ]}
      />
    </div>
  );
};

export default LoadingState;
