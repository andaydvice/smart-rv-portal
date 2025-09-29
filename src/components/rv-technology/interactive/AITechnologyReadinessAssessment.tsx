import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Smartphone, Settings, Star, AlertCircle, Brain, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AIAssessmentResult {
  readinessLevel: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  recommendedFeatures: string[];
  budgetGuidance: string;
  nextSteps: string[];
  searchUrls: {
    buyUrl: string;
    reviewsUrl: string;
    dealersUrl: string;
    priceCheckerUrl: string;
  };
}

export const AITechnologyReadinessAssessment: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAssessmentResult | null>(null);
  const [error, setError] = useState('');
  const assessmentRef = useRef<HTMLDivElement>(null);

  const handleAssessment = async () => {
    if (!userInput.trim()) return;

    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-technology-readiness', {
        body: { userDescription: userInput.trim() }
      });

      if (error) throw error;

      setResult(data.assessment);

    } catch (error) {
      console.error('AI Assessment error:', error);
      setError('Assessment is temporarily unavailable. Please try again later or consult with RV technology professionals.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAssessment = () => {
    setUserInput('');
    setResult(null);
    setError('');
    
    // Scroll to top of the assessment
    if (assessmentRef.current) {
      assessmentRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  if (result) {
    return (
      <Card ref={assessmentRef} className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-full mb-4">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{result.title.replace(/-/g, ' ')}</h3>
          <p className="text-[#E2E8FF] text-lg leading-relaxed">{result.description}</p>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <h4 className="text-xl font-semibold text-[#60A5FA] mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Recommended Technology Features
            </h4>
            <div className="grid gap-3">
              {result.recommendedFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-[#151A22]/50 rounded-lg border border-[#1a202c]">
                  <CheckCircle className="h-5 w-5 text-[#5B9BD5] flex-shrink-0 mt-0.5" />
                  <span className="text-[#E2E8FF]">{feature.replace(/-/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#151A22]/50 rounded-lg border border-[#1a202c]">
            <h4 className="text-lg font-semibold text-[#60A5FA] mb-2">Budget Guidance</h4>
            <p className="text-[#E2E8FF]">{result.budgetGuidance.replace(/-/g, ' ')}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#60A5FA] mb-3">Next Steps</h4>
            <ul className="space-y-2">
              {result.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-[#E2E8FF]">
                  <span className="text-[#5B9BD5] flex-shrink-0">•</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ExternalLinkButton 
            href={result.searchUrls.buyUrl}
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5]"
          >
            Browse Matching RVs
          </ExternalLinkButton>
          <ExternalLinkButton 
            href={result.searchUrls.reviewsUrl}
            variant="outline"
            size="lg"
            className="border-[#5B9BD5]/50 text-[#5B9BD5] hover:bg-[#5B9BD5]/10"
          >
            Read Reviews
          </ExternalLinkButton>
          <ExternalLinkButton 
            href={result.searchUrls.dealersUrl}
            variant="outline"
            size="lg"
            className="border-[#5B9BD5]/50 text-[#5B9BD5] hover:bg-[#5B9BD5]/10"
          >
            Find Dealers
          </ExternalLinkButton>
          <Button 
            onClick={resetAssessment}
            variant="outline"
            size="lg"
            className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#151A22] hover:text-[#E2E8FF]"
          >
            New Assessment
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card ref={assessmentRef} className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">

      <Alert className="mb-6 border-[#5B9BD5]/30 bg-[#5B9BD5]/10">
        <AlertCircle className="h-4 w-4 text-[#5B9BD5]" />
        <AlertDescription className="text-[#E2E8FF]">
          This AI assessment provides educational guidance about RV technology categories based on your comfort level and needs.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div>
          <label className="block text-white font-medium mb-3">
            Describe your experience with technology and what you hope to achieve with RV technology:
          </label>
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Example: I'm comfortable with smartphones and home automation. I want my RV to have reliable internet for remote work and simple monitoring of systems. I prefer technology that's reliable but not overly complex..."
            className="min-h-32 bg-[#151A22] border-[#1a202c] text-white placeholder-[#E2E8FF]/50"
            disabled={isAnalyzing}
          />
        </div>

        <Button
          onClick={handleAssessment}
          disabled={!userInput.trim() || isAnalyzing}
          className="w-full bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] text-lg py-6"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              Analyzing Your Technology Readiness...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-5 w-5" />
              Get My AI Technology Assessment
            </>
          )}
        </Button>

        {error && (
          <Alert className="border-red-500 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
};