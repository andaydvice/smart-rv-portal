
import React, { useState } from 'react';
import StarRating from "@/components/ui/star-rating";
import { Card } from "@/components/ui/card";

const StarRatingDemo = () => {
  const [currentRating, setCurrentRating] = useState(3.5);
  
  const handleRatingChange = (newRating: number) => {
    setCurrentRating(newRating);
  };
  
  return (
    <Card className="p-6 bg-[#131a2a] text-white border-gray-700 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-[#60A5FA]">Location Rating</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-2">Read-only Rating:</h3>
          <StarRating 
            rating={currentRating} 
            description="This storage facility has excellent service"
            readonly
          />
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2">Interactive Rating:</h3>
          <div className="flex items-center gap-3">
            <StarRating 
              rating={currentRating}
              onRatingChange={handleRatingChange}
              size="lg"
            />
            <span className="text-sm text-gray-300">({currentRating.toFixed(1)})</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Hover over stars to preview, click to set rating
          </p>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <h3 className="text-md font-medium mb-2">Different Sizes:</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-sm w-10">Small:</span>
              <StarRating rating={4} size="sm" readonly />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm w-10">Medium:</span>
              <StarRating rating={3} size="md" readonly />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm w-10">Large:</span>
              <StarRating rating={5} size="lg" readonly />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StarRatingDemo;
