
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Navigation, 
  Shield, 
  Wifi, 
  Zap, 
  Car, 
  Tv, 
  Cpu, 
  Lock, 
  Radio, 
  Mic, 
  ChefHat 
} from 'lucide-react';

const FeatureItem = ({ 
  title, 
  description, 
  icon: Icon, 
  learnMoreLink
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  learnMoreLink?: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center px-6 py-16 border-b border-white/10">
      <div className="mb-6">
        <Icon className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/80 mb-4 max-w-md">{description}</p>
      {learnMoreLink && (
        <Link to={learnMoreLink}>
          <Button variant="link" className="text-[#5B9BD5] hover:text-[#4B8FE3]">
            Learn More
          </Button>
        </Link>
      )}
    </div>
  );
};

export const FeatureHighlights = () => {
  return (
    <section className="py-16 bg-[#080F1F]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">Intelligent Living on Wheels</h2>
          <p className="text-white/80 mt-2">Experience the perfect blend of comfort and innovation</p>
          <div className="h-1 w-16 bg-[#5B9BD5] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1">
          <FeatureItem
            title="Smart Navigation"
            description="AI-powered route planning and real-time traffic updates"
            icon={Navigation}
          />
          
          <FeatureItem
            title="Advanced Security"
            description="24/7 monitoring and smart lock systems for peace of mind"
            icon={Shield}
          />
          
          <FeatureItem
            title="Always Connected"
            description="High-speed internet and smart device integration"
            icon={Wifi}
          />
          
          <FeatureItem
            title="Power Management"
            description="Solar integration with intelligent energy distribution"
            icon={Zap}
          />
          
          <FeatureItem
            title="Autopilot Ready"
            description="Advanced driver assistance for safer journeys"
            icon={Car}
          />
          
          <FeatureItem
            title="Entertainment Suite"
            description="Smart TV and premium audio systems"
            icon={Tv}
            learnMoreLink="/features/entertainment"
          />
          
          <FeatureItem
            title="Cutting Edge Technology"
            description="Advanced systems for a simpler, more comfortable journey"
            icon={Cpu}
          />
          
          <FeatureItem
            title="Smart Security"
            description="Advanced security systems with remote monitoring and smart locks"
            icon={Lock}
            learnMoreLink="/features/security"
          />
          
          <FeatureItem
            title="Remote Control"
            description="Control all RV systems from your smartphone"
            icon={Radio}
            learnMoreLink="/features/remote"
          />
          
          <FeatureItem
            title="Voice Control"
            description="Hands-free control with virtual assistant integration"
            icon={Mic}
            learnMoreLink="/features/voice"
          />
          
          <FeatureItem
            title="Smart Kitchen"
            description="Connected appliances with remote monitoring"
            icon={ChefHat}
            learnMoreLink="/features/kitchen"
          />
        </div>
      </div>
    </section>
  );
};
