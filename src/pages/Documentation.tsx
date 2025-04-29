
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
import { useEffect } from "react";
import { preloadCriticalImages } from "@/utils/performance";

const Documentation = () => {
  // Preload critical images immediately with high priority
  useEffect(() => {
    // Immediate preload for the critical header image
    const headerImage = '/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png';
    const completionImage = '/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png';
    
    // Create links with high fetchPriority
    const createHighPriorityLink = (src: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
      return link;
    };
    
    // Create high priority preload links
    const links = [
      createHighPriorityLink(headerImage),
      createHighPriorityLink(completionImage)
    ];
    
    // Use the Image constructor to force browser to load these immediately
    const preloadWithImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    
    preloadWithImage(headerImage);
    preloadWithImage(completionImage);
    
    // Use the performance utility as well
    preloadCriticalImages([headerImage, completionImage]);
    
    // Cleanup
    return () => {
      links.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  return (
    <Layout>
      <div className="w-full flex-grow">
        <div className="w-full py-8 relative z-10">
          <DocumentationHeader />
          
          <Container>
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="bg-[#091020] p-2 mb-12">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-4"
                >
                  <Book className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="technical" 
                  className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-4 mt-4"
                >
                  <Cpu className="mr-2 h-4 w-4" />
                  Technical
                </TabsTrigger>
                <TabsTrigger 
                  value="maintenance" 
                  className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-4 mt-4"
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  Maintenance
                </TabsTrigger>
                <TabsTrigger 
                  value="power" 
                  className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-4 mt-4"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Power Systems
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-10 mb-16">
                <OverviewTab />
              </TabsContent>

              <TabsContent value="technical" className="mt-10 mb-16">
                <TechnicalTab />
              </TabsContent>

              <TabsContent value="maintenance" className="mt-10 mb-16">
                <MaintenanceTab />
              </TabsContent>

              <TabsContent value="power" className="mt-10 mb-16">
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
