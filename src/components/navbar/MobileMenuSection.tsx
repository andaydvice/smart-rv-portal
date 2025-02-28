
import { ChevronDown } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  isOpen: boolean;
  toggleSection: () => void;
  children: React.ReactNode;
  isLink?: boolean;
  linkTo?: string;
  hideChevron?: boolean;
};

const MobileMenuSection = ({ 
  title, 
  isOpen, 
  toggleSection, 
  children, 
  isLink = false,
  linkTo = "",
  hideChevron = false
}: Props) => {
  if (isLink) {
    return (
      <div className="px-5 py-4">
        <Link
          to={linkTo}
          className="flex items-center justify-between text-gray-100 hover:text-blue-400 transition-colors"
        >
          <span className="text-base font-semibold">{title}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-700">
      <button
        className="w-full px-5 py-4 flex items-center justify-between text-gray-100 hover:text-blue-400 transition-colors"
        onClick={toggleSection}
      >
        <span className="text-base font-semibold">{title}</span>
        {!hideChevron && (
          <ChevronDown 
            className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          />
        )}
      </button>
      {isOpen && (
        <div className="px-5 py-2 bg-gray-800/50">
          {children}
        </div>
      )}
    </div>
  );
};

export default MobileMenuSection;
