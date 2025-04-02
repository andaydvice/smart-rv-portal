
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, Cloud, Archive, ClipboardCheck } from 'lucide-react';

interface RVToolsLinksProps {
  className?: string;
}

const RVToolsLinks: React.FC<RVToolsLinksProps> = ({ className }) => (
  <div className={`grid gap-3 ${className || ''}`}>
    <NavLink to="/calculators" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Calculator className="h-4 w-4 text-[#F59E0B]" />
      <span>RV Calculators</span>
    </NavLink>
    <NavLink to="/rv-weather" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Cloud className="h-4 w-4 text-[#0EA5E9]" />
      <span>RV Weather</span>
    </NavLink>
    <NavLink to="/storage-facilities" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Archive className="h-4 w-4 text-[#8B5CF6]" />
      <span>Storage Facilities</span>
    </NavLink>
    <NavLink to="/storage-preparation-checklist" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <ClipboardCheck className="h-4 w-4 text-[#D946EF]" />
      <span>Storage Checklist</span>
    </NavLink>
  </div>
);

export default RVToolsLinks;
