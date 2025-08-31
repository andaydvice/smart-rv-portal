
import React from 'react';
import { VideoSection } from "@/components/ui/VideoSection";

const MainFeaturesSection = () => {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
        <div className="h-[72px]">
          <h2 className="text-2xl font-semibold text-[#5B9BD5]">Smartphone Control</h2>
        </div>
        <VideoSection
          videoId="smart-systems-demo"
          title="Smartphone Control Demo"
          description="See how intuitive mobile controls give you complete RV system management"
          className="mb-6"
        />
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
        <VideoSection
          videoId="connectivity-demo"
          title="System Integration Demo"
          description="Experience seamless integration across all RV systems from one central hub"
          className="mb-6"
        />
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
