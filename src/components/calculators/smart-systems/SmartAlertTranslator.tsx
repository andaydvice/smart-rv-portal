import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Zap, Shield, Settings, Wrench, Bell } from "lucide-react";
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
  
  // Group alerts by their category
  const groupedAlerts = Object.entries(alertDatabase).reduce((acc, [code, alert]) => {
    // Extract category from the code (everything before the first underscore)
    const category = code.split('_')[0].toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push([code, alert]);
    return acc;
  }, {} as Record<string, [string, typeof alertDatabase[keyof typeof alertDatabase]][]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'voltage':
      case 'electrical':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'safety':
        return <Shield className="w-5 h-5 text-red-400" />;
      case 'system':
        return <Settings className="w-5 h-5 text-blue-400" />;
      case 'maintenance':
        return <Wrench className="w-5 h-5 text-green-400" />;
      default:
        return <Bell className="w-5 h-5 text-purple-400" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1) + " Alerts";
  };

  const filteredAlerts = Object.entries(groupedAlerts).reduce((acc, [category, alerts]) => {
    const filtered = alerts.filter(([code, alert]) =>
      code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as typeof groupedAlerts);

  console.log('Grouped Alerts:', groupedAlerts); // Debug log
  console.log('Filtered Alerts:', filteredAlerts); // Debug log

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
            {Object.entries(filteredAlerts).length > 0 ? (
              Object.entries(filteredAlerts).map(([category, alerts]) => (
                <div key={category} className="space-y-2 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    {getCategoryIcon(category)}
                    <h3 className="text-lg font-semibold text-gray-200">
                      {getCategoryTitle(category)}
                    </h3>
                  </div>
                  <Accordion type="single" collapsible className="space-y-4">
                    {alerts.map(([code, alert]) => (
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
                </div>
              ))
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