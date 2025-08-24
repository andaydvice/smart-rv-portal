
import React from 'react';
import { LazyImage } from "@/components/ui/LazyImage";

const MainFeaturesSection = () => {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
        <div className="h-[72px]">
          <h2 className="text-2xl font-semibold text-[#5B9BD5]">Smartphone Control</h2>
        </div>
        <div className="relative aspect-video mb-6">
          <LazyImage 
            src="/lovable-uploads/1052608d-e42b-4079-9281-20406179ce4d.png"
            alt="Mobile App Interface" 
            className="w-full h-full object-cover rounded-lg"
            width={640}
            height={360}
            priority={true}
            style={{ opacity: 1 }} // Force visible with inline style
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
          <LazyImage 
            src="/lovable-uploads/af7df254-2b02-454a-a483-7e1e230dc571.png"
            alt="System Integration Dashboard" 
            className="w-full h-full object-cover rounded-lg"
            width={640}
            height={360}
            priority={true}
            style={{ opacity: 1 }} // Force visible with inline style
          />
        </div>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li>Seamless connection with all Smart RV Hub systems</li>
          <li>Central hub for comprehensive control</li>
          <li>Unified dashboard for system status</li>
          <li>Automatic sync between devices</li>
          <li>Offline mode for essential functions</li>
        </ul>
      </div>
    </div>;
};
export default MainFeaturesSection;
