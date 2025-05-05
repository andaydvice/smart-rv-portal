
import React from 'react';

const ControlInterfaceSection = () => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-semibold text-white mb-6">The Control Interface</h2>
      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-[#5B9BD5] mb-4">Dashboard View</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>System status at a glance</li>
              <li>Quick access to essential controls</li>
              <li>Customizable layout</li>
              <li>Real time updates</li>
            </ul>
          </div>
          <div className="col-span-2">
            <img 
              src="/lovable-uploads/58df06da-2491-453e-9f4d-11154ddb1104.png"
              alt="App Interface Dashboard" 
              className="w-full rounded-lg border border-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlInterfaceSection;
