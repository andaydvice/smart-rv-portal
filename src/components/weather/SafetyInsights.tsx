
import React from 'react';
import { AlertTriangle, Phone } from 'lucide-react';

const SafetyInsights: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-blue-400" />
        <h2 className="text-2xl font-bold">Safety Insights</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 rounded-lg border border-blue-500/50 bg-blue-500/10">
          <h3 className="font-semibold mb-2">Weather Safety Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Monitor weather conditions regularly</li>
            <li>Keep emergency supplies stocked</li>
            <li>Know your RV's wind resistance limits</li>
            <li>Have an evacuation plan ready</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-blue-500/50 bg-blue-500/10">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold mb-2">Emergency Contacts</h3>
            <Phone className="h-5 w-5 text-blue-400" />
          </div>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Local Emergency: 911</li>
            <li>Road Assistance: Your Provider Number</li>
            <li>Weather Updates: National Weather Service</li>
            <li>Campground Office: Save Current Location</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SafetyInsights;
