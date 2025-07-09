
import { Menu, X } from "lucide-react";
import { useCallback } from "react";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton = ({ isOpen, onClick }: MenuButtonProps) => {
  // Optimized component with minimal re-renders
  
  // Optimize the click handler with useCallback to prevent re-renders
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  }, [onClick]);
  
  // Remove the effect that might be causing re-renders
  
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
