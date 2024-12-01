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
        <AccordionTrigger className="text-2xl text-blue-300 hover:text-blue-200">Understanding Your RV's Control System</AccordionTrigger>
        <AccordionContent className="text-gray-100 space-y-6 px-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed tracking-wide">
              Modern RVs use integrated control systems to manage essential functions, but understanding how they work helps you troubleshoot issues and make smarter usage decisions.
            </p>
            
            <p className="text-lg leading-relaxed tracking-wide">
              Think of your RV's control system like a conductor coordinating an orchestra - it ensures all parts work together harmoniously.
            </p>

            <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">How Control Systems Work</h3>
            <p className="text-lg leading-relaxed tracking-wide">
              Your RV's control system monitors various components through a network of sensors and connections, providing real time information about system status.
            </p>
            <p className="text-lg leading-relaxed tracking-wide">
              Different manufacturers use varying approaches, but most follow similar principles for managing power, climate, and monitoring systems.
            </p>
            <p className="text-lg leading-relaxed tracking-wide">
              Each sensor connects to a central processing unit that interprets signals and adjusts system operations accordingly.
            </p>

            <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">Common Control Functions</h3>
            <p className="text-lg leading-relaxed tracking-wide">
              Temperature management involves more than simply setting a thermostat - your control system balances comfort with power efficiency.
            </p>
            <p className="text-lg leading-relaxed tracking-wide">
              Tank monitoring requires calibrated sensors to provide accurate readings, but understanding their limitations helps interpret results correctly.
            </p>
            <p className="text-lg leading-relaxed tracking-wide">
              Power distribution happens automatically, but knowing how your system prioritizes different components helps prevent overloads.
            </p>

            <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">Troubleshooting Basics</h3>
            <p className="text-lg leading-relaxed tracking-wide">
              Start with simple checks when systems appear unresponsive - often a quick reset resolves communication issues.
            </p>
            <p className="text-lg leading-relaxed tracking-wide">
              Learn to identify normal system behaviors versus genuine malfunctions to avoid unnecessary service calls.
            </p>
            <p className="text-lg leading-relaxed tracking-wide">
              Document error codes and system responses to help diagnose recurring issues more effectively.
            </p>

            <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">System Maintenance Tips</h3>
            <p className="text-lg leading-relaxed tracking-wide">
              Regular software updates keep your control system operating efficiently - learn how to check for and apply updates safely.
            </p>
            <p className="text-lg leading-relaxed tracking-wide">
              Sensor calibration affects system accuracy - understanding basic calibration procedures helps maintain reliable monitoring.
            </p>
            <p className="text-lg leading-relaxed tracking-wide">
              Battery backup systems need periodic testing to ensure they'll function when needed most.
            </p>

            <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">Making Smart Upgrades</h3>
            <p className="text-lg leading-relaxed tracking-wide">
              Consider compatibility when adding new components to your RV's network - not all systems work together seamlessly.
            </p>
            <p className="text-lg leading-relaxed tracking-wide">
              Start with understanding your current system's capabilities before investing in expensive upgrades.
            </p>
            <p className="text-lg leading-relaxed tracking-wide">
              Focus on improvements that enhance your specific travel style rather than chasing the latest features.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SystemArchitectureSection;