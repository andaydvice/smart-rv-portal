import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChecklistItem {
  category: string;
  item: string;
  priority: 'essential' | 'important' | 'nice-to-have';
  questions: string[];
}

interface AIChecklistResult {
  checklistItems: ChecklistItem[];
  summary: string;
  budgetConsiderations: string;
  dealerQuestions: string[];
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

    const { userRequirements } = await req.json();
    
    console.log('Processing AI technology checklist generation:', userRequirements);

    const systemPrompt = `You are an expert RV technology consultant who creates HIGHLY PERSONALIZED research checklists for RV buyers.

CRITICAL PERSONALIZATION RULES:
1. Extract and respond to EVERY specific technology item the user mentions (e.g., "400W solar" → ask detailed questions about 400W+ solar systems)
2. Match their regional context (Australian English for Australia, recommend Telstra for Australian remote areas, etc.)
3. Only include technology categories the user mentioned or clearly needs based on their travel style
4. If they mention remote work → connectivity is ESSENTIAL, not just important
5. If they mention pets → include climate monitoring and remote control as ESSENTIAL
6. If they mention specific destinations (e.g., Cape York, Great Ocean Road) → tailor recommendations to those regions
7. Prioritize based on their stated needs, not generic assumptions

PERSONALIZATION QUALITY CHECKS:
- Does every item user mentioned appear in the checklist with specific follow-up questions?
- Are recommendations valid for their geographic location?
- Would a dealer recognize this person from reading this checklist?
- Are all questions actionable and specific to their stated needs?

Always emphasize that this is for research and education purposes. Return ONLY valid JSON, no markdown formatting.`;

    const userPrompt = `Analyze these user requirements and create a PERSONALIZED checklist:

"${userRequirements}"

EXTRACTION REQUIREMENTS:
1. Travel Destinations: Extract specific regions/routes mentioned
2. Travel Style: Identify camping preferences and duration
3. Work Requirements: Note if remote work or business connectivity needed
4. Special Needs: Capture pets, accessibility, family size
5. Explicitly Mentioned Tech: List every specific technology they mentioned
6. Geographic Context: Identify country and terrain type
7. Budget Indicators: Extract or infer budget level

PERSONALIZATION RULES:
- If user mentions specific tech (e.g., "400W solar"), include detailed questions about THAT specific technology
- If remote travel mentioned, prioritize offline capabilities
- If work requirements mentioned, elevate connectivity to ESSENTIAL
- If pets mentioned, include pet-specific climate and monitoring
- Match spelling/terminology to user's region
- Exclude generic categories user didn't mention or need
- Provide specific examples and model numbers where user gave precise requirements

Return ONLY valid JSON (no markdown code blocks):
{
  "checklistItems": [
    {
      "category": "Category from user's ACTUAL needs",
      "item": "Specific system they mentioned or clearly need",
      "priority": "essential|important|nice-to-have (based on THEIR use case)",
      "questions": ["Specific to their mentioned requirements", "Reference their stated specs", "Relevant to their destinations"]
    }
  ],
  "summary": "Reference their specific destinations, travel style, and mentioned needs",
  "budgetConsiderations": "Actual dollar ranges for their region and mentioned technology",
  "dealerQuestions": ["Related to their stated priorities", "Not generic", "Actionable for their use case"],
  "searchUrls": {
    "buyUrl": "https://www.rvt.com/buy/",
    "reviewsUrl": "https://www.rvinsider.com/",
    "dealersUrl": "https://www.rvt.com/dealersearch.php",
    "priceCheckerUrl": "https://www.rvt.com/price-checker/"
  }
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
    
    console.log('AI Checklist Response received:', aiResponse);

    let checklist: AIChecklistResult;
    try {
      // Strip markdown code blocks if present
      let cleanedResponse = aiResponse.trim();
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      checklist = JSON.parse(cleanedResponse);
      // Ensure searchUrls are present
      if (!checklist.searchUrls) {
        checklist.searchUrls = {
          buyUrl: 'https://www.rvt.com/buy/',
          reviewsUrl: 'https://www.rvinsider.com/',
          dealersUrl: 'https://www.rvt.com/dealersearch.php',
          priceCheckerUrl: 'https://www.rvt.com/price-checker/'
        };
      }
      
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback response
      checklist = {
        checklistItems: [
          {
            category: "Power Management",
            item: "Battery system and charging capabilities",
            priority: "essential",
            questions: [
              "What type of batteries are included (lithium vs lead-acid)?",
              "What is the total amp-hour capacity?",
              "Is the system expandable for additional batteries?",
              "What charging methods are available (shore power, solar, generator)?"
            ]
          },
          {
            category: "Connectivity",
            item: "Internet and communication systems",
            priority: "important",
            questions: [
              "What internet connectivity options are available?",
              "Is there cellular signal boosting capability?",
              "Are there provisions for external antennas?",
              "How many devices can connect simultaneously?"
            ]
          },
          {
            category: "Monitoring & Control",
            item: "System monitoring and automation",
            priority: "important",
            questions: [
              "What systems can be monitored remotely?",
              "Is there a smartphone app for system control?",
              "What alerts and notifications are available?",
              "Are there manual backup controls for all automated systems?"
            ]
          }
        ],
        summary: "A basic technology research checklist focusing on essential systems for modern RV living.",
        budgetConsiderations: "Budget for mid-range technology packages. Prioritize proven, reliable systems over cutting-edge features.",
        dealerQuestions: [
          "What ongoing support is available for the technology systems?",
          "Are there firmware updates and how are they handled?",
          "What warranty coverage applies to technology components?",
          "Can you demonstrate all the technology features?",
          "Are there additional training resources available?"
        ],
        searchUrls: {
          buyUrl: 'https://www.rvt.com/buy/',
          reviewsUrl: 'https://www.rvinsider.com/',
          dealersUrl: 'https://www.rvt.com/dealersearch.php',
          priceCheckerUrl: 'https://www.rvt.com/price-checker/'
        }
      };
    }

    return new Response(JSON.stringify({ checklist }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-technology-checklist function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate technology checklist',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});