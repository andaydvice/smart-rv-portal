import React from 'react';
import AnswerEngineOptimization from './AnswerEngineOptimization';
import VoiceSearchOptimization from './VoiceSearchOptimization';
import ContentFramework from './ContentFramework';
import VideoSEOOptimization from './VideoSEOOptimization';
import UserGeneratedContent from './UserGeneratedContent';
import CrawlOptimization from './CrawlOptimization';

interface SEOSuiteProps {
  pageType: 'homepage' | 'blog' | 'product' | 'category' | 'guide' | 'documentation';
  pageTitle: string;
  pageContent: string;
  category?: string;
  customData?: any;
}

const SEOSuite: React.FC<SEOSuiteProps> = ({
  pageType,
  pageTitle,
  pageContent,
  category,
  customData = {}
}) => {
  const getPageSpecificSEO = () => {
    switch (pageType) {
      case 'homepage':
        return {
          aeoQuestion: "What makes Smart RV Technology different from traditional RV solutions?",
          aeoAnswer: "Smart RV Technology integrates cutting-edge AI, IoT sensors, and automated systems to create an intelligent mobile living experience with voice control, predictive maintenance, and comprehensive emergency services.",
          voiceQueries: [
            "What's the best smart RV technology for beginners",
            "How much does a smart RV system cost",
            "Which RV apps are most useful for travel"
          ],
          contentCategory: 'pillar' as const,
          showUserReviews: true,
          showCrawlOptimization: true
        };

      case 'blog':
        return {
          aeoQuestion: `What should I know about ${pageTitle}?`,
          aeoAnswer: pageContent.substring(0, 200) + "...",
          voiceQueries: [
            `How to ${pageTitle.toLowerCase()}`,
            `Best practices for ${pageTitle.toLowerCase()}`,
            `${pageTitle.toLowerCase()} tips and tricks`
          ],
          contentCategory: 'cluster' as const,
          showUserReviews: false,
          showCrawlOptimization: false
        };

      case 'product':
      case 'category':
        return {
          aeoQuestion: `What are the benefits of ${pageTitle}?`,
          aeoAnswer: pageContent.substring(0, 200) + "...",
          voiceQueries: [
            `Best ${pageTitle.toLowerCase()} for RVs`,
            `How to choose ${pageTitle.toLowerCase()}`,
            `${pageTitle.toLowerCase()} reviews and comparison`
          ],
          contentCategory: 'cluster' as const,
          showUserReviews: true,
          showCrawlOptimization: false
        };

      case 'guide':
        return {
          aeoQuestion: `How do I follow this ${pageTitle} guide?`,
          aeoAnswer: pageContent.substring(0, 200) + "...",
          voiceQueries: [
            `Step by step ${pageTitle.toLowerCase()} guide`,
            `${pageTitle.toLowerCase()} instructions`,
            `How to complete ${pageTitle.toLowerCase()}`
          ],
          contentCategory: 'supporting' as const,
          showUserReviews: false,
          showCrawlOptimization: false
        };

      case 'documentation':
        return {
          aeoQuestion: `How do I use ${pageTitle}?`,
          aeoAnswer: pageContent.substring(0, 200) + "...",
          voiceQueries: [
            `${pageTitle.toLowerCase()} documentation`,
            `How to configure ${pageTitle.toLowerCase()}`,
            `${pageTitle.toLowerCase()} troubleshooting`
          ],
          contentCategory: 'supporting' as const,
          showUserReviews: false,
          showCrawlOptimization: false
        };

      default:
        return {
          aeoQuestion: `What is ${pageTitle}?`,
          aeoAnswer: pageContent.substring(0, 200) + "...",
          voiceQueries: [`About ${pageTitle.toLowerCase()}`],
          contentCategory: 'supporting' as const,
          showUserReviews: false,
          showCrawlOptimization: false
        };
    }
  };

  const seoConfig = getPageSpecificSEO();

  const getLocalQueries = () => {
    if (pageType === 'homepage' || category === 'storage' || category === 'emergency') {
      return [
        "RV storage facilities",
        "RV emergency services", 
        "RV solar panel installation",
        "smart RV dealers"
      ];
    }
    return [];
  };

  const getActionQueries = () => {
    const baseActions = ["find", "choose", "install", "setup"];
    return baseActions.map(action => `${action} ${pageTitle.toLowerCase()}`);
  };

  const getRelatedContent = () => {
    const baseContent = [
      { title: "RV Solar Power Guide", url: "/solar-power-guide", type: "internal" as const },
      { title: "Emergency Preparedness", url: "/rv-emergency-center", type: "internal" as const },
      { title: "Smart RV Features", url: "/features", type: "internal" as const },
      { title: "RV Storage Solutions", url: "/storage-facilities", type: "internal" as const }
    ];

    if (customData.relatedContent) {
      return [...customData.relatedContent, ...baseContent.slice(0, 2)];
    }
    return baseContent;
  };

  const getSampleReviews = () => [
    {
      id: "1",
      userName: "Jennifer Adams",
      rating: 5,
      title: `Excellent ${pageTitle} experience`,
      content: `The ${pageTitle.toLowerCase()} exceeded our expectations. The technology is intuitive and the support team was incredibly helpful throughout the process.`,
      date: "2024-01-12",
      verified: true,
      helpful: 8,
      images: []
    },
    {
      id: "2",
      userName: "Robert Chen",
      rating: 4,
      title: "Great value and functionality",
      content: `We're very satisfied with the ${pageTitle.toLowerCase()}. The features work as advertised and installation was straightforward.`,
      date: "2024-01-10",
      verified: true,
      helpful: 6,
      images: []
    }
  ];

  return (
    <div className="space-y-8">
      {/* Answer Engine Optimization */}
      <AnswerEngineOptimization
        question={seoConfig.aeoQuestion}
        answer={seoConfig.aeoAnswer}
        context={customData.stepByStepGuide}
        relatedQuestions={customData.relatedQuestions || [
          `How does ${pageTitle.toLowerCase()} work?`,
          `What are the benefits of ${pageTitle.toLowerCase()}?`,
          `Is ${pageTitle.toLowerCase()} worth the investment?`
        ]}
        pageTitle={pageTitle}
      />

      {/* Voice Search Optimization */}
      <VoiceSearchOptimization
        conversationalQueries={seoConfig.voiceQueries}
        localQueries={getLocalQueries()}
        actionQueries={getActionQueries()}
        pageContent={pageContent}
      />

      {/* Content Framework */}
      <ContentFramework
        title={pageTitle}
        category={seoConfig.contentCategory}
        depthScore={customData.depthScore || 85}
        wordCount={customData.wordCount || pageContent.length}
        lastUpdated={customData.lastUpdated || new Date().toISOString()}
        relatedContent={getRelatedContent()}
        contentGaps={customData.contentGaps || [
          `Advanced ${pageTitle.toLowerCase()} techniques`,
          `${pageTitle} troubleshooting guide`,
          `${pageTitle} best practices checklist`
        ]}
        videoContent={customData.videoContent}
      />

      {/* Video SEO (if video content exists) */}
      {customData.videoContent && (
        <VideoSEOOptimization
          title={customData.videoContent.title}
          description={customData.videoContent.description || `Complete guide to ${pageTitle.toLowerCase()}`}
          duration={customData.videoContent.duration}
          thumbnailUrl={customData.videoContent.thumbnailUrl || "/video-thumbnail.jpg"}
          videoUrl={customData.videoContent.videoUrl}
          uploadDate={customData.videoContent.uploadDate || new Date().toISOString()}
          transcript={customData.videoContent.transcript}
          chapters={customData.videoContent.chapters}
          tags={customData.videoContent.tags || [pageTitle.toLowerCase().replace(/\s+/g, '-')]}
        />
      )}

      {/* User Generated Content (for product/category pages) */}
      {seoConfig.showUserReviews && (
        <UserGeneratedContent
          reviews={customData.reviews || getSampleReviews()}
          averageRating={customData.averageRating || 4.6}
          totalReviews={customData.totalReviews || 23}
          productName={pageTitle}
          allowNewReviews={true}
        />
      )}

      {/* Crawl Optimization (for homepage only) */}
      {seoConfig.showCrawlOptimization && (
        <CrawlOptimization
          data={customData.crawlData || {
            budgetUsed: 2850,
            budgetTotal: 4000,
            lastCrawl: "2024-01-15",
            crawlFrequency: "daily",
            indexedPages: 89,
            totalPages: 95,
            crawlErrors: 2,
            recommendations: [
              {
                type: "warning",
                message: `${pageTitle} page loading optimization needed`,
                priority: "medium"
              },
              {
                type: "success",
                message: "SEO meta tags properly configured",
                priority: "low"
              }
            ]
          }}
          showDetails={true}
        />
      )}
    </div>
  );
};

export default SEOSuite;