
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MenuLink {
  text: string;
  href: string;
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
        className="px-4 py-2 h-auto flex items-center gap-1 text-gray-300 hover:text-[#5B9BD5] hover:bg-transparent focus:bg-transparent"
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
          className="hover-dropdown-menu absolute min-w-[200px] w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6 z-[9999] left-1/2 transform -translate-x-1/2"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="grid gap-3">
            {links.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                className="text-gray-300 hover:text-[#5B9BD5] transition-colors block w-full px-2 py-1.5 text-sm"
              >
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
