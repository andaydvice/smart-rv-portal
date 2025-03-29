
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NavDropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  items: NavDropdownItem[];
  selected: string;
  className?: string;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  items,
  selected,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Find the selected item to use as the trigger label
  const selectedItem = items.find(item => item.label === selected) || items[0];

  return (
    <div className="relative">
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={`px-4 py-2 h-auto flex items-center gap-1 text-gray-300 hover:text-[#5B9BD5] hover:bg-transparent focus:bg-transparent ${className}`}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span>{selectedItem.label}</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start"
          alignOffset={0}
          sideOffset={4}
          className="bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-2 w-auto min-w-[200px] z-50"
          aria-label={`${selected} dropdown menu`}
        >
          {items.map((item) => (
            <DropdownMenuItem 
              key={item.href}
              className="p-0 focus:bg-gray-800/50 rounded-md"
              asChild
            >
              <Link 
                to={item.href} 
                className={`block w-full px-4 py-2 ${item.label === selected ? 'text-[#5B9BD5] font-medium' : 'text-gray-300'} hover:text-white transition-colors`}
                aria-current={location.pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavDropdown;
