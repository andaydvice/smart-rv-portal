
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Ship, Map, Home, Scale } from 'lucide-react';

interface VehicleSelectionLinksProps {
  className?: string;
}

const VehicleSelectionLinks: React.FC<VehicleSelectionLinksProps> = ({ className }) => (
  <div className={`grid gap-3 ${className || ''}`}>
    <NavLink to="/models/luxury" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Ship className="h-4 w-4 text-[#EC4899]" />
      <span>Luxury Class</span>
    </NavLink>
    <NavLink to="/models/adventure" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Map className="h-4 w-4 text-[#6366F1]" />
      <span>Adventure Class</span>
    </NavLink>
    <NavLink to="/models/compact" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Home className="h-4 w-4 text-[#10B981]" />
      <span>Compact Smart</span>
    </NavLink>
    <NavLink to="/compare-models" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Scale className="h-4 w-4 text-[#F59E0B]" />
      <span>Compare Models</span>
    </NavLink>
  </div>
);

export default VehicleSelectionLinks;
