import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TroubleshootingAffiliateRecommendations = () => {
  const emergencyPartners = [
    { partner: 'goodsam' as const, title: 'Emergency Roadside Assistance', description: '24/7 RV-specific emergency services and towing assistance' },
    { partner: 'rvwaterfilter' as const, title: 'Water System Solutions', description: 'Emergency water purification and system repair guidance' },
    { partner: 'ecoflow' as const, title: 'Portable Power Safety', description: 'Portable power stations with emergency backup and monitoring' },
    { partner: 'rvlife' as const, title: 'Emergency Planning', description: 'Digital tools and resources for emergency preparedness' }
  ];

  return (
    <div className="space-y-8">
      {/* Emergency Solutions */}
      <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-red-300 flex items-center gap-2">
            🚨 Emergency Troubleshooting Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            When problems occur on the road, having the right tools and services can make all the difference. Here are our recommended solutions for common RV issues:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-black/20 p-4 rounded-lg border border-red-500/30">
              <h4 className="font-semibold text-red-300 mb-2">Power System Issues</h4>
              <p className="text-gray-300 text-sm mb-3">Battery monitoring, power management, and backup solutions</p>
              <p className="text-orange-400 font-medium text-sm">Battle Born Batteries & Smart Systems →</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-red-500/30">
              <h4 className="font-semibold text-red-300 mb-2">Water System Problems</h4>
              <p className="text-gray-300 text-sm mb-3">Filtration failures, contamination, and pressure issues</p>
              <p className="text-orange-400 font-medium text-sm">Water Safety Solutions →</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-red-500/30">
              <h4 className="font-semibold text-red-300 mb-2">Connectivity Issues</h4>
              <p className="text-gray-300 text-sm mb-3">Poor signal, failed internet, communication breakdowns</p>
              <p className="text-orange-400 font-medium text-sm">WeBoost Signal Solutions →</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-red-500/30">
              <h4 className="font-semibold text-red-300 mb-2">Emergency Breakdown</h4>
              <p className="text-gray-300 text-sm mb-3">Tire blowouts, mechanical failures, roadside emergencies</p>
              <p className="text-orange-400 font-medium text-sm">Good Sam Emergency Service →</p>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Emergency Solutions & Tools"
            subtitle="Essential products and services for RV troubleshooting and emergency situations"
            partners={emergencyPartners}
            gridCols="4"
            className="bg-black/20 border-red-500/30"
          />
        </CardContent>
      </Card>

      {/* Prevention and Maintenance */}
      <Card className="bg-[#091020] border-blue-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            🔧 Prevention & Maintenance Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-semibold text-blue-300 mb-3">Preventive Maintenance</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Power system monitoring with Battle Born smart systems</li>
                <li>• Water filtration maintenance and testing</li>
                <li>• Tire pressure monitoring with TireMinder TPMS</li>
                <li>• Good Sam maintenance scheduling and services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-3">Emergency Preparedness</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• 24/7 Good Sam roadside assistance coverage</li>
                <li>• Emergency water purification backup systems</li>
                <li>• WeBoost signal boosters for remote communication</li>
                <li>• Harvest Hosts safe overnight parking network</li>
              </ul>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Maintenance & Prevention Tools"
            subtitle="Keep your RV in top condition with these maintenance resources"
            partners={[
              { partner: 'ecoflow', title: 'Power Monitoring', description: 'Portable power stations with monitoring and alerts for preventive maintenance' },
              { partner: 'rvwaterfilter', title: 'Water Safety', description: 'Filtration systems for preventing water contamination issues' },
              { partner: 'rvlife', title: 'Digital Maintenance', description: 'Apps and tools for tracking RV maintenance schedules' },
              { partner: 'goodsam', title: 'Service Network', description: 'Professional RV service and repair network access' }
            ]}
            gridCols="4"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TroubleshootingAffiliateRecommendations;