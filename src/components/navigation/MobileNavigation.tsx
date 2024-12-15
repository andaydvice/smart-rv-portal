import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import { SmartFeaturesLinks, CoreSystemsLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks } from "../NavbarLinks";

interface MobileNavigationProps {
  isOpen: boolean;
}

const MenuItem = ({ title, children, isOpen, onToggle }: { 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="border-b border-[#1E2A3E]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-[#A3B3BC] hover:text-[#4B9EF4]"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[400px]' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-2 bg-[#0F1729]/50">{children}</div>
      </div>
    </div>
  );
};

const MobileNavigation = ({ isOpen }: MobileNavigationProps) => {
  console.log("MobileNavigation rendered, isOpen:", isOpen);
  alert(`MobileNavigation rendering with isOpen: ${isOpen}`);  // Added temporary alert
  
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div 
      className={`
        fixed top-16 left-0 right-0 bottom-0 
        bg-black 
        ${isOpen ? 'block' : 'hidden'}
      `}
    >
      <div className="h-full overflow-y-auto">
        <div className="px-4 py-6 space-y-4">
          <MenuItem 
            title="Technology" 
            isOpen={openSections['technology']} 
            onToggle={() => toggleSection('technology')}
          >
            <SmartFeaturesLinks />
          </MenuItem>

          <MenuItem 
            title="RV Systems" 
            isOpen={openSections['rv-systems']} 
            onToggle={() => toggleSection('rv-systems')}
          >
            <CoreSystemsLinks />
          </MenuItem>

          <MenuItem 
            title="Models" 
            isOpen={openSections['models']} 
            onToggle={() => toggleSection('models')}
          >
            <VehicleSelectionLinks />
          </MenuItem>

          <div className="py-2">
            <Link 
              to="/calculators" 
              className="flex items-center gap-2 text-[#A3B3BC] hover:text-[#4B9EF4] px-4 py-2 text-base"
            >
              <Calculator className="h-4 w-4" />
              RV Tools
            </Link>
          </div>

          <MenuItem 
            title="Support" 
            isOpen={openSections['support']} 
            onToggle={() => toggleSection('support')}
          >
            <div className="grid gap-6">
              <SupportLinks />
              <CustomerSupportLinks />
            </div>
          </MenuItem>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;