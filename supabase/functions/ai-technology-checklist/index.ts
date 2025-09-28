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

    const systemPrompt = `You are an expert RV technology consultant who creates personalized research checklists for RV buyers.

Based on the user's described RV plans and technology needs, create a comprehensive checklist of technology features they should research and questions they should ask dealers.

Focus on:
- Identifying relevant technology categories based on their needs
- Creating specific, actionable questions for each technology area
- Prioritizing features as essential, important, or nice-to-have
- Providing realistic budget guidance
- Suggesting general dealer questions

Always emphasize that this is for research and education purposes.`;

    const userPrompt = `Please create a personalized RV technology research checklist based on these requirements:

"${userRequirements}"

Please provide a comprehensive checklist formatted as JSON with this structure:
{
  "checklistItems": [
    {
      "category": "Technology Category Name",
      "item": "Specific technology feature or system",
      "priority": "essential|important|nice-to-have",
      "questions": ["Question 1", "Question 2", "Question 3"]
    }
  ],
  "summary": "Brief summary of their needs and this checklist's focus",
  "budgetConsiderations": "Realistic budget guidance for their technology needs",
  "dealerQuestions": ["General question 1", "General question 2", "General question 3"],
  "searchUrls": {
    "buyUrl": "generate specific RV search URL based on checklist priorities",
    "reviewsUrl": "generate reviews URL for high-priority features",
    "dealersUrl": "https://www.rvt.com/dealersearch.php",
    "priceCheckerUrl": "https://www.rvt.com/price-checker/"
  }
}

Guidelines:
- Include 5-8 relevant technology categories based on their needs
- Essential items are critical for their stated use case
- Important items would significantly improve their experience
- Nice-to-have items are convenient but not necessary
- Questions should be specific and actionable
- Budget guidance should be realistic and helpful
- General dealer questions should apply to any RV purchase`;

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
      checklist = JSON.parse(aiResponse);
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