import React from 'react';

const SafetyInsights: React.FC = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Safety Insights</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-background-secondary/50 rounded-lg">
          <h3 className="font-semibold mb-2">Weather Safety Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Monitor weather conditions regularly</li>
            <li>Keep emergency supplies stocked</li>
            <li>Know your RV's wind resistance limits</li>
            <li>Have an evacuation plan ready</li>
          </ul>
        </div>
        <div className="p-4 bg-background-secondary/50 rounded-lg">
          <h3 className="font-semibold mb-2">Emergency Contacts</h3>
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