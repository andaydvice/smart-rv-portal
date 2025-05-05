
import React from 'react';
import { LazyImage } from '@/components/ui/LazyImage';

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
            
            <h3 className="text-xl font-semibold text-[#5B9BD5] mt-6 mb-4">Control Options</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Touch screen interface</li>
              <li>Voice command capability</li>
              <li>Remote access via smartphone</li>
              <li>Physical control panel backup</li>
              <li>Programmable shortcuts</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-[#5B9BD5] mt-6 mb-4">Settings & Profiles</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Multiple user profiles</li>
              <li>Save favorite configurations</li>
              <li>Automatic environment adjustments</li>
              <li>Security access levels</li>
              <li>Guest mode restrictions</li>
            </ul>
          </div>
          <div className="col-span-2">
            <LazyImage 
              src="/lovable-uploads/927988b5-f130-4e93-847b-20474831470d.png"
              alt="App Interface Dashboard" 
              className="w-full rounded-lg border border-gray-600"
              width={800}
              height={450}
              priority={true}
              style={{ opacity: 1 }} // Force visible with inline style
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlInterfaceSection;
