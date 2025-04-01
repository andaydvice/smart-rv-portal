
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import NavigationSection from "./NavigationSection";
import AuthButtons from "./AuthButtons";
import { SmartFeaturesLinks, CoreSystemsLinks, VehicleSelectionLinks, SupportLinks, RVToolsLinks } from "./links";

interface MobileMenuProps {
  isOpen: boolean;
  onNavigate?: () => void;
}

const MobileMenu = ({ isOpen, onNavigate }: MobileMenuProps) => {
  const [expandedSections, setExpandedSections] = useState({
    intelligence: false,
    systems: false,
    models: false,
    tools: false,
    support: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  // Handle outside clicks to close the menu
  useEffect(() => {
    if (!isOpen) return;
    
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-nav-menu')) {
        onNavigate?.();
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen, onNavigate]);
  
  if (!isOpen) return null;

  return (
    <div className="md:hidden mobile-nav-menu">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 shadow-lg">
        <NavLink
          to="/"
          className={({ isActive }) => 
            isActive ? "text-[#5B9BD5] font-medium block px-3 py-2 rounded-md text-base" 
            : "text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
          }
          onClick={onNavigate}
        >
          Home
        </NavLink>
        
        <NavigationSection 
          title="RV Intelligence" 
          expanded={expandedSections.intelligence}
          onToggle={() => toggleSection('intelligence')}
          path="/rv-intelligence"
        />
        {expandedSections.intelligence && (
          <div className="pl-4 border-l border-gray-700 ml-4 mt-1 space-y-1">
            <SmartFeaturesLinks onClick={onNavigate} />
          </div>
        )}
        
        <NavigationSection 
          title="RV Systems" 
          expanded={expandedSections.systems}
          onToggle={() => toggleSection('systems')}
          path="/rv-systems"
        />
        {expandedSections.systems && (
          <div className="pl-4 border-l border-gray-700 ml-4 mt-1 space-y-1">
            <CoreSystemsLinks onClick={onNavigate} />
          </div>
        )}
        
        <NavigationSection 
          title="Models" 
          expanded={expandedSections.models}
          onToggle={() => toggleSection('models')}
          path="/models"
        />
        {expandedSections.models && (
          <div className="pl-4 border-l border-gray-700 ml-4 mt-1 space-y-1">
            <VehicleSelectionLinks onClick={onNavigate} />
          </div>
        )}
        
        <NavigationSection 
          title="RV Tools" 
          expanded={expandedSections.tools}
          onToggle={() => toggleSection('tools')}
          path="/calculators"
        />
        {expandedSections.tools && (
          <div className="pl-4 border-l border-gray-700 ml-4 mt-1 space-y-1">
            <RVToolsLinks onClick={onNavigate} />
          </div>
        )}
        
        <NavLink
          to="/blog"
          className={({ isActive }) => 
            isActive ? "text-[#5B9BD5] font-medium block px-3 py-2 rounded-md text-base" 
            : "text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
          }
          onClick={onNavigate}
        >
          Blog
        </NavLink>
        
        <NavLink
          to="/storage-facilities"
          className={({ isActive }) => 
            isActive ? "text-[#5B9BD5] font-medium block px-3 py-2 rounded-md text-base" 
            : "text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
          }
          onClick={onNavigate}
        >
          Storage
        </NavLink>
        
        <NavigationSection 
          title="Support" 
          expanded={expandedSections.support}
          onToggle={() => toggleSection('support')}
          path="/support"
        />
        {expandedSections.support && (
          <div className="pl-4 border-l border-gray-700 ml-4 mt-1 space-y-1">
            <SupportLinks onClick={onNavigate} />
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-700">
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
