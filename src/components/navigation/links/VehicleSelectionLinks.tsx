
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Truck, Settings } from 'lucide-react';

const VehicleSelectionLinks = () => (
  <div className="grid gap-3">
    <NavLink to="/models/luxury" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Truck className="h-4 w-4 text-[#D946EF]" />
      <span>Luxury Models</span>
    </NavLink>
    <NavLink to="/models/compact" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Truck className="h-4 w-4 text-[#0EA5E9]" />
      <span>Compact Models</span>
    </NavLink>
    <NavLink to="/models/adventure" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Truck className="h-4 w-4 text-[#F97316]" />
      <span>Adventure Models</span>
    </NavLink>
    <NavLink to="/models/compare" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4 text-[#10B981]" />
      <span>Compare Models</span>
    </NavLink>
  </div>
);

export default VehicleSelectionLinks;
