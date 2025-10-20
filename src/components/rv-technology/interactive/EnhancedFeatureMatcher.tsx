import React, { useState } from 'react';
import { Search, Wand2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FeatureMatcherTextParser } from './FeatureMatcherTextParser';

interface MatchedFeature {
  id: string;
  name: string;
  education: string;
  relevanceScore: number;
  matchedKeywords: string[];
}

interface FeatureAnalysis {
  keywords: string[];
  primary_usage: string;
  technology_categories: string[];
}

export const EnhancedFeatureMatcher = () => {
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<FeatureAnalysis | null>(null);
  const [matchedFeatures, setMatchedFeatures] = useState<MatchedFeature[]>([]);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');

  const handleAnalyzeDescription = async () => {
    if (!description.trim()) return;

    setIsAnalyzing(true);
    setError('');

    try {
      const { data, error } = await supabase.functions.invoke('enhanced-feature-matcher', {
        body: { userDescription: description.trim() }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      setMatchedFeatures(data.matchedFeatures);
      setExplanation(data.explanation);

    } catch (error) {
      console.error('Feature matching error:', error);
      setError('Feature matching is temporarily unavailable. Please browse our manual feature categories or consult with RV professionals for guidance.');
    } finally {
      setIsAnalyzing(false);
    }
  };


  return (
    <Card className="w-full max-w-4xl mx-auto bg-connectivity-darkBg border-gray-700">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-connectivity-accent" />
          <CardTitle className="text-white">AI Enhanced Feature Matcher</CardTitle>
        </div>
        <CardDescription className="text-white/90">
          Describe your RV usage plans and get educational information about relevant technology features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="border-connectivity-accent bg-connectivity-accent/10">
          <AlertCircle className="h-4 w-4 text-connectivity-accent" />
          <AlertDescription className="text-connectivity-lightText">
            This tool provides educational information about technology features. It does not make recommendations or purchasing advice.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">
              Describe your planned RV usage and lifestyle:
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: I plan to work remotely from my RV while traveling to national parks. I'll need reliable internet and power for my laptop and equipment. We'll be staying in both campgrounds and boondocking..."
              className="min-h-24 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              disabled={isAnalyzing}
            />
          </div>

          <Button
            onClick={handleAnalyzeDescription}
            disabled={!description.trim() || isAnalyzing}
            className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Analyzing Description...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analyze & Match Features
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert className="border-red-500 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {analysis && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Usage Analysis:</h3>
              <FeatureMatcherTextParser text={analysis.primary_usage} className="text-white/90" />
              
              {analysis.keywords.length > 0 && (
                <div>
                  <p className="text-sm text-white/80 mb-2">Identified keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.map((keyword, index) => (
                      <Badge 
                        key={index} 
                        className="bg-blue-500/20 text-blue-300 border border-blue-400/50 px-3 py-1"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {explanation && (
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Educational Insights:</h3>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <FeatureMatcherTextParser text={explanation} className="text-white/90" />
            </div>
              </div>
            )}

            {matchedFeatures.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Relevant Technology Features to Learn About:</h3>
                <div className="grid gap-4">
                  {matchedFeatures.map((feature) => (
                    <Card key={feature.id} className="bg-gray-800 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{feature.name}</h4>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            {Math.round(feature.relevanceScore * 100)}% match
                          </Badge>
                        </div>
                        <p className="text-white/90 text-sm mb-2 leading-relaxed">{feature.education}</p>
                        {feature.matchedKeywords.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {feature.matchedKeywords.map((keyword, index) => (
                              <Badge 
                                key={index} 
                                className="bg-gray-700 text-white/90 border border-gray-600 text-xs px-2 py-0.5"
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gray-800 border-[#5B9BD5] mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-white font-semibold text-lg mb-3">
                      Next Steps: Research Your Options
                    </h3>
                    <p className="text-white/90 mb-4 text-sm">
                      Based on your technology needs, explore these resources to find RVs with matching features.
                    </p>
                    <div className="grid gap-3">
                      <ExternalLinkButton 
                        href="https://www.rvt.com/buy/"
                        variant="default"
                        className="w-full"
                      >
                        Browse RVs with Similar Features
                      </ExternalLinkButton>
                      
                      <div className="grid md:grid-cols-3 gap-3">
                        <ExternalLinkButton 
                          href="https://www.rvinsider.com/"
                          variant="outline"
                        >
                          Read Expert Reviews
                        </ExternalLinkButton>
                        
                        <ExternalLinkButton 
                          href="https://www.rvt.com/price-checker/"
                          variant="outline"
                        >
                          Check Market Prices
                        </ExternalLinkButton>
                        
                        <ExternalLinkButton 
                          href="https://www.rvt.com/dealersearch.php"
                          variant="outline"
                        >
                          Find Local Dealers
                        </ExternalLinkButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <Alert className="border-yellow-500 bg-yellow-500/10">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-yellow-200">
                <strong>Educational Disclaimer:</strong> This feature matching is for educational purposes only. 
                Technology needs vary by individual requirements and RV specifications. Please consult with RV professionals 
                for specific advice regarding your situation.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};