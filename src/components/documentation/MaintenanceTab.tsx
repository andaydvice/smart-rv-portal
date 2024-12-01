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
        <CardTitle className="text-blue-400 text-2xl">Maintenance Procedures</CardTitle>
        <CardDescription className="text-blue-100 font-medium text-lg">Regular maintenance and troubleshooting guides</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-white">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Regular Maintenance</h3>
          <p className="mb-4">
            Monthly system diagnostics provide comprehensive health checks of all major systems. These automated assessments identify potential issues before they impact your travel experience.
          </p>
          <p className="mb-4">
            Quarterly software updates deliver new features and optimizations to enhance your RV's capabilities. Each update undergoes rigorous testing to ensure compatibility and stability.
          </p>
          <p className="mb-4">
            Annual hardware inspections maintain peak system performance through professional assessment of all physical components. These thorough checkups ensure long-term reliability of your investment.
          </p>
          <p className="mb-4">
            Regular backup procedures protect your settings and personal data against unexpected events. Our automated backup system ensures your information is always secure and recoverable.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Troubleshooting Steps</h3>
          <p className="mb-4">
            System reset procedures are carefully designed to resolve issues while preserving your settings. These targeted reset options minimize disruption to your RV experience.
          </p>
          <p className="mb-4">
            Network connectivity issues are addressed through our advanced diagnostic tools. These utilities help identify and resolve connection problems quickly and effectively.
          </p>
          <p>
            Power system diagnostics ensure optimal energy distribution and battery health. Regular monitoring prevents power-related issues before they affect your journey.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceTab;