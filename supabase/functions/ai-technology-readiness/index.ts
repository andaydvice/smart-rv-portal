import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { userDescription } = await req.json();
    
    console.log('Processing AI technology readiness assessment:', userDescription);

    const systemPrompt = `You are an expert RV technology consultant who assesses people's technology readiness and provides educational guidance about RV technology categories.

Based on the user's description of their technology experience and RV needs, determine their technology readiness level and provide appropriate recommendations.

Focus on:
- Assessing their comfort level with technology (beginner, intermediate, advanced)
- Recommending appropriate RV technology categories
- Providing realistic budget guidance
- Suggesting next steps for learning more

Always emphasize that this is educational guidance and users should consult with RV professionals for specific recommendations.`;

    const userPrompt = `Please assess this person's RV technology readiness based on their description:

"${userDescription}"

Please provide a comprehensive assessment formatted as JSON with this structure:
{
  "readinessLevel": "beginner|intermediate|advanced",
  "title": "Descriptive title for their readiness level",
  "description": "Brief description of their technology readiness and what it means for RV selection",
  "recommendedFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "budgetGuidance": "Realistic budget considerations for their readiness level",
  "nextSteps": ["Step 1", "Step 2", "Step 3"],
  "searchUrls": {
    "buyUrl": "generate specific RV search URL based on readiness level",
    "reviewsUrl": "generate reviews URL for recommended features",
    "dealersUrl": "https://www.rvt.com/dealersearch.php",
    "priceCheckerUrl": "https://www.rvt.com/price-checker/"
  }
}

Guidelines:
- Beginner: Prefers simple, reliable systems with manual controls
- Intermediate: Comfortable with smart features but wants reliability
- Advanced: Wants cutting-edge technology and automation
- Keep recommendations educational and focused on categories, not specific brands
- Budget guidance should be realistic and helpful`;

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
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiResponse = aiData.choices[0].message.content;
    
    console.log('AI Assessment Response received:', aiResponse);

    let assessment: AIAssessmentResult;
    try {
      assessment = JSON.parse(aiResponse);
      // Ensure searchUrls are present
      if (!assessment.searchUrls) {
        assessment.searchUrls = {
          buyUrl: 'https://www.rvt.com/buy/',
          reviewsUrl: 'https://www.rvinsider.com/',
          dealersUrl: 'https://www.rvt.com/dealersearch.php',
          priceCheckerUrl: 'https://www.rvt.com/price-checker/'
        };
      }
      
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback response
      assessment = {
        readinessLevel: 'intermediate',
        title: "Technology-Aware RV Buyer",
        description: "Based on your description, you have a balanced approach to technology - you want useful features without unnecessary complexity.",
        recommendedFeatures: [
          "Reliable power management systems with digital monitoring",
          "Internet connectivity options for staying connected",
          "Basic automation for convenience with manual backup controls",
          "User-friendly interfaces and smartphone integration"
        ],
        budgetGuidance: "Expect to invest in mid-range technology packages. Focus on proven systems with good support rather than cutting-edge features.",
        nextSteps: [
          "Visit RV dealers to see technology demonstrations",
          "Ask about system reliability and support options",
          "Research user reviews for technology features you're considering",
          "Plan your technology budget as part of your overall RV purchase"
        ],
        searchUrls: {
          buyUrl: 'https://www.rvt.com/buy/',
          reviewsUrl: 'https://www.rvinsider.com/',
          dealersUrl: 'https://www.rvt.com/dealersearch.php',
          priceCheckerUrl: 'https://www.rvt.com/price-checker/'
        }
      };
    }

    return new Response(JSON.stringify({ assessment }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-technology-readiness function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process technology readiness assessment',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});