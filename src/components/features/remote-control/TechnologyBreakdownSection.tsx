
import React from 'react';
import { Phone, Wifi, Lock, Monitor } from "lucide-react";

const TechnologyBreakdownSection = () => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-semibold text-white mb-8 text-center">Technology Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
          <Phone className="h-10 w-10 text-[#5B9BD5] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Mobile App</h3>
          <p className="text-gray-300 text-left">Advanced application with intuitive controls, customizable dashboards, and smart notifications for complete RV management.</p>
        </div>
        
        <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
          <Wifi className="h-10 w-10 text-[#5B9BD5] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Connectivity Options</h3>
          <p className="text-gray-300 text-left">Multiple connection methods including 5G, WiFi, and Bluetooth, with automatic switching for consistent control anywhere.</p>
        </div>
        
        <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
          <Lock className="h-10 w-10 text-[#5B9BD5] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Security Features</h3>
          <p className="text-gray-300 text-left">Enterprise grade encryption, multi factor authentication, and secure access controls to protect your RV systems.</p>
        </div>
        
        <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
          <Monitor className="h-10 w-10 text-[#5B9BD5] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Integration</h3>
          <p className="text-gray-300 text-left">Compatible with all Smart RV Hub systems and major smart home platforms for extended functionality.</p>
        </div>
      </div>
    </div>
  );
};

export default TechnologyBreakdownSection;
