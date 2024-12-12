import React from "react";
import { Check, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TroubleshootingTipsProps {
  tips: string[];
}

const TroubleshootingTips = ({ tips }: TroubleshootingTipsProps) => {
  return (
    <ScrollArea className="h-[200px] mt-4 rounded-md border border-gray-700 p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-yellow-400">
          <Info className="w-4 h-4" />
          <h4 className="font-medium">Troubleshooting Tips</h4>
        </div>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-100">
              <Check className="w-4 h-4 mt-1 text-green-400" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
};

export default TroubleshootingTips;