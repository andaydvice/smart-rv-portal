import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PowerManagementSection = () => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="power-management" className="border-gray-700">
        <AccordionTrigger className="text-xl text-blue-300">Power Management System</AccordionTrigger>
        <AccordionContent className="text-gray-100 space-y-4">
          <h3 className="text-lg font-semibold text-blue-200">Power Distribution</h3>
          <p className="leading-relaxed">
            The power management system employs a sophisticated multi-source architecture that seamlessly integrates shore power, solar generation, and battery storage. The system uses predictive algorithms to optimize power distribution based on historical usage patterns and real-time monitoring of available resources.
          </p>
          <p className="leading-relaxed">
            Advanced power conditioning circuits protect sensitive electronics from voltage fluctuations and surges, while intelligent load shedding capabilities ensure critical systems remain operational during power constraints.
          </p>
          <h3 className="text-lg font-semibold text-blue-200 mt-6">Battery Management</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Lithium iron phosphate (LiFePO4) battery chemistry</li>
            <li>Active cell balancing with temperature monitoring</li>
            <li>Smart charging with multi-stage profiles</li>
            <li>State of health monitoring and prediction</li>
            <li>Automated maintenance cycles</li>
            <li>Emergency power reserve management</li>
          </ul>
          <h3 className="text-lg font-semibold text-blue-200 mt-6">Solar Integration</h3>
          <p className="leading-relaxed">
            The solar power system features advanced MPPT controllers that optimize charging efficiency across varying environmental conditions. Real-time monitoring of panel performance allows for early detection of issues such as shading or degradation.
          </p>
          <p className="leading-relaxed">
            The system includes sophisticated energy forecasting that combines weather data with historical generation patterns to optimize power management strategies. This allows for proactive adjustment of power consumption based on expected solar availability.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PowerManagementSection;