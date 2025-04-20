
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, AlertTriangle } from 'lucide-react';

interface SupportLinksProps {
  className?: string;
}

const SupportLinks: React.FC<SupportLinksProps> = ({ className }) => (
  <div className={`grid gap-3 ${className || ''}`}>
    <NavLink to="/documentation" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <BookOpen className="h-4 w-4 text-[#F97316]" />
      <span>Documentation</span>
    </NavLink>
    <NavLink to="/troubleshooting" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
      <span>Troubleshooting Guide</span>
    </NavLink>
    <NavLink to="/documentation/complete" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <BookOpen className="h-4 w-4 text-[#10B981]" />
      <span>Complete Documentation</span>
    </NavLink>
  </div>
);

export default SupportLinks;
