
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
import { Helmet } from "react-helmet-async";

// Preload these images as early as possible
const CRITICAL_IMAGES = [
  '/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png',
  '/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png'
];

// Preload function that uses all available techniques
const preloadCriticalImage = (src: string) => {
  // Method 1: Preload link
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.fetchPriority = 'high';
  // Removed importance attribute as it's not supported in TypeScript
  document.head.appendChild(link);
  
  // Method 2: Image constructor
  const img = new Image();
  img.src = src;
  img.fetchPriority = 'high';
  
  return link; // Return for cleanup
};

const Documentation = () => {
  // Preload critical images immediately
  useEffect(() => {
    // removed debug log for production cleanliness
    
    // Create all preload elements
    const preloadLinks = CRITICAL_IMAGES.map(src => preloadCriticalImage(src));
    
    // Cleanup
    return () => {
      preloadLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Smart RV Documentation | Learn Setup, Maintenance & Technical Specs</title>
        <meta name="description" content="Learn how to setup and maintain your Smart RV with comprehensive documentation. Get technical specifications, troubleshooting guides, power system details, and expert maintenance tips." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/documentation' : ''} />
      </Helmet>
      <div className="w-full flex-grow">
        <div className="w-full py-8 relative z-10">
          <DocumentationHeader />
          
          <Container>
            {/* Added extra spacing above the tabs with mt-16 */}
            <div className="mt-16">
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

                {/* Added extra bottom spacing with mb-20 */}
                <TabsContent value="overview" className="mt-10 mb-20">
                  <OverviewTab />
                </TabsContent>

                <TabsContent value="technical" className="mt-10 mb-20">
                  <TechnicalTab />
                </TabsContent>

                <TabsContent value="maintenance" className="mt-10 mb-20">
                  <MaintenanceTab />
                </TabsContent>

                <TabsContent value="power" className="mt-10 mb-20">
                  <PowerTab />
                </TabsContent>
              </Tabs>
              
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
