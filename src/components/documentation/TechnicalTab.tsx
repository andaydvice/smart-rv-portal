import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TechnicalTab = () => {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-[1.75rem] font-medium text-[#60A5FA]">Smart RV System Specifications</CardTitle>
        <CardDescription className="text-sm text-gray-300">Detailed technical specifications and troubleshooting guide</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="core-hardware" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-gray-200">Core Hardware</AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm text-gray-300">
              <p>
                The system is powered by a Dual-core ARM processor running at 2.0 GHz per core, specifically designed for RV operations in extreme temperatures from -20°C to 60°C.
              </p>
              <p>
                This processor balances performance with power efficiency, essential for both plugged-in and off-grid operation.
              </p>
              <p>
                Memory and storage include 8GB RAM to ensure smooth operation of multiple systems simultaneously.
              </p>
              <p>
                The system includes a 128GB industrial-grade SSD for reliable data storage.
              </p>
              <p>
                USB ports are available for storage expansion when needed.
              </p>
              <p>
                For connectivity, the system combines dual-band WiFi supporting both 2.4GHz and 5GHz frequencies with 4G LTE capability.
              </p>
              <p>
                The system automatically switches between available networks to maintain consistent connectivity.
              </p>
              <p>
                External antenna ports allow for signal enhancement in remote locations.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="software-features" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-gray-200">Software Features</AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm text-gray-300">
              <p>
                The custom RV operating system is built on a Linux foundation, specifically engineered for RV operations.
              </p>
              <p>
                It includes an intuitive dashboard interface and intelligent power management features for extended off-grid use.
              </p>
              <p>
                Security is handled through continuous system monitoring and threat detection.
              </p>
              <p>
                All stored data is encrypted, and the system receives regular security updates to protect against new threats.
              </p>
              <p>
                System updates are managed through an over-the-air system that installs in the background without interrupting RV operations.
              </p>
              <p>
                The update system includes a rollback feature in case of any issues, and you can schedule updates at convenient times.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="troubleshooting" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-gray-200">Common Issues & Troubleshooting</AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm text-gray-300">
              <p>
                If the system isn't connecting to WiFi, first verify that your router is within range and powered on.
              </p>
              <p>
                For weak cellular connections, connect an external antenna to the designated port or move to an area with better coverage.
              </p>
              <p>
                When the system seems slow, check the dashboard for any processes using excessive resources.
              </p>
              <p>
                If storage space runs low, connect a USB drive for expanded storage or remove unused applications and data.
              </p>
              <p>
                Battery drain issues often relate to background processes - check the power management settings in your dashboard.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="emergency" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-gray-200">Emergency Recovery</AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm text-gray-300">
              <p>
                If the system won't boot, press and hold the recovery button for 10 seconds to enter safe mode.
              </p>
              <p>
                For complete system failure, use the provided USB recovery drive to restore factory settings.
              </p>
              <p>
                Keep a copy of your network settings stored separately in case you need to perform a system reset.
              </p>
              <p>
                Contact technical support if these steps don't resolve your issue.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default TechnicalTab;
