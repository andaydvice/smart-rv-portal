import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TroubleshootingAffiliateRecommendations = () => {
  const problemSolutions = [
    {
      problem: "Power System Issues",
      description: "Battery not charging, inverter problems, or electrical failures",
      solution: "TechnoRV Smart Monitoring Systems",
      link: "https://technorv.com/power-monitoring?ref=smartroadportal"
    },
    {
      problem: "Water System Problems", 
      description: "Low water pressure, pump failures, or contaminated water",
      solution: "RV Water Filter Store Solutions",
      link: "https://rvwaterfilterstore.com/?ref=smartroadportal"
    },
    {
      problem: "Connectivity Issues",
      description: "Poor internet signal, failed WiFi, or communication problems",
      solution: "TechnoRV Connectivity Boosters",
      link: "https://technorv.com/connectivity?ref=smartroadportal"
    },
    {
      problem: "Emergency Breakdown",
      description: "Mechanical failure, tire blowout, or engine problems",
      solution: "Good Sam Roadside Assistance",
      link: "https://www.goodsam.com/roadside-assistance/?ref=smartroadportal"
    }
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
            {problemSolutions.map((item, index) => (
              <div key={index} className="bg-black/20 p-4 rounded-lg border border-red-500/30">
                <h4 className="font-semibold text-red-300 mb-2">{item.problem}</h4>
                <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 font-medium text-sm"
                >
                  {item.solution} →
                </a>
              </div>
            ))}
          </div>

          <OptimizedAffiliateGrid
            title="Emergency Solutions & Tools"
            subtitle="Essential products and services for RV troubleshooting and emergency situations"
            partners={[
              { partner: 'goodsam', title: 'Emergency Assistance', description: '24/7 RV-specific roadside assistance and emergency services' },
              { partner: 'technorv', title: 'Diagnostic Tools', description: 'Advanced diagnostic tools for troubleshooting RV systems' },
              { partner: 'rvwaterfilter', title: 'Emergency Water', description: 'Emergency water purification and backup systems' }
            ]}
            gridCols="3"
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
                <li>• Regular system diagnostics with TechnoRV tools</li>
                <li>• Water system maintenance and filter replacement</li>
                <li>• Power system monitoring and battery care</li>
                <li>• Good Sam maintenance reminders and services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-3">Emergency Preparedness</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• 24/7 roadside assistance coverage</li>
                <li>• Emergency water purification systems</li>
                <li>• Backup power and communication systems</li>
                <li>• Professional repair service networks</li>
              </ul>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Maintenance & Prevention Tools"
            subtitle="Keep your RV in top condition with these maintenance resources"
            partners={[
              { partner: 'rvlife', title: 'Maintenance Tools', description: 'Digital tools and apps for RV maintenance tracking' },
              { partner: 'technorv', title: 'Monitoring Systems', description: 'Smart monitoring systems for preventive maintenance' }
            ]}
            gridCols="2"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TroubleshootingAffiliateRecommendations;