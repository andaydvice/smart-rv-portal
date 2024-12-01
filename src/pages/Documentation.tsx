import { motion } from "framer-motion";
import { Book, Cpu, Wrench, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentationHeader from "@/components/documentation/DocumentationHeader";
import OverviewTab from "@/components/documentation/OverviewTab";
import TechnicalTab from "@/components/documentation/TechnicalTab";
import MaintenanceTab from "@/components/documentation/MaintenanceTab";
import PowerTab from "@/components/documentation/PowerTab";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-8">
        <DocumentationHeader />
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-semibold text-base">
              <Book className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="technical" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-semibold text-base">
              <Cpu className="mr-2 h-4 w-4" />
              Technical
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-semibold text-base">
              <Wrench className="mr-2 h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="power" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-semibold text-base">
              <Zap className="mr-2 h-4 w-4" />
              Power Systems
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <TechnicalTab />
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <MaintenanceTab />
          </TabsContent>

          <TabsContent value="power" className="space-y-4">
            <PowerTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;