import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Brain, Zap, ExternalLink, Users, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLinkButton } from '@/components/ui/external-link-button';

interface LifestyleAnalysis {
  primaryUsage: string;
  keyTechnologyNeeds: string[];
  recommendedSystems: {
    category: string;
    recommendations: string[];
    reasoning: string;
  }[];
  educationalGuidance: string;
  budgetConsiderations: string;
  nextSteps: string[];
}

interface LifestyleRequirements {
  rvUsage: string;
  travelFrequency: string;
  destinations: string;
  workRequirements: string;
  groupSize: string;
  comfortLevel: string;
  techComfort: string;
  specificNeeds: string;
}

export const AILifestylePlanner: React.FC = () => {
  const [requirements, setRequirements] = useState<LifestyleRequirements>({
    rvUsage: '',
    travelFrequency: '',
    destinations: '',
    workRequirements: '',
    groupSize: '',
    comfortLevel: '',
    techComfort: '',
    specificNeeds: ''
  });

  const [analysis, setAnalysis] = useState<LifestyleAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!requirements.rvUsage || !requirements.travelFrequency || !requirements.destinations) {
      setError('Please fill in the required fields (RV Usage, Travel Frequency, and Destinations)');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('lifestyle-tech-analyzer', {
        body: { requirements }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to analyze lifestyle requirements');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      console.error('Lifestyle analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to analyze lifestyle requirements: ${errorMessage}. Please try again.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isFormValid = requirements.rvUsage && requirements.travelFrequency && requirements.destinations;

  if (analysis) {
    return (
      <Card className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
        <div className="mb-6">
          <Button
            onClick={() => { setAnalysis(null); setRequirements({ rvUsage: '', travelFrequency: '', destinations: '', workRequirements: '', groupSize: '', comfortLevel: '', techComfort: '', specificNeeds: '' }); }}
            variant="ghost"
            size="sm"
            className="text-[#60A5FA] hover:text-white mb-4"
          >
            ← Start New Analysis
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Your Personalized Technology Plan</h3>
              <p className="text-[#E2E8FF]">AI analyzed recommendations for your RV lifestyle</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Primary Usage Analysis */}
          <div className="bg-[#151A22]/50 rounded-lg p-6 border border-[#1a202c]">
            <h4 className="text-xl font-semibold text-[#60A5FA] mb-4">Lifestyle Analysis</h4>
            <p className="text-[#E2E8FF] leading-relaxed">{analysis.primaryUsage}</p>
          </div>

          {/* Key Technology Needs */}
          <div className="bg-[#151A22]/50 rounded-lg p-6 border border-[#1a202c]">
            <h4 className="text-xl font-semibold text-[#60A5FA] mb-4">Essential Technology Categories</h4>
            <div className="grid gap-3">
              {analysis.keyTechnologyNeeds.map((need, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-[#091020]/50 rounded-lg">
                  <Zap className="h-4 w-4 text-[#5B9BD5] flex-shrink-0" />
                  <span className="text-[#E2E8FF]">{need}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Recommendations */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-[#60A5FA]">Recommended Technology Systems</h4>
            {analysis.recommendedSystems.map((system, index) => (
              <div key={index} className="bg-[#151A22]/50 rounded-lg p-6 border border-[#1a202c]">
                <h5 className="font-semibold text-white mb-3">{system.category}</h5>
                <p className="text-[#E2E8FF] mb-4 leading-relaxed">{system.reasoning}</p>
                <ul className="space-y-2">
                  {system.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="flex items-start gap-3 text-[#E2E8FF]">
                      <Zap className="h-4 w-4 text-[#5B9BD5] flex-shrink-0 mt-0.5" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Educational Guidance */}
          <div className="bg-[#151A22]/50 rounded-lg p-6 border border-[#1a202c]">
            <h4 className="text-xl font-semibold text-[#60A5FA] mb-4">Educational Guidance</h4>
            <p className="text-[#E2E8FF] leading-relaxed">{analysis.educationalGuidance}</p>
          </div>

          {/* Budget Considerations */}
          <div className="bg-[#151A22]/50 rounded-lg p-6 border border-[#1a202c]">
            <h4 className="text-xl font-semibold text-[#60A5FA] mb-4">Budget Considerations</h4>
            <p className="text-[#E2E8FF] leading-relaxed">{analysis.budgetConsiderations}</p>
          </div>

          {/* Next Steps */}
          <div className="bg-[#151A22]/50 rounded-lg p-6 border border-[#1a202c]">
            <h4 className="text-xl font-semibold text-[#60A5FA] mb-4">Next Steps</h4>
            <div className="space-y-3">
              {analysis.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#5B9BD5]/20 rounded-full flex items-center justify-center text-[#5B9BD5] text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="text-[#E2E8FF]">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <ExternalLinkButton 
              href="https://www.rvt.com/buy/"
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5]"
            >
              Browse RVs at RVT.com
            </ExternalLinkButton>
            <ExternalLinkButton 
              href="https://www.rvt.com/dealersearch.php"
              variant="outline"
              size="lg"
              className="border-[#5B9BD5]/50 text-[#5B9BD5] hover:bg-[#5B9BD5]/10"
            >
              Find Local Dealers
            </ExternalLinkButton>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-full mb-4">
          <Brain className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">AI Lifestyle Technology Planner</h3>
        <p className="text-[#E2E8FF] text-lg">Get personalized technology recommendations based on your RV lifestyle</p>
      </div>

      <Alert className="mb-6 border-blue-500 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-300">
          This tool provides educational guidance about RV technology options. Always consult with RV dealers and professionals for specific product recommendations and installations.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {/* RV Usage */}
        <div className="space-y-2">
          <Label htmlFor="rvUsage" className="text-white font-medium">How do you plan to use your RV? *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, rvUsage: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="Select your primary RV usage" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="full-time-living" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Full time living</SelectItem>
              <SelectItem value="extended-travel" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Extended travel (months)</SelectItem>
              <SelectItem value="seasonal-camping" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Seasonal camping</SelectItem>
              <SelectItem value="weekend-trips" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Weekend trips</SelectItem>
              <SelectItem value="remote-work" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Remote work while traveling</SelectItem>
              <SelectItem value="family-vacations" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Family vacations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Travel Frequency */}
        <div className="space-y-2">
          <Label htmlFor="travelFrequency" className="text-white font-medium">How often do you plan to travel? *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, travelFrequency: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="Select travel frequency" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="full-time" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Full time (year round)</SelectItem>
              <SelectItem value="monthly" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Monthly trips</SelectItem>
              <SelectItem value="seasonal" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Seasonal (spring/summer)</SelectItem>
              <SelectItem value="weekends" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Weekends and holidays</SelectItem>
              <SelectItem value="occasional" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Occasional trips</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Destinations */}
        <div className="space-y-2">
          <Label htmlFor="destinations" className="text-white font-medium">What types of destinations do you prefer? *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, destinations: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="Select destination preferences" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="remote-boondocking" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Remote areas and boondocking</SelectItem>
              <SelectItem value="national-parks" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">National parks and state parks</SelectItem>
              <SelectItem value="rv-parks" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">RV parks with amenities</SelectItem>
              <SelectItem value="mixed-destinations" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Mix of park types</SelectItem>
              <SelectItem value="urban-areas" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Cities and urban areas</SelectItem>
              <SelectItem value="coastal-areas" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Beach and coastal destinations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Work Requirements */}
        <div className="space-y-2">
          <Label htmlFor="workRequirements" className="text-white font-medium">Work/Internet Requirements</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, workRequirements: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="Select work requirements" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="no-work" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">No work requirements</SelectItem>
              <SelectItem value="basic-email" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Basic email and web browsing</SelectItem>
              <SelectItem value="video-calls" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Video calls and online meetings</SelectItem>
              <SelectItem value="full-remote-work" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Full time remote work</SelectItem>
              <SelectItem value="content-creation" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Content creation and streaming</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Group Size */}
        <div className="space-y-2">
          <Label htmlFor="groupSize" className="text-white font-medium">Group Size</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, groupSize: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="Number of people traveling" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="solo" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Solo traveler</SelectItem>
              <SelectItem value="couple" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Couple</SelectItem>
              <SelectItem value="family-small" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Family (3 to 4 people)</SelectItem>
              <SelectItem value="family-large" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Large family (5+ people)</SelectItem>
              <SelectItem value="multiple-families" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Multiple families traveling together</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Comfort Level */}
        <div className="space-y-2">
          <Label htmlFor="comfortLevel" className="text-white font-medium">Comfort Expectations</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, comfortLevel: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="Your comfort preferences" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="basic-camping" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Basic camping comfort</SelectItem>
              <SelectItem value="standard-amenities" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Standard RV amenities</SelectItem>
              <SelectItem value="residential-comfort" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Residential level comfort</SelectItem>
              <SelectItem value="luxury-amenities" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Luxury amenities</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Technology Comfort */}
        <div className="space-y-2">
          <Label htmlFor="techComfort" className="text-white font-medium">Technology Comfort Level</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, techComfort: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="Your technology experience" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="basic-user" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Basic technology user</SelectItem>
              <SelectItem value="comfortable-user" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Comfortable with technology</SelectItem>
              <SelectItem value="tech-savvy" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Technology enthusiast</SelectItem>
              <SelectItem value="expert-user" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Technology expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Specific Needs */}
        <div className="space-y-2">
          <Label htmlFor="specificNeeds" className="text-white font-medium">Specific Needs or Concerns</Label>
          <Textarea
            id="specificNeeds"
            placeholder="Describe any specific technology needs, accessibility requirements, or concerns you have about RV technology..."
            value={requirements.specificNeeds}
            onChange={(e) => setRequirements(prev => ({ ...prev, specificNeeds: e.target.value }))}
            rows={3}
            className="w-full bg-[#131a2a] border-[#1a202c] text-white placeholder-[#E2E8FF]/70 focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]"
          />
        </div>

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          disabled={!isFormValid || isAnalyzing}
          className="w-full bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] text-white font-medium py-3 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing Your Lifestyle...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Get Personalized Technology Plan
            </>
          )}
        </Button>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-500/50">
            <AlertDescription className="text-red-300">{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
};