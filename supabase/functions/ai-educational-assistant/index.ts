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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { messages, context } = await req.json();

    // Log interaction for audit trail
    console.log('AI Educational Assistant Request:', { 
      messageCount: messages.length, 
      context: context?.type || 'general',
      timestamp: new Date().toISOString()
    });

    // Load training content from database
    let trainingContent = '';
    try {
      const { data: trainingData, error: trainingError } = await supabase
        .rpc('get_training_content', { doc_type: 'knowledge_base' });
      
      if (!trainingError && trainingData) {
        trainingContent = trainingData.map((doc: any) => 
          `Title: ${doc.title}\nContent: ${doc.content}\nTags: ${doc.tags?.join(', ') || 'none'}\n---`
        ).join('\n\n');
      }
    } catch (error) {
      console.error('Error loading training content:', error);
    }

    // System prompt ensures liability-free responses
    const systemPrompt = `You are an educational assistant for RV technology concepts. Your role is strictly educational - you help users understand technology concepts but never make recommendations, financial claims, or purchasing advice.

CRITICAL RULES:
- NEVER make recommendations or tell users what to buy
- NEVER make financial claims or ROI calculations
- NEVER guarantee performance or outcomes
- ALWAYS include educational disclaimers
- Focus on explaining concepts, not advising purchases
- Direct users to professionals for specific advice

Response style:
- Start with "Here's some educational information about..."
- Explain concepts clearly and factually
- Include considerations and trade-offs
- End with "This is general educational information only. Please consult with RV professionals for specific advice regarding your situation."
- Use phrases like "to help you understand" and "for educational purposes"

TRAINING CONTENT:
${trainingContent}

Your goal is to educate users so they can make their own informed decisions using the training content above for accurate information.`;

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
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Content filtering to ensure liability-free responses
    const prohibitedPhrases = [
      'I recommend', 'you should buy', 'this will save you money', 
      'guaranteed', 'best investment', 'perfect for you', 'definitely choose'
    ];
    
    const hasProhibitedContent = prohibitedPhrases.some(phrase => 
      aiResponse.toLowerCase().includes(phrase.toLowerCase())
    );

    if (hasProhibitedContent) {
      console.warn('Response contained prohibited content, filtering applied');
      return new Response(JSON.stringify({ 
        response: "I can provide educational information about RV technology concepts to help you understand your options. However, I cannot make specific recommendations. Please consult with RV professionals for advice tailored to your specific situation.",
        filtered: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Log successful interaction
    await supabase.rpc('log_security_event', {
      event_type: 'ai_educational_interaction',
      severity: 'low',
      details: {
        context: context?.type || 'general',
        message_length: aiResponse.length,
        timestamp: new Date().toISOString()
      }
    });

    return new Response(JSON.stringify({ 
      response: aiResponse,
      context,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Educational Assistant Error:', error);
    
    // Log error for monitoring
    await supabase.rpc('log_security_event', {
      event_type: 'ai_assistant_error',
      severity: 'medium',
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
    });

    return new Response(JSON.stringify({ 
      error: 'Educational assistant temporarily unavailable. Please try again later.',
      fallback: "For educational information about RV technology, please consult RV professionals or manufacturer documentation."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});