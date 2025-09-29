import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { requirements }: { requirements: UserRequirements } = await req.json();
    
    console.log('Processing RV finder request:', requirements);

    // Create comprehensive prompt for LLM analysis
    const systemPrompt = `You are an expert RV consultant with decades of experience helping people find the perfect RV. Analyze the user's requirements and provide detailed, practical recommendations.

    Consider:
    - RV types (Class A, B, C, Travel Trailers, Fifth Wheels)
    - Size and weight considerations
    - Technology requirements and compatibility
    - Budget realities including hidden costs
    - Learning curve for different RV types
    - Maintenance and reliability factors

    Provide actionable advice with specific model recommendations and realistic expectations.`;

    const userPrompt = `Please analyze these RV requirements and provide comprehensive recommendations:

    Travel Style: ${requirements.travelStyle}
    Experience Level: ${requirements.experienceLevel}
    Budget: ${requirements.budget}
    Group Size: ${requirements.groupSize}
    Must-Have Features: ${requirements.mustHaveFeatures.join(', ')}
    Travel Duration: ${requirements.travelDuration}
    Comfort Level: ${requirements.comfortLevel}
    Additional Requirements: ${requirements.additionalRequirements}

    Please provide:
    1. Best RV type(s) for their needs with detailed reasoning
    2. Realistic price range including total cost of ownership
    3. Specific model recommendations (3-5 models)
    4. Technology features that match their requirements
    5. Educational content about their recommended RV type
    6. Budget considerations and hidden costs
    7. Search parameters for finding these RVs online

    Format your response as JSON matching this structure:
    {
      "rvType": "Primary recommended RV type",
      "reasoning": "Detailed explanation of why this type suits their needs",
      "priceRange": "Realistic price range with reasoning",
      "recommendedModels": ["Model 1", "Model 2", "Model 3"],
      "technologyFeatures": ["Feature 1", "Feature 2", "Feature 3"],
      "educationalContent": "Educational information about this RV type",
      "budgetConsiderations": "Important budget and cost considerations"
    }`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert RV consultant. Based on user requirements, recommend the best RV type and provide specific advice. 

Your response must be valid JSON with this exact structure:
{
  "rvType": "string",
  "reasoning": "detailed explanation",
  "priceRange": "estimated price range",
  "recommendedModels": ["model1", "model2"],
  "technologyFeatures": ["feature1", "feature2"],
  "searchUrls": {
        "buyUrl": "https://www.rvt.com/buy/",
        "reviewsUrl": "https://www.rvinsider.com/",
    "dealersUrl": "https://www.rvt.com/dealersearch.php",
    "priceCheckerUrl": "https://www.rvt.com/price-checker/"
  },
  "educationalContent": "helpful tips and considerations",
  "budgetConsiderations": "budget-related guidance"
}

For searchUrls, generate specific, contextual URLs:
- buyUrl: Create filtered search on rvtrader.com based on RV type, price range, and features
- reviewsUrl: Link to specific RV type reviews on rvinsider.com

Focus on practical recommendations based on the user's specific needs, experience level, and budget.` 
          },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiResponse = aiData.choices[0].message.content;
    
    console.log('AI Response received:', aiResponse);

    // Parse AI response
    let recommendation: RVRecommendation;
    try {
      const parsed = JSON.parse(aiResponse);
      
      // Clean up the response - remove hyphens and improve readability
      const cleanText = (text: string): string => {
        return text
          .replace(/-/g, ' ') // Remove all hyphens
          .replace(/\. /g, '.\n\n') // Add paragraph breaks after sentences
          .trim();
      };
      
      recommendation = {
        ...parsed,
        reasoning: cleanText(parsed.reasoning || ''),
        priceRange: cleanText(parsed.priceRange || ''),
        educationalContent: cleanText(parsed.educationalContent || ''),
        budgetConsiderations: cleanText(parsed.budgetConsiderations || ''),
        recommendedModels: parsed.recommendedModels?.map((model: string) => cleanText(model)) || [],
        technologyFeatures: parsed.technologyFeatures?.map((feature: string) => cleanText(feature)) || []
      };
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      
      // Clean up the raw response text for fallback
      const cleanedResponse = aiResponse
        .replace(/-/g, ' ') // Remove all hyphens
        .replace(/\. /g, '.\n\n'); // Add paragraph breaks after sentences
      
      // Fallback response if JSON parsing fails
      recommendation = {
        rvType: "Class C Motorhome",
        reasoning: cleanedResponse,
        priceRange: "Analysis provided in reasoning section",
        recommendedModels: ["Please see detailed analysis"],
        technologyFeatures: requirements.mustHaveFeatures.map(feature => feature.replace(/-/g, ' ')),
        searchUrls: {
          buyUrl: "https://www.rvt.com/buy/",
          reviewsUrl: "https://www.rvinsider.com/",
          dealersUrl: "https://www.rvt.com/dealersearch.php",
          priceCheckerUrl: "https://www.rvt.com/price-checker/"
        },
        educationalContent: "Detailed analysis provided in the reasoning section.",
        budgetConsiderations: "Budget considerations included in the analysis."
      };
    }

    return new Response(JSON.stringify({ recommendation }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in rv-finder-with-llm function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process RV recommendations',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});


function parseBudgetRange(budget: string): { min: number, max: number } {
  // Parse budget string and return reasonable ranges
  const budgetLower = budget.toLowerCase();
  
  if (budgetLower.includes('under') || budgetLower.includes('50')) {
    return { min: 10000, max: 50000 };
  } else if (budgetLower.includes('50') && budgetLower.includes('100')) {
    return { min: 50000, max: 100000 };
  } else if (budgetLower.includes('100') && budgetLower.includes('200')) {
    return { min: 100000, max: 200000 };
  } else if (budgetLower.includes('200')) {
    return { min: 200000, max: 500000 };
  } else {
    return { min: 20000, max: 150000 }; // Default range
  }
}