import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageCircle, 
  Share2, 
  Camera, 
  Star, 
  Heart, 
  TrendingUp, 
  Award,
  ThumbsUp,
  ExternalLink
} from 'lucide-react';

interface SocialContent {
  id: string;
  type: 'review' | 'photo' | 'tip' | 'question';
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images?: string[];
  rating?: number;
  likes: number;
  comments: number;
  shares: number;
  timestamp: number;
  productId?: string;
  productName?: string;
  verified: boolean;
  helpful: number;
}

interface CommunityStats {
  totalMembers: number;
  activeToday: number;
  totalReviews: number;
  averageRating: number;
  totalPhotos: number;
}

const SocialCommerce = () => {
  const [socialContent, setSocialContent] = useState<SocialContent[]>([]);
  const [communityStats, setCommunityStats] = useState<CommunityStats>({
    totalMembers: 15234,
    activeToday: 1247,
    totalReviews: 8932,
    averageRating: 4.6,
    totalPhotos: 4521
  });
  const [activeTab, setActiveTab] = useState<'feed' | 'reviews' | 'photos' | 'community'>('feed');
  const [newContent, setNewContent] = useState('');
  const [contentType, setContentType] = useState<'review' | 'tip' | 'question'>('tip');

  useEffect(() => {
    loadSocialContent();
  }, [activeTab]);

  const loadSocialContent = () => {
    // Simulate loading social content
    const mockContent: SocialContent[] = [
      {
        id: '1',
        type: 'review',
        userId: 'user1',
        userName: 'Sarah Johnson',
        userAvatar: '/lovable-uploads/avatar1.png',
        content: 'Just installed the WeBoost Drive Reach in our Class A motorhome. The signal improvement is incredible! Went from 1 bar to full signal in remote areas. Installation was straightforward with the included instructions.',
        rating: 5,
        likes: 23,
        comments: 8,
        shares: 4,
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
        productId: 'weboost-drive-reach',
        productName: 'WeBoost Drive Reach RV',
        verified: true,
        helpful: 19
      },
      {
        id: '2',
        type: 'photo',
        userId: 'user2',
        userName: 'Mike Roberts',
        userAvatar: '/lovable-uploads/avatar2.png',
        content: 'Our solar setup is finally complete! 800W of panels keeping our batteries topped off even on cloudy days. Living off-grid has never been easier.',
        images: ['/lovable-uploads/solar-setup1.jpg', '/lovable-uploads/solar-setup2.jpg'],
        likes: 67,
        comments: 15,
        shares: 12,
        timestamp: Date.now() - 4 * 60 * 60 * 1000,
        verified: true,
        helpful: 45
      },
      {
        id: '3',
        type: 'tip',
        userId: 'user3',
        userName: 'Lisa Chen',
        userAvatar: '/lovable-uploads/avatar3.png',
        content: 'Pro tip: Always check your tire pressure before hitting the road! I use this digital gauge and it\'s been a game-changer for maintaining proper PSI. Prevented two potential blowouts this season.',
        likes: 34,
        comments: 12,
        shares: 8,
        timestamp: Date.now() - 6 * 60 * 60 * 1000,
        productId: 'digital-tire-gauge',
        productName: 'Digital Tire Pressure Gauge',
        verified: false,
        helpful: 28
      }
    ];

    setSocialContent(mockContent);
  };

  const handleLike = (contentId: string) => {
    setSocialContent(prev => 
      prev.map(item => 
        item.id === contentId 
          ? { ...item, likes: item.likes + 1 }
          : item
      )
    );
  };

  const handleShare = (content: SocialContent) => {
    if (navigator.share) {
      navigator.share({
        title: `${content.userName}'s RV ${content.type}`,
        text: content.content,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${content.content} - ${window.location.href}`);
    }
  };

  const submitNewContent = () => {
    if (!newContent.trim()) return;

    const content: SocialContent = {
      id: Date.now().toString(),
      type: contentType,
      userId: 'current-user',
      userName: 'You',
      userAvatar: '/lovable-uploads/default-avatar.png',
      content: newContent,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: Date.now(),
      verified: false,
      helpful: 0
    };

    setSocialContent(prev => [content, ...prev]);
    setNewContent('');
  };

  return (
    <div className="space-y-6">
      {/* Community Stats Header */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Users className="h-6 w-6 text-[#5B9BD5]" />
            RV Community Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{communityStats.totalMembers.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Members</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#5B9BD5]">{communityStats.activeToday.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Active Today</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{communityStats.totalReviews.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <p className="text-2xl font-bold text-white">{communityStats.averageRating}</p>
              </div>
              <p className="text-sm text-gray-400">Avg Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{communityStats.totalPhotos.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Photos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-700">
        {[
          { id: 'feed', label: 'Feed', icon: TrendingUp },
          { id: 'reviews', label: 'Reviews', icon: Star },
          { id: 'photos', label: 'Photos', icon: Camera },
          { id: 'community', label: 'Community', icon: Users }
        ].map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-[#5B9BD5] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content Creation */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Share with the Community</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {[
              { id: 'tip', label: 'Share Tip' },
              { id: 'review', label: 'Write Review' },
              { id: 'question', label: 'Ask Question' }
            ].map(type => (
              <Button
                key={type.id}
                variant={contentType === type.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setContentType(type.id as any)}
                className={contentType === type.id ? 'bg-[#5B9BD5]' : 'border-gray-600'}
              >
                {type.label}
              </Button>
            ))}
          </div>
          
          <Textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder={
              contentType === 'tip' ? 'Share a helpful RV tip...' :
              contentType === 'review' ? 'Review a product you\'ve used...' :
              'Ask the community a question...'
            }
            className="bg-[#131a2a] border-gray-700 text-white min-h-[100px]"
          />
          
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" className="border-gray-600">
              <Camera className="h-4 w-4 mr-2" />
              Add Photos
            </Button>
            <Button 
              onClick={submitNewContent}
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3]"
              disabled={!newContent.trim()}
            >
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Content Feed */}
      <div className="space-y-4">
        {socialContent.map(content => (
          <SocialContentCard
            key={content.id}
            content={content}
            onLike={handleLike}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
};

const SocialContentCard = ({ 
  content, 
  onLike, 
  onShare 
}: {
  content: SocialContent;
  onLike: (id: string) => void;
  onShare: (content: SocialContent) => void;
}) => {
  return (
    <Card className="bg-[#091020] border-gray-700">
      <CardContent className="p-6">
        {/* User Header */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={content.userAvatar} />
            <AvatarFallback>{content.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-white">{content.userName}</h4>
              {content.verified && (
                <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                  <Award className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-400">
              {new Date(content.timestamp).toLocaleString()}
            </p>
          </div>
          <Badge 
            variant="outline" 
            className={`${
              content.type === 'review' ? 'border-yellow-600 text-yellow-400' :
              content.type === 'photo' ? 'border-purple-600 text-purple-400' :
              content.type === 'tip' ? 'border-green-600 text-green-400' :
              'border-blue-600 text-blue-400'
            }`}
          >
            {content.type.toUpperCase()}
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-gray-300 leading-relaxed">{content.content}</p>
          
          {/* Rating */}
          {content.rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < content.rating! ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                />
              ))}
              <span className="text-sm text-gray-400 ml-2">({content.rating}/5)</span>
            </div>
          )}

          {/* Product Link */}
          {content.productName && (
            <div className="flex items-center gap-2 p-3 bg-[#131a2a] rounded-lg border border-gray-700">
              <ExternalLink className="h-4 w-4 text-[#5B9BD5]" />
              <span className="text-[#5B9BD5] font-medium">{content.productName}</span>
            </div>
          )}

          {/* Images */}
          {content.images && content.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {content.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`User content ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(content.id)}
                className="flex items-center gap-2 text-gray-400 hover:text-[#5B9BD5]"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{content.likes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-400 hover:text-[#5B9BD5]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{content.comments}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(content)}
                className="flex items-center gap-2 text-gray-400 hover:text-[#5B9BD5]"
              >
                <Share2 className="h-4 w-4" />
                <span>{content.shares}</span>
              </Button>
            </div>

            {content.helpful > 0 && (
              <Badge variant="outline" className="border-green-600 text-green-400">
                {content.helpful} found helpful
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialCommerce;