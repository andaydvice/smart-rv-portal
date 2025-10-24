
import { VoiceControlHero } from "../components/voice-control/VoiceControlHero";
import { VoiceControlSystems } from "../components/voice-control/VoiceControlSystems";
import { VoiceIntroSections } from "../components/voice-control/VoiceIntroSections";
import { BenefitsGrid } from "../components/voice-control/BenefitsGrid";
import FeaturesSection from "../components/voice-control/FeaturesSection";
// MODIFIED: Removed Smartphone and Button imports
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const VoiceControl = () => {
  console.log("VoiceControl component rendering");
  
  return (
    <Layout>
      <main className="relative w-full flex-grow">
        <VoiceControlHero />
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mt-16 mb-8">
              Voice Control Transforms Your RV Experience
            </h2>
            <VoiceIntroSections />
            <VoiceControlSystems />
          </div>
          
          <div className="w-full py-16 bg-[#1A1F2E33]">
            <div className="max-w-6xl mx-auto px-4">
              <img 
                src="/lovable-uploads/ab7d2423-0ab6-4868-83b1-c84f220e5736.png"
                alt="Smart RV voice control system visualization showing various connected features"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4">
            <BenefitsGrid />
            <FeaturesSection />
            
            {/* MODIFIED: Replaced content with an image */}
            <section className="py-16">
              <img
                src="/lovable-uploads/35c8b551-66ab-42cc-ac02-3fe09d805dd5.png"
                alt="Comfortable RV interior with passengers enjoying the smart features"
                className="w-full max-w-5xl mx-auto h-auto rounded-lg shadow-lg"
              />
            </section>
            
            <OptimizedAffiliateGrid
              title="Voice Control Solutions"
              subtitle="Integrate voice control with professional RV systems and support"
              partners={[
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'RV Life Voice Integration',
                  description: 'Professional voice control system integration and monitoring for your smart RV.',
                  features: ['Voice system integration', 'Smart device connectivity', 'System monitoring', 'Technical support']
                },
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'RV Life Voice Features',
                  description: 'Access voice-controlled features and tutorials through the RV Life platform.',
                  features: ['Voice command guides', 'Smart RV tutorials', 'Feature demonstrations', 'User community']
                }
              ]}
              gridCols="2"
              className="py-16"
            />

            <AffiliateDisclosure className="py-8" />

            {/* Explore More Features */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mt-12 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Explore Related Features</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/features">
                  <Button variant="outline" className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    All Smart Features
                  </Button>
                </Link>
                <Link to="/features/smart-automation">
                  <Button variant="outline" className="bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500/20">
                    Smart Automation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default VoiceControl;
