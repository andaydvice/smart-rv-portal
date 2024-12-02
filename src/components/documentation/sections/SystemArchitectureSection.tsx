import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Cpu } from "lucide-react";

const SystemArchitectureSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Cpu className="w-6 h-6 text-[#60A5FA]" />
        <h2 className="text-[#60A5FA] text-2xl font-semibold">System Architecture</h2>
      </div>
      
      <div className="rounded-2xl border border-gray-800/50 bg-[#0F172A]/50 overflow-hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="system-architecture" className="border-0">
            <AccordionTrigger className="px-6 py-4 text-[#4ADE80] text-xl hover:no-underline hover:text-[#4ADE80]/90">
              System Architecture Overview
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-gray-300 space-y-4 text-lg">
              <p className="leading-relaxed">
                Modern RVs use integrated control systems to manage essential functions, but understanding how they work helps you troubleshoot issues and make smarter usage decisions.
              </p>
              <p className="leading-relaxed">
                Think of your RV's control system like a conductor coordinating an orchestra - it ensures all parts work together harmoniously.
              </p>

              <h3 className="text-lg font-semibold text-blue-200 mt-6">How Control Systems Work</h3>
              <p className="leading-relaxed">
                Your RV's control system monitors various components through a network of sensors and connections, providing real time information about system status.
              </p>
              <p className="leading-relaxed">
                Different manufacturers use varying approaches, but most follow similar principles for managing power, climate, and monitoring systems.
              </p>
              <p className="leading-relaxed">
                Each sensor connects to a central processing unit that interprets signals and adjusts system operations accordingly.
              </p>

              <h3 className="text-lg font-semibold text-blue-200 mt-6">Common Control Functions</h3>
              <p className="leading-relaxed">
                Temperature management involves more than simply setting a thermostat - your control system balances comfort with power efficiency.
              </p>
              <p className="leading-relaxed">
                Tank monitoring requires calibrated sensors to provide accurate readings, but understanding their limitations helps interpret results correctly.
              </p>
              <p className="leading-relaxed">
                Power distribution happens automatically, but knowing how your system prioritizes different components helps prevent overloads.
              </p>

              <h3 className="text-lg font-semibold text-blue-200 mt-6">Troubleshooting Basics</h3>
              <p className="leading-relaxed">
                Start with simple checks when systems appear unresponsive - often a quick reset resolves communication issues.
              </p>
              <p className="leading-relaxed">
                Learn to identify normal system behaviors versus genuine malfunctions to avoid unnecessary service calls.
              </p>
              <p className="leading-relaxed">
                Document error codes and system responses to help diagnose recurring issues more effectively.
              </p>

              <h3 className="text-lg font-semibold text-blue-200 mt-6">System Maintenance Tips</h3>
              <p className="leading-relaxed">
                Regular software updates keep your control system operating efficiently - learn how to check for and apply updates safely.
              </p>
              <p className="leading-relaxed">
                Sensor calibration affects system accuracy - understanding basic calibration procedures helps maintain reliable monitoring.
              </p>
              <p className="leading-relaxed">
                Battery backup systems need periodic testing to ensure they'll function when needed most.
              </p>

              <h3 className="text-lg font-semibold text-blue-200 mt-6">Making Smart Upgrades</h3>
              <p className="leading-relaxed">
                Consider compatibility when adding new components to your RV's network - not all systems work together seamlessly.
              </p>
              <p className="leading-relaxed">
                Start with understanding your current system's capabilities before investing in expensive upgrades.
              </p>
              <p className="leading-relaxed">
                Focus on improvements that enhance your specific travel style rather than chasing the latest features.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SystemArchitectureSection;
