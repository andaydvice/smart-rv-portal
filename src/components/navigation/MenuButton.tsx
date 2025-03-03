
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton = ({ isOpen, onClick }: MenuButtonProps) => {
  console.log("MenuButton rendered, isOpen:", isOpen);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("MenuButton clicked! Current state:", isOpen);
    onClick();
  };
  
  // Force re-render if isOpen changes
  useEffect(() => {
    console.log("MenuButton effect triggered, isOpen:", isOpen);
  }, [isOpen]);
  
  return (
    <button
      onClick={handleClick}
      className="z-50 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#4B9EF4] focus:outline-none"
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <X className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="block h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};

export default MenuButton;
