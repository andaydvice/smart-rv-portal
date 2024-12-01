import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SystemArchitectureSection = () => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="central-control" className="border-gray-700">
        <AccordionTrigger className="text-xl text-blue-300">Understanding Your RV's Brain: The Central Control Unit (CCU)</AccordionTrigger>
        <AccordionContent className="text-gray-100 space-y-4">
          <p className="leading-relaxed">
            Modern RVs often come equipped with a Central Control Unit (CCU) that manages various systems throughout your vehicle. Think of it as your RV's command center - monitoring and controlling everything from power management to climate control.
          </p>
          
          <h3 className="text-lg font-semibold text-blue-200 mt-6">What Does a CCU Do?</h3>
          <p className="leading-relaxed">
            The CCU coordinates communication between different RV systems, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Power management and battery monitoring</li>
            <li>Temperature and climate control</li>
            <li>Tank level sensors</li>
            <li>Lighting systems</li>
            <li>Security features</li>
          </ul>

          <h3 className="text-lg font-semibold text-blue-200 mt-6">Technical Features to Look For</h3>
          <p className="leading-relaxed">
            When evaluating an RV's control system, consider these important specifications:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processing power to handle multiple systems simultaneously</li>
            <li>Memory capacity for system operations</li>
            <li>Storage for system data and updates</li>
            <li>Operating temperature range for various climates</li>
            <li>Backup power capabilities</li>
            <li>Integration capabilities with other RV systems</li>
          </ul>

          <h3 className="text-lg font-semibold text-blue-200 mt-6">System Integration</h3>
          <p className="leading-relaxed">
            Most modern CCUs can connect with various RV components through standardized communication systems. This allows you to monitor and control different aspects of your RV, often through a single interface or mobile app.
          </p>

          <h3 className="text-lg font-semibold text-blue-200 mt-6">Reliability Considerations</h3>
          <p className="leading-relaxed">
            Look for systems with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Backup power options</li>
            <li>Wide operating temperature ranges</li>
            <li>Error detection capabilities</li>
            <li>Automatic system monitoring</li>
            <li>Durable storage components</li>
          </ul>

          <p className="leading-relaxed mt-4">
            Understanding these features helps you make informed decisions about RV technology and maintenance. Whether you're shopping for a new RV or upgrading an existing one, knowing how these systems work together can improve your travel experience.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SystemArchitectureSection;