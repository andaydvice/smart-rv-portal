import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Cpu, ChevronDown } from "lucide-react";

const SystemArchitectureSection = () => {
  return (
    <AccordionItem value="system-architecture" className="border-b border-gray-700/50">
      <div className="flex items-center gap-3 px-6 py-4">
        <Cpu className="w-5 h-5 text-[#60A5FA]" />
        <AccordionTrigger className="text-[#60A5FA] text-lg hover:no-underline flex-1">
          System Architecture
          <ChevronDown className="h-5 w-5 shrink-0 text-[#4ADE80] transition-transform duration-200" />
        </AccordionTrigger>
      </div>
      <AccordionContent className="text-gray-300 space-y-4 px-6 pb-6">
        <p>
          Modern RVs use integrated control systems to manage essential functions, but understanding how they work helps you troubleshoot issues and make smarter usage decisions.
        </p>
        <p>
          Think of your RV's control system like a conductor coordinating an orchestra - it ensures all parts work together harmoniously.
        </p>

        <h3 className="text-lg font-semibold text-[#60A5FA] mt-6 mb-3">How Control Systems Work</h3>
        <p>
          Your RV's control system monitors various components through a network of sensors and connections, providing real time information about system status.
        </p>
        <p>
          Different manufacturers use varying approaches, but most follow similar principles for managing power, climate, and monitoring systems.
        </p>
        <p>
          Each sensor connects to a central processing unit that interprets signals and adjusts system operations accordingly.
        </p>

        <h3 className="text-lg font-semibold text-[#60A5FA] mt-6 mb-3">Common Control Functions</h3>
        <p>
          Temperature management involves more than simply setting a thermostat - your control system balances comfort with power efficiency.
        </p>
        <p>
          Tank monitoring requires calibrated sensors to provide accurate readings, but understanding their limitations helps interpret results correctly.
        </p>
        <p>
          Power distribution happens automatically, but knowing how your system prioritizes different components helps prevent overloads.
        </p>

        <h3 className="text-lg font-semibold text-[#60A5FA] mt-6 mb-3">Troubleshooting Basics</h3>
        <p>
          Start with simple checks when systems appear unresponsive - often a quick reset resolves communication issues.
        </p>
        <p>
          Learn to identify normal system behaviors versus genuine malfunctions to avoid unnecessary service calls.
        </p>
        <p>
          Document error codes and system responses to help diagnose recurring issues more effectively.
        </p>

        <h3 className="text-lg font-semibold text-[#60A5FA] mt-6 mb-3">System Maintenance Tips</h3>
        <p>
          Regular software updates keep your control system operating efficiently - learn how to check for and apply updates safely.
        </p>
        <p>
          Sensor calibration affects system accuracy - understanding basic calibration procedures helps maintain reliable monitoring.
        </p>
        <p>
          Battery backup systems need periodic testing to ensure they'll function when needed most.
        </p>

        <h3 className="text-lg font-semibold text-[#60A5FA] mt-6 mb-3">Making Smart Upgrades</h3>
        <p>
          Consider compatibility when adding new components to your RV's network - not all systems work together seamlessly.
        </p>
        <p>
          Start with understanding your current system's capabilities before investing in expensive upgrades.
        </p>
        <p>
          Focus on improvements that enhance your specific travel style rather than chasing the latest features.
        </p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SystemArchitectureSection;
