import React from 'react';

interface MobileNavigationProps {
  isOpen: boolean;
}

const MobileNavigation = ({ isOpen }: MobileNavigationProps) => {
  console.log("Mobile nav rendering, isOpen:", isOpen);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black">
      <div className="p-4 text-white">
        <h1>TEST MENU</h1>
        <p>This is a test menu</p>
      </div>
    </div>
  );
};

export default MobileNavigation;