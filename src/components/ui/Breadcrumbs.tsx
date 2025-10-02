import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-[#E2E8FF] mb-6">
      <Link 
        to="/" 
        className="hover:text-[#5B9BD5] transition-colors flex items-center gap-1"
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-[#5B9BD5]/50" />
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-[#5B9BD5] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
