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
    <Card className="w-full max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg">
      <CardHeader className="bg-white border-b border-gray-100">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Brain className="h-6 w-6 text-blue-600" />
          Intelligent RV Finder
        </CardTitle>
        <p className="text-gray-600">
          Tell us about your RV needs and get AI-powered recommendations with real search results
        </p>
      </CardHeader>
      <CardContent className="space-y-6 bg-white p-6">
        {/* Travel Style */}
        <div className="space-y-2">
          <Label htmlFor="travelStyle" className="text-gray-900 font-medium">Travel Style *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, travelStyle: value }))}>
            <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="How do you plan to use your RV?" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg">
              <SelectItem value="full-time-living" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Full-time living on the road</SelectItem>
              <SelectItem value="extended-travel" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Extended travel (months at a time)</SelectItem>
              <SelectItem value="weekend-trips" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Weekend getaways</SelectItem>
              <SelectItem value="seasonal-camping" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Seasonal camping</SelectItem>
              <SelectItem value="cross-country" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Cross-country road trips</SelectItem>
              <SelectItem value="remote-work" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Remote work while traveling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label htmlFor="experienceLevel" className="text-gray-900 font-medium">RV Experience Level *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, experienceLevel: value }))}>
            <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="Your experience with RVs" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg">
              <SelectItem value="complete-beginner" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Complete beginner</SelectItem>
              <SelectItem value="some-experience" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Some camping/RV experience</SelectItem>
              <SelectItem value="experienced" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Experienced RVer</SelectItem>
              <SelectItem value="expert" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">RV expert/mechanic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-gray-900 font-medium">Budget Range *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, budget: value }))}>
            <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="Your budget for purchasing an RV" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg">
              <SelectItem value="under-50k" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Under $50,000</SelectItem>
              <SelectItem value="50k-100k" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k-200k" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">$100,000 - $200,000</SelectItem>
              <SelectItem value="200k-plus" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">$200,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Group Size */}
        <div className="space-y-2">
          <Label htmlFor="groupSize" className="text-gray-900 font-medium">Group Size</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, groupSize: value }))}>
            <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="How many people will travel?" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg">
              <SelectItem value="solo" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Solo traveler</SelectItem>
              <SelectItem value="couple" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Couple</SelectItem>
              <SelectItem value="small-family" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Small family (3-4 people)</SelectItem>
              <SelectItem value="large-family" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Large family (5+ people)</SelectItem>
              <SelectItem value="group" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Group of friends</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Travel Duration */}
        <div className="space-y-2">
          <Label htmlFor="travelDuration" className="text-gray-900 font-medium">Typical Trip Duration</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, travelDuration: value }))}>
            <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="How long are your typical trips?" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg">
              <SelectItem value="weekend" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Weekend trips (2-3 days)</SelectItem>
              <SelectItem value="week" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Week-long trips</SelectItem>
              <SelectItem value="month" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Month-long adventures</SelectItem>
              <SelectItem value="extended" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Extended travel (2+ months)</SelectItem>
              <SelectItem value="full-time" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Full-time living</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Comfort Level */}
        <div className="space-y-2">
          <Label htmlFor="comfortLevel" className="text-gray-900 font-medium">Comfort Preferences</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, comfortLevel: value }))}>
            <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="Your comfort expectations" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg">
              <SelectItem value="basic" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Basic camping comfort</SelectItem>
              <SelectItem value="moderate" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Moderate comfort with some amenities</SelectItem>
              <SelectItem value="luxury" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Luxury home-like comfort</SelectItem>
              <SelectItem value="hotel-style" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50">Hotel-style amenities</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Must-Have Features */}
        <div className="space-y-3">
          <Label className="text-gray-900 font-medium">Must-Have Features</Label>
          <div className="grid grid-cols-2 gap-3">
            {availableFeatures.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={requirements.mustHaveFeatures.includes(feature)}
                  onCheckedChange={() => handleFeatureToggle(feature)}
                  className="border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor={feature} className="text-sm font-normal text-gray-900 cursor-pointer">
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="space-y-2">
          <Label htmlFor="additionalRequirements" className="text-gray-900 font-medium">Additional Requirements or Preferences</Label>
          <Textarea
            id="additionalRequirements"
            placeholder="Describe any specific needs, concerns, or preferences (towing capacity, pets, accessibility, etc.)"
            value={requirements.additionalRequirements}
            onChange={(e) => setRequirements(prev => ({ ...prev, additionalRequirements: e.target.value }))}
            rows={3}
            className="w-full bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          disabled={!isFormValid || isAnalyzing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing Your Requirements...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Get AI-Powered RV Recommendations
            </>
          )}
        </Button>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Recommendation Results */}
        {recommendation && (
          <div className="space-y-4 mt-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Personalized RV Recommendations</h3>
              
              {/* Main Recommendation */}
              <Card className="mb-4 bg-blue-50 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-900">
                    Recommended: {recommendation.rvType}
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-blue-50">
                  <p className="text-blue-800 mb-4">{recommendation.reasoning}</p>
                  
                  {/* Price Range */}
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Price Range: {recommendation.priceRange}</span>
                  </div>

                  {/* Recommended Models */}
                  {recommendation.recommendedModels.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-blue-900">Recommended Models:</h4>
                      <ul className="list-disc list-inside text-sm text-blue-800">
                        {recommendation.recommendedModels.map((model, index) => (
                          <li key={index}>{model}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technology Features */}
                  {recommendation.technologyFeatures.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-blue-900">Technology Features to Look For:</h4>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.technologyFeatures.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
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
              <Card className="mb-4 bg-white border-gray-200">
                <CardHeader className="bg-white">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Find Your RV - Real Search Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <p className="text-gray-600 mb-4">
                    These links will take you to actual RV listings based on your requirements:
                  </p>
                  <div className="grid gap-3">
                    <a
                      href={recommendation.searchUrls.rvtrader}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-gray-900">RV Trader</div>
                        <div className="text-sm text-gray-600">Large selection of RVs nationwide</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </a>
                    <a
                      href={recommendation.searchUrls.rvt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-gray-900">RVT.com</div>
                        <div className="text-sm text-gray-600">Comprehensive RV marketplace</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </a>
                    <a
                      href={recommendation.searchUrls.rvusa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-gray-900">RVUSA</div>
                        <div className="text-sm text-gray-600">Dealer network and listings</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Educational Content */}
              <Card className="mb-4 bg-white border-gray-200">
                <CardHeader className="bg-white">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Info className="h-5 w-5 text-blue-600" />
                    Learn About Your Recommended RV Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <p className="text-gray-700">{recommendation.educationalContent}</p>
                </CardContent>
              </Card>

              {/* Budget Considerations */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="bg-white">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Budget & Cost Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <p className="text-gray-700">{recommendation.budgetConsiderations}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <Alert className="bg-yellow-50 border-yellow-200">
          <Info className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            These recommendations are for educational purposes only. Always research thoroughly, 
            inspect any RV in person, and consult with dealers before making a purchase decision.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}