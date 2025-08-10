
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, Settings } from 'lucide-react';

interface CustomerSupportLinksProps {
  className?: string;
}

const CustomerSupportLinks: React.FC<CustomerSupportLinksProps> = ({ className }) => (
  <div className={`grid gap-3 ${className || ''}`}>
    <NavLink to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Phone className="h-4 w-4 text-[#0EA5E9]" />
      <span>Contact Support</span>
    </NavLink>
    <NavLink to="/products" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4 text-[#8B5CF6]" />
      <span>Top Deals</span>
    </NavLink>
  </div>
);

export default CustomerSupportLinks;
