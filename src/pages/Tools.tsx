import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { availableTools } from '@/lib/toolsData';
import rvTechToolsHero from '@/assets/rv-technology-tools-hero.png';
import Layout from '@/components/layout/Layout';

const Tools: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Helmet>
        <title>RV Technology Tools - Interactive Planning & Assessment | RV Connectivity</title>
        <meta name="description" content="Free interactive tools to help you plan and assess RV technology needs. Get personalized recommendations, checklists, and expert guidance for your RV setup." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22]">
        {/* Hero Header Section */}
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={rvTechToolsHero} 
            alt="Smart RV with technology overlay at sunset" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#080F1F]" />
          
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-24">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
              RV Technology Tools
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-lg">
              Free interactive tools powered by AI to help you plan, assess, and optimize your RV technology setup.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <Breadcrumbs items={[{ label: 'Tools' }]} />
          
          <div className="text-center mb-12 mt-8">
            <p className="text-[#E2E8FF] text-lg max-w-3xl mx-auto">
              Each tool is designed to help you make informed decisions about RV technology features, from connectivity and power management to control systems and entertainment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {availableTools.map((tool) => (
              <Card key={tool.id} className="bg-[#091020] border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-3 bg-[#5B9BD5]/10 rounded-lg flex-shrink-0">
                      <tool.icon className={`h-8 w-8 ${tool.color}`} />
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-[#5B9BD5] transition-colors leading-tight">{tool.title}</CardTitle>
                  </div>
                  <CardDescription className="text-[#E2E8FF] text-sm line-clamp-2">
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
    </Layout>
  );
};

export default Tools;
