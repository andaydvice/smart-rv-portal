import { Mic, Cloud, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";

const VoiceControl = () => {
  console.log("VoiceControl component rendering");
  
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <Navbar />
      
      <main className="pt-16">
        <section className="h-screen flex items-center justify-center relative">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/9cb71164-7823-47a1-b788-5afc310ad5e5.png"
              alt="RV background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
              Voice Control for Smart RVs
            </h1>
            <p className="text-xl text-white/90 mb-12 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
              Experience RV living's future: Voice control technology for hands-free system operation
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
              <Mic className="w-6 h-6" />
              Start Voice Control
            </button>
          </div>
        </section>

        <section className="py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Voice Systems</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[rgba(26,31,46,0.95)] p-8 rounded-lg text-center">
              <Mic className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">JayVoice</h3>
              <p className="text-white/90">Advanced voice control system by Jayco</p>
            </div>
            
            <div className="bg-[rgba(26,31,46,0.95)] p-8 rounded-lg text-center">
              <Cloud className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Power Pro</h3>
              <p className="text-white/90">Comprehensive RV management by WFCO</p>
            </div>
            
            <div className="bg-[rgba(26,31,46,0.95)] p-8 rounded-lg text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Smart Assistant</h3>
              <p className="text-white/90">Traditional voice assistant integration</p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Benefits</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[rgba(26,31,46,0.95)] p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Convenience</h3>
              <p className="text-white/90">Control your RV systems without lifting a finger</p>
            </div>
            
            <div className="bg-[rgba(26,31,46,0.95)] p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Safety</h3>
              <p className="text-white/90">Keep your focus on driving and surroundings</p>
            </div>
            
            <div className="bg-[rgba(26,31,46,0.95)] p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Efficiency</h3>
              <p className="text-white/90">Streamline your RV management</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VoiceControl;