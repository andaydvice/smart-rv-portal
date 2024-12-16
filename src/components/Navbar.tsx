import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MenuButton from "./navigation/MenuButton";
import MenuItem from "./navigation/MenuItem";
import {
  CoreSystemsLinks,
  SmartFeaturesLinks,
  VehicleSelectionLinks,
  SupportLinks,
  CustomerSupportLinks
} from "./NavbarLinks";
import { Calculator } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    core: false,
    features: false,
    vehicles: false,
    support: false,
    customer: false,
    tools: false
  });

  const toggleMenu = () => {
    console.log("Toggling mobile menu, previous state:", isOpen);
    setIsOpen(!isOpen);
    setTimeout(() => {
      console.log("Menu state after update:", !isOpen);
    }, 0);
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="relative">
      <nav className="relative z-[9999] fixed top-0 left-0 right-0 bg-[#080F1F]/95 backdrop-blur-sm border-b border-[#1E2A3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="hover-scale">
              <Logo />
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="block md:hidden">
                <MenuButton isOpen={isOpen} onClick={toggleMenu} />
              </div>
              <div className="hidden md:block">
                <DesktopNavigation />
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {isOpen && (
        <div className="fixed inset-0 pt-16 bg-[#080F1F] text-white z-[9998] overflow-y-auto">
          <div className="p-4 space-y-2">
            <MenuItem 
              title="Core Systems" 
              isOpen={openSections.core}
              onToggle={() => toggleSection('core')}
            >
              <CoreSystemsLinks />
            </MenuItem>

            <MenuItem 
              title="Smart Features" 
              isOpen={openSections.features}
              onToggle={() => toggleSection('features')}
            >
              <SmartFeaturesLinks />
            </MenuItem>

            <MenuItem 
              title="Vehicle Selection" 
              isOpen={openSections.vehicles}
              onToggle={() => toggleSection('vehicles')}
            >
              <VehicleSelectionLinks />
            </MenuItem>

            <MenuItem 
              title="Support & Resources" 
              isOpen={openSections.support}
              onToggle={() => toggleSection('support')}
            >
              <SupportLinks />
            </MenuItem>

            <MenuItem 
              title="Customer Support" 
              isOpen={openSections.customer}
              onToggle={() => toggleSection('customer')}
            >
              <CustomerSupportLinks />
            </MenuItem>

            <Link 
              to="/calculators" 
              className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <Calculator className="h-4 w-4" />
              RV Tools
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;