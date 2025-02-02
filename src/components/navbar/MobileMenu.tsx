import { Calculator, Home, BookOpen, Navigation, Shield, Battery, Tv, Music, Wifi, Refrigerator, Car, CarFront, Caravan, Wrench, HelpCircle, FileText, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import MobileMenuSection from "./MobileMenuSection";
import {
  CoreSystemsLinks,
  SmartFeaturesLinks,
  VehicleSelectionLinks,
  SupportLinks,
  CustomerSupportLinks
} from "../NavbarLinks";

interface MobileMenuProps {
  isOpen: boolean;
  openSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

const MobileMenu = ({ isOpen, openSections, toggleSection }: MobileMenuProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isBlogPage = location.pathname === "/blog";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 pt-16 bg-[#080F1F] text-white z-[9998] overflow-y-auto">
      <div className="p-4 space-y-2">
        {!isHomePage && (
          <div className="px-4 py-3">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
          </div>
        )}

        <MobileMenuSection 
          title="Core Systems"
          isOpen={openSections.core}
          onToggle={() => toggleSection('core')}
        >
          <CoreSystemsLinks />
        </MobileMenuSection>

        <MobileMenuSection 
          title="Smart Features"
          isOpen={openSections.features}
          onToggle={() => toggleSection('features')}
        >
          <SmartFeaturesLinks />
        </MobileMenuSection>

        <MobileMenuSection 
          title="Vehicle Selection"
          isOpen={openSections.vehicles}
          onToggle={() => toggleSection('vehicles')}
        >
          <VehicleSelectionLinks />
        </MobileMenuSection>

        <MobileMenuSection 
          title="Support & Resources"
          isOpen={openSections.support}
          onToggle={() => toggleSection('support')}
        >
          <SupportLinks />
        </MobileMenuSection>

        <MobileMenuSection 
          title="Customer Support"
          isOpen={openSections.customer}
          onToggle={() => toggleSection('customer')}
        >
          <CustomerSupportLinks />
        </MobileMenuSection>

        <MobileMenuSection 
          title="RV Tools"
          isOpen={openSections.tools}
          onToggle={() => toggleSection('tools')}
        >
          <div className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-blue-400 transition-colors">
            <Calculator className="h-4 w-4" />
            <Link to="/calculators">RV Tools</Link>
          </div>
        </MobileMenuSection>

        {!isBlogPage && (
          <div className="px-4 py-3">
            <Link 
              to="/blog" 
              className="flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Blog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;