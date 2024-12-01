import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MaintenanceTab = () => {
  return (
    <Card className="bg-gray-800/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-amber-400 text-2xl">Maintenance Procedures</CardTitle>
        <CardDescription className="text-blue-100 font-medium text-lg">Regular maintenance and troubleshooting guides</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-100">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-amber-300 mb-4">Regular Maintenance</h3>
          <p className="text-lg leading-relaxed mb-6">
            Monthly system diagnostics provide comprehensive health checks of all major systems. These automated assessments identify potential issues before they impact your travel experience.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Quarterly software updates deliver new features and optimizations to enhance your RV's capabilities. Each update undergoes rigorous testing to ensure compatibility and stability.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Annual hardware inspections maintain peak system performance through professional assessment of all physical components. These thorough checkups ensure long-term reliability of your investment.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Regular backup procedures protect your settings and personal data against unexpected events. Our automated backup system ensures your information is always secure and recoverable.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-amber-300 mb-4">Troubleshooting Steps</h3>
          <p className="text-lg leading-relaxed mb-6">
            System reset procedures are carefully designed to resolve issues while preserving your settings. These targeted reset options minimize disruption to your RV experience.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Network connectivity issues are addressed through our advanced diagnostic tools. These utilities help identify and resolve connection problems quickly and effectively.
          </p>
          <p className="text-lg leading-relaxed">
            Power system diagnostics ensure optimal energy distribution and battery health. Regular monitoring prevents power-related issues before they affect your journey.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceTab;
