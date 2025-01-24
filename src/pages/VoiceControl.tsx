import { Mic, Cloud, MessageSquare, Shield, Home, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";

const VoiceControl = () => {
  console.log("VoiceControl component rendering");
  
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="container mx-auto px-4 pt-24">
        <section className="h-screen flex items-center justify-center relative">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/b34a2c72-bee2-4710-9d30-6acd31e60c6b.png"
              alt="Luxury RV at sunset with fire pit"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
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

        <section className="py-16 bg-[#1B2028]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mic className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">The Power of Speech is Here Today</h3>
                </div>
                <p className="text-white/90">
                  Your Smart RV now responds to simple voice commands. Simply speak to control everything from temperature to lighting and entertainment.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Advanced Technology from Leaders</h3>
                </div>
                <p className="text-white/90">
                  Just say "Jayco" or "Hey Power Pro" and your RV responds instantly. Works with Alexa and Google too.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Safe, Simple, Smart Control</h3>
                </div>
                <p className="text-white/90">
                  Adjust your AC while keeping your hands on the wheel. Set up camp with a single command.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Home className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Experience Today's Smart RV Technology</h3>
                </div>
                <p className="text-white/90">
                  Voice control is already transforming thousands of RVs across America, bringing the future of camping to life in luxury fifth wheels, travel trailers, and motorhomes.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-[#5B9BD5] mb-4">Ready to Upgrade?</h3>
            <p className="text-white/90 mb-6">Discover what voice control can do for your RV adventures.</p>
            <button className="px-8 py-3 bg-[#5B9BD5] hover:bg-[#4A8AC4] rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Voice Systems</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </main>
    </div>
  );
};

export default VoiceControl;