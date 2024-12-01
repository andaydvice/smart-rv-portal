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
        <CardTitle className="text-rose-400 text-2xl">Power Management</CardTitle>
        <CardDescription className="text-blue-100 font-medium text-lg">Power system specifications and optimization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-100">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-rose-300 mb-4">Power Sources</h3>
          <p className="text-lg leading-relaxed mb-6">
            Solar panel integration provides sustainable energy generation for extended off-grid adventures. Our advanced solar system maximizes power generation while minimizing environmental impact.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Battery specifications are optimized for long-term reliability and performance. Our battery system delivers consistent power while supporting rapid charging capabilities.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Shore power requirements are managed through intelligent power distribution systems. This ensures safe and efficient power usage when connected to external power sources.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Generator compatibility extends your power options with seamless integration of auxiliary power sources. Our system automatically manages generator operation for optimal efficiency.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-rose-300 mb-4">Power Management Features</h3>
          <p className="text-lg leading-relaxed mb-6">
            Automated load balancing ensures efficient power distribution across all systems. This intelligent feature prevents power overload while maintaining optimal performance.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Power consumption monitoring provides detailed insights into your energy usage patterns. This information helps optimize your power management strategy for maximum efficiency.
          </p>
          <p className="text-lg leading-relaxed">
            Battery health tracking extends the life of your power system through proactive maintenance alerts. Continuous monitoring ensures optimal battery performance throughout its lifecycle.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerTab;
