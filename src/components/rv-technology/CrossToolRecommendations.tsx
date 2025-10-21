import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Search, Lightbulb, CheckSquare, Compass, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

interface CrossToolRecommendationsProps {
  currentToolId: string;
  context?: 'post-result' | 'suggestion';
}

const allTools: Tool[] = [
  {
    id: 'readiness-assessment',
    title: 'AI Technology Readiness Assessment',
    description: 'Get personalized technology recommendations based on your experience level',
    icon: Brain,
    path: '/tools/readiness-assessment'
  },
  {
    id: 'feature-matcher',
    title: 'Enhanced Feature Matcher',
    description: 'Discover which technology features match your specific RV usage needs',
    icon: Search,
    path: '/tools/feature-matcher'
  },
  {
    id: 'educational-consultant',
    title: 'AI Educational Consultant',
    description: 'Ask detailed questions about RV technology for informed decisions',
    icon: Lightbulb,
    path: '/tools/educational-consultant'
  },
  {
    id: 'technology-checklist',
    title: 'AI Technology Checklist',
    description: 'Generate a personalized research checklist for your RV technology needs',
    icon: CheckSquare,
    path: '/tools/technology-checklist'
  },
  {
    id: 'lifestyle-planner',
    title: 'AI Lifestyle Planner',
    description: 'Discover the perfect RV technology setup for your specific lifestyle',
    icon: Compass,
    path: '/tools/lifestyle-planner'
  },
  {
    id: 'intelligent-rv-finder',
    title: 'Intelligent RV Finder',
    description: 'Get personalized RV recommendations based on your lifestyle and needs',
    icon: Target,
    path: '/tools/intelligent-rv-finder'
  }
];

const toolRelationships: Record<string, string[]> = {
  'readiness-assessment': ['feature-matcher', 'lifestyle-planner'],
  'feature-matcher': ['technology-checklist', 'intelligent-rv-finder'],
  'educational-consultant': ['readiness-assessment', 'feature-matcher'],
  'technology-checklist': ['intelligent-rv-finder', 'lifestyle-planner'],
  'lifestyle-planner': ['intelligent-rv-finder', 'technology-checklist'],
  'intelligent-rv-finder': ['technology-checklist', 'educational-consultant']
};

export const CrossToolRecommendations: React.FC<CrossToolRecommendationsProps> = ({ 
  currentToolId,
  context = 'post-result'
}) => {
  const navigate = useNavigate();
  const recommendedToolIds = toolRelationships[currentToolId] || [];
  const recommendedTools = allTools.filter(tool => recommendedToolIds.includes(tool.id));

  if (recommendedTools.length === 0) return null;

  return (
    <Card className="bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#5B9BD5]/30 mt-8">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-white font-semibold text-lg mb-2">
            {context === 'post-result' ? 'Next Steps: Continue Your Research' : 'Recommended Tools'}
          </h3>
          <p className="text-[#E2E8FF] text-sm">
            Explore these tools to dive deeper into your RV technology planning
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {recommendedTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Button
                key={tool.id}
                onClick={() => navigate(tool.path)}
                variant="outline"
                className="h-auto p-4 flex items-start gap-3 border-[#1a202c] hover:border-[#5B9BD5]/50 hover:bg-[#151A22] text-left group"
              >
                <div className="flex-shrink-0 p-2 bg-[#5B9BD5]/10 rounded-lg group-hover:bg-[#5B9BD5]/20 transition-colors">
                  <Icon className="h-5 w-5 text-[#5B9BD5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-white font-medium text-sm">{tool.title}</span>
                    <ArrowRight className="h-4 w-4 text-[#5B9BD5] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-[#E2E8FF] text-xs line-clamp-2">{tool.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
