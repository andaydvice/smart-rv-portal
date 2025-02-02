import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MenuItemProps {
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const MenuItem = ({ title, icon, isOpen, onToggle, children }: MenuItemProps) => {
  return (
    <div className="border-b border-[#1E2A3E] last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-white hover:text-blue-400 transition-colors"
      >
        <span className="flex items-center gap-2 text-lg font-medium">
          {icon}
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      
      {isOpen && (
        <div className="pb-4 animate-fade-down">
          {children}
        </div>
      )}
    </div>
  );
};

export default MenuItem;