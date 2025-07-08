import React from 'react';
import { Activity, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface CrawlData {
  budgetUsed: number;
  budgetTotal: number;
  lastCrawl: string;
  crawlFrequency: 'daily' | 'weekly' | 'monthly';
  indexedPages: number;
  totalPages: number;
  crawlErrors: number;
  recommendations: Array<{
    type: 'error' | 'warning' | 'success';
    message: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

interface CrawlOptimizationProps {
  data: CrawlData;
  showDetails?: boolean;
}

const CrawlOptimization: React.FC<CrawlOptimizationProps> = ({
  data,
  showDetails = true
}) => {
  const budgetPercentage = (data.budgetUsed / data.budgetTotal) * 100;
  const indexingPercentage = (data.indexedPages / data.totalPages) * 100;

  const getBudgetColor = () => {
    if (budgetPercentage >= 90) return 'text-red-400';
    if (budgetPercentage >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-[#151A22] rounded-lg border border-gray-700 p-6">
      <div className="flex items-center mb-6">
        <Activity className="h-6 w-6 text-[#5B9BD5] mr-2" />
        <h3 className="text-xl font-bold text-white">Crawl Budget Optimization</h3>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#091020] rounded-lg p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Crawl Budget</span>
            <Activity className="h-4 w-4 text-[#5B9BD5]" />
          </div>
          <div className={`text-2xl font-bold ${getBudgetColor()}`}>
            {budgetPercentage.toFixed(0)}%
          </div>
          <div className="text-gray-500 text-xs">
            {data.budgetUsed.toLocaleString()} / {data.budgetTotal.toLocaleString()}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${
                budgetPercentage >= 90 ? 'bg-red-400' :
                budgetPercentage >= 70 ? 'bg-yellow-400' : 'bg-green-400'
              }`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-[#091020] rounded-lg p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Indexed Pages</span>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {indexingPercentage.toFixed(0)}%
          </div>
          <div className="text-gray-500 text-xs">
            {data.indexedPages.toLocaleString()} / {data.totalPages.toLocaleString()}
          </div>
        </div>

        <div className="bg-[#091020] rounded-lg p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Last Crawl</span>
            <Clock className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-lg font-bold text-white">
            {new Date(data.lastCrawl).toLocaleDateString()}
          </div>
          <div className="text-gray-500 text-xs capitalize">
            {data.crawlFrequency} frequency
          </div>
        </div>

        <div className="bg-[#091020] rounded-lg p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Crawl Errors</span>
            <AlertTriangle className={`h-4 w-4 ${data.crawlErrors > 0 ? 'text-red-400' : 'text-green-400'}`} />
          </div>
          <div className={`text-2xl font-bold ${data.crawlErrors > 0 ? 'text-red-400' : 'text-green-400'}`}>
            {data.crawlErrors}
          </div>
          <div className="text-gray-500 text-xs">
            {data.crawlErrors === 0 ? 'No issues found' : 'Requires attention'}
          </div>
        </div>
      </div>

      {/* Crawl Budget Chart */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3">Budget Usage Trend</h4>
        <div className="bg-[#091020] rounded-lg p-4 border border-gray-600">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Past 7 days</span>
            <span>Current: {budgetPercentage.toFixed(1)}%</span>
          </div>
          <div className="h-24 bg-gray-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-between px-2">
              {[65, 72, 68, 75, 82, 78, budgetPercentage].map((value, index) => (
                <div
                  key={index}
                  className="bg-[#5B9BD5] rounded-t w-8"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {showDetails && data.recommendations.length > 0 && (
        <div>
          <h4 className="text-white font-medium mb-3">Optimization Recommendations</h4>
          <div className="space-y-3">
            {data.recommendations.map((rec, index) => (
              <div key={index} className="bg-[#091020] rounded-lg p-4 border border-gray-600">
                <div className="flex items-start space-x-3">
                  {getRecommendationIcon(rec.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-300 text-sm">{rec.message}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optimization Actions */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h4 className="text-white font-medium mb-3">Quick Actions</h4>
        <div className="flex flex-wrap gap-3">
          <button className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Update Sitemap
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Check Robots.txt
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Optimize Internal Links
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Remove Crawl Blocks
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrawlOptimization;