import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

interface LifestyleAnalysis {
  primaryUsage: string;
  keyTechnologyNeeds: string[];
  recommendedSystems: {
    category: string;
    recommendations: string[];
    reasoning: string;
    searchUrls?: {
      buyUrl: string;
      reviewsUrl: string;
      dealersUrl: string;
    };
  }[];
  educationalGuidance: string;
  budgetConsiderations: string;
  nextSteps: string[];
  searchUrls: {
    buyUrl: string;
    reviewsUrl: string;
    dealersUrl: string;
    priceCheckerUrl: string;
  };
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

    const { requirements }: { requirements: LifestyleRequirements } = await req.json();
    
    console.log('Processing lifestyle analysis request:', requirements);

    // Create comprehensive prompt for LLM analysis
    const systemPrompt = `You are an expert RV technology consultant with decades of experience helping people understand what technology features they need for their specific RV lifestyle. Your role is educational and informational - you help people understand technology categories and what questions to ask dealers.

    Focus on:
    - Educational guidance about technology categories
    - Explaining what different systems do and why they matter
    - Helping users understand what questions to ask dealers
    - Providing budget considerations and realistic expectations
    - Suggesting next steps for learning more

    Always emphasize that users should consult with RV dealers and professionals for specific product recommendations and installations.`;

    const userPrompt = `Please analyze these RV lifestyle requirements and provide educational guidance about technology needs:

    RV Usage: ${requirements.rvUsage}
    Travel Frequency: ${requirements.travelFrequency}
    Destinations: ${requirements.destinations}
    Work Requirements: ${requirements.workRequirements || 'Not specified'}
    Group Size: ${requirements.groupSize || 'Not specified'}
    Comfort Level: ${requirements.comfortLevel || 'Not specified'}
    Technology Comfort: ${requirements.techComfort || 'Not specified'}
    Specific Needs: ${requirements.specificNeeds || 'None specified'}

    Please provide a comprehensive analysis formatted as JSON with this structure:
    {
      "primaryUsage": "Summary of their lifestyle and how it impacts technology needs",
      "keyTechnologyNeeds": ["Category 1", "Category 2", "Category 3"],
      "recommendedSystems": [
        {
          "category": "System Category Name",
          "recommendations": ["Specific feature 1", "Specific feature 2"],
          "reasoning": "Educational explanation of why this category matters for their lifestyle",
          "searchUrls": {
            "buyUrl": "https://www.rvt.com/buy/",
            "reviewsUrl": "https://www.rvinsider.com/",
            "dealersUrl": "https://www.rvt.com/dealersearch.php"
          }
        }
      ],
      "educationalGuidance": "Educational information about these technology categories and what to learn about",
      "budgetConsiderations": "Realistic budget guidance and cost considerations",
      "nextSteps": ["Step 1", "Step 2", "Step 3"],
      "searchUrls": {
        "buyUrl": "https://www.rvt.com/buy/",
        "reviewsUrl": "https://www.rvinsider.com/",
        "dealersUrl": "https://www.rvt.com/dealersearch.php",
        "priceCheckerUrl": "https://www.rvt.com/price-checker/"
      }
    }

    Keep the tone educational and helpful. Focus on teaching about technology categories rather than specific brands or products.`;

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
          { role: 'system', content: systemPrompt },
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
    let analysis: LifestyleAnalysis;
    try {
      analysis = JSON.parse(aiResponse);
      
      // Ensure searchUrls are present for each system and main response
      if (Array.isArray(analysis.recommendedSystems)) {
        analysis.recommendedSystems = analysis.recommendedSystems.map(system => ({
          ...system,
          searchUrls: system.searchUrls || {
            buyUrl: 'https://www.rvt.com/buy/',
            reviewsUrl: 'https://www.rvinsider.com/',
            dealersUrl: 'https://www.rvt.com/dealersearch.php'
          }
        }));
      }

      // Ensure main searchUrls are present
      if (!analysis.searchUrls) {
        analysis.searchUrls = {
          buyUrl: 'https://www.rvt.com/buy/',
          reviewsUrl: 'https://www.rvinsider.com/',
          dealersUrl: 'https://www.rvt.com/dealersearch.php',
          priceCheckerUrl: 'https://www.rvt.com/price-checker/'
        };
      }
      
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback response if JSON parsing fails
      analysis = {
        primaryUsage: "Based on your requirements, I can provide some general guidance about RV technology categories that might be relevant to your lifestyle.",
        keyTechnologyNeeds: ["Power Management", "Connectivity", "Climate Control"],
        recommendedSystems: [
          {
            category: "Power Systems",
            recommendations: ["Solar panels for off grid capability", "Lithium batteries for extended power", "Inverter systems for AC power"],
            reasoning: "Understanding power management is essential for any RV lifestyle. Learn about different battery types, charging methods, and power consumption.",
            searchUrls: {
              buyUrl: 'https://www.rvt.com/buy/',
              reviewsUrl: 'https://www.rvinsider.com/',
              dealersUrl: 'https://www.rvt.com/dealersearch.php'
            }
          },
          {
            category: "Connectivity",
            recommendations: ["Cellular signal boosters", "WiFi systems", "Satellite internet preparation"],
            reasoning: "Modern RVing often requires staying connected. Learn about different internet options and what works best in various locations.",
            searchUrls: {
              buyUrl: 'https://www.rvt.com/buy/',
              reviewsUrl: 'https://www.rvinsider.com/',
              dealersUrl: 'https://www.rvt.com/dealersearch.php'
            }
          }
        ],
        educationalGuidance: "I recommend learning about the major RV technology categories: power management, connectivity, climate control, and monitoring systems. Each category has different options depending on your specific needs and budget.",
        budgetConsiderations: "RV technology can range from basic to very advanced. Start by understanding what features are essential for your lifestyle versus nice to have extras.",
        nextSteps: ["Visit RV dealers to see technology demonstrations", "Ask specific questions about each system", "Research user reviews and experiences", "Consider starting with basic systems and upgrading later"],
        searchUrls: {
          buyUrl: 'https://www.rvt.com/buy/',
          reviewsUrl: 'https://www.rvinsider.com/',
          dealersUrl: 'https://www.rvt.com/dealersearch.php',
          priceCheckerUrl: 'https://www.rvt.com/price-checker/'
        }
      };
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in lifestyle-tech-analyzer function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to analyze lifestyle requirements',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});