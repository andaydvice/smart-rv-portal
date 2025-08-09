
import { HeroSection } from "../components/voice-control/HeroSection";
import { VoiceControlSystems } from "../components/voice-control/VoiceControlSystems";
import { VoiceIntroSections } from "../components/voice-control/VoiceIntroSections";
import { BenefitsGrid } from "../components/voice-control/BenefitsGrid";
import FeaturesSection from "../components/voice-control/FeaturesSection";
// MODIFIED: Removed Smartphone and Button imports
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";

const VoiceControl = () => {
  console.log("VoiceControl component rendering");
  
  return (
    <Layout>
      <main className="relative w-full flex-grow">
        <HeroSection />
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
                  partner: 'technorv',
                  title: 'TechnoRV Voice Integration',
                  description: 'Professional voice control system integration and monitoring for your smart RV.',
                  features: ['Voice system integration', 'Smart device connectivity', 'System monitoring', 'Technical support']
                },
                {
                  partner: 'rvlife',
                  title: 'RV Life Voice Features',
                  description: 'Access voice-controlled features and tutorials through the RV Life platform.',
                  features: ['Voice command guides', 'Smart RV tutorials', 'Feature demonstrations', 'User community']
                }
              ]}
              gridCols="2"
              className="py-16"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default VoiceControl;
