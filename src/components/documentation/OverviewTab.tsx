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

const OverviewTab = () => {
  return (
    <Card className="bg-gray-800/90 border-gray-700">
      <CardHeader className="space-y-4">
        <CardTitle className="text-[#8BB4E7] text-3xl">Smart RV System Guide</CardTitle>
        <CardDescription className="text-gray-300 font-medium text-xl">Core Systems Overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 text-gray-300">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="core-systems" className="border-b-gray-700">
            <AccordionTrigger className="text-2xl font-semibold text-[#8BB4E7] hover:text-[#8BB4E7]/80">
              Core Systems
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p className="text-xl leading-relaxed">
                The Central Control Unit (CCU) manages your RV's main operations. If you experience system wide issues, this is the first place to check.
              </p>
              <p className="text-xl leading-relaxed">
                The Power Management System controls your RV's energy distribution. Monitor this through your control panel to prevent power issues.
              </p>
              <p className="text-xl leading-relaxed">
                The Network System keeps all your smart features connected. A strong WiFi signal indicates everything is communicating properly.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="key-features" className="border-b-gray-700">
            <AccordionTrigger className="text-2xl font-semibold text-[#8BB4E7] hover:text-[#8BB4E7]/80">
              Key Features to Monitor
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p className="text-xl leading-relaxed">
                The Mobile App provides remote access to your RV's systems. If connection issues occur, first verify your phone's WiFi connection to the RV.
              </p>
              <p className="text-xl leading-relaxed">
                Cloud Services backup your settings and monitor system health. Check your internet connection if you receive sync errors.
              </p>
              <p className="text-xl leading-relaxed">
                Smart Device Integration allows connection with various devices. Ensure compatible devices are within range and properly paired.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="system-alerts" className="border-b-gray-700">
            <AccordionTrigger className="text-2xl font-semibold text-[#8BB4E7] hover:text-[#8BB4E7]/80">
              Common System Alerts
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p className="text-xl leading-relaxed">
                Power Alerts: Yellow warnings indicate preventive checks needed. Red alerts require immediate attention.
              </p>
              <p className="text-xl leading-relaxed">
                Network Notifications: System will alert you to connection strength issues or disconnected devices.
              </p>
              <p className="text-xl leading-relaxed">
                Updates Available: Regular system updates improve performance and add new features.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;