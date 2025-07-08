import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, TrendingUp, User, Settings } from 'lucide-react';

interface UserPreferences {
  rvType: string;
  interests: string[];
  location: string;
  budget: string;
  seasonalNeeds: string[];
}

interface PersonalizedRecommendation {
  id: string;
  title: string;
  reason: string;
  products: any[];
  priority: 'high' | 'medium' | 'low';
  category: string;
}

const PersonalizationEngine = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    rvType: '',
    interests: [],
    location: '',
    budget: '',
    seasonalNeeds: []
  });

  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    // Load user preferences
    const savedPreferences = localStorage.getItem('user_preferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setPreferences(prefs);
      setIsSetupComplete(true);
      generateRecommendations(prefs);
    }
  }, []);

  const generateRecommendations = (prefs: UserPreferences) => {
    const recs: PersonalizedRecommendation[] = [];

    // Location-based recommendations
    if (prefs.location) {
      recs.push({
        id: 'location_based',
        title: `Perfect for ${prefs.location} RVing`,
        reason: `Based on your location in ${prefs.location}`,
        products: getLocationBasedProducts(prefs.location),
        priority: 'high',
        category: 'location'
      });
    }

    // Seasonal recommendations
    const currentSeason = getCurrentSeason();
    recs.push({
      id: 'seasonal',
      title: `${currentSeason} Essentials`,
      reason: `Get ready for ${currentSeason.toLowerCase()} adventures`,
      products: getSeasonalProducts(currentSeason),
      priority: 'high',
      category: 'seasonal'
    });

    // Interest-based recommendations
    prefs.interests.forEach(interest => {
      recs.push({
        id: `interest_${interest}`,
        title: `${interest} Gear & Apps`,
        reason: `Because you're interested in ${interest.toLowerCase()}`,
        products: getInterestBasedProducts(interest),
        priority: 'medium',
        category: 'interest'
      });
    });

    // Budget-conscious recommendations
    if (prefs.budget === 'budget') {
      recs.push({
        id: 'budget_friendly',
        title: 'Best Value Picks',
        reason: 'Great deals that won\'t break the bank',
        products: getBudgetFriendlyProducts(),
        priority: 'medium',
        category: 'budget'
      });
    }

    setRecommendations(recs);
  };

  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    localStorage.setItem('user_preferences', JSON.stringify(updated));
    generateRecommendations(updated);
  };

  if (!isSetupComplete) {
    return <PersonalizationSetup onComplete={updatePreferences} />;
  }

  return (
    <div className="space-y-6">
      {/* Personalization Header */}
      <Card className="bg-gradient-to-r from-[#5B9BD5]/10 to-[#4B8FE3]/10 border-[#5B9BD5]/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-[#5B9BD5]" />
              <div>
                <h2 className="text-white font-semibold">Your Personal RV Hub</h2>
                <p className="text-gray-300 text-sm">
                  Curated just for your {preferences.rvType} adventures
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSetupComplete(false)}
              className="text-[#5B9BD5] hover:bg-[#5B9BD5]/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      {recommendations.map((rec) => (
        <RecommendationCard key={rec.id} recommendation={rec} />
      ))}

      {/* Activity Insights */}
      <ActivityInsights preferences={preferences} />
    </div>
  );
};

const PersonalizationSetup = ({ 
  onComplete 
}: { 
  onComplete: (prefs: UserPreferences) => void 
}) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<UserPreferences>({
    rvType: '',
    interests: [],
    location: '',
    budget: '',
    seasonalNeeds: []
  });

  const steps = [
    {
      title: 'What type of RV do you have?',
      key: 'rvType',
      options: ['Class A Motorhome', 'Class B Van', 'Class C Motorhome', 'Travel Trailer', 'Fifth Wheel', 'Truck Camper']
    },
    {
      title: 'What are your main interests?',
      key: 'interests',
      options: ['Boondocking', 'Full-time Living', 'Weekend Camping', 'Tech & Gadgets', 'Solar Power', 'Connectivity'],
      multiple: true
    },
    {
      title: 'What\'s your primary location?',
      key: 'location',
      options: ['West Coast', 'East Coast', 'Southwest', 'Southeast', 'Midwest', 'Pacific Northwest', 'Canada']
    },
    {
      title: 'What\'s your budget preference?',
      key: 'budget',
      options: ['Budget-conscious', 'Mid-range', 'Premium', 'No preference']
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleOptionSelect = (key: string, value: string, multiple = false) => {
    if (multiple) {
      const current = formData[key as keyof UserPreferences] as string[];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      setFormData({ ...formData, [key]: updated });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const currentStep = steps[step];
  const isStepComplete = currentStep.multiple 
    ? (formData[currentStep.key as keyof UserPreferences] as string[]).length > 0
    : formData[currentStep.key as keyof UserPreferences] !== '';

  return (
    <Card className="bg-[#091020] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-center">
          Personalize Your Experience
        </CardTitle>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-[#5B9BD5] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-white text-lg mb-6 text-center">
          {currentStep.title}
        </h3>
        
        <div className="grid grid-cols-1 gap-3 mb-8">
          {currentStep.options.map((option) => {
            const isSelected = currentStep.multiple
              ? (formData[currentStep.key as keyof UserPreferences] as string[]).includes(option)
              : formData[currentStep.key as keyof UserPreferences] === option;

            return (
              <Button
                key={option}
                variant={isSelected ? "default" : "outline"}
                onClick={() => handleOptionSelect(currentStep.key, option, currentStep.multiple)}
                className={`p-4 h-auto text-left justify-start ${
                  isSelected 
                    ? 'bg-[#5B9BD5] border-[#5B9BD5] text-white' 
                    : 'border-gray-600 text-gray-300 hover:border-[#5B9BD5]'
                }`}
              >
                {option}
              </Button>
            );
          })}
        </div>

        <Button
          onClick={handleNext}
          disabled={!isStepComplete}
          className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
        >
          {step < steps.length - 1 ? 'Next' : 'Complete Setup'}
        </Button>
      </CardContent>
    </Card>
  );
};

const RecommendationCard = ({ 
  recommendation 
}: { 
  recommendation: PersonalizedRecommendation 
}) => (
  <Card className="bg-[#091020] border-gray-700">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-white text-lg">{recommendation.title}</CardTitle>
          <p className="text-gray-400 text-sm">{recommendation.reason}</p>
        </div>
        <Badge 
          variant={recommendation.priority === 'high' ? 'default' : 'secondary'}
          className={recommendation.priority === 'high' ? 'bg-[#5B9BD5]' : 'bg-gray-600'}
        >
          {recommendation.priority}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-3">
        {recommendation.products.slice(0, 4).map((product, index) => (
          <div key={index} className="bg-[#131a2a] rounded-lg p-3">
            <h4 className="text-white text-sm font-medium mb-1 line-clamp-2">
              {product.title}
            </h4>
            <p className="text-[#5B9BD5] text-sm font-bold">{product.price}</p>
          </div>
        ))}
      </div>
      <Button 
        className="w-full mt-4 bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
      >
        View All {recommendation.products.length} Items
      </Button>
    </CardContent>
  </Card>
);

const ActivityInsights = ({ preferences }: { preferences: UserPreferences }) => (
  <Card className="bg-[#091020] border-gray-700">
    <CardHeader>
      <CardTitle className="text-white flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-[#5B9BD5]" />
        Your RV Journey
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#5B9BD5]">47</div>
          <div className="text-gray-400 text-sm">Products Viewed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">$2,340</div>
          <div className="text-gray-400 text-sm">Money Saved</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">12</div>
          <div className="text-gray-400 text-sm">Deals Found</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">8</div>
          <div className="text-gray-400 text-sm">Reviews Left</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Helper functions
function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Fall';
  return 'Winter';
}

function getLocationBasedProducts(location: string) {
  // Mock data based on location
  return [
    { title: 'Regional Campground Guide', price: '$29.99' },
    { title: 'Local Cell Booster', price: '$199.99' }
  ];
}

function getSeasonalProducts(season: string) {
  const products: Record<string, any[]> = {
    Spring: [
      { title: 'Spring Maintenance Kit', price: '$89.99' },
      { title: 'RV Inspection Checklist App', price: '$4.99' }
    ],
    Summer: [
      { title: 'Portable AC Unit', price: '$299.99' },
      { title: 'Solar Panel Kit', price: '$599.99' }
    ],
    Fall: [
      { title: 'Winterization Kit', price: '$149.99' },
      { title: 'Weather Monitoring System', price: '$199.99' }
    ],
    Winter: [
      { title: 'Heated Water Hose', price: '$79.99' },
      { title: 'Snow Removal Kit', price: '$129.99' }
    ]
  };
  return products[season] || [];
}

function getInterestBasedProducts(interest: string) {
  // Mock interest-based products
  return [
    { title: `${interest} Essentials`, price: '$99.99' },
    { title: `Pro ${interest} Kit`, price: '$299.99' }
  ];
}

function getBudgetFriendlyProducts() {
  return [
    { title: 'Basic Tool Kit', price: '$39.99' },
    { title: 'Essential Apps Bundle', price: '$19.99' }
  ];
}

export default PersonalizationEngine;