import React from "react";

interface CostBreakdownProps {
  costs: {
    fuel: number;
    rental: number;
    campsite: number;
    misc: number;
    total: number;
  };
}

const CostBreakdown = ({ costs }: CostBreakdownProps) => {
  return (
    <div className="mt-8 p-6 bg-[#131a2a] rounded-lg border border-gray-700">
      <h3 className="text-lg font-medium text-[#60A5FA] mb-4">Estimated Costs</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="text-gray-300">Rental Cost</span>
          <span className="text-white font-medium">${costs.rental}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="text-gray-300">Fuel Cost</span>
          <span className="text-white font-medium">${costs.fuel}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="text-gray-300">Campsite Cost</span>
          <span className="text-white font-medium">${costs.campsite}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="text-gray-300">Miscellaneous (10%)</span>
          <span className="text-white font-medium">${costs.misc}</span>
        </div>
        <div className="flex justify-between items-center pt-4">
          <span className="text-lg font-medium text-[#60A5FA]">Total Estimated Cost</span>
          <span className="text-xl font-bold text-[#60A5FA]">${costs.total}</span>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown;