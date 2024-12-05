import { SmartFeaturesLinks, CoreSystemsLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks } from "../NavbarLinks";

interface MobileNavigationProps {
  isOpen: boolean;
}

const MobileNavigation = ({ isOpen }: MobileNavigationProps) => {
  return (
    <div className={`md:hidden bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="px-2 pt-2 pb-3 space-y-1">
        <div className="space-y-6 p-4">
          <SmartFeaturesLinks />
          <CoreSystemsLinks />
          <VehicleSelectionLinks />
          <SupportLinks />
          <CustomerSupportLinks />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;