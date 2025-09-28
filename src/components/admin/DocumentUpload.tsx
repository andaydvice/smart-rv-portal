import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DocumentUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    document_type: '',
    tags: '',
    file: null as File | null
  });

  const documentTypes = [
    { value: 'knowledge_base', label: 'Knowledge Base' },
    { value: 'product_info', label: 'Product Information' },
    { value: 'safety_guidelines', label: 'Safety Guidelines' },
    { value: 'compliance', label: 'Compliance Documentation' },
    { value: 'general', label: 'General Information' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
      
      // Auto-fill title from filename if empty
      if (!formData.title) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        setFormData(prev => ({ ...prev, title: nameWithoutExt }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file || !formData.title || !formData.document_type) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsUploading(true);

    try {
      const form = new FormData();
      form.append('file', formData.file);
      form.append('title', formData.title);
      form.append('document_type', formData.document_type);
      form.append('tags', JSON.stringify(formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)));

      const { data, error } = await supabase.functions.invoke('document-processor', {
        body: form
      });

      if (error) throw error;

      if (data.warning) {
        toast.warning(data.warning);
      } else {
        toast.success('Document uploaded and approved successfully');
      }

      // Reset form
      setFormData({
        title: '',
        document_type: '',
        tags: '',
        file: null
      });
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Training Document
        </CardTitle>
        <CardDescription>
          Add new training documents for AI tools. Documents will be automatically scanned for liability content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">File *</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".txt,.md,.json,.pdf,.docx"
              onChange={handleFileChange}
              required
            />
            <p className="text-sm text-muted-foreground">
              Supported formats: TXT, MD, JSON, PDF, DOCX
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter document title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document_type">Document Type *</Label>
            <Select value={formData.document_type} onValueChange={(value) => setFormData(prev => ({ ...prev, document_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="rv, technology, connectivity (comma-separated)"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <strong>Liability Warning:</strong> Documents containing recommendation language 
                (recommend, suggest, best choice, etc.) will require manual approval before being 
                used by AI tools.
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isUploading} className="w-full">
            {isUploading ? (
              <>
                <FileText className="h-4 w-4 mr-2 animate-pulse" />
                Processing Document...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;