import { Brain, Search, Lightbulb, CheckSquare, Compass } from 'lucide-react';

export const availableTools = [
  {
    id: 'readiness-assessment',
    title: 'AI Technology Readiness Assessment',
    description: 'Get personalized RV technology recommendations based on your experience level and travel goals',
    icon: Brain,
    color: 'text-[#5B9BD5]',
    path: '/tools/readiness-assessment'
  },
  {
    id: 'feature-matcher',
    title: 'Enhanced Feature Matcher',
    description: 'Describe your RV usage plans and discover which technology features match your needs',
    icon: Search,
    color: 'text-[#10B981]',
    path: '/tools/feature-matcher'
  },
  {
    id: 'educational-consultant',
    title: 'AI Educational Consultant',
    description: 'Ask questions and get detailed information about RV technology from our AI assistant',
    icon: Lightbulb,
    color: 'text-[#F59E0B]',
    path: '/tools/educational-consultant'
  },
  {
    id: 'technology-checklist',
    title: 'AI Technology Checklist',
    description: 'Generate a personalized research checklist for your RV technology needs',
    icon: CheckSquare,
    color: 'text-[#8B5CF6]',
    path: '/tools/technology-checklist'
  },
  {
    id: 'lifestyle-planner',
    title: 'AI Lifestyle Planner',
    description: 'Discover the perfect RV technology setup for your specific lifestyle and travel plans',
    icon: Compass,
    color: 'text-[#0EA5E9]',
    path: '/tools/lifestyle-planner'
  }
];
