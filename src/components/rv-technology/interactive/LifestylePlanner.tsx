import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { 
  Users, Briefcase, Mountain, Home, Car, Laptop, 
  Wifi, Battery, Monitor, ChevronRight, Star
} from 'lucide-react';

interface LifestyleScenario {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  techNeeds: {
    category: string;
    features: string[];
  }[];
  rvSuggestions: string[];
  rvtFilter: string;
}

const lifestyleScenarios: LifestyleScenario[] = [
  {
    id: 'remote-work',
    title: 'Remote Work & Digital Nomad',
    description: 'Stay productive while traveling with reliable internet and comfortable workspace',
    icon: <Laptop className="h-8 w-8" />,
    techNeeds: [
      {
        category: 'Connectivity',
        features: [
          'High-speed internet capability (cellular boosters, WiFi prep)',
          'Multiple device charging stations',
          'External antenna mounting points'
        ]
      },
      {
        category: 'Power Management',
        features: [
          'Robust solar system or generator backup',
          'Lithium batteries for extended work sessions',
          'Multiple 110V outlets for equipment'
        ]
      },
      {
        category: 'Workspace Design',
        features: [
          'Dedicated workspace area with good lighting',
          'Climate control for comfortable working',
          'Noise reduction features'
        ]
      }
    ],
    rvSuggestions: [
      'Class B+ with office setup',
      'Travel trailers with slide-out workspaces',
      'Fifth wheels with residential-style interiors'
    ],
    rvtFilter: 'https://www.rvt.com/buy/'
  },
  {
    id: 'family-entertainment',
    title: 'Family Entertainment & Education',
    description: 'Keep the whole family entertained with modern amenities and learning tools',
    icon: <Users className="h-8 w-8" />,
    techNeeds: [
      {
        category: 'Entertainment Systems',
        features: [
          'Large smart TV with streaming capabilities',
          'Gaming console compatibility',
          'High-quality sound system'
        ]
      },
      {
        category: 'Connectivity',
        features: [
          'Fast internet for streaming and online learning',
          'Multiple WiFi access points',
          'Device management capabilities'
        ]
      },
      {
        category: 'Comfort Features',
        features: [
          'Automated climate control',
          'Smart lighting systems',
          'Multiple charging stations'
        ]
      }
    ],
    rvSuggestions: [
      'Class A motorhomes with entertainment centers',
      'Large travel trailers with bunk rooms',
      'Fifth wheels with theater seating'
    ],
    rvtFilter: 'https://www.rvt.com/buy/'
  },
  {
    id: 'off-grid',
    title: 'Off-Grid & Boondocking',
    description: 'Explore remote locations with self-sufficient power and water systems',
    icon: <Mountain className="h-8 w-8" />,
    techNeeds: [
      {
        category: 'Power Independence',
        features: [
          'Large solar array capacity',
          'High-capacity lithium battery bank',
          'Efficient inverter system'
        ]
      },
      {
        category: 'Water & Waste Management',
        features: [
          'Large fresh water capacity',
          'Greywater recycling options',
          'Composting toilet compatibility'
        ]
      },
      {
        category: 'Monitoring Systems',
        features: [
          'Comprehensive tank and battery monitoring',
          'Energy consumption tracking',
          'Remote system alerts'
        ]
      }
    ],
    rvSuggestions: [
      'Class B vans with solar packages',
      'Truck campers for remote access',
      'Small travel trailers with off-grid packages'
    ],
    rvtFilter: 'https://www.rvt.com/buy/'
  },
  {
    id: 'full-time',
    title: 'Full-Time Living',
    description: 'Make your RV a comfortable permanent home with residential-quality features',
    icon: <Home className="h-8 w-8" />,
    techNeeds: [
      {
        category: 'Residential Comfort',
        features: [
          'Full-size appliances with smart features',
          'Residential furniture and fixtures',
          'Advanced climate control systems'
        ]
      },
      {
        category: 'Connectivity & Work',
        features: [
          'Professional-grade internet setup',
          'Dedicated office space with tech integration',
          'Multiple communication options'
        ]
      },
      {
        category: 'Storage & Organization',
        features: [
          'Smart storage solutions',
          'Automated systems for daily tasks',
          'Security and monitoring systems'
        ]
      }
    ],
    rvSuggestions: [
      'Large Class A with residential packages',
      'Luxury fifth wheels with smart home features',
      'Custom coach conversions'
    ],
    rvtFilter: 'https://www.rvt.com/buy/'
  }
];

export const LifestylePlanner: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenario = selectedScenario ? lifestyleScenarios.find(s => s.id === selectedScenario) : null;

  if (scenario) {
    return (
      <Card className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
        <div className="mb-6">
          <Button
            onClick={() => setSelectedScenario(null)}
            variant="ghost"
            size="sm"
            className="text-[#60A5FA] hover:text-white mb-4"
          >
            ← Back to Scenarios
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-lg">
              {scenario.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{scenario.title}</h3>
              <p className="text-[#E2E8FF]">{scenario.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Technology Needs */}
          <div>
            <h4 className="text-xl font-semibold text-[#60A5FA] mb-4 flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Technology Requirements
            </h4>
            <div className="grid gap-6">
              {scenario.techNeeds.map((need, index) => (
                <div key={index} className="bg-[#151A22]/50 rounded-lg p-4 border border-[#1a202c]">
                  <h5 className="font-semibold text-white mb-3">{need.category}</h5>
                  <ul className="space-y-2">
                    {need.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-[#E2E8FF]">
                        <Star className="h-4 w-4 text-[#5B9BD5] flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* RV Suggestions */}
          <div>
            <h4 className="text-xl font-semibold text-[#60A5FA] mb-4 flex items-center gap-2">
              <Car className="h-5 w-5" />
              Recommended RV Types
            </h4>
            <div className="grid gap-3">
              {scenario.rvSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-[#151A22]/50 rounded-lg border border-[#1a202c]">
                  <ChevronRight className="h-4 w-4 text-[#5B9BD5]" />
                  <span className="text-[#E2E8FF]">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <ExternalLinkButton 
            href={scenario.rvtFilter}
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] text-lg px-8"
          >
            Browse RVs for {scenario.title}
          </ExternalLinkButton>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-full mb-4">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">RV Lifestyle Technology Planner</h3>
        <p className="text-[#E2E8FF] text-lg">Discover technology setups tailored to your RV adventure style</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {lifestyleScenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario.id)}
            className="p-6 bg-[#151A22]/50 border border-[#1a202c] rounded-lg hover:border-[#5B9BD5]/50 hover:bg-[#151A22] transition-all duration-300 text-left group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-[#5B9BD5]/20 to-[#60A5FA]/20 rounded-lg border border-[#5B9BD5]/30 group-hover:border-[#5B9BD5]/60 transition-colors">
                {scenario.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-2 group-hover:text-[#E2E8FF] transition-colors">
                  {scenario.title}
                </h4>
                <p className="text-[#E2E8FF]/70 text-sm group-hover:text-[#E2E8FF] transition-colors">
                  {scenario.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#60A5FA]">
                {scenario.techNeeds.length} technology categories
              </span>
              <ChevronRight className="h-5 w-5 text-[#5B9BD5] group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};