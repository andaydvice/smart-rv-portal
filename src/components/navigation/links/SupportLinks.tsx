
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, AlertTriangle, User, DollarSign, HelpCircle, Phone, AlertCircle } from 'lucide-react';

interface SupportLinksProps {
  className?: string;
}

const SupportLinks: React.FC<SupportLinksProps> = ({ className }) => (
  <div className={`grid gap-3 ${className || ''}`}>
    <NavLink to="/about" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <User className="h-4 w-4 text-[#5B9BD5]" />
      <span>About</span>
    </NavLink>
    <NavLink to="/pricing" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <DollarSign className="h-4 w-4 text-[#10B981]" />
      <span>Pricing</span>
    </NavLink>
    <NavLink to="/contact" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <Phone className="h-4 w-4 text-[#0EA5E9]" />
      <span>Contact</span>
    </NavLink>
    <NavLink to="/technology" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-[#5B9BD5]" />
      <span>Technology FAQ</span>
    </NavLink>
    <NavLink to="/documentation" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <BookOpen className="h-4 w-4 text-[#F97316]" />
      <span>Documentation</span>
    </NavLink>
    <NavLink to="/troubleshooting" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
      <span>Troubleshooting Guide</span>
    </NavLink>
    <NavLink to="/rv-emergency-center" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <AlertCircle className="h-4 w-4 text-[#EF4444]" />
      <span>Emergency Center</span>
    </NavLink>
    <NavLink to="/documentation/complete" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
      <BookOpen className="h-4 w-4 text-[#10B981]" />
      <span>Complete Documentation</span>
    </NavLink>
  </div>
);

export default SupportLinks;
