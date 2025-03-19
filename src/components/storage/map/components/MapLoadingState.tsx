
import React from 'react';

const MapLoadingState: React.FC = () => {
  return (
    <div className="w-full h-[650px] flex items-center justify-center bg-[#080F1F] text-white rounded-lg">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 border-t-2 border-r-2 border-[#5B9BD5] rounded-full animate-spin mx-auto"></div>
        <p>Loading Map...</p>
      </div>
    </div>
  );
};

export default MapLoadingState;
