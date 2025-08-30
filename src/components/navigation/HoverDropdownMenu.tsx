
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Calculator, CloudSun, Warehouse, ClipboardCheck } from "lucide-react";

interface MenuLink {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

interface HoverDropdownMenuProps {
  trigger: string;
  links: MenuLink[];
  className?: string;
}

const HoverDropdownMenu: React.FC<HoverDropdownMenuProps> = ({
  trigger,
  links,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    try {
      setIsOpen(true);
      if (failedAttempts > 0) setFailedAttempts(0);
    } catch (error) {
      console.error("Failed to show dropdown:", error);
      setFailedAttempts(prev => prev + 1);
    }
  };

  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
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
          className="hover-dropdown-menu absolute top-full left-0 min-w-[240px] bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-[10000] mt-1"
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
                {link.icon && <span>{link.icon}</span>}
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Error message after 6 failed attempts */}
      {failedAttempts >= 6 && (
        <div className="fixed bottom-4 right-4 bg-red-900/90 text-white p-3 rounded-md shadow-lg z-[9999]">
          Unable to display dropdown menu. Please try refreshing the page.
        </div>
      )}
    </div>
  );
};

export default HoverDropdownMenu;
