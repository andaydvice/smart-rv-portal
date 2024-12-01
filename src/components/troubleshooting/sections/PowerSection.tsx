import { Power, Clock, AlertTriangle, HelpCircle } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PowerSection = () => {
  return (
    <AccordionItem value="power" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Power className="h-5 w-5" />
          Power System Diagnostics
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 space-y-4">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-blue-200 mb-2">Converter Testing</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <div className="inline-flex items-center gap-2">
                Test output voltage (should be 13.6-14.4V DC)
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(5-10 min)</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-purple-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Use certified multimeter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Check for unusual noise or vibration
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(2-3 min)</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Immediate attention needed if present</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Inspect cooling fan operation
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(5 min)</span>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Verify proper grounding
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(10-15 min)</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-purple-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Professional inspection recommended</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </li>
          </ol>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-blue-200 mb-2">Circuit Protection</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <div className="inline-flex items-center gap-2">
                Locate main circuit breaker panel
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(1-2 min)</span>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Check for tripped breakers
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(2-3 min)</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Note which circuits are affected</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Inspect fuse box for blown fuses
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(5-10 min)</span>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Test GFCI outlets
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(10-15 min)</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-purple-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Professional testing recommended if multiple failures</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </li>
          </ol>
        </div>
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-800">
          <h4 className="font-medium text-red-400 flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4" />
            Warning Signs
          </h4>
          <ul className="list-disc list-inside space-y-2 text-red-300">
            <li>Burning smell or visible smoke</li>
            <li>Frequent circuit breaker trips</li>
            <li>Voltage fluctuations outside normal range</li>
            <li>Unusual heating of electrical components</li>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PowerSection;