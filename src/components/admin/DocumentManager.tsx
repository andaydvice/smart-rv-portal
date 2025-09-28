import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileText, Check, X, Archive, Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TrainingDocument {
  id: string;
  title: string;
  file_name: string;
  document_type: string;
  status: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  file_size: number;
  metadata: any;
}

const DocumentManager = () => {
  const [documents, setDocuments] = useState<TrainingDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: 'all',
    type: 'all',
    search: ''
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800'
  };

  const typeLabels = {
    knowledge_base: 'Knowledge Base',
    product_info: 'Product Info',
    safety_guidelines: 'Safety Guidelines',
    compliance: 'Compliance',
    general: 'General'
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('training_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const updateDocumentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('training_documents')
        .update({ 
          status,
          approved_at: status === 'approved' ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;

      setDocuments(prev => prev.map(doc => 
        doc.id === id ? { ...doc, status } : doc
      ));

      toast.success(`Document ${status} successfully`);
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to update document status');
    }
  };

  const filteredDocuments = documents.filter(doc => {
    if (filter.status !== 'all' && doc.status !== filter.status) return false;
    if (filter.type !== 'all' && doc.document_type !== filter.type) return false;
    if (filter.search && !doc.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-pulse text-muted-foreground">Loading documents...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Training Document Manager
          </CardTitle>
          <CardDescription>
            Manage training documents for AI tools. Approve or archive documents as needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={filter.search}
                onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                className="w-full sm:w-64"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filter.status} onValueChange={(value) => setFilter(prev => ({ ...prev, status: value }))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={filter.type} onValueChange={(value) => setFilter(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(typeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No documents found matching your filters
              </div>
            ) : (
              filteredDocuments.map(doc => (
                <Card key={doc.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{doc.file_name}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className={statusColors[doc.status as keyof typeof statusColors]}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </Badge>
                          <Badge variant="secondary">
                            {typeLabels[doc.document_type as keyof typeof typeLabels]}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {(doc.file_size / 1024).toFixed(1)} KB
                          </span>
                        </div>

                        {doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {doc.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {doc.metadata?.has_liability_content && (
                          <div className="bg-amber-50 border border-amber-200 rounded px-2 py-1 text-xs text-amber-800 mb-3">
                            Contains potential liability content
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2 ml-4">
                        {doc.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateDocumentStatus(doc.id, 'approved')}
                              className="text-green-600 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateDocumentStatus(doc.id, 'archived')}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        
                        {doc.status === 'approved' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateDocumentStatus(doc.id, 'archived')}
                            className="text-gray-600 hover:bg-gray-50"
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {doc.status === 'archived' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateDocumentStatus(doc.id, 'approved')}
                            className="text-blue-600 hover:bg-blue-50"
                          >
                            Restore
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManager;