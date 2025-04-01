
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Zap, Settings, Music, Wifi, Droplet } from 'lucide-react';

interface CoreSystemsLinksProps {
  className?: string;
}

const CoreSystemsLinks: React.FC<CoreSystemsLinksProps> = ({ className }) => (
  <div className={`grid gap-3 ${className || ''}`}>
    <NavLink to="/features/power-management" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Zap className="h-4 w-4 text-[#F59E0B]" />
      <span>Power Management</span>
    </NavLink>
    <NavLink to="/features/smart-kitchen" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4 text-[#0EA5E9]" />
      <span>Smart Kitchen</span>
    </NavLink>
    <NavLink to="/features/audio-system" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Music className="h-4 w-4 text-[#8B5CF6]" />
      <span>Audio System</span>
    </NavLink>
    <NavLink to="/features/internet-connectivity" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Wifi className="h-4 w-4 text-[#10B981]" />
      <span>Internet Connectivity</span>
    </NavLink>
    <NavLink to="/features/water-systems" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Droplet className="h-4 w-4 text-[#5B9BD5]" />
      <span>Water Systems</span>
    </NavLink>
  </div>
);

export default CoreSystemsLinks;
