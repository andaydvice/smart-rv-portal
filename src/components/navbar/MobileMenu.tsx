import { Calculator, Home, BookOpen, Navigation, Shield, Battery, Tv, Music, Wifi, Refrigerator, Car, CarFront, Caravan, Wrench, HelpCircle, FileText, Phone, Mic } from "lucide-react";
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
          <div className="border-b border-[#1E2A3E] last:border-0">
            <Link 
              to="/" 
              className="flex items-center gap-2 w-full py-4 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <Home className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-white">Home</span>
            </Link>
          </div>
        )}

        <MobileMenuSection 
          title="Core Systems"
          icon={<Shield className="h-5 w-5 text-emerald-500" />}
          isOpen={openSections.core}
          onToggle={() => toggleSection('core')}
        >
          <CoreSystemsLinks />
        </MobileMenuSection>

        <MobileMenuSection 
          title="Smart Features"
          icon={<Tv className="h-5 w-5 text-purple-500" />}
          isOpen={openSections.features}
          onToggle={() => toggleSection('features')}
        >
          <SmartFeaturesLinks />
        </MobileMenuSection>

        <MobileMenuSection 
          title="Vehicle Selection"
          icon={<Car className="h-5 w-5 text-blue-500" />}
          isOpen={openSections.vehicles}
          onToggle={() => toggleSection('vehicles')}
        >
          <VehicleSelectionLinks />
        </MobileMenuSection>

        <MobileMenuSection 
          title="Support & Resources"
          icon={<Wrench className="h-5 w-5 text-orange-500" />}
          isOpen={openSections.support}
          onToggle={() => toggleSection('support')}
        >
          <SupportLinks />
        </MobileMenuSection>

        <MobileMenuSection 
          title="Customer Support"
          icon={<Phone className="h-5 w-5 text-blue-500" />}
          isOpen={openSections.customer}
          onToggle={() => toggleSection('customer')}
        >
          <CustomerSupportLinks />
        </MobileMenuSection>

        <MobileMenuSection 
          title="RV Tools"
          icon={<Calculator className="h-5 w-5 text-cyan-500" />}
          isOpen={openSections.tools}
          onToggle={() => toggleSection('tools')}
        >
          <div className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-blue-400 transition-colors">
            <Calculator className="h-4 w-4" />
            <Link to="/calculators">RV Tools</Link>
          </div>
        </MobileMenuSection>

        {!isBlogPage && (
          <div className="border-b border-[#1E2A3E] last:border-0">
            <Link 
              to="/blog" 
              className="flex items-center gap-2 w-full py-4 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <BookOpen className="h-5 w-5 text-purple-500" />
              <span className="font-medium text-white">Blog</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;