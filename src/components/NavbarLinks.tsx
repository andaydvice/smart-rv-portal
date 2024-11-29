import { Link } from "react-router-dom";
import { Navigation, Shield, Battery, Tv, Music, Wifi, Refrigerator, Car } from "lucide-react";

export const SmartFeatureLinks = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-white">Smart Features</h4>
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
        <Link to="/features/smart-kitchen" className="block p-2 rounded hover:bg-gray-800/50">
          <span className="flex items-center gap-2">
            <Refrigerator className="h-4 w-4 text-cyan-500" />
            Smart Kitchen
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

export const EntertainmentLinks = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-white">Entertainment</h4>
    <ul className="space-y-2 text-sm">
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