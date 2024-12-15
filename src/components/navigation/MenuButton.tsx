import { Menu, X } from "lucide-react";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton = ({ isOpen, onClick }: MenuButtonProps) => {
  console.log("MenuButton rendered, isOpen:", isOpen);
  
  const handleClick = () => {
    console.log("MenuButton clicked!");
    onClick();
  };
  
  return (
    <button
      onClick={handleClick}
      className="z-50 inline-flex items-center justify-center p-2 text-white bg-blue-500 hover:text-[#4B9EF4] focus:outline-none"
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