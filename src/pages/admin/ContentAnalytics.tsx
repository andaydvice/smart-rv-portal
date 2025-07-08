import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import ContentAnalyticsDashboard from '@/components/analytics/ContentAnalyticsDashboard';
import { scrollToTop } from '@/utils/scrollToTop';

const ContentAnalytics = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Content Analytics Dashboard - Smart RV Technology</title>
        <meta name="description" content="Comprehensive analytics dashboard for tracking affiliate content performance, conversion rates, and revenue optimization." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Container className="py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Content Analytics</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Track and optimize your affiliate content performance with real-time analytics and actionable insights.
            </p>
          </div>

          <ContentAnalyticsDashboard />
        </Container>
      </div>
    </Layout>
  );
};

export default ContentAnalytics;