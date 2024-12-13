import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CalendarClock, Wrench, CheckSquare } from "lucide-react";

interface MaintenanceTask {
  interval: string;
  tasks: string[];
}

interface MaintenanceSchedule {
  [key: string]: MaintenanceTask;
}

const MaintenanceScheduleCreator = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();

  console.log("Maintenance Schedule Creator - Form Values:", { make, model, year });

  const generateSchedule = (): MaintenanceSchedule => {
    // This would typically come from an API based on the RV details
    return {
      monthly: {
        interval: "Every Month",
        tasks: [
          "Check tire pressure and condition",
          "Test all safety devices and alarms",
          "Inspect battery connections and water levels",
          "Check and clean air conditioning filters",
        ],
      },
      quarterly: {
        interval: "Every 3 Months",
        tasks: [
          "Lubricate door hinges and locks",
          "Check seals around windows and doors",
          "Inspect roof seams and seals",
          "Test all appliances for proper operation",
        ],
      },
      biannual: {
        interval: "Every 6 Months",
        tasks: [
          "Service the generator",
          "Check and service brake system",
          "Inspect suspension components",
          "Clean and treat awning fabric",
        ],
      },
      annual: {
        interval: "Every 12 Months",
        tasks: [
          "Complete roof inspection and maintenance",
          "Service all appliances",
          "Sanitize fresh water system",
          "Check and service propane system",
          "Complete chassis maintenance",
        ],
      },
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Generating maintenance schedule for:", { make, model, year });
    
    if (!make || !model || !year) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate your maintenance schedule.",
        variant: "destructive",
      });
      return;
    }

    setShowSchedule(true);
    toast({
      title: "Schedule Generated",
      description: "Your custom maintenance schedule has been created.",
    });
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-[#60A5FA]" />
          <CardTitle className="text-xl text-[#60A5FA]">Maintenance Schedule Creator</CardTitle>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Get a customized maintenance checklist based on your RV details
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Make</label>
              <Input
                placeholder="e.g., Winnebago"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="bg-[#1a2234] border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Model</label>
              <Input
                placeholder="e.g., Vista"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-[#1a2234] border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Year</label>
              <Input
                placeholder="e.g., 2022"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-[#1a2234] border-gray-700 text-white"
              />
            </div>
          </div>
          <Button 
            type="submit"
            className="w-full bg-[#60A5FA] hover:bg-blue-600 text-white"
          >
            Generate Schedule
          </Button>
        </form>

        {showSchedule && (
          <div className="space-y-6 mt-8">
            {Object.entries(generateSchedule()).map(([key, schedule]) => (
              <div key={key} className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  {key === "monthly" && <Wrench className="w-5 h-5 text-blue-400" />}
                  {key === "quarterly" && <CheckSquare className="w-5 h-5 text-green-400" />}
                  {key === "biannual" && <Wrench className="w-5 h-5 text-purple-400" />}
                  {key === "annual" && <CalendarClock className="w-5 h-5 text-orange-400" />}
                  <h3 className="text-lg font-semibold text-white">{schedule.interval}</h3>
                </div>
                <ul className="space-y-2">
                  {schedule.tasks.map((task, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-[#60A5FA]">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaintenanceScheduleCreator;