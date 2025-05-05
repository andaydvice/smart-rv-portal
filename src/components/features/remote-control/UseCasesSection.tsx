
import React from 'react';

const UseCasesSection = () => {
  return (
    <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 mb-16">
      <h2 className="text-3xl font-semibold text-white mb-6">Real World Applications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-[#5B9BD5] mb-3">Climate Control</h3>
          <p className="text-gray-300 mb-6">
            Pre cool or heat your RV before arrival, ensuring perfect comfort the moment you step inside.
            Schedule temperature changes based on time of day or your location.
          </p>
          
          <h3 className="text-xl font-semibold text-[#5B9BD5] mb-3">System Monitoring</h3>
          <p className="text-gray-300 mb-6">
            Check battery levels, water tank capacity, and security status from anywhere.
            Receive instant alerts if any system requires attention.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-[#5B9BD5] mb-3">Remote Troubleshooting</h3>
          <p className="text-gray-300 mb-6">
            Diagnose and resolve system issues without visiting a service center.
            Share system data with support technicians for faster resolution.
          </p>
          
          <h3 className="text-xl font-semibold text-[#5B9BD5] mb-3">Power Management</h3>
          <p className="text-gray-300 mb-6">
            Monitor energy usage and switch between power sources remotely.
            Optimize power consumption based on usage patterns and availability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseCasesSection;
