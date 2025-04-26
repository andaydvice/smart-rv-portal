
import { motion } from "framer-motion";
import { Book, Cpu, Wrench, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import DocumentationHeader from "@/components/documentation/DocumentationHeader";
import OverviewTab from "@/components/documentation/OverviewTab";
import TechnicalTab from "@/components/documentation/TechnicalTab";
import MaintenanceTab from "@/components/documentation/MaintenanceTab";
import PowerTab from "@/components/documentation/PowerTab";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";

const Documentation = () => {
  return (
    <Layout>
      <div className="w-full flex-grow">
        <div className="w-full py-8 relative z-10">
          <DocumentationHeader />
          
          <Container>
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="bg-[#091020] p-2 mb-8">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3"
                >
                  <Book className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="technical" 
                  className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3"
                >
                  <Cpu className="mr-2 h-4 w-4" />
                  Technical
                </TabsTrigger>
                <TabsTrigger 
                  value="maintenance" 
                  className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3"
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  Maintenance
                </TabsTrigger>
                <TabsTrigger 
                  value="power" 
                  className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Power Systems
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <OverviewTab />
              </TabsContent>

              <TabsContent value="technical" className="mt-6">
                <TechnicalTab />
              </TabsContent>

              <TabsContent value="maintenance" className="mt-6">
                <MaintenanceTab />
              </TabsContent>

              <TabsContent value="power" className="mt-6">
                <PowerTab />
              </TabsContent>
            </Tabs>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
