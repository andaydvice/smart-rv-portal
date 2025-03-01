
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, BookOpen, ShieldCheck, Settings, Home, AlertTriangle, Phone, Truck, Terminal, Zap } from 'lucide-react';

const NavbarLinks = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex space-x-6 ${className}`}>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/models" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Models
      </NavLink>
      <NavLink 
        to="/features" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Features
      </NavLink>
      <NavLink 
        to="/technology" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Technology
      </NavLink>
      <NavLink 
        to="/voice-control" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Voice Control
      </NavLink>
      <NavLink 
        to="/storage-facilities" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Storage
      </NavLink>
      <NavLink 
        to="/storage-preparation-checklist" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Storage Checklist
      </NavLink>
      <NavLink 
        to="/troubleshooting" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Troubleshooting
      </NavLink>
      <NavLink 
        to="/blog" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Blog
      </NavLink>
    </div>
  );
};

// Export additional link components that are used in navigation
export const SmartFeaturesLinks = () => (
  <div className="grid gap-3">
    <NavLink to="/features/navigation" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>Navigation System</span>
    </NavLink>
    <NavLink to="/features/security" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <ShieldCheck className="h-4 w-4" />
      <span>Security System</span>
    </NavLink>
    <NavLink to="/features/automated-driving" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>Automated Driving</span>
    </NavLink>
    <NavLink to="/features/smart-tv" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>Smart TV System</span>
    </NavLink>
    <NavLink to="/voice-control" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Terminal className="h-4 w-4" />
      <span>Voice Control</span>
    </NavLink>
  </div>
);

export const CoreSystemsLinks = () => (
  <div className="grid gap-3">
    <NavLink to="/features/power-management" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Zap className="h-4 w-4" />
      <span>Power Management</span>
    </NavLink>
    <NavLink to="/features/smart-kitchen" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>Smart Kitchen</span>
    </NavLink>
    <NavLink to="/features/audio" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>Audio System</span>
    </NavLink>
    <NavLink to="/features/connectivity" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>Internet Connectivity</span>
    </NavLink>
  </div>
);

export const VehicleSelectionLinks = () => (
  <div className="grid gap-3">
    <NavLink to="/models/luxury" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Truck className="h-4 w-4" />
      <span>Luxury Models</span>
    </NavLink>
    <NavLink to="/models/compact" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Truck className="h-4 w-4" />
      <span>Compact Models</span>
    </NavLink>
    <NavLink to="/models/adventure" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Truck className="h-4 w-4" />
      <span>Adventure Models</span>
    </NavLink>
    <NavLink to="/models/compare" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>Compare Models</span>
    </NavLink>
  </div>
);

export const RVToolsLinks = () => (
  <div className="grid gap-3">
    <NavLink to="/calculators" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Calculator className="h-4 w-4" />
      <span>RV Calculators</span>
    </NavLink>
    <NavLink to="/weather" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>RV Weather</span>
    </NavLink>
    <NavLink to="/storage-facilities" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>Storage Facilities</span>
    </NavLink>
    <NavLink to="/storage-preparation-checklist" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>Storage Checklist</span>
    </NavLink>
  </div>
);

export const SupportLinks = () => (
  <div className="grid gap-3">
    <NavLink to="/documentation" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <BookOpen className="h-4 w-4" />
      <span>Documentation</span>
    </NavLink>
    <NavLink to="/troubleshooting" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <AlertTriangle className="h-4 w-4" />
      <span>Troubleshooting Guide</span>
    </NavLink>
    <NavLink to="/documentation/full" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <BookOpen className="h-4 w-4" />
      <span>Complete Documentation</span>
    </NavLink>
  </div>
);

export const CustomerSupportLinks = () => (
  <div className="grid gap-3">
    <NavLink to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Phone className="h-4 w-4" />
      <span>Contact Support</span>
    </NavLink>
    <NavLink to="/schedule-demo" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span>Schedule Demo</span>
    </NavLink>
  </div>
);

export default NavbarLinks;
