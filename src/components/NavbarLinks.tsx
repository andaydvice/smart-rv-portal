
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
  Phone,
  Mic,
  Calculator,
  Warehouse
} from "lucide-react";

const linkBaseClasses = "block p-2 rounded hover:bg-[#0F1729]/50";
const textBaseClasses = "text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors";
const iconBaseClasses = "h-4 w-4";

export const CoreSystemsLinks = () => (
  <ul className="space-y-2 text-sm">
    <li className={textBaseClasses}>
      <Link to="/voice-control" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Mic className={iconBaseClasses + " text-purple-500"} />
          Voice Control
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/features/navigation" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Navigation className={iconBaseClasses + " text-blue-500"} />
          Navigation System
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/features/security" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Shield className={iconBaseClasses + " text-emerald-500"} />
          Security System
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/features/power" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Battery className={iconBaseClasses + " text-yellow-500"} />
          Power Management
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/features/automated-driving" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Car className={iconBaseClasses + " text-purple-500"} />
          Automated Driving
        </span>
      </Link>
    </li>
  </ul>
);

export const SmartFeaturesLinks = () => (
  <ul className="space-y-2 text-sm">
    <li className={textBaseClasses}>
      <Link to="/features/smart-kitchen" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Refrigerator className={iconBaseClasses + " text-cyan-500"} />
          Smart Kitchen
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/features/tv" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Tv className={iconBaseClasses + " text-purple-500"} />
          Smart TV
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/features/audio" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Music className={iconBaseClasses + " text-pink-500"} />
          Audio System
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/features/internet" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Wifi className={iconBaseClasses + " text-cyan-500"} />
          Internet Connectivity
        </span>
      </Link>
    </li>
  </ul>
);

export const VehicleSelectionLinks = () => (
  <ul className="space-y-2 text-sm">
    <li className={textBaseClasses}>
      <Link to="/models/compare" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Car className={iconBaseClasses + " text-blue-500"} />
          Compare Models
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/models/luxury" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <CarFront className={iconBaseClasses + " text-purple-500"} />
          Luxury Model
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/models/adventure" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Caravan className={iconBaseClasses + " text-emerald-500"} />
          Adventure Model
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/models/compact" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Car className={iconBaseClasses + " text-yellow-500"} />
          Compact Model
        </span>
      </Link>
    </li>
  </ul>
);

export const RVToolsLinks = () => (
  <ul className="space-y-2 text-sm">
    <li className={textBaseClasses}>
      <Link to="/calculators" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Calculator className={iconBaseClasses + " text-blue-500"} />
          RV Calculators
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/storage-facilities" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Warehouse className={iconBaseClasses + " text-emerald-500"} />
          Indoor RV Storage
        </span>
      </Link>
    </li>
  </ul>
);

export const SupportLinks = () => (
  <ul className="space-y-2 text-sm">
    <li className={textBaseClasses}>
      <Link to="/troubleshooting" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Wrench className={iconBaseClasses + " text-orange-500"} />
          Troubleshooting
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/documentation" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <FileText className={iconBaseClasses + " text-blue-500"} />
          Documentation
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/documentation/complete" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <FileText className={iconBaseClasses + " text-green-500"} />
          Complete Documentation
        </span>
      </Link>
    </li>
  </ul>
);

export const CustomerSupportLinks = () => (
  <ul className="space-y-2 text-sm">
    <li className={textBaseClasses}>
      <Link to="/schedule-demo" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <HelpCircle className={iconBaseClasses + " text-purple-500"} />
          Request a Demo
        </span>
      </Link>
    </li>
    <li className={textBaseClasses}>
      <Link to="/contact" className={linkBaseClasses}>
        <span className="flex items-center gap-2">
          <Phone className={iconBaseClasses + " text-blue-500"} />
          Contact Us
        </span>
      </Link>
    </li>
  </ul>
);
