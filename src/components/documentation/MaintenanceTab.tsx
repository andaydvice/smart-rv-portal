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

const MaintenanceTab = () => {
  return (
    <Card className="bg-gray-800/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-[#60A5FA]">RV System Maintenance Guide</CardTitle>
        <CardDescription className="text-sm text-gray-300">Comprehensive maintenance procedures and troubleshooting steps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-sm text-gray-300">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="monthly" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-[#60A5FA]">Monthly Maintenance</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>Your Smart RV system runs automatic diagnostics on the first of each month to protect your investment.</p>
              <p>The comprehensive scan evaluates battery health, monitors storage usage, and verifies network stability.</p>
              <p>The system checks temperature sensor calibration and analyzes error logs to prevent future issues.</p>
              <p>You'll receive a simple notification when the diagnostic scan completes, with clear next steps if action is needed.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quarterly" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-[#60A5FA]">Quarterly Tasks</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>Our system will notify you when it's time for the quarterly software update, delivering new features and security enhancements.</p>
              <p>These updates are designed to improve your RV experience while maintaining system stability.</p>
              <p>The automated backup utility safeguards your network configurations, dashboard preferences, and travel logs.</p>
              <p>For best results, connect to a stable WiFi network before starting updates or backups.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="yearly" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-[#60A5FA]">Yearly Service Requirements</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>Your annual hardware inspection should be completed by an authorized service center to maintain optimal performance.</p>
              <p>Technicians will test all physical connections, verify antenna performance, and assess battery capacity.</p>
              <p>The inspection includes a thorough evaluation of the cooling system and sensor calibration.</p>
              <p>This professional assessment helps ensure reliable operation throughout your travels.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="troubleshooting" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-[#60A5FA]">Quick Troubleshooting Guide</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-200 mb-2">If Your System Won't Connect</h4>
                <div className="space-y-2">
                  <p>Start by checking if your router has power and you're within range of the WiFi signal.</p>
                  <p>Verify that your network password is entered correctly in the system settings.</p>
                  <p>If using cellular data, ensure your external antenna is properly connected.</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-blue-200 mb-2">For System Performance Issues</h4>
                <div className="space-y-2">
                  <p>When your system seems slow, first check the available storage space on your dashboard.</p>
                  <p>Review which processes are currently running and using system resources.</p>
                  <p>Verify that your battery is adequately charged, as low power can impact performance.</p>
                  <p>Check if any system updates are pending installation.</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-blue-200 mb-2">Power Related Problems</h4>
                <div className="space-y-2">
                  <p>First, confirm that your shore power connection is secure and providing consistent power.</p>
                  <p>Examine all battery connections for signs of corrosion or loose fittings.</p>
                  <p>Check your power usage dashboard to identify any unusual consumption patterns.</p>
                  <p>Test your backup power systems to ensure they're ready when needed.</p>
                </div>
              </div>

              <p className="text-blue-200 mt-4">
                If you've tried these steps and still experience issues, contact your SMART RV technical support team.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default MaintenanceTab;