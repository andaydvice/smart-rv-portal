import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OverviewTab = () => {
  return (
    <Card className="bg-gray-800/90 border-gray-700">
      <CardHeader className="space-y-4">
        <CardTitle className="text-purple-400 text-3xl">Smart RV System Guide</CardTitle>
        <CardDescription className="text-blue-100 font-medium text-xl">Core Systems Overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 text-gray-100">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-purple-300 mb-4">Core Systems</h3>
          <p className="text-lg leading-relaxed mb-6">
            The Central Control Unit (CCU) manages your RV's main operations. If you experience system-wide issues, this is the first place to check.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            The Power Management System controls your RV's energy distribution. Monitor this through your control panel to prevent power issues.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            The Network System keeps all your smart features connected. A strong WiFi signal indicates everything is communicating properly.
          </p>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-purple-300 mb-4">Key Features to Monitor</h3>
          <p className="text-lg leading-relaxed mb-6">
            The Mobile App provides remote access to your RV's systems. If connection issues occur, first verify your phone's WiFi connection to the RV.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Cloud Services backup your settings and monitor system health. Check your internet connection if you receive sync errors.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Smart Device Integration allows connection with various devices. Ensure compatible devices are within range and properly paired.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-purple-300 mb-4">Common System Alerts</h3>
          <p className="text-lg leading-relaxed mb-6">
            Power Alerts: Yellow warnings indicate preventive checks needed. Red alerts require immediate attention.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Network Notifications: System will alert you to connection strength issues or disconnected devices.
          </p>
          <p className="text-lg leading-relaxed">
            Updates Available: Regular system updates improve performance and add new features.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;