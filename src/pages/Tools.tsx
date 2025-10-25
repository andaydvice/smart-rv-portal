import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { availableTools } from '@/lib/toolsData';
import rvTechToolsHero from '@/assets/rv-technology-tools-hero.webp';
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
            <p className="text-[#E2E8FF] text-lg max-w-2xl text-left">
              Each tool is designed to help you make informed decisions about RV technology features, from connectivity and power management to control systems and entertainment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {availableTools.map((tool) => (
              <Card key={tool.id} className="bg-[#091020] border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-300 group overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={tool.image} 
                    alt={tool.imageAlt}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091020] via-[#091020]/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <tool.icon className={`h-10 w-10 ${tool.color} drop-shadow-lg`} />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-[#5B9BD5] transition-colors">{tool.title}</CardTitle>
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

          {/* Related Resources */}
          <div className="mt-16 bg-gray-800/50 border border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">More RV Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/rv-apps-hub" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all">
                <h3 className="text-white font-semibold mb-2">RV Apps Hub</h3>
                <p className="text-gray-400 text-sm">Essential mobile apps for RV travel</p>
              </Link>
              <Link to="/rv-weather" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all">
                <h3 className="text-white font-semibold mb-2">RV Weather</h3>
                <p className="text-gray-400 text-sm">Weather forecasts and planning tools</p>
              </Link>
              <Link to="/rv-marketplace" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all">
                <h3 className="text-white font-semibold mb-2">RV Marketplace</h3>
                <p className="text-gray-400 text-sm">Buy and sell RV equipment</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tools;
