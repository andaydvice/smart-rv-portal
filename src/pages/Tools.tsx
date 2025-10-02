import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Calculator, Brain, Search, CheckSquare, Compass, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Tools: React.FC = () => {
  const navigate = useNavigate();

  const tools = [
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

  return (
    <>
      <Helmet>
        <title>RV Technology Tools - Interactive Planning & Assessment | RV Connectivity</title>
        <meta name="description" content="Free interactive tools to help you plan and assess RV technology needs. Get personalized recommendations, checklists, and expert guidance for your RV setup." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              RV Technology Tools
            </h1>
            <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
              Free interactive tools powered by AI to help you plan, assess, and optimize your RV technology setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {tools.map((tool) => (
              <Card key={tool.id} className="bg-[#091020] border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                  </div>
                  <CardTitle className="text-xl text-white">{tool.title}</CardTitle>
                  <CardDescription className="text-[#E2E8FF]">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate(tool.path)}
                    className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                  >
                    Use Tool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools;
