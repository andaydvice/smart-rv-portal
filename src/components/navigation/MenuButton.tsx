import { Menu, X } from "lucide-react";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton = ({ isOpen, onClick }: MenuButtonProps) => {
  console.log("MenuButton rendered, isOpen:", isOpen);
  
  return (
    <button
      onClick={onClick}
      className="relative z-50 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <X className="block h-8 w-8" aria-hidden="true" />
      ) : (
        <Menu className="block h-8 w-8" aria-hidden="true" />
      )}
    </button>
  );
};

export default MenuButton;