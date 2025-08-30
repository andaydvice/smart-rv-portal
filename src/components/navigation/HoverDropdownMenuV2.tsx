
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MenuLink {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

interface HoverDropdownMenuV2Props {
  trigger: string;
  links: MenuLink[];
  className?: string;
  onHoverChange?: (isOpen: boolean) => void;
  borderColor?: string;
}

const HoverDropdownMenuV2: React.FC<HoverDropdownMenuV2Props> = ({
  trigger,
  links,
  className = "",
  onHoverChange,
  borderColor = "border-white/30"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
    if (onHoverChange) onHoverChange(true);
  };

  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      if (onHoverChange) onHoverChange(false);
    }, 150); // Small delay to prevent flickering
  };

  useEffect(() => {
    // Clean up timeout on unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      className={`inline-block relative ${className}`}
      ref={dropdownRef}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <Button 
        variant="ghost" 
        className="px-2 py-2 h-auto flex items-center gap-1 text-gray-300 hover:text-[#5B9BD5] hover:bg-transparent focus:bg-transparent text-sm whitespace-nowrap"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{trigger}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      {isOpen && (
        <div 
          className={`hover-dropdown-menu absolute top-full left-1/2 transform -translate-x-1/2 min-w-[240px] bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-[10000] mt-1`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="grid gap-3">
            {links.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                className="text-gray-300 hover:text-[#5B9BD5] transition-colors flex items-center gap-2 w-full px-2 py-1.5 text-sm"
              >
                {link.icon && <span className="flex-shrink-0">{link.icon}</span>}
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverDropdownMenuV2;
