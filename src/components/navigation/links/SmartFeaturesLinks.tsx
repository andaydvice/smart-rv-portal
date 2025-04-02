
import { Link } from "react-router-dom";

const SmartFeaturesLinks = () => {
  return (
    <>
      <Link
        to="/features/smart-tv"
        className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
      >
        Smart TV System
      </Link>
      <Link
        to="/features/smart-kitchen"
        className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
      >
        Smart Kitchen
      </Link>
      <Link
        to="/features/internet-connectivity"
        className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
      >
        Internet Connectivity
      </Link>
      <Link
        to="/features/water-systems"
        className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
      >
        Water Systems
      </Link>
      <Link
        to="/features/smart-automation"
        className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
      >
        Smart Automation
      </Link>
    </>
  );
};

export default SmartFeaturesLinks;
