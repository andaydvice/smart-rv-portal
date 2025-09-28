import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { 
  ClipboardCheck, CheckCircle, Circle, Download, ShoppingCart, 
  Wifi, Battery, Monitor, Settings, Shield, Smartphone, Car
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  priority: 'essential' | 'important' | 'nice-to-have';
  questions?: string[];
}

const checklistItems: ChecklistItem[] = [
  // Connectivity
  {
    id: 'wifi-setup',
    category: 'Connectivity',
    item: 'Internet connectivity preparation',
    priority: 'important',
    questions: [
      'Is the RV pre-wired for internet equipment?',
      'Are there mounting points for external antennas?',
      'Does it include cellular signal booster preparation?'
    ]
  },
  {
    id: 'cable-tv',
    category: 'Connectivity',
    item: 'Cable/satellite TV preparation',
    priority: 'nice-to-have',
    questions: [
      'Is there satellite dish preparation on the roof?',
      'Are cable connections available at multiple locations?'
    ]
  },
  
  // Power Systems
  {
    id: 'battery-type',
    category: 'Power Systems',
    item: 'Battery system type and capacity',
    priority: 'essential',
    questions: [
      'What type of batteries are installed (lead-acid or lithium)?',
      'What is the total amp-hour capacity?',
      'Is the system expandable?'
    ]
  },
  {
    id: 'solar-ready',
    category: 'Power Systems',
    item: 'Solar panel readiness',
    priority: 'important',
    questions: [
      'Is the roof pre-wired for solar panels?',
      'What is the maximum solar capacity supported?',
      'Is a charge controller already installed?'
    ]
  },
  {
    id: 'inverter-capacity',
    category: 'Power Systems',
    item: 'Inverter capacity and outlets',
    priority: 'essential',
    questions: [
      'What is the inverter wattage capacity?',
      'How many 110V outlets are available?',
      'Are there dedicated outlets for high-power devices?'
    ]
  },
  
  // Monitoring & Control
  {
    id: 'tank-monitoring',
    category: 'Monitoring & Control',
    item: 'Tank level monitoring system',
    priority: 'essential',
    questions: [
      'How accurate are the tank level sensors?',
      'Is monitoring available via smartphone app?',
      'Are there backup manual indicators?'
    ]
  },
  {
    id: 'climate-control',
    category: 'Monitoring & Control',
    item: 'Climate control automation',
    priority: 'important',
    questions: [
      'Can the thermostat be controlled remotely?',
      'Is there automatic fan control?',
      'Are there multiple climate zones?'
    ]
  },
  {
    id: 'security-system',
    category: 'Monitoring & Control',
    item: 'Security and monitoring features',
    priority: 'nice-to-have',
    questions: [
      'Are there door/window sensors?',
      'Is there a security alarm system?',
      'Can you monitor the RV remotely?'
    ]
  },
  
  // Safety & Navigation
  {
    id: 'backup-camera',
    category: 'Safety & Navigation',
    item: 'Backup camera and visibility aids',
    priority: 'important',
    questions: [
      'Is a backup camera system included?',
      'Are there side-view cameras or mirrors?',
      'Is the display integrated with navigation?'
    ]
  },
  {
    id: 'tire-monitoring',
    category: 'Safety & Navigation',
    item: 'Tire pressure monitoring system',
    priority: 'essential',
    questions: [
      'Is TPMS included for all tires?',
      'Does it monitor tire temperature?',
      'Are alerts visible while driving?'
    ]
  }
];

const categoryIcons: Record<string, React.ReactNode> = {
  'Connectivity': <Wifi className="h-5 w-5" />,
  'Power Systems': <Battery className="h-5 w-5" />,
  'Monitoring & Control': <Monitor className="h-5 w-5" />,
  'Safety & Navigation': <Car className="h-5 w-5" />
};

const priorityColors = {
  'essential': 'text-red-400',
  'important': 'text-yellow-400',
  'nice-to-have': 'text-green-400'
};

export const TechnologyChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const categories = Array.from(new Set(checklistItems.map(item => item.category)));
  
  const filteredItems = selectedCategory 
    ? checklistItems.filter(item => item.category === selectedCategory)
    : checklistItems;

  const generateChecklist = () => {
    const selectedItems = checklistItems.filter(item => checkedItems.has(item.id));
    const checklistText = selectedItems.map(item => {
      const questions = item.questions ? '\n  ' + item.questions.map(q => `• ${q}`).join('\n  ') : '';
      return `□ ${item.item} (${item.priority})${questions}`;
    }).join('\n\n');
    
    const blob = new Blob([
      'RV Technology Research Checklist\n',
      '=====================================\n\n',
      checklistText,
      '\n\nGenerated by Smart RV Hub Technology Guide'
    ], { type: 'text/plain' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rv-technology-checklist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateTargetedRVTLink = () => {
    return 'https://www.rvt.com/buy/';
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-full mb-4">
          <ClipboardCheck className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">RV Technology Research Checklist</h3>
        <p className="text-[#E2E8FF] text-lg">Build your personalized checklist for evaluating RV technology features</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            className={selectedCategory === null ? "bg-[#5B9BD5] text-white" : "border-[#1a202c] text-[#E2E8FF] hover:bg-[#151A22]"}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={selectedCategory === category ? "bg-[#5B9BD5] text-white" : "border-[#1a202c] text-[#E2E8FF] hover:bg-[#151A22]"}
            >
              <span className="mr-2">{categoryIcons[category]}</span>
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      {checkedItems.size > 0 && (
        <div className="mb-6 p-4 bg-[#151A22]/50 rounded-lg border border-[#1a202c]">
          <div className="flex items-center justify-between">
            <span className="text-[#60A5FA] font-medium">
              {checkedItems.size} item{checkedItems.size !== 1 ? 's' : ''} selected for your checklist
            </span>
            <div className="flex gap-2">
              <Button 
                onClick={generateChecklist}
                variant="outline"
                size="sm"
                className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#151A22]"
                disabled={checkedItems.size === 0}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Checklist Items */}
      <div className="space-y-4 mb-8">
        {filteredItems.map((item) => {
          const isChecked = checkedItems.has(item.id);
          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                isChecked
                  ? 'bg-[#5B9BD5]/20 border-[#5B9BD5]'
                  : 'bg-[#151A22]/50 border-[#1a202c] hover:border-[#5B9BD5]/50'
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {isChecked ? (
                    <CheckCircle className="h-6 w-6 text-[#5B9BD5]" />
                  ) : (
                    <Circle className="h-6 w-6 text-[#1a202c] hover:text-[#5B9BD5]" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#60A5FA]">{categoryIcons[item.category]}</span>
                    <span className="text-sm text-[#E2E8FF]/70">{item.category}</span>
                    <span className={`text-sm font-medium ${priorityColors[item.priority]}`}>
                      {item.priority}
                    </span>
                  </div>
                  
                  <h4 className={`font-semibold mb-2 ${
                    isChecked ? 'text-white' : 'text-[#E2E8FF]'
                  }`}>
                    {item.item}
                  </h4>
                  
                  {item.questions && (
                    <div className="mt-3 pl-4 border-l-2 border-[#1a202c]">
                      <p className="text-sm text-[#E2E8FF]/70 mb-2">Questions to ask:</p>
                      <ul className="space-y-1">
                        {item.questions.map((question, index) => (
                          <li key={index} className="text-sm text-[#E2E8FF]/80 flex items-start gap-2">
                            <span className="text-[#60A5FA] flex-shrink-0">•</span>
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        {checkedItems.size > 0 ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ExternalLinkButton 
              href={generateTargetedRVTLink()}
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] text-lg px-8"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Shop RVs with Selected Features
            </ExternalLinkButton>
          </div>
        ) : (
          <div className="text-[#E2E8FF] py-8">
            <ClipboardCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Select items to build your personalized research checklist</p>
          </div>
        )}
      </div>
    </Card>
  );
};