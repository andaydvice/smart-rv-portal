
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Ship, Map, Home, Scale } from 'lucide-react';
import { TypographySmall } from '@/components/ui/typography';

interface VehicleSelectionLinksProps {
  className?: string;
}

const VehicleSelectionLinks: React.FC<VehicleSelectionLinksProps> = ({ className }) => (
  <div className={`grid gap-3 ${className || ''}`}>
    <NavLink to="/models/luxury" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Ship className="h-4 w-4 text-[#EC4899]" />
      <TypographySmall as="span" className="text-inherit">Luxury Class</TypographySmall>
    </NavLink>
    <NavLink to="/models/adventure" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Map className="h-4 w-4 text-[#6366F1]" />
      <TypographySmall as="span" className="text-inherit">Adventure Class</TypographySmall>
    </NavLink>
    <NavLink to="/models/compact" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Home className="h-4 w-4 text-[#10B981]" />
      <TypographySmall as="span" className="text-inherit">Compact Smart</TypographySmall>
    </NavLink>
    <NavLink to="/models/compare" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Scale className="h-4 w-4 text-[#F59E0B]" />
      <TypographySmall as="span" className="text-inherit">Compare Models</TypographySmall>
    </NavLink>
  </div>
);

export default VehicleSelectionLinks;
