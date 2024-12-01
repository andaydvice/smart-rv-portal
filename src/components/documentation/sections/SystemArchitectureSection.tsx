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
        <AccordionTrigger className="text-xl text-blue-300">Central Control Unit (CCU)</AccordionTrigger>
        <AccordionContent className="text-gray-100 space-y-4">
          <h3 className="text-lg font-semibold text-blue-200">Overview</h3>
          <p className="leading-relaxed">
            The Central Control Unit (CCU) is the core processing unit of your Smart RV system. Built on a custom-designed motherboard with ECC memory support, it features redundant power supplies and automated failover systems to ensure continuous operation even in challenging conditions.
          </p>
          <p className="leading-relaxed">
            The CCU's processor architecture is specifically optimized for real-time monitoring and control applications, with dedicated cores for system management and user interface operations. This separation ensures that critical system functions remain responsive even under heavy load.
          </p>
          <h3 className="text-lg font-semibold text-blue-200 mt-6">Technical Specifications</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processor: Dual-core ARM Cortex-A72 @ 2.0 GHz</li>
            <li>Memory: 8GB DDR4 ECC RAM</li>
            <li>Storage: 256GB Industrial Grade SSD</li>
            <li>Operating Temperature: -20°C to 60°C</li>
            <li>Power Consumption: 15W typical, 25W peak</li>
            <li>Backup Battery: 2 hours runtime</li>
          </ul>
          <h3 className="text-lg font-semibold text-blue-200 mt-6">Integration Features</h3>
          <p className="leading-relaxed">
            The CCU interfaces with all subsystems through a proprietary high-speed bus system that supports hot-plugging and automatic device discovery. This allows for seamless integration of new components and ensures reliable communication between all system elements.
          </p>
          <p className="leading-relaxed">
            Advanced error detection and correction mechanisms are implemented at both the hardware and software levels. The system continuously monitors for potential issues and can automatically initiate corrective actions before they impact system operation.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SystemArchitectureSection;