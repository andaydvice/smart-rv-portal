import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ExternalLink, Brain, MapPin, DollarSign, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface UserRequirements {
  travelStyle: string;
  experienceLevel: string;
  budget: string;
  groupSize: string;
  mustHaveFeatures: string[];
  travelDuration: string;
  comfortLevel: string;
  additionalRequirements: string;
}

interface RVRecommendation {
  rvType: string;
  reasoning: string;
  priceRange: string;
  recommendedModels: string[];
  technologyFeatures: string[];
  searchUrls: {
    rvtrader: string;
    rvt: string;
    rvusa: string;
  };
  educationalContent: string;
  budgetConsiderations: string;
}

const availableFeatures = [
  'Solar Power System',
  'Satellite Internet (Starlink)',
  'WiFi Booster/Cellular Amplifier',
  'Lithium Battery System',
  'Inverter (Pure Sine Wave)',
  'Smart RV Monitoring',
  'Backup Camera System',
  'Leveling Jacks (Auto)',
  'Washer/Dryer Combo',
  'Residential Refrigerator',
  'King Size Bed',
  'Fireplace',
  'Outdoor Kitchen',
  'Generator (Quiet)',
  'Slide-outs (Multiple)',
  'Full Bathroom',
  'Office Space/Desk Area'
];

export default function IntelligentRVFinder() {
  const [requirements, setRequirements] = useState<UserRequirements>({
    travelStyle: '',
    experienceLevel: '',
    budget: '',
    groupSize: '',
    mustHaveFeatures: [],
    travelDuration: '',
    comfortLevel: '',
    additionalRequirements: ''
  });

  const [recommendation, setRecommendation] = useState<RVRecommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFeatureToggle = (feature: string) => {
    setRequirements(prev => ({
      ...prev,
      mustHaveFeatures: prev.mustHaveFeatures.includes(feature)
        ? prev.mustHaveFeatures.filter(f => f !== feature)
        : [...prev.mustHaveFeatures, feature]
    }));
  };

  const handleAnalyze = async () => {
    // Validate required fields
    if (!requirements.travelStyle || !requirements.experienceLevel || !requirements.budget) {
      setError('Please fill in all required fields (Travel Style, Experience Level, and Budget)');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('rv-finder-with-llm', {
        body: { requirements }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to get recommendations');
      }

      setRecommendation(data.recommendation);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze requirements');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isFormValid = requirements.travelStyle && requirements.experienceLevel && requirements.budget;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-[#091020] to-[#151A22] border-b border-[#1a202c]">
        <CardTitle className="flex items-center gap-2 text-white">
          <Brain className="h-6 w-6 text-[#5B9BD5]" />
          Intelligent RV Finder
        </CardTitle>
        <p className="text-[#E2E8FF]">
          Tell us about your RV needs and get AI powered recommendations with real search results
        </p>
      </CardHeader>
      <CardContent className="space-y-6 bg-gradient-to-br from-[#091020] to-[#131a2a] p-6">
        {/* Travel Style */}
        <div className="space-y-2">
          <Label htmlFor="travelStyle" className="text-white font-medium">Travel Style *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, travelStyle: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="How do you plan to use your RV?" className="text-[#E2E8FF]" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="full time living" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Full time living on the road</SelectItem>
              <SelectItem value="extended travel" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Extended travel (months at a time)</SelectItem>
              <SelectItem value="weekend trips" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Weekend getaways</SelectItem>
              <SelectItem value="seasonal camping" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Seasonal camping</SelectItem>
              <SelectItem value="cross country" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Cross country road trips</SelectItem>
              <SelectItem value="remote work" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Remote work while traveling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label htmlFor="experienceLevel" className="text-white font-medium">RV Experience Level *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, experienceLevel: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="Your experience with RVs" className="text-[#E2E8FF]" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="complete beginner" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Complete beginner</SelectItem>
              <SelectItem value="some experience" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Some camping/RV experience</SelectItem>
              <SelectItem value="experienced" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Experienced RVer</SelectItem>
              <SelectItem value="expert" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">RV expert/mechanic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-white font-medium">Budget Range *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, budget: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="Your budget for purchasing an RV" className="text-[#E2E8FF]" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="under 50k" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Under $50,000</SelectItem>
              <SelectItem value="50k 100k" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k 200k" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">$100,000 - $200,000</SelectItem>
              <SelectItem value="200k plus" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">$200,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Group Size */}
        <div className="space-y-2">
          <Label htmlFor="groupSize" className="text-white font-medium">Group Size</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, groupSize: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="How many people will travel?" className="text-[#E2E8FF]" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="solo" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Solo traveler</SelectItem>
              <SelectItem value="couple" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Couple</SelectItem>
              <SelectItem value="small family" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Small family (3 4 people)</SelectItem>
              <SelectItem value="large family" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Large family (5+ people)</SelectItem>
              <SelectItem value="group" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Group of friends</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Travel Duration */}
        <div className="space-y-2">
          <Label htmlFor="travelDuration" className="text-white font-medium">Typical Trip Duration</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, travelDuration: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="How long are your typical trips?" className="text-[#E2E8FF]" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="weekend" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Weekend trips (2 3 days)</SelectItem>
              <SelectItem value="week" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Week long trips</SelectItem>
              <SelectItem value="month" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Month long adventures</SelectItem>
              <SelectItem value="extended" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Extended travel (2+ months)</SelectItem>
              <SelectItem value="full time" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Full time living</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Comfort Level */}
        <div className="space-y-2">
          <Label htmlFor="comfortLevel" className="text-white font-medium">Comfort Preferences</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, comfortLevel: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5]">
              <SelectValue placeholder="Your comfort expectations" className="text-[#E2E8FF]" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border border-[#1a202c] shadow-lg z-50">
              <SelectItem value="basic" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Basic camping comfort</SelectItem>
              <SelectItem value="moderate" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Moderate comfort with some amenities</SelectItem>
              <SelectItem value="luxury" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Luxury home like comfort</SelectItem>
              <SelectItem value="hotel style" className="text-white hover:bg-[#1a202c] focus:bg-[#1a202c]">Hotel style amenities</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Must-Have Features */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Must-Have Features</Label>
          <div className="grid grid-cols-2 gap-3">
            {availableFeatures.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={requirements.mustHaveFeatures.includes(feature)}
                  onCheckedChange={() => handleFeatureToggle(feature)}
                  className="border-[#1a202c] text-[#5B9BD5] focus:ring-[#5B9BD5] data-[state=checked]:bg-[#5B9BD5] data-[state=checked]:border-[#5B9BD5]"
                />
                <Label htmlFor={feature} className="text-sm font-normal text-[#E2E8FF] cursor-pointer">
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="space-y-2">
          <Label htmlFor="additionalRequirements" className="text-white font-medium">Additional Requirements or Preferences</Label>
          <Textarea
            id="additionalRequirements"
            placeholder="Describe any specific needs, concerns, or preferences (towing capacity, pets, accessibility, etc.)"
            value={requirements.additionalRequirements}
            onChange={(e) => setRequirements(prev => ({ ...prev, additionalRequirements: e.target.value }))}
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
              Analyzing Your Requirements...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Get AI Powered RV Recommendations
            </>
          )}
        </Button>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-500/50">
            <AlertDescription className="text-red-300">{error}</AlertDescription>
          </Alert>
        )}

        {/* Recommendation Results */}
        {recommendation && (
          <div className="space-y-4 mt-6">
            <div className="border-t border-[#1a202c] pt-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Your Personalized RV Recommendations</h3>
              
              {/* Main Recommendation */}
              <Card className="mb-4 bg-gradient-to-br from-[#5B9BD5]/20 to-[#60A5FA]/20 border-[#5B9BD5]/30">
                <CardHeader className="bg-gradient-to-r from-[#5B9BD5]/10 to-[#60A5FA]/10">
                  <CardTitle className="text-lg text-[#5B9BD5]">
                    Recommended: {recommendation.rvType}
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-gradient-to-br from-[#5B9BD5]/10 to-[#60A5FA]/10">
                  <p className="text-[#E2E8FF] mb-4">{recommendation.reasoning}</p>
                  
                  {/* Price Range */}
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-[#5B9BD5]" />
                    <span className="font-medium text-white">Price Range: {recommendation.priceRange}</span>
                  </div>

                  {/* Recommended Models */}
                  {recommendation.recommendedModels.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-white">Recommended Models:</h4>
                      <ul className="list-disc list-inside text-sm text-[#E2E8FF]">
                        {recommendation.recommendedModels.map((model, index) => (
                          <li key={index}>{model}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technology Features */}
                  {recommendation.technologyFeatures.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-white">Technology Features to Look For:</h4>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.technologyFeatures.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#5B9BD5]/20 text-[#5B9BD5] border border-[#5B9BD5]/30 rounded text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Search Links */}
              <Card className="mb-4 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MapPin className="h-5 w-5 text-[#5B9BD5]" />
                    Find Your RV - Real Search Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#E2E8FF] mb-4">
                    These links will take you to actual RV listings based on your requirements:
                  </p>
                  <div className="grid gap-3">
                    <a
                      href={recommendation.searchUrls.rvtrader}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-[#1a202c] rounded-lg hover:bg-[#1a202c]/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-white">RV Trader</div>
                        <div className="text-sm text-[#E2E8FF]">Large selection of RVs nationwide</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#5B9BD5]" />
                    </a>
                    <a
                      href={recommendation.searchUrls.rvt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-[#1a202c] rounded-lg hover:bg-[#1a202c]/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-white">RVT.com</div>
                        <div className="text-sm text-[#E2E8FF]">Comprehensive RV marketplace</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#5B9BD5]" />
                    </a>
                    <a
                      href={recommendation.searchUrls.rvusa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-[#1a202c] rounded-lg hover:bg-[#1a202c]/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-white">RVUSA</div>
                        <div className="text-sm text-[#E2E8FF]">Dealer network and listings</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#5B9BD5]" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Educational Content */}
              <Card className="mb-4 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Info className="h-5 w-5 text-[#5B9BD5]" />
                    Learn About Your Recommended RV Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#E2E8FF]">{recommendation.educationalContent}</p>
                </CardContent>
              </Card>

              {/* Budget Considerations */}
              <Card className="bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <DollarSign className="h-5 w-5 text-[#5B9BD5]" />
                    Budget & Cost Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#E2E8FF]">{recommendation.budgetConsiderations}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <Alert className="bg-yellow-900/20 border-yellow-500/50">
          <Info className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-200">
            These recommendations are for educational purposes only. Always research thoroughly, 
            inspect any RV in person, and consult with dealers before making a purchase decision.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}