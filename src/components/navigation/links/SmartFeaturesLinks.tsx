
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Settings, ShieldCheck, Terminal, Wifi } from 'lucide-react';

const SmartFeaturesLinks = () => (
  <div className="grid gap-3">
    <NavLink to="/features/navigation-system" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4 text-[#0EA5E9]" />
      <span>Navigation System</span>
    </NavLink>
    <NavLink to="/features/security-system" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <ShieldCheck className="h-4 w-4 text-[#8B5CF6]" />
      <span>Security System</span>
    </NavLink>
    <NavLink to="/features/automated-driving" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4 text-[#F97316]" />
      <span>Automated Driving</span>
    </NavLink>
    <NavLink to="/features/smart-tv" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4 text-[#D946EF]" />
      <span>Smart TV System</span>
    </NavLink>
    <NavLink to="/features/internet-connectivity" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Wifi className="h-4 w-4 text-[#5B9BD5]" />
      <span>Internet Connectivity</span>
    </NavLink>
    <NavLink to="/voice-control" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Terminal className="h-4 w-4 text-[#10B981]" />
      <span>Voice Control</span>
    </NavLink>
  </div>
);

export default SmartFeaturesLinks;
