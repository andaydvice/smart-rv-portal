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
    buyUrl: string;
    reviewsUrl: string;
    dealersUrl: string;
    priceCheckerUrl: string;
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
  'Slide-outs (Multiple)',
  'Office Space/Desk Area',
  'Generator (Onboard)',
  'Air Conditioning (Multiple Zones)',
  'Composting Toilet',
  'Water Filtration System'
];

export const IntelligentRVFinder: React.FC = () => {
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
    console.log('handleAnalyze called');
    console.log('Requirements:', requirements);
    console.log('isFormValid:', isFormValid);
    
    // Validate required fields
    if (!requirements.travelStyle || !requirements.experienceLevel || !requirements.budget) {
      console.log('Validation failed');
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
          Answer a few questions and get personalized RV recommendations with technology features that match your needs
        </p>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Travel Style */}
        <div>
          <Label className="text-white font-medium mb-3 block">Travel Style *</Label>
          <Select value={requirements.travelStyle} onValueChange={(value) => setRequirements(prev => ({ ...prev, travelStyle: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white">
              <SelectValue placeholder="How do you plan to use your RV?" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border-[#1a202c]">
              <SelectItem value="weekend trips" className="text-white hover:bg-[#1a202c]">Weekend Trips</SelectItem>
              <SelectItem value="extended travel" className="text-white hover:bg-[#1a202c]">Extended Travel (weeks/months)</SelectItem>
              <SelectItem value="full time living" className="text-white hover:bg-[#1a202c]">Full Time Living</SelectItem>
              <SelectItem value="seasonal camping" className="text-white hover:bg-[#1a202c]">Seasonal Camping</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level */}
        <div>
          <Label className="text-white font-medium mb-3 block">RV Experience Level *</Label>
          <Select value={requirements.experienceLevel} onValueChange={(value) => setRequirements(prev => ({ ...prev, experienceLevel: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white">
              <SelectValue placeholder="What's your RV experience?" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border-[#1a202c]">
              <SelectItem value="first time buyer" className="text-white hover:bg-[#1a202c]">First Time Buyer</SelectItem>
              <SelectItem value="some experience" className="text-white hover:bg-[#1a202c]">Some Experience</SelectItem>
              <SelectItem value="experienced" className="text-white hover:bg-[#1a202c]">Experienced RVer</SelectItem>
              <SelectItem value="expert" className="text-white hover:bg-[#1a202c]">Expert/Full Timer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div>
          <Label className="text-white font-medium mb-3 block">Budget Range *</Label>
          <Select value={requirements.budget} onValueChange={(value) => setRequirements(prev => ({ ...prev, budget: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white">
              <SelectValue placeholder="What's your budget range?" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border-[#1a202c]">
              <SelectItem value="under 50k" className="text-white hover:bg-[#1a202c]">Under $50,000</SelectItem>
              <SelectItem value="50k 100k" className="text-white hover:bg-[#1a202c]">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k 200k" className="text-white hover:bg-[#1a202c]">$100,000 - $200,000</SelectItem>
              <SelectItem value="200k plus" className="text-white hover:bg-[#1a202c]">$200,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Group Size */}
        <div>
          <Label className="text-white font-medium mb-3 block">Group Size</Label>
          <Select value={requirements.groupSize} onValueChange={(value) => setRequirements(prev => ({ ...prev, groupSize: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white">
              <SelectValue placeholder="How many people will be traveling?" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border-[#1a202c]">
              <SelectItem value="solo" className="text-white hover:bg-[#1a202c]">Solo Traveler</SelectItem>
              <SelectItem value="couple" className="text-white hover:bg-[#1a202c]">Couple</SelectItem>
              <SelectItem value="small family" className="text-white hover:bg-[#1a202c]">Small Family (3-4 people)</SelectItem>
              <SelectItem value="large family" className="text-white hover:bg-[#1a202c]">Large Family (5+ people)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Must-Have Features */}
        <div>
          <Label className="text-white font-medium mb-3 block">Must Have Features</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableFeatures.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={requirements.mustHaveFeatures.includes(feature)}
                  onCheckedChange={() => handleFeatureToggle(feature)}
                  className="border-2 border-[#5B9BD5] data-[state=checked]:bg-[#5B9BD5] data-[state=checked]:border-[#5B9BD5]"
                />
                <Label 
                  htmlFor={feature} 
                  className="text-sm text-[#E2E8FF] cursor-pointer"
                >
                  {feature.replace(/-/g, ' ')}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Duration */}
        <div>
          <Label className="text-white font-medium mb-3 block">Typical Trip Duration</Label>
          <Select value={requirements.travelDuration} onValueChange={(value) => setRequirements(prev => ({ ...prev, travelDuration: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white">
              <SelectValue placeholder="How long are your typical trips?" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border-[#1a202c]">
              <SelectItem value="weekend" className="text-white hover:bg-[#1a202c]">Weekend (2-3 days)</SelectItem>
              <SelectItem value="week" className="text-white hover:bg-[#1a202c]">Week (4-7 days)</SelectItem>
              <SelectItem value="extended" className="text-white hover:bg-[#1a202c]">Extended (2+ weeks)</SelectItem>
              <SelectItem value="seasonal" className="text-white hover:bg-[#1a202c]">Seasonal (months)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Comfort Level */}
        <div>
          <Label className="text-white font-medium mb-3 block">Comfort Preferences</Label>
          <Select value={requirements.comfortLevel} onValueChange={(value) => setRequirements(prev => ({ ...prev, comfortLevel: value }))}>
            <SelectTrigger className="w-full bg-[#131a2a] border-[#1a202c] text-white">
              <SelectValue placeholder="What level of comfort do you prefer?" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border-[#1a202c]">
              <SelectItem value="basic" className="text-white hover:bg-[#1a202c]">Basic (Simple amenities)</SelectItem>
              <SelectItem value="moderate" className="text-white hover:bg-[#1a202c]">Moderate (Some luxuries)</SelectItem>
              <SelectItem value="luxury" className="text-white hover:bg-[#1a202c]">Luxury (High end amenities)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Additional Requirements */}
        <div>
          <Label className="text-white font-medium mb-3 block">Additional Requirements</Label>
          <Textarea
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
              Find My Perfect RV
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
              <Card className="mb-4 bg-[#091020] border-[#5B9BD5]/30">
                <CardHeader className="bg-[#151A22] border-b border-[#1a202c]">
                  <CardTitle className="text-lg text-[#5B9BD5]">
                    Recommended: {recommendation.rvType}
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-[#091020] p-6">
                  <div className="text-white mb-4 leading-relaxed whitespace-pre-line">{recommendation.reasoning}</div>
                  
                  {/* Price Range */}
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-[#5B9BD5]" />
                    <span className="font-medium text-white">Price Range: {recommendation.priceRange}</span>
                  </div>

                  {/* Recommended Models */}
                  {recommendation.recommendedModels.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-white">Recommended Models:</h4>
                      <ul className="list-disc list-inside text-sm text-white space-y-1">
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
                            className="px-3 py-1 bg-[#5B9BD5] text-white border border-[#5B9BD5] rounded-full text-sm font-medium"
                          >
                            {feature.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Search Links */}
              <Card className="mb-4 bg-[#091020] border-[#1a202c]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MapPin className="h-5 w-5 text-[#5B9BD5]" />
                    Find Your RV Real Search Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white mb-4">
                    These links will take you to actual RV listings based on your requirements:
                  </p>
                  <div className="grid gap-3">
                    <a
                      href="https://www.rvt.com/buy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-[#1a202c] rounded-lg hover:bg-[#1a202c]/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-white">RVs for Sale</div>
                        <div className="text-sm text-white/80">Browse current RV inventory</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#5B9BD5]" />
                    </a>
                    <a
                      href="https://www.rvtrader.com/rvs-for-sale"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-[#1a202c] rounded-lg hover:bg-[#1a202c]/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-white">RV Trader Search</div>
                        <div className="text-sm text-white/80">Large selection of RVs nationwide</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#5B9BD5]" />
                    </a>
                    <a
                      href="https://www.rvinsider.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-[#1a202c] rounded-lg hover:bg-[#1a202c]/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-white">RV Reviews</div>
                        <div className="text-sm text-white/80">Professional RV reviews and insights</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#5B9BD5]" />
                    </a>
                    <a
                      href="https://www.rvinsider.com/Dealerships"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-[#1a202c] rounded-lg hover:bg-[#1a202c]/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-white">Dealership Reviews</div>
                        <div className="text-sm text-white/80">Research RV dealership reviews</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#5B9BD5]" />
                    </a>
                    <a
                      href="https://www.rvt.com/dealersearch.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-[#1a202c] rounded-lg hover:bg-[#1a202c]/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-white">Find RV Dealers</div>
                        <div className="text-sm text-white/80">Locate authorized RV dealers near you</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#5B9BD5]" />
                    </a>
                    <a
                      href="https://www.rvt.com/price-checker/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-[#1a202c] rounded-lg hover:bg-[#1a202c]/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-white">RV Price Checker</div>
                        <div className="text-sm text-white/80">Check current RV market values</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#5B9BD5]" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Educational Content */}
              <Card className="mb-4 bg-[#091020] border-[#1a202c]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Info className="h-5 w-5 text-[#5B9BD5]" />
                    Learn About Your Recommended RV Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-white leading-relaxed whitespace-pre-line">{recommendation.educationalContent}</div>
                </CardContent>
              </Card>

              {/* Budget Considerations */}
              <Card className="bg-[#091020] border-[#1a202c]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <DollarSign className="h-5 w-5 text-[#5B9BD5]" />
                    Budget Cost Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-white leading-relaxed whitespace-pre-line">{recommendation.budgetConsiderations}</div>
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
};

export default IntelligentRVFinder;