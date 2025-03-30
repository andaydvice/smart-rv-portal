
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="bg-[#091020] rounded-lg p-6 border border-[#1a202c] flex items-center justify-center h-[350px]">
      <div className="flex flex-col items-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#5B9BD5]" />
        <p className="text-gray-300">Loading map...</p>
      </div>
    </div>
  );
};

export default LoadingState;
