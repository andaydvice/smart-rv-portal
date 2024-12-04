import { Link } from "react-router-dom";
import { 
  Navigation, 
  Shield, 
  Battery, 
  Tv, 
  Music, 
  Wifi, 
  Refrigerator, 
  Car,
  CarFront,
  Caravan,
  Wrench,
  HelpCircle,
  FileText,
  Phone
} from "lucide-react";

export const CoreSystemsLinks = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-white">Core Systems</h4>
    <ul className="space-y-2 text-sm">
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/features/navigation" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-blue-500" />
            Navigation System
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/features/security" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            Security System
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/features/power" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Battery className="h-4 w-4 text-yellow-500" />
            Power Management
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/features/automated-driving" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Car className="h-4 w-4 text-purple-500" />
            Automated Driving
          </span>
        </Link>
      </li>
    </ul>
  </div>
);

export const SmartFeaturesLinks = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-white">Smart Features</h4>
    <ul className="space-y-2 text-sm">
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/features/smart-kitchen" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Refrigerator className="h-4 w-4 text-cyan-500" />
            Smart Kitchen
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/features/tv" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Tv className="h-4 w-4 text-purple-500" />
            Smart TV
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/features/audio" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Music className="h-4 w-4 text-pink-500" />
            Audio System
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/features/internet" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-cyan-500" />
            Internet Connectivity
          </span>
        </Link>
      </li>
    </ul>
  </div>
);

export const VehicleSelectionLinks = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-white">Vehicle Selection</h4>
    <ul className="space-y-2 text-sm">
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/models/compare" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Car className="h-4 w-4 text-blue-500" />
            Compare Models
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/models/luxury" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <CarFront className="h-4 w-4 text-purple-500" />
            Luxury Model
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/models/adventure" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Caravan className="h-4 w-4 text-emerald-500" />
            Adventure Model
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/models/compact" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Car className="h-4 w-4 text-yellow-500" />
            Compact Model
          </span>
        </Link>
      </li>
    </ul>
  </div>
);

export const SupportLinks = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-white">Support & Resources</h4>
    <ul className="space-y-2 text-sm">
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/troubleshooting" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-orange-500" />
            Troubleshooting
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/documentation" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            Documentation
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/documentation/complete" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-green-500" />
            Complete Documentation
          </span>
        </Link>
      </li>
    </ul>
  </div>
);

export const CustomerSupportLinks = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-white">Customer Support</h4>
    <ul className="space-y-2 text-sm">
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/schedule-demo" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-purple-500" />
            Request a Demo
          </span>
        </Link>
      </li>
      <li className="hover:text-blue-400 transition-colors text-gray-300">
        <Link to="/contact" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-500" />
            Contact Us
          </span>
        </Link>
      </li>
    </ul>
  </div>
);
