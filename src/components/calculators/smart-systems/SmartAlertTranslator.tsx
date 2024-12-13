import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";
import { alertDatabase } from "./data/alertDatabase";
import { AlertCard } from "./components/AlertCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SmartAlertTranslator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredAlerts = Object.entries(alertDatabase).filter(([code, alert]) =>
    code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#60A5FA]" />
          <CardTitle className="text-xl text-[#60A5FA]">Smart Alert Translator</CardTitle>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Search and understand RV system alerts and learn how to resolve them
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Input
          placeholder="Search alerts by code or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
        />
        
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredAlerts.map(([code, alert]) => (
                  <AccordionItem key={code} value={code} className="border-gray-700">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex flex-col items-start">
                        <span className="text-[#60A5FA] font-semibold">{alert.title}</span>
                        <span className="text-sm text-gray-400">Code: {code}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <AlertCard code={code} alert={alert} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No alerts found matching your search
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SmartAlertTranslator;