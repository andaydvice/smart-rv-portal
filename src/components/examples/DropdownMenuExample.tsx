
import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenuComponent from '../ui/DropdownMenuComponent';

const DropdownMenuExample: React.FC = () => {
  return (
    <div className="p-8">
      <DropdownMenuComponent 
        menuLink={{ text: "Features", href: "/features" }}
      >
        <Link to="/features/audio-system" className="block w-full px-4 py-2 text-gray-300 hover:text-[#5B9BD5]">
          Audio System
        </Link>
        <Link to="/features/navigation-system" className="block w-full px-4 py-2 text-gray-300 hover:text-[#5B9BD5]">
          Navigation System
        </Link>
        <Link to="/features/smart-kitchen" className="block w-full px-4 py-2 text-gray-300 hover:text-[#5B9BD5]">
          Smart Kitchen
        </Link>
        <Link to="/features/power-management" className="block w-full px-4 py-2 text-gray-300 hover:text-[#5B9BD5]">
          Power Management
        </Link>
      </DropdownMenuComponent>
    </div>
  );
};

export default DropdownMenuExample;
