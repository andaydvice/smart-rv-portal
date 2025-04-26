
import { HeroSection } from "../components/voice-control/HeroSection";
import { VoiceControlSystems } from "../components/voice-control/VoiceControlSystems";
import { VoiceIntroSections } from "../components/voice-control/VoiceIntroSections";
import { BenefitsGrid } from "../components/voice-control/BenefitsGrid";
import FeaturesSection from "../components/voice-control/FeaturesSection";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";

const VoiceControl = () => {
  console.log("VoiceControl component rendering");
  
  return (
    <Layout>
      <Navbar />
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
            
            {/* Ready to Upgrade Section */}
            <section className="py-16 text-center">
              <div className="flex justify-center mb-4">
                <Smartphone className="text-[#2E7DFF] w-8 h-8" />
              </div>
              <h2 className="text-[#2E7DFF] text-3xl font-bold mb-4">Ready to Upgrade?</h2>
              <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
                Discover what voice control can do for your RV adventures.
              </p>
              <Button 
                className="bg-[#2E7DFF] hover:bg-[#2E7DFF]/90 text-white px-8 py-2 rounded-full text-lg"
              >
                Learn More
              </Button>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default VoiceControl;
