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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6" />
          Intelligent RV Finder
        </CardTitle>
        <p className="text-muted-foreground">
          Tell us about your RV needs and get AI-powered recommendations with real search results
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Travel Style */}
        <div className="space-y-2">
          <Label htmlFor="travelStyle">Travel Style *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, travelStyle: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="How do you plan to use your RV?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time-living">Full-time living on the road</SelectItem>
              <SelectItem value="extended-travel">Extended travel (months at a time)</SelectItem>
              <SelectItem value="weekend-trips">Weekend getaways</SelectItem>
              <SelectItem value="seasonal-camping">Seasonal camping</SelectItem>
              <SelectItem value="cross-country">Cross-country road trips</SelectItem>
              <SelectItem value="remote-work">Remote work while traveling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label htmlFor="experienceLevel">RV Experience Level *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, experienceLevel: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Your experience with RVs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="complete-beginner">Complete beginner</SelectItem>
              <SelectItem value="some-experience">Some camping/RV experience</SelectItem>
              <SelectItem value="experienced">Experienced RVer</SelectItem>
              <SelectItem value="expert">RV expert/mechanic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range *</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, budget: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Your budget for purchasing an RV" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-50k">Under $50,000</SelectItem>
              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k-200k">$100,000 - $200,000</SelectItem>
              <SelectItem value="200k-plus">$200,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Group Size */}
        <div className="space-y-2">
          <Label htmlFor="groupSize">Group Size</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, groupSize: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="How many people will travel?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo traveler</SelectItem>
              <SelectItem value="couple">Couple</SelectItem>
              <SelectItem value="small-family">Small family (3-4 people)</SelectItem>
              <SelectItem value="large-family">Large family (5+ people)</SelectItem>
              <SelectItem value="group">Group of friends</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Travel Duration */}
        <div className="space-y-2">
          <Label htmlFor="travelDuration">Typical Trip Duration</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, travelDuration: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="How long are your typical trips?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekend">Weekend trips (2-3 days)</SelectItem>
              <SelectItem value="week">Week-long trips</SelectItem>
              <SelectItem value="month">Month-long adventures</SelectItem>
              <SelectItem value="extended">Extended travel (2+ months)</SelectItem>
              <SelectItem value="full-time">Full-time living</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Comfort Level */}
        <div className="space-y-2">
          <Label htmlFor="comfortLevel">Comfort Preferences</Label>
          <Select onValueChange={(value) => setRequirements(prev => ({ ...prev, comfortLevel: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Your comfort expectations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic camping comfort</SelectItem>
              <SelectItem value="moderate">Moderate comfort with some amenities</SelectItem>
              <SelectItem value="luxury">Luxury home-like comfort</SelectItem>
              <SelectItem value="hotel-style">Hotel-style amenities</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Must-Have Features */}
        <div className="space-y-3">
          <Label>Must-Have Features</Label>
          <div className="grid grid-cols-2 gap-3">
            {availableFeatures.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={requirements.mustHaveFeatures.includes(feature)}
                  onCheckedChange={() => handleFeatureToggle(feature)}
                />
                <Label htmlFor={feature} className="text-sm font-normal">
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="space-y-2">
          <Label htmlFor="additionalRequirements">Additional Requirements or Preferences</Label>
          <Textarea
            id="additionalRequirements"
            placeholder="Describe any specific needs, concerns, or preferences (towing capacity, pets, accessibility, etc.)"
            value={requirements.additionalRequirements}
            onChange={(e) => setRequirements(prev => ({ ...prev, additionalRequirements: e.target.value }))}
            rows={3}
          />
        </div>

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          disabled={!isFormValid || isAnalyzing}
          className="w-full"
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
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Recommendation Results */}
        {recommendation && (
          <div className="space-y-4 mt-6">
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Your Personalized RV Recommendations</h3>
              
              {/* Main Recommendation */}
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    Recommended: {recommendation.rvType}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{recommendation.reasoning}</p>
                  
                  {/* Price Range */}
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="font-medium">Price Range: {recommendation.priceRange}</span>
                  </div>

                  {/* Recommended Models */}
                  {recommendation.recommendedModels.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Recommended Models:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {recommendation.recommendedModels.map((model, index) => (
                          <li key={index}>{model}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technology Features */}
                  {recommendation.technologyFeatures.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Technology Features to Look For:</h4>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.technologyFeatures.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
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
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Find Your RV - Real Search Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    These links will take you to actual RV listings based on your requirements:
                  </p>
                  <div className="grid gap-3">
                    <a
                      href={recommendation.searchUrls.rvtrader}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium">RV Trader</div>
                        <div className="text-sm text-muted-foreground">Large selection of RVs nationwide</div>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={recommendation.searchUrls.rvt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium">RVT.com</div>
                        <div className="text-sm text-muted-foreground">Comprehensive RV marketplace</div>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={recommendation.searchUrls.rvusa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium">RVUSA</div>
                        <div className="text-sm text-muted-foreground">Dealer network and listings</div>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Educational Content */}
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Learn About Your Recommended RV Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{recommendation.educationalContent}</p>
                </CardContent>
              </Card>

              {/* Budget Considerations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Budget & Cost Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{recommendation.budgetConsiderations}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            These recommendations are for educational purposes only. Always research thoroughly, 
            inspect any RV in person, and consult with dealers before making a purchase decision.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}