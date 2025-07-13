import AffiliateProductCard from '@/components/affiliate/AffiliateProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TroubleshootingAffiliateRecommendations = () => {
  const troubleshootingProducts = [
    {
      title: "Good Sam Roadside Assistance",
      description: "24/7 RV-specific roadside assistance and emergency services. Don't get stranded on your next adventure.",
      price: "$89/year",
      originalPrice: "$129/year",
      rating: 4.8,
      reviewCount: 5847,
      image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
      features: [
        "24/7 RV-specific assistance",
        "Unlimited distance towing",
        "Emergency repair services",
        "Trip interruption coverage"
      ],
      affiliateLink: "https://www.goodsam.com/roadside-assistance/?ref=smartroadportal",
      badges: ["Good Sam Partner", "Emergency Essential"]
    },
    {
      title: "TechnoRV Diagnostic Tool",
      description: "Advanced RV system diagnostic tool for troubleshooting electrical, plumbing, and mechanical issues.",
      price: "$199",
      originalPrice: "$299",
      rating: 4.6,
      reviewCount: 892,
      image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
      features: [
        "Real-time system diagnostics",
        "Step-by-step repair guides",
        "Professional troubleshooting",
        "Professional support included"
      ],
      affiliateLink: "https://technorv.com/diagnostic-tool?ref=smartroadportal",
      badges: ["TechnoRV Partner", "Diagnostic"]
    },
    {
      title: "RV Water Filter Store Emergency Kit",
      description: "Emergency water filtration and purification kit for when your main water system fails.",
      price: "$149",
      originalPrice: "$199",
      rating: 4.7,
      reviewCount: 1234,
      image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
      features: [
        "Emergency water purification",
        "Portable filtration system",
        "Safe drinking water guarantee",
        "Easy installation guide"
      ],
      affiliateLink: "https://rvwaterfilterstore.com/emergency-kit?ref=smartroadportal",
      badges: ["Water Safety", "Emergency Kit"]
    }
  ];

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

          <div className="grid md:grid-cols-3 gap-6">
            {troubleshootingProducts.map((product, index) => (
              <AffiliateProductCard
                key={index}
                {...product}
                className="h-full"
              />
            ))}
          </div>
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
          <div className="grid md:grid-cols-2 gap-6">
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
          
          <div className="mt-6 text-center">
            <a 
              href="https://rvlife.com/maintenance-tools?ref=smartroadportal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get RV Life Maintenance Tools
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TroubleshootingAffiliateRecommendations;