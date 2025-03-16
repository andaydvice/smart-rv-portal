
import React, { useState } from 'react';
import ResponsiveMapIcon from './ResponsiveMapIcon';

interface MapIconDemoProps {
  icons: Array<{
    id: string;
    icon: {
      src: string;
      alt: string;
    };
    marker: {
      src: string;
      alt: string;
    };
    details: string;
  }>;
}

/**
 * Demo component to showcase ResponsiveMapIcon functionality
 */
const MapIconDemo: React.FC<MapIconDemoProps> = ({ icons }) => {
  const [activeIconId, setActiveIconId] = useState<string | null>(null);
  
  const handleIconClick = (id: string) => {
    setActiveIconId(id === activeIconId ? null : id);
  };
  
  return (
    <div className="p-4 bg-[#080F1F] rounded-lg">
      <h3 className="text-white text-lg font-medium mb-4">Interactive Map Icons</h3>
      
      <div className="flex flex-wrap gap-6 justify-center">
        {icons.map((iconData) => (
          <div key={iconData.id} className="flex flex-col items-center">
            <ResponsiveMapIcon
              icon={iconData.icon}
              marker={iconData.marker}
              details={iconData.details}
              isActive={activeIconId === iconData.id}
              onClick={() => handleIconClick(iconData.id)}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-3 bg-[#131a2a] rounded-lg text-white text-sm">
        <p className="text-center">
          {activeIconId 
            ? `Selected: ${icons.find(i => i.id === activeIconId)?.details}` 
            : 'Click on an icon to select it'}
        </p>
      </div>
    </div>
  );
};

export default MapIconDemo;
