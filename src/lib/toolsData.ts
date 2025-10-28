import { Brain, Search, Lightbulb, CheckSquare, Compass, Target } from 'lucide-react';
import rvTechnologyPlanningImage from '@/assets/rv-technology-planning.webp';
import aiEducationalConsultantHero from '@/assets/ai-educational-consultant-hero.webp';
import aiEnhancedFeatureMatcherHero from '@/assets/ai-enhanced-feature-matcher-hero.jpg';
import aiLifestyleTechnologyPlannerHero from '@/assets/ai-lifestyle-technology-planner-hero.webp';
import aiTechnologyResearchChecklistHero from '@/assets/ai-technology-research-checklist-hero.jpg';
import intelligentRvFinderHero from '@/assets/intelligent-rv-finder-hero.jpg';

export const availableTools = [
  {
    id: 'readiness-assessment',
    title: 'AI Technology Readiness Assessment',
    description: 'Get personalized RV technology recommendations based on your experience level and travel goals to build the perfect setup',
    icon: Brain,
    color: 'text-[#5B9BD5]',
    path: '/tools/readiness-assessment',
    image: rvTechnologyPlanningImage,
    imageAlt: 'AI Technology Readiness Assessment tool interface'
  },
  {
    id: 'feature-matcher',
    title: 'Enhanced Feature Matcher',
    description: 'Describe your RV usage plans and discover which technology features match your needs for connectivity and entertainment',
    icon: Search,
    color: 'text-[#10B981]',
    path: '/tools/feature-matcher',
    image: aiEnhancedFeatureMatcherHero,
    imageAlt: 'AI Enhanced Feature Matcher interface'
  },
  {
    id: 'educational-consultant',
    title: 'AI Educational Consultant',
    description: 'Ask questions and get detailed information about RV technology from our AI assistant for informed purchasing decisions',
    icon: Lightbulb,
    color: 'text-[#F59E0B]',
    path: '/tools/educational-consultant',
    image: aiEducationalConsultantHero,
    imageAlt: 'AI Educational Consultant interface'
  },
  {
    id: 'technology-checklist',
    title: 'AI Technology Checklist',
    description: 'Generate a personalized research checklist for your RV technology needs',
    icon: CheckSquare,
    color: 'text-[#8B5CF6]',
    path: '/tools/technology-checklist',
    image: aiTechnologyResearchChecklistHero,
    imageAlt: 'AI Technology Research Checklist interface'
  },
  {
    id: 'lifestyle-planner',
    title: 'AI Lifestyle Planner',
    description: 'Discover the perfect RV technology setup for your specific lifestyle and travel plans',
    icon: Compass,
    color: 'text-[#0EA5E9]',
    path: '/tools/lifestyle-planner',
    image: aiLifestyleTechnologyPlannerHero,
    imageAlt: 'AI Lifestyle Planner interface'
  },
  {
    id: 'intelligent-rv-finder',
    title: 'Intelligent RV Finder',
    description: 'Get personalized RV recommendations based on your lifestyle and needs, with real search results',
    icon: Target,
    color: 'text-[#EC4899]',
    path: '/tools/intelligent-rv-finder',
    image: intelligentRvFinderHero,
    imageAlt: 'Intelligent RV Finder - Multiple RVs on digital interface platform'
  }
];
