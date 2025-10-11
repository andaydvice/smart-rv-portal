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
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('Lovable API key not configured');
    }

    const { userRequirements } = await req.json();
    
    console.log('Processing AI technology checklist generation:', userRequirements);

    const systemPrompt = `You are an expert RV technology consultant who creates EXTREMELY PERSONALIZED, DETAILED research checklists.

CRITICAL RULES - YOU WILL FAIL IF YOU VIOLATE THESE:
1. CAPTURE EVERYTHING: Include EVERY technology item, brand, specification, or feature the user mentions - no exceptions
2. NEVER DROP DETAILS: If user says "400W solar", your questions MUST reference "400W solar", not generic "solar panels"
3. NO GENERIC QUESTIONS: Every question must include specific costs in local currency, actual brands/models, technical limitations
4. INCLUDE EXACT NUMBERS: If user mentions wattages, capacities, counts - use those EXACT numbers in your response
5. REGIONAL PRECISION: Use correct providers, costs, and terminology for their country

QUESTION QUALITY REQUIREMENTS (Be comprehensive but concise - each question 2-3 sentences maximum):
- BAD: "What solar panels are you considering?"
- GOOD: "For your 600-800W solar system, you're looking at 3-4 x 200W panels (AUD 300-600 each). Brands like Enerdrive, Projecta, or Redarc are popular in Australia. Have you confirmed your van's roof space can accommodate this, and factored in tilt mounting for winter sun angles in southern states?"

- BAD: "Do you need internet?"
- GOOD: "For Kimberley/Cape York travel, you mentioned Telstra + Optus dual SIM. Telstra coverage extends further north (to Cooktown typically), but drops significantly beyond. Have you budgeted for Starlink Roam (AUD 139/month + AUD 599 hardware) as backup? Note: Starlink only works when stationary."

COST REQUIREMENTS:
- Include actual dollar ranges in local currency (AUD for Australia, USD for USA)
- Mention ongoing costs (e.g., "Starlink: AUD 599 hardware + AUD 139/month ongoing")
- Provide installation cost estimates where relevant
- Flag expensive items if their specs indicate premium setup

INTELLIGENT ADDITIONS:
- Based on travel style, suggest critical items they overlooked
- Explain WHY each addition is relevant to their specific situation
- Warn about compatibility issues (power calculations, weight, space, voltage)

Return ONLY valid JSON, no markdown formatting.`;

    const userPrompt = `Analyze these user requirements and create an EXTREMELY PERSONALIZED checklist:

"${userRequirements}"

STEP 1 - EXTRACT EVERYTHING:
Profile:
- Timeline: When are they traveling? (retiring in X months, immediate, planning)
- Duration: Trip length (weekend, 6 months, 2 years, full time)
- Destinations: List ALL specific locations mentioned
- Travel style: Freedom camping, parks, big lap, day trips, unhitching?
- Rig type: Caravan vs motorhome vs camper? Why?
- Occupants: Family size, pets, solo vs couple, grandkids mentioned?
- Work: Remote work, retired, digital nomad, occasional connectivity?

Technology Mentioned (capture EXACT specifications):
- Connectivity: List ALL providers, SIM counts, Starlink, boosters, antennas mentioned
- Power: ALL solar wattages, battery Ah, battery type, inverter wattage, monitoring
- Navigation: ALL brands/models, offline maps, tracking apps
- Entertainment: ALL TV, soundbar, streaming, radio, voltage requirements
- Security: ALL alarms, cameras (count), locks, GPS trackers, AirTags
- Climate: ALL air con type, heater type, smart controls, remote access
- Water: ALL tank monitors, pump pressure, filtration needs
- Other: EVERYTHING else mentioned (awnings, levelling, tyre pressure, dash cams)

Geographic Context:
- Country: (for currency, providers, regulations)
- Regions: (for coverage maps, terrain challenges)
- Terrain: Remote/outback, coastal, urban, mixed?

STEP 2 - CREATE CHECKLIST:
For EVERY item user mentioned:
- Use their EXACT specifications (e.g., "400W solar" not "solar system")
- Provide 3-5 highly specific questions including:
  * Actual costs in local currency (AUD, USD, etc.)
  * Specific brands/models popular in their region (2-3 options)
  * Technical limitations they may not know
  * Installation/compatibility considerations
  * Regional specifics (coverage maps, local regulations)

Add intelligent suggestions:
- Based on travel style, suggest overlooked critical items
- Explain WHY each suggestion matters for THEIR situation
- Include costs and technical details

Budget guidance:
- Provide total budget range for their full setup
- Itemize major categories with actual cost ranges
- Flag if their specs indicate premium/expensive setup
- Include ongoing costs (subscriptions, data plans)

Dealer questions:
- Generate questions about THEIR specific requirements
- Include gotchas (warranty, ongoing costs, compatibility)
- Region-specific (Australian Standards, local service centres)

Compatibility warnings:
- Power calculations (generation vs consumption)
- Weight concerns (payload limits)
- Space limitations (roof, storage compartments)
- Voltage standards (12V/240V for Australia)

Return ONLY valid JSON (no markdown code blocks):
{
  "checklistItems": [
    {
      "category": "Use THEIR terminology",
      "item": "EXACT specs they mentioned or intelligent addition with justification",
      "priority": "essential|important|recommended (based on THEIR needs)",
      "questions": [
        "Include specific AUD/USD costs",
        "Mention 2-3 actual brands/models",
        "Note technical limitations",
        "Regional specifics (coverage, regulations)",
        "Installation/compatibility concerns"
      ]
    }
  ],
  "summary": "2-3 sentences using THEIR words and details about travel plans",
  "budgetConsiderations": "Total range + itemized estimates in local currency with ongoing costs flagged",
  "dealerQuestions": [
    "Specific to THEIR requirements",
    "Include warranty, ongoing costs, compatibility",
    "Regional focus (Australian Standards, local service)"
  ],
  "searchUrls": {
    "buyUrl": "https://www.rvt.com/buy/",
    "reviewsUrl": "https://www.rvinsider.com/",
    "dealersUrl": "https://www.rvt.com/dealersearch.php",
    "priceCheckerUrl": "https://www.rvt.com/price-checker/"
  }
}

QUALITY CHECK BEFORE RETURNING:
✓ Does checklist include 100% of items user mentioned?
✓ Are all specifications, brands, numbers EXACTLY as user stated?
✓ Do questions include real costs, brands, limitations (not generic)?
✓ Are costs in local currency with ongoing costs noted?
✓ Can user take this to dealer or use for research immediately?`;

    // Call Lovable AI Gateway with Gemini
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 8000, // Optimized for faster generation while maintaining quality
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiResponse = aiData.choices[0].message.content;
    
    console.log('AI Checklist Response received:', aiResponse);
    
    // Monitor response size and detect truncation
    const responseLength = aiResponse.length;
    const tokenEstimate = Math.ceil(responseLength / 4); // Rough estimate: 1 token ≈ 4 characters
    const tokenLimit = 16000;
    const tokenUsagePercent = (tokenEstimate / tokenLimit * 100).toFixed(1);
    
    console.log(`📊 Response size: ${responseLength} chars (~${tokenEstimate} tokens, ${tokenUsagePercent}% of ${tokenLimit} limit)`);
    
    if (tokenEstimate > tokenLimit * 0.8) {
      console.warn(`⚠️ Approaching token limit! Using ${tokenUsagePercent}% of available tokens.`);
    }
    
    const appearsTruncated = !aiResponse.trim().endsWith('}') && !aiResponse.trim().endsWith(']');
    if (appearsTruncated) {
      console.warn(`⚠️ AI response appears truncated (length: ${responseLength}, ends with: "${aiResponse.trim().slice(-50)}")`);
    }

    let checklist: AIChecklistResult | undefined;
    try {
      // Extract JSON from markdown code blocks
      let cleanedResponse = aiResponse.trim();
      
      // Remove markdown code fences more robustly
      const jsonMatch = cleanedResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        cleanedResponse = jsonMatch[1].trim();
      } else if (cleanedResponse.startsWith('```')) {
        // Handle cases where there's only opening fence
        cleanedResponse = cleanedResponse.replace(/^```(?:json)?\s*/, '').replace(/```\s*$/, '').trim();
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
      console.error('Response length:', aiResponse.length);
      console.error('Last 200 chars:', aiResponse.slice(-200));
      
      // Attempt to heal truncated JSON before falling back
      let healedResponse = aiResponse.trim();
      
      // Remove markdown if present
      const jsonMatch = healedResponse.match(/```(?:json)?\s*([\s\S]*?)(?:\s*```)?$/);
      if (jsonMatch) {
        healedResponse = jsonMatch[1].trim();
      }
      
      // Try to close unclosed structures
      let attempts = 0;
      while (attempts < 10) {
        try {
          checklist = JSON.parse(healedResponse);
          console.log('✅ Successfully healed truncated JSON');
          break;
        } catch {
          // Count open vs closed brackets
          const openBraces = (healedResponse.match(/{/g) || []).length;
          const closeBraces = (healedResponse.match(/}/g) || []).length;
          const openBrackets = (healedResponse.match(/\[/g) || []).length;
          const closeBrackets = (healedResponse.match(/]/g) || []).length;
          
          if (openBraces > closeBraces) {
            healedResponse += '\n}';
          } else if (openBrackets > closeBrackets) {
            healedResponse += '\n]';
          } else {
            break; // Can't heal further
          }
          attempts++;
        }
      }
      
      // If healing failed but response appears truncated, try to extract partial personalized results
      if (!checklist && appearsTruncated) {
        console.log('🔧 Attempting to extract partial personalized content from truncated response...');
        try {
          // Find the last complete checklist item before truncation
          const itemMatches = healedResponse.match(/"checklistItems"\s*:\s*\[([\s\S]*?)(?:,\s*{[^}]*)?$/);
          if (itemMatches) {
            // Try to extract completed items
            const partialJson = `{"checklistItems":[${itemMatches[1]}],"summary":"Partial results due to extensive personalization. Response was truncated.","budgetConsiderations":"See partial checklist items above.","dealerQuestions":[],"searchUrls":{"buyUrl":"https://www.rvt.com/buy/","reviewsUrl":"https://www.rvinsider.com/","dealersUrl":"https://www.rvt.com/dealersearch.php","priceCheckerUrl":"https://www.rvt.com/price-checker/"}}`;
            checklist = JSON.parse(partialJson);
            console.log('✅ Extracted partial personalized content:', checklist.checklistItems.length, 'items');
          }
        } catch (extractError) {
          console.error('Could not extract partial content:', extractError);
        }
      }
    }
    
    // If healing didn't work, use fallback
    if (!checklist) {
      console.error('❌ Could not heal JSON, using generic fallback');
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