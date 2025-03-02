
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, Settings } from 'lucide-react';

const CustomerSupportLinks = () => (
  <div className="grid gap-3">
    <NavLink to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Phone className="h-4 w-4 text-[#0EA5E9]" />
      <span>Contact Support</span>
    </NavLink>
    <NavLink to="/schedule-demo" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
      <Settings className="h-4 w-4 text-[#8B5CF6]" />
      <span>Schedule Demo</span>
    </NavLink>
  </div>
);

export default CustomerSupportLinks;
