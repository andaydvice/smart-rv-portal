import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ContentMetrics {
  id: string;
  content_type: string;
  content_id: string;
  affiliate_partner: string;
  product_category: string;
  page_url: string;
  seo_metrics: {
    keyword_rankings: Record<string, number>;
    organic_traffic: number;
    search_impressions: number;
    average_position: number;
    click_through_rate: number;
  };
  engagement_metrics: {
    page_views: number;
    unique_visitors: number;
    time_on_page: number;
    scroll_depth: number;
    bounce_rate: number;
    exit_rate: number;
  };
  conversion_metrics: {
    affiliate_clicks: number;
    conversion_rate: number;
    revenue_generated: number;
    cost_per_acquisition: number;
    return_on_investment: number;
  };
  optimization_score: number;
  recommendations: string[];
  performance_trend: 'improving' | 'declining' | 'stable';
  last_analyzed: string;
}

export const useContentAnalytics = (contentType?: string, category?: string) => {
  const [analytics, setAnalytics] = useState<ContentMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('content_analysis')
          .select('*')
          .order('last_analyzed', { ascending: false });

        if (contentType) {
          query = query.eq('content_type', contentType);
        }

        if (category) {
          query = query.eq('product_category', category);
        }

        const { data, error } = await query;

        if (error) throw error;
        const typedData: ContentMetrics[] = (data || []).map(item => ({
          id: item.id,
          content_type: item.content_type,
          content_id: item.content_id,
          affiliate_partner: item.affiliate_partner,
          product_category: item.product_category,
          page_url: item.page_url,
          seo_metrics: item.seo_metrics as ContentMetrics['seo_metrics'],
          engagement_metrics: item.engagement_metrics as ContentMetrics['engagement_metrics'],
          conversion_metrics: item.conversion_metrics as ContentMetrics['conversion_metrics'],
          optimization_score: item.optimization_score || 0,
          recommendations: (item.recommendations || []) as string[],
          performance_trend: (item.performance_trend || 'stable') as 'improving' | 'declining' | 'stable',
          last_analyzed: item.last_analyzed || new Date().toISOString()
        }));
        setAnalytics(typedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [contentType, category]);

  const trackAffiliateClick = async (contentId: string, affiliatePartner: string) => {
    try {
      // Find existing record
      const existingRecord = analytics.find(a => a.content_id === contentId && a.affiliate_partner === affiliatePartner);
      
      if (existingRecord) {
        const updatedMetrics = {
          ...existingRecord.conversion_metrics,
          affiliate_clicks: existingRecord.conversion_metrics.affiliate_clicks + 1
        };

        await supabase
          .from('content_analysis')
          .update({ 
            conversion_metrics: updatedMetrics,
            last_analyzed: new Date().toISOString()
          })
          .eq('id', existingRecord.id);

        // Update local state
        setAnalytics(prev => prev.map(item => 
          item.id === existingRecord.id 
            ? { ...item, conversion_metrics: updatedMetrics }
            : item
        ));
      }
    } catch (err) {
      console.error('Failed to track affiliate click:', err);
    }
  };

  const getTopPerformers = () => {
    return analytics
      .sort((a, b) => b.conversion_metrics.revenue_generated - a.conversion_metrics.revenue_generated)
      .slice(0, 5);
  };

  const getTotalRevenue = () => {
    return analytics.reduce((sum, item) => sum + item.conversion_metrics.revenue_generated, 0);
  };

  const getAverageConversionRate = () => {
    if (analytics.length === 0) return 0;
    const totalRate = analytics.reduce((sum, item) => sum + item.conversion_metrics.conversion_rate, 0);
    return totalRate / analytics.length;
  };

  const getCategoryPerformance = () => {
    const categoryStats = analytics.reduce((acc, item) => {
      const category = item.product_category;
      if (!acc[category]) {
        acc[category] = {
          revenue: 0,
          clicks: 0,
          conversions: 0,
          count: 0
        };
      }
      acc[category].revenue += item.conversion_metrics.revenue_generated;
      acc[category].clicks += item.conversion_metrics.affiliate_clicks;
      acc[category].conversions += item.conversion_metrics.conversion_rate;
      acc[category].count += 1;
      return acc;
    }, {} as Record<string, any>);

    return Object.entries(categoryStats).map(([category, stats]) => ({
      category,
      revenue: stats.revenue,
      clicks: stats.clicks,
      averageConversion: stats.conversions / stats.count,
      count: stats.count
    }));
  };

  return {
    analytics,
    loading,
    error,
    trackAffiliateClick,
    getTopPerformers,
    getTotalRevenue,
    getAverageConversionRate,
    getCategoryPerformance
  };
};