import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { 
  Wifi, Battery, Monitor, Smartphone, Plug, Car, Shield, 
  CheckCircle, X, Search, Filter
} from 'lucide-react';

interface TechFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'connectivity' | 'power' | 'monitoring' | 'entertainment';
}

const techFeatures: TechFeature[] = [
  {
    id: 'wifi-prep',
    name: 'WiFi Preparation',
    description: 'Pre-wired for internet connectivity upgrades',
    icon: <Wifi className="h-5 w-5" />,
    category: 'connectivity'
  },
  {
    id: 'cellular-booster',
    name: 'Cellular Signal Booster',
    description: 'Enhanced cell phone reception in remote areas',
    icon: <Smartphone className="h-5 w-5" />,
    category: 'connectivity'
  },
  {
    id: 'solar-ready',
    name: 'Solar Panel Ready',
    description: 'Pre-wired and prepared for solar panel installation',
    icon: <Battery className="h-5 w-5" />,
    category: 'power'
  },
  {
    id: 'lithium-battery',
    name: 'Lithium Battery System',
    description: 'Advanced lithium batteries for extended off-grid power',
    icon: <Plug className="h-5 w-5" />,
    category: 'power'
  },
  {
    id: 'smart-monitoring',
    name: 'Smart System Monitoring',
    description: 'Digital displays for tank levels, battery status, and more',
    icon: <Monitor className="h-5 w-5" />,
    category: 'monitoring'
  },
  {
    id: 'smartphone-control',
    name: 'Smartphone Control',
    description: 'Control RV systems remotely via mobile app',
    icon: <Smartphone className="h-5 w-5" />,
    category: 'monitoring'
  },
  {
    id: 'entertainment-system',
    name: 'Advanced Entertainment',
    description: 'Smart TV, sound system, and streaming capabilities',
    icon: <Monitor className="h-5 w-5" />,
    category: 'entertainment'
  },
  {
    id: 'backup-camera',
    name: 'Backup Camera System',
    description: 'Rear-view camera with dashboard display',
    icon: <Car className="h-5 w-5" />,
    category: 'monitoring'
  },
  {
    id: 'security-system',
    name: 'Security & Alarm System',
    description: 'Door/window sensors and security monitoring',
    icon: <Shield className="h-5 w-5" />,
    category: 'monitoring'
  }
];

const categories = [
  { id: 'connectivity', name: 'Connectivity', color: 'from-blue-500 to-cyan-500' },
  { id: 'power', name: 'Power Systems', color: 'from-green-500 to-emerald-500' },
  { id: 'monitoring', name: 'Monitoring & Control', color: 'from-purple-500 to-violet-500' },
  { id: 'entertainment', name: 'Entertainment', color: 'from-orange-500 to-red-500' }
];

export const FeatureMatcher: React.FC = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFeature = (featureId: string) => {
    const newSelected = new Set(selectedFeatures);
    if (newSelected.has(featureId)) {
      newSelected.delete(featureId);
    } else {
      newSelected.add(featureId);
    }
    setSelectedFeatures(newSelected);
  };

  const clearAll = () => {
    setSelectedFeatures(new Set());
    setSelectedCategory(null);
  };

  const filteredFeatures = selectedCategory 
    ? techFeatures.filter(feature => feature.category === selectedCategory)
    : techFeatures;

  const generateRVTLink = () => {
    const featureParams = Array.from(selectedFeatures).join(',');
    return `https://www.rvt.com/buy/?features=${featureParams}`;
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-full mb-4">
          <Search className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Smart RV Feature Matcher</h3>
        <p className="text-[#E2E8FF] text-lg">Select the technology features that matter most to you</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-5 w-5 text-[#60A5FA]" />
          <span className="text-sm font-medium text-[#E2E8FF]">Filter by Category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            className={selectedCategory === null ? "bg-[#5B9BD5] text-white" : "border-[#1a202c] text-[#E2E8FF] hover:bg-[#151A22]"}
          >
            All Features
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={selectedCategory === category.id ? "bg-[#5B9BD5] text-white" : "border-[#1a202c] text-[#E2E8FF] hover:bg-[#151A22]"}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Selected Features Counter */}
      {selectedFeatures.size > 0 && (
        <div className="mb-6 p-4 bg-[#151A22]/50 rounded-lg border border-[#1a202c]">
          <div className="flex items-center justify-between">
            <span className="text-[#60A5FA] font-medium">
              {selectedFeatures.size} feature{selectedFeatures.size !== 1 ? 's' : ''} selected
            </span>
            <Button 
              onClick={clearAll}
              variant="ghost"
              size="sm"
              className="text-[#E2E8FF] hover:text-white"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
        </div>
      )}

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredFeatures.map((feature) => {
          const isSelected = selectedFeatures.has(feature.id);
          return (
            <button
              key={feature.id}
              onClick={() => toggleFeature(feature.id)}
              className={`p-4 rounded-lg border transition-all duration-300 text-left group ${
                isSelected
                  ? 'bg-[#5B9BD5]/20 border-[#5B9BD5] shadow-lg shadow-[#5B9BD5]/25'
                  : 'bg-[#151A22]/50 border-[#1a202c] hover:border-[#5B9BD5]/50 hover:bg-[#151A22]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  isSelected ? 'bg-[#5B9BD5] text-white' : 'bg-[#1a202c] text-[#60A5FA]'
                }`}>
                  {feature.icon}
                </div>
                {isSelected && (
                  <CheckCircle className="h-5 w-5 text-[#5B9BD5]" />
                )}
              </div>
              <h4 className={`font-semibold mb-2 ${
                isSelected ? 'text-white' : 'text-[#E2E8FF] group-hover:text-white'
              }`}>
                {feature.name}
              </h4>
              <p className={`text-sm ${
                isSelected ? 'text-[#E2E8FF]' : 'text-[#E2E8FF]/70 group-hover:text-[#E2E8FF]'
              }`}>
                {feature.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        {selectedFeatures.size > 0 ? (
          <ExternalLinkButton 
            href={generateRVTLink()}
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] text-lg px-8"
          >
            <Search className="mr-2 h-5 w-5" />
            Find RVs with Selected Features ({selectedFeatures.size})
          </ExternalLinkButton>
        ) : (
          <div className="text-[#E2E8FF] py-8">
            <Monitor className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Select technology features to find matching RVs</p>
          </div>
        )}
      </div>
    </Card>
  );
};