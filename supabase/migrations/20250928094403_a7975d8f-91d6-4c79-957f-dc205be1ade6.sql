-- Create training documents table
CREATE TABLE public.training_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  content_type TEXT NOT NULL,
  extracted_content TEXT,
  document_type TEXT NOT NULL CHECK (document_type IN ('knowledge_base', 'product_info', 'safety_guidelines', 'compliance', 'general')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'archived')),
  uploaded_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  version INTEGER NOT NULL DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.training_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can manage training documents"
ON public.training_documents
FOR ALL
TO authenticated
USING (is_admin_or_moderator())
WITH CHECK (is_admin_or_moderator());

-- Create storage bucket for training documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('training-documents', 'training-documents', false);

-- Storage policies for training documents
CREATE POLICY "Admins can upload training documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'training-documents' AND 
  is_admin_or_moderator()
);

CREATE POLICY "Admins can view training documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'training-documents' AND 
  is_admin_or_moderator()
);

CREATE POLICY "Admins can update training documents"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'training-documents' AND 
  is_admin_or_moderator()
);

CREATE POLICY "Admins can delete training documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'training-documents' AND 
  is_admin_or_moderator()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_training_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_training_documents_updated_at_trigger
BEFORE UPDATE ON public.training_documents
FOR EACH ROW
EXECUTE FUNCTION update_training_documents_updated_at();

-- Create function to get approved training content for AI
CREATE OR REPLACE FUNCTION public.get_training_content(doc_type TEXT DEFAULT NULL)
RETURNS TABLE(
  id UUID,
  title TEXT,
  content TEXT,
  document_type TEXT,
  tags TEXT[],
  metadata JSONB
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    td.id,
    td.title,
    td.extracted_content as content,
    td.document_type,
    td.tags,
    td.metadata
  FROM public.training_documents td
  WHERE td.status = 'approved'
    AND (doc_type IS NULL OR td.document_type = doc_type)
  ORDER BY td.updated_at DESC;
$$;