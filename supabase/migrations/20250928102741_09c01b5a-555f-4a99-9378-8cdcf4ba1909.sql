-- Create admin_settings table for system configuration
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_category TEXT NOT NULL,
  setting_key TEXT NOT NULL,
  setting_value JSONB NOT NULL DEFAULT '{}',
  description TEXT,
  data_type TEXT NOT NULL DEFAULT 'string',
  is_sensitive BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(setting_category, setting_key)
);

-- Enable RLS
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access only
CREATE POLICY "Only admins can manage settings"
ON public.admin_settings
FOR ALL
USING (is_admin_or_moderator())
WITH CHECK (is_admin_or_moderator());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_admin_settings_updated_at
BEFORE UPDATE ON public.admin_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_training_documents_updated_at();

-- Insert default admin settings
INSERT INTO public.admin_settings (setting_category, setting_key, setting_value, description, data_type) VALUES
-- AI Behavior Settings
('ai_behavior', 'enable_ai_features', '{"enabled": true}', 'Enable/disable AI features across the platform', 'boolean'),
('ai_behavior', 'response_templates', '{"disclaimers": ["Information provided is for educational purposes only", "Always consult professionals for specific advice"], "default_greeting": "How can I help you with your RV today?"}', 'AI response templates and disclaimers', 'object'),
('ai_behavior', 'content_filtering', '{"enable_profanity_filter": true, "enable_spam_detection": true, "auto_moderate": false}', 'Content filtering and moderation settings', 'object'),
('ai_behavior', 'knowledge_base_settings', '{"auto_update": true, "include_user_generated": false, "confidence_threshold": 0.8}', 'AI knowledge base configuration', 'object'),

-- Document Processing Settings
('document_processing', 'upload_limits', '{"max_file_size_mb": 50, "max_files_per_user": 100, "allowed_types": ["pdf", "doc", "docx", "txt"]}', 'File upload limitations and restrictions', 'object'),
('document_processing', 'auto_approval', '{"enable_auto_approval": false, "trusted_domains": [], "require_manual_review": true}', 'Document auto-approval settings', 'object'),
('document_processing', 'retention_policy', '{"delete_after_days": 365, "archive_after_days": 90, "enable_versioning": true}', 'Document retention and archival policies', 'object'),

-- System Configuration
('system', 'user_management', '{"allow_self_registration": true, "default_role": "user", "require_email_verification": true}', 'User registration and role management', 'object'),
('system', 'rate_limiting', '{"api_requests_per_minute": 60, "upload_requests_per_hour": 10, "search_requests_per_minute": 30}', 'API rate limiting configuration', 'object'),
('system', 'security_monitoring', '{"log_failed_logins": true, "enable_session_tracking": true, "alert_on_suspicious_activity": true}', 'Security monitoring and alerting', 'object'),
('system', 'performance_monitoring', '{"enable_web_vitals": true, "enable_error_tracking": true, "sample_rate": 0.1}', 'Performance monitoring configuration', 'object'),

-- Content Management
('content', 'newsletter_settings', '{"allow_subscriptions": true, "double_opt_in": true, "max_subscribers": 10000}', 'Newsletter subscription management', 'object'),
('content', 'review_moderation', '{"auto_approve_verified": false, "require_manual_review": true, "enable_spam_detection": true}', 'Customer review moderation settings', 'object'),
('content', 'user_preferences', '{"allow_preference_changes": true, "default_units": {"weight": "lbs", "distance": "miles", "temperature": "fahrenheit"}}', 'Default user preference settings', 'object'),
('content', 'search_settings', '{"max_saved_searches": 50, "enable_search_analytics": true, "cache_results_minutes": 30}', 'Search functionality configuration', 'object');