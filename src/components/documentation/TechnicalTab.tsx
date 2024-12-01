import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TechnicalTab = () => {
  return (
    <Card className="bg-gray-800/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-emerald-400 text-2xl">Smart RV System Specifications</CardTitle>
        <CardDescription className="text-blue-100 font-medium text-lg">Detailed technical specifications and troubleshooting guide</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-100">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-emerald-300 mb-4">Core Hardware</h3>
          <p className="text-lg leading-relaxed mb-6">
            The system is powered by a Dual-core ARM processor running at 2.0 GHz per core, specifically designed for RV operations in extreme temperatures from -20°C to 60°C.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            This processor balances performance with power efficiency, essential for both plugged-in and off-grid operation.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Memory and storage include 8GB RAM to ensure smooth operation of multiple systems simultaneously.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            The system includes a 128GB industrial-grade SSD for reliable data storage.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            USB ports are available for storage expansion when needed.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            For connectivity, the system combines dual-band WiFi supporting both 2.4GHz and 5GHz frequencies with 4G LTE capability.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            The system automatically switches between available networks to maintain consistent connectivity.
          </p>
          <p className="text-lg leading-relaxed">
            External antenna ports allow for signal enhancement in remote locations.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-emerald-300 mb-4">Software Features</h3>
          <p className="text-lg leading-relaxed mb-6">
            The custom RV operating system is built on a Linux foundation, specifically engineered for RV operations.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            It includes an intuitive dashboard interface and intelligent power management features for extended off-grid use.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Security is handled through continuous system monitoring and threat detection.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            All stored data is encrypted, and the system receives regular security updates to protect against new threats.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            System updates are managed through an over-the-air system that installs in the background without interrupting RV operations.
          </p>
          <p className="text-lg leading-relaxed">
            The update system includes a rollback feature in case of any issues, and you can schedule updates at convenient times.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-emerald-300 mb-4">Common Issues & Troubleshooting</h3>
          <p className="text-lg leading-relaxed mb-6">
            If the system isn't connecting to WiFi, first verify that your router is within range and powered on.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            For weak cellular connections, connect an external antenna to the designated port or move to an area with better coverage.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            When the system seems slow, check the dashboard for any processes using excessive resources.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            If storage space runs low, connect a USB drive for expanded storage or remove unused applications and data.
          </p>
          <p className="text-lg leading-relaxed">
            Battery drain issues often relate to background processes - check the power management settings in your dashboard.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-emerald-300 mb-4">Emergency Recovery</h3>
          <p className="text-lg leading-relaxed mb-6">
            If the system won't boot, press and hold the recovery button for 10 seconds to enter safe mode.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            For complete system failure, use the provided USB recovery drive to restore factory settings.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Keep a copy of your network settings stored separately in case you need to perform a system reset.
          </p>
          <p className="text-lg leading-relaxed">
            Contact technical support if these steps don't resolve your issue.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalTab;