
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MenuLink {
  text: string;
  href: string;
}

interface DropdownMenuComponentProps {
  menuLink: MenuLink;
  children: React.ReactNode;
  className?: string;
}

const DropdownMenuComponent: React.FC<DropdownMenuComponentProps> = ({
  menuLink,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={`px-4 py-2 h-auto flex items-center gap-1 text-gray-300 hover:text-[#5B9BD5] hover:bg-transparent focus:bg-transparent ${className}`}
        >
          <span>{menuLink.text}</span>
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
        sideOffset={0}
        className="bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-2 w-auto min-w-[200px] z-50"
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return <DropdownMenuItem className="p-0 focus:bg-gray-800/50 rounded-md">
              {child}
            </DropdownMenuItem>;
          }
          return child;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
