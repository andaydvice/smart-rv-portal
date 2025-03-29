
import React from 'react';
import NavDropdown from '../ui/NavDropdown';

const NavDropdownExample: React.FC = () => {
  const featureItems = [
    { label: "Audio System", href: "/features/audio-system" },
    { label: "Navigation System", href: "/features/navigation-system" },
    { label: "Smart Kitchen", href: "/features/smart-kitchen" },
    { label: "Power Management", href: "/features/power-management" },
  ];

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Dropdown Menu Example</h2>
      <div className="flex gap-4">
        <NavDropdown 
          items={featureItems} 
          selected="Audio System" 
        />
        
        <NavDropdown 
          items={[
            { label: "Class A", href: "/models/class-a" },
            { label: "Class B", href: "/models/class-b" },
            { label: "Class C", href: "/models/class-c" },
            { label: "Travel Trailers", href: "/models/travel-trailers" },
          ]} 
          selected="Class B" 
        />
      </div>
    </div>
  );
};

export default NavDropdownExample;
