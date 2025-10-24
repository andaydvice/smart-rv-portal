import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Sun, Heart, ShoppingBag, Smartphone, CloudRain } from 'lucide-react';

interface GuidesLinksProps {
  className?: string;
}

const GuidesLinks: React.FC<GuidesLinksProps> = ({ className }) => (
  <div className={`grid gap-3 ${className || ''}`}>
    <NavLink to="/rv-technology-guide" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <BookOpen className="h-4 w-4 text-[#5B9BD5]" />
      <span>RV Technology Guide</span>
    </NavLink>
    <NavLink to="/rv-comfort-guide" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <Heart className="h-4 w-4 text-[#EC4899]" />
      <span>RV Comfort Guide</span>
    </NavLink>
    <NavLink to="/solar-power-guide" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <Sun className="h-4 w-4 text-[#F59E0B]" />
      <span>Solar Power Guide</span>
    </NavLink>
    <NavLink to="/rv-marketplace" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <ShoppingBag className="h-4 w-4 text-[#10B981]" />
      <span>RV Marketplace</span>
    </NavLink>
    <NavLink to="/rv-apps-hub" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <Smartphone className="h-4 w-4 text-[#8B5CF6]" />
      <span>RV Apps Hub</span>
    </NavLink>
    <NavLink to="/rv-weather" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <CloudRain className="h-4 w-4 text-[#0EA5E9]" />
      <span>RV Weather</span>
    </NavLink>
  </div>
);

export default GuidesLinks;
