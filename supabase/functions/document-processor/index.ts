import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const documentType = formData.get('document_type') as string;
    const tags = JSON.parse(formData.get('tags') as string || '[]');

    if (!file || !title || !documentType) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Upload file to storage
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('training-documents')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return new Response(JSON.stringify({ error: 'Failed to upload file' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract text content based on file type
    let extractedContent = '';
    const fileBuffer = await file.arrayBuffer();
    const text = new TextDecoder().decode(fileBuffer);

    if (file.type === 'text/plain' || file.type === 'text/markdown') {
      extractedContent = text;
    } else if (file.type === 'application/json') {
      try {
        const jsonData = JSON.parse(text);
        extractedContent = JSON.stringify(jsonData, null, 2);
      } catch {
        extractedContent = text;
      }
    } else {
      // For other file types, store as-is for now
      extractedContent = `[Binary file: ${file.name}]`;
    }

    // Check for liability-creating phrases
    const liabilityPhrases = [
      'recommend', 'suggest', 'advice', 'best choice', 'you should buy',
      'guaranteed', 'promise', 'will solve', 'definitely', 'always works'
    ];
    
    const hasLiabilityContent = liabilityPhrases.some(phrase => 
      extractedContent.toLowerCase().includes(phrase.toLowerCase())
    );

    // Create database record
    const { data: documentData, error: dbError } = await supabase
      .from('training_documents')
      .insert({
        title,
        file_name: file.name,
        file_path: uploadData.path,
        file_size: file.size,
        content_type: file.type,
        extracted_content: extractedContent,
        document_type: documentType,
        tags,
        status: hasLiabilityContent ? 'pending' : 'approved',
        metadata: {
          has_liability_content: hasLiabilityContent,
          processed_at: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(JSON.stringify({ error: 'Failed to save document record' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      document: documentData,
      warning: hasLiabilityContent ? 'Document contains potential liability content and requires approval' : null
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Document processor error:', error);
    return new Response(JSON.stringify({ error: 'Processing failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});