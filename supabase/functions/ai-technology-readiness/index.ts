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

Focus specifically on their stated interests and needs. If they mention audio, focus on audio systems. If they mention connectivity, focus on internet options. Tailor your response to their specific request.

Please provide a comprehensive assessment formatted as JSON with this structure:
{
  "readinessLevel": "beginner|intermediate|advanced",
  "title": "Descriptive title for their readiness level",
  "description": "Brief description of their technology readiness and what it means for RV selection",
  "recommendedFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "budgetGuidance": "Realistic budget considerations for their readiness level",
  "nextSteps": ["Step 1", "Step 2", "Step 3"],
  "searchUrls": {
    "buyUrl": "https://www.rvt.com/buy/",
    "reviewsUrl": "https://www.rvinsider.com/",
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
      // Clean the response to handle markdown code blocks
      let cleanedResponse = aiResponse.trim();
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      const parsed = JSON.parse(cleanedResponse);
      
      // Clean up the response - remove hyphens and improve readability
      const cleanText = (text: string): string => {
        return text
          .replace(/-/g, ' ') // Remove all hyphens
          .replace(/\. /g, '.\n\n') // Add paragraph breaks after sentences
          .trim();
      };
      
      assessment = {
        ...parsed,
        description: cleanText(parsed.description || ''),
        budgetGuidance: cleanText(parsed.budgetGuidance || ''),
        recommendedFeatures: parsed.recommendedFeatures?.map((feature: string) => cleanText(feature)) || [],
        nextSteps: parsed.nextSteps?.map((step: string) => cleanText(step)) || []
      };
      
      // Ensure searchUrls are present with exact URLs
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
      console.error('Raw AI response:', aiResponse);
      
      // Create a contextual fallback based on user input
      const isAudioRelated = userDescription.toLowerCase().includes('audio') || 
                           userDescription.toLowerCase().includes('sound') || 
                           userDescription.toLowerCase().includes('music');
      
      if (isAudioRelated) {
        assessment = {
          readinessLevel: 'beginner',
          title: "Audio System Seeker",
          description: "You're looking for quality audio systems in your RV.\n\nThis suggests you value entertainment and sound quality for your travels.",
          recommendedFeatures: [
            "High quality RV audio system with Bluetooth connectivity",
            "Multiple speaker zones for indoor and outdoor entertainment", 
            "Amplifier systems designed for RV environments",
            "Sound dampening materials for better acoustics"
          ],
          budgetGuidance: "Audio systems can range from $500 $3000 depending on quality and features.\n\nProfessional installation recommended.",
          nextSteps: [
            "Research RV specific audio equipment and brands",
            "Visit RV shows to hear different audio setups",
            "Consider outdoor speaker options for camping",
            "Plan wiring requirements during RV purchase or retrofit"
          ],
          searchUrls: {
            buyUrl: 'https://www.rvt.com/buy/',
            reviewsUrl: 'https://www.rvinsider.com/',
            dealersUrl: 'https://www.rvt.com/dealersearch.php',
            priceCheckerUrl: 'https://www.rvt.com/price-checker/'
          }
        };
      } else {
        assessment = {
          readinessLevel: 'intermediate',
          title: "Technology Interested RV Buyer", 
          description: "Based on your description, you're interested in RV technology to enhance your travel experience.",
          recommendedFeatures: [
            "User friendly technology with reliable performance",
            "Systems that match your stated interests and needs",
            "Professional installation and support options",
            "Technology that enhances rather than complicates your RV experience"
          ],
          budgetGuidance: "Budget for technology should align with your specific needs and comfort level with different systems.",
          nextSteps: [
            "Research the specific technology categories you mentioned",
            "Visit RV dealers to see demonstrations",
            "Read reviews from other RVers with similar interests",
            "Consider professional consultation for complex installations"
          ],
          searchUrls: {
            buyUrl: 'https://www.rvt.com/buy/',
            reviewsUrl: 'https://www.rvinsider.com/',
            dealersUrl: 'https://www.rvt.com/dealersearch.php',
            priceCheckerUrl: 'https://www.rvt.com/price-checker/'
          }
        };
      }
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