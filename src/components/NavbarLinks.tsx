
// This file exists for backward compatibility and to avoid breaking changes
// It re-exports all the navigation link components from their new location
import {
  NavbarLinks as MainNavbarLinks,
  SmartFeaturesLinks,
  CoreSystemsLinks,
  VehicleSelectionLinks,
  RVToolsLinks,
  SupportLinks,
  CustomerSupportLinks
} from './navigation/links';

export default MainNavbarLinks;
export {
  SmartFeaturesLinks,
  CoreSystemsLinks,
  VehicleSelectionLinks,
  RVToolsLinks,
  SupportLinks,
  CustomerSupportLinks
};
