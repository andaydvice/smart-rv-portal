import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface RelatedTool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
  currentToolId: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ tools, currentToolId }) => {
  const navigate = useNavigate();
  
  const filteredTools = tools.filter(tool => tool.id !== currentToolId);

  if (filteredTools.length === 0) return null;

  return (
    <div className="mt-16 border-t border-[#5B9BD5]/20 pt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Related Tools
        </h2>
        <p className="text-[#E2E8FF]">
          Explore other tools to help you make the best RV technology decisions
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.slice(0, 3).map((tool) => (
          <Card 
            key={tool.id} 
            className="bg-[#091020] border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-300 cursor-pointer group"
            onClick={() => navigate(tool.path)}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <tool.icon className={`h-6 w-6 ${tool.color}`} />
              </div>
              <CardTitle className="text-lg text-white group-hover:text-[#5B9BD5] transition-colors">
                {tool.title}
              </CardTitle>
              <CardDescription className="text-[#E2E8FF]">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(tool.path);
                }}
              >
                Use Tool
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
