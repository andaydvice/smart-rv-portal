import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.48.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = "https://xsypxtfjffgihnmcjfgc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzeXB4dGZqZmZnaWhubWNqZmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NzY4MjYsImV4cCI6MjA1MDM1MjgyNn0.6-gFguasJqAQpHhhXaNvnyJbVken6DHtndXISAXpDck";

const supabase = createClient(supabaseUrl, supabaseKey);

// Define types
interface Feature {
  id: string;
  name: string;
  keywords: string[];
  education: string;
}

interface FeatureDatabase {
  connectivity: Feature[];
  power: Feature[];
  comfort: Feature[];
  safety: Feature[];
  [key: string]: Feature[];
}

// Load dynamic feature database from training documents
let FEATURE_DATABASE: FeatureDatabase = {
  connectivity: [],
  power: [],
  comfort: [],
  safety: []
};

async function loadFeatureDatabase() {
  try {
    const { data: trainingData, error } = await supabase
      .rpc('get_training_content', { doc_type: 'product_info' });
    
    if (!error && trainingData && trainingData.length > 0) {
      // Build feature database from training documents
      FEATURE_DATABASE = {
        connectivity: [],
        power: [],
        comfort: [],
        safety: []
      };
      
      trainingData.forEach((doc: any) => {
        const category = doc.tags?.find((tag: string) => 
          ['connectivity', 'power', 'comfort', 'safety'].includes(tag.toLowerCase())
        )?.toLowerCase() || 'general';
        
        if (FEATURE_DATABASE[category]) {
          FEATURE_DATABASE[category].push({
            id: doc.id,
            name: doc.title,
            keywords: doc.tags || [],
            education: doc.content.substring(0, 200) + '...'
          });
        }
      });
    } else {
      throw new Error('No training data available');
    }
  } catch (error) {
    console.error('Error loading training content, using fallback:', error);
    // Fallback to static database
    FEATURE_DATABASE = {
      connectivity: [
        { id: 'cellular-booster', name: 'Cellular Signal Booster', keywords: ['internet', 'cell', 'data', 'connectivity', 'remote work'], education: 'Amplifies cellular signals for better data connectivity' },
        { id: 'wifi-extender', name: 'WiFi Range Extender', keywords: ['wifi', 'internet', 'campground', 'signal'], education: 'Extends WiFi range from campground or hotspot sources' },
        { id: 'satellite-internet', name: 'Satellite Internet Ready', keywords: ['starlink', 'satellite', 'remote', 'internet'], education: 'Mounting and power provisions for satellite internet systems' }
      ],
      power: [
        { id: 'solar-ready', name: 'Solar Panel Ready', keywords: ['solar', 'green', 'eco', 'battery', 'boondocking'], education: 'Pre-wiring and mounting points for solar panel installation' },
        { id: 'lithium-battery', name: 'Lithium Battery System', keywords: ['battery', 'power', 'lightweight', 'fast charging'], education: 'Advanced battery technology for extended off-grid capability' },
        { id: 'inverter-system', name: 'Pure Sine Wave Inverter', keywords: ['power', 'appliances', '120v', 'electronics'], education: 'Converts battery power to household-compatible AC power' }
      ],
      comfort: [
        { id: 'climate-control', name: 'Smart Climate Control', keywords: ['temperature', 'comfort', 'hvac', 'energy efficient'], education: 'Automated temperature management for optimal comfort and efficiency' },
        { id: 'led-lighting', name: 'LED Lighting System', keywords: ['lights', 'energy', 'efficient', 'bright'], education: 'Energy-efficient lighting throughout the RV' }
      ],
      safety: [
        { id: 'monitoring-system', name: 'RV System Monitor', keywords: ['monitor', 'alerts', 'safety', 'systems'], education: 'Real-time monitoring of RV systems and alerts' },
        { id: 'backup-camera', name: 'Backup Camera System', keywords: ['safety', 'driving', 'camera', 'visibility'], education: 'Enhanced visibility for safe maneuvering' }
      ]
    };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Load feature database on each request to get latest content
  await loadFeatureDatabase();

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { userDescription } = await req.json();

    console.log('Feature Matcher Request:', { 
      descriptionLength: userDescription?.length || 0,
      timestamp: new Date().toISOString()
    });

    // Use AI to extract keywords and intent from user description
    const analysisPrompt = `Analyze this RV usage description and extract relevant technology keywords. Focus only on factual technology needs, not recommendations.

User description: "${userDescription}"

Return ONLY a JSON object with this structure:
{
  "keywords": ["keyword1", "keyword2", ...],
  "primary_usage": "brief factual summary",
  "technology_categories": ["connectivity", "power", "comfort", "safety"]
}`;

    const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: analysisPrompt }],
        temperature: 0.3,
        max_tokens: 200,
      }),
    });

    if (!analysisResponse.ok) {
      throw new Error(`Analysis failed: ${analysisResponse.status}`);
    }

    const analysisData = await analysisResponse.json();
    let analysis;
    
    try {
      analysis = JSON.parse(analysisData.choices[0].message.content);
    } catch (parseError) {
      console.error('Analysis parsing failed:', parseError);
      analysis = { keywords: [], primary_usage: userDescription, technology_categories: [] };
    }

    // Match features based on keywords
    const matchedFeatures: any[] = [];
    const allFeatures: Feature[] = Object.values(FEATURE_DATABASE).flat();

    for (const feature of allFeatures) {
      const keywordMatches = analysis.keywords.filter((keyword: string) => 
        feature.keywords.some((fkeyword: string) => 
          fkeyword.toLowerCase().includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(fkeyword.toLowerCase())
        )
      );

      if (keywordMatches.length > 0) {
        matchedFeatures.push({
          ...feature,
          relevanceScore: keywordMatches.length / feature.keywords.length,
          matchedKeywords: keywordMatches
        });
      }
    }

    // Sort by relevance
    matchedFeatures.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Generate educational explanation
    const explanationPrompt = `Based on this RV usage pattern: "${analysis.primary_usage}", provide a brief educational explanation of why these technology features might be relevant to consider: ${matchedFeatures.slice(0, 3).map(f => f.name).join(', ')}.

Keep it factual and educational. Start with "Based on your described usage, here are some technology concepts to understand:" and end with "These are educational considerations only - please research specific options that suit your needs."

Maximum 200 words.`;

    const explanationResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: explanationPrompt }],
        temperature: 0.7,
        max_tokens: 250,
      }),
    });

    let explanation = "Here are some technology concepts that may be relevant to your described usage. Please research specific options to determine what suits your needs.";
    
    if (explanationResponse.ok) {
      const explanationData = await explanationResponse.json();
      explanation = explanationData.choices[0].message.content;
    }

    // Log interaction
    await supabase.rpc('log_security_event', {
      event_type: 'feature_matcher_interaction',
      severity: 'low',
      details: {
        features_matched: matchedFeatures.length,
        description_length: userDescription.length,
        timestamp: new Date().toISOString()
      }
    });

    return new Response(JSON.stringify({
      analysis,
      matchedFeatures: matchedFeatures.slice(0, 5), // Top 5 matches
      explanation,
      disclaimer: "This matching is for educational purposes only. Technology needs vary by individual requirements and RV specifications. Please consult with RV professionals for specific advice."
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Feature Matcher Error:', error);
    
    await supabase.rpc('log_security_event', {
      event_type: 'feature_matcher_error',
      severity: 'medium',
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
    });

    return new Response(JSON.stringify({
      error: 'Feature matching temporarily unavailable',
      fallback: "Please browse our feature categories manually or consult with RV professionals for technology guidance."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});