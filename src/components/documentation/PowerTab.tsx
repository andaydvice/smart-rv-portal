import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PowerTab = () => {
  return (
    <Card className="bg-gray-800/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-blue-400 text-2xl">Power Management</CardTitle>
        <CardDescription className="text-blue-100 font-medium text-lg">Power system specifications and optimization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-white">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Power Sources</h3>
          <p className="mb-4">
            Solar panel integration provides sustainable energy generation for extended off-grid adventures. Our advanced solar system maximizes power generation while minimizing environmental impact.
          </p>
          <p className="mb-4">
            Battery specifications are optimized for long-term reliability and performance. Our battery system delivers consistent power while supporting rapid charging capabilities.
          </p>
          <p className="mb-4">
            Shore power requirements are managed through intelligent power distribution systems. This ensures safe and efficient power usage when connected to external power sources.
          </p>
          <p className="mb-4">
            Generator compatibility extends your power options with seamless integration of auxiliary power sources. Our system automatically manages generator operation for optimal efficiency.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Power Management Features</h3>
          <p className="mb-4">
            Automated load balancing ensures efficient power distribution across all systems. This intelligent feature prevents power overload while maintaining optimal performance.
          </p>
          <p className="mb-4">
            Power consumption monitoring provides detailed insights into your energy usage patterns. This information helps optimize your power management strategy for maximum efficiency.
          </p>
          <p>
            Battery health tracking extends the life of your power system through proactive maintenance alerts. Continuous monitoring ensures optimal battery performance throughout its lifecycle.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerTab;