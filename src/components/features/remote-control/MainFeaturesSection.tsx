
import React from 'react';

const MainFeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
        <div className="h-[72px]">
          <h2 className="text-2xl font-semibold text-[#5B9BD5]">Smartphone Control</h2>
        </div>
        <div className="relative aspect-video mb-6">
          <img 
            src="/lovable-uploads/1c1bb4c0-13a3-42f8-9b4d-f0aa74e2adb3.png"
            alt="Mobile App Interface"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li>Intuitive mobile app interface for iOS and Android</li>
          <li>Personalized user profiles and settings</li>
          <li>Real time system monitoring and alerts</li>
          <li>Touch controls for all RV systems</li>
          <li>Scheduling and automation capabilities</li>
        </ul>
      </div>

      <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
        <div className="h-[72px]">
          <h2 className="text-2xl font-semibold text-[#5B9BD5]">System Integration</h2>
        </div>
        <div className="relative aspect-video mb-6">
          <img 
            src="/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png"
            alt="System Integration Diagram"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li>Seamless connection with all smart RV systems</li>
          <li>Central hub for comprehensive control</li>
          <li>Unified dashboard for system status</li>
          <li>Automatic sync between devices</li>
          <li>Offline mode for essential functions</li>
        </ul>
      </div>
    </div>
  );
};

export default MainFeaturesSection;
