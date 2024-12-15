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
      className="z-[110] inline-flex items-center justify-center p-2 text-[#A3B3BC] hover:text-[#4B9EF4] focus:outline-none"
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