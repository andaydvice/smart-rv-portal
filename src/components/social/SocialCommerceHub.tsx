import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Share2, 
  Heart, 
  MessageCircle, 
  Star, 
  Camera, 
  Users, 
  TrendingUp,
  Award,
  CheckCircle,
  ExternalLink,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react';

interface SocialPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: number;
  };
  content: string;
  images: string[];
  product?: {
    name: string;
    price: number;
    affiliateLink: string;
  };
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  platform: 'instagram' | 'facebook' | 'twitter' | 'youtube' | 'native';
}

interface Influencer {
  id: string;
  name: string;
  avatar: string;
  platform: string;
  followers: number;
  engagementRate: number;
  averageViews: number;
  category: string;
  verified: boolean;
  partnershipStatus: 'active' | 'pending' | 'interested';
}

interface CommunityReview {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  product: string;
  rating: number;
  title: string;
  content: string;
  images: string[];
  helpful: number;
  timestamp: Date;
  featured: boolean;
}

const SocialCommerceHub = () => {
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    {
      id: '1',
      user: {
        name: 'RV_Adventures_Mike',
        avatar: '/lovable-uploads/72144d64-5f93-4ee2-8187-e495f556f206.png',
        verified: true,
        followers: 24500
      },
      content: 'Just installed the new solar panel system from @SmartRVTech! The setup was so easy and now I\'m completely off-grid. Game changer! 🌞⚡ #RVLife #SolarPower',
      images: ['/lovable-uploads/23ce0af4-35ca-4e7f-af56-c1a7c6eae380.png'],
      product: {
        name: '400W Solar Panel Kit',
        price: 799.99,
        affiliateLink: 'https://example.com/solar-kit'
      },
      likes: 342,
      comments: 28,
      shares: 15,
      timestamp: new Date('2024-07-08T10:30:00'),
      platform: 'instagram'
    },
    {
      id: '2',
      user: {
        name: 'WanderlustCouple',
        avatar: '/lovable-uploads/cf3a586f-ae68-4a54-953f-b83505056d0e.png',
        verified: false,
        followers: 8900
      },
      content: 'Our SmartRV security system just alerted us about movement around our RV while we were hiking. Peace of mind is priceless when you\'re boondocking! 🔒📱',
      images: [],
      product: {
        name: 'Smart Security System',
        price: 449.99,
        affiliateLink: 'https://example.com/security-system'
      },
      likes: 156,
      comments: 12,
      shares: 8,
      timestamp: new Date('2024-07-08T08:45:00'),
      platform: 'facebook'
    }
  ]);

  const [influencers, setInfluencers] = useState<Influencer[]>([
    {
      id: '1',
      name: 'RVLife_Explorer',
      avatar: '/lovable-uploads/1e3c2aa7-d13d-4cbd-a98a-37066b326f1d.png',
      platform: 'YouTube',
      followers: 125000,
      engagementRate: 4.8,
      averageViews: 35000,
      category: 'RV Tech Reviews',
      verified: true,
      partnershipStatus: 'active'
    },
    {
      id: '2',
      name: 'NomadicFanatic',
      avatar: '/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png',
      platform: 'Instagram',
      followers: 89000,
      engagementRate: 6.2,
      averageViews: 15000,
      category: 'RV Adventures',
      verified: true,
      partnershipStatus: 'active'
    },
    {
      id: '3',
      name: 'TechSavvyRVer',
      avatar: '/lovable-uploads/ae930cf7-205f-41d3-9c9b-a4969e5c35e6.png',
      platform: 'TikTok',
      followers: 67000,
      engagementRate: 8.1,
      averageViews: 42000,
      category: 'Smart RV Tech',
      verified: false,
      partnershipStatus: 'pending'
    }
  ]);

  const [communityReviews, setCommunityReviews] = useState<CommunityReview[]>([
    {
      id: '1',
      user: {
        name: 'Sarah_RVer',
        avatar: '/lovable-uploads/c1732ddf-458c-4eeb-b6ad-7a817ae9ba17.png',
        verified: true
      },
      product: 'Smart Water Management System',
      rating: 5,
      title: 'Best RV upgrade I\'ve ever made!',
      content: 'This system has completely transformed how I manage water in my RV. No more guessing about tank levels, and the leak detection saved me from a potential disaster. The app is intuitive and the installation was straightforward.',
      images: ['/lovable-uploads/d3b696f0-39e5-4cfa-b38c-6579325a495a.png'],
      helpful: 23,
      timestamp: new Date('2024-07-07T15:20:00'),
      featured: true
    },
    {
      id: '2',
      user: {
        name: 'FullTimeRVFamily',
        avatar: '/lovable-uploads/e6619d24-bebf-439f-96b0-6aca2fb69380.png',
        verified: false
      },
      product: 'Backup Camera System',
      rating: 4,
      title: 'Great quality, easy installation',
      content: 'The picture quality is excellent and night vision works well. Installation took about 2 hours. Only minor complaint is the monitor could be slightly larger, but overall very happy with the purchase.',
      images: [],
      helpful: 18,
      timestamp: new Date('2024-07-06T11:45:00'),
      featured: false
    }
  ]);

  const [socialMetrics, setSocialMetrics] = useState({
    totalFollowers: 456789,
    monthlyReach: 1200000,
    engagementRate: 5.8,
    ugcPosts: 1247,
    socialConversions: 892,
    influencerROI: 340
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'youtube': return <Youtube className="h-4 w-4" />;
      default: return <Share2 className="h-4 w-4" />;
    }
  };

  const getPartnershipColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'pending': return 'bg-yellow-600';
      case 'interested': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Social Commerce Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Share2 className="h-6 w-6 text-[#5B9BD5]" />
            Social Commerce & Community Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{socialMetrics.totalFollowers.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Total Followers</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{(socialMetrics.monthlyReach / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-400">Monthly Reach</p>
            </div>
            
            <div className="text-center">
              <Heart className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{socialMetrics.engagementRate}%</p>
              <p className="text-sm text-gray-400">Engagement Rate</p>
            </div>
            
            <div className="text-center">
              <Camera className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{socialMetrics.ugcPosts.toLocaleString()}</p>
              <p className="text-sm text-gray-400">UGC Posts</p>
            </div>
            
            <div className="text-center">
              <Award className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{socialMetrics.socialConversions}</p>
              <p className="text-sm text-gray-400">Social Conversions</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{socialMetrics.influencerROI}%</p>
              <p className="text-sm text-gray-400">Influencer ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Posts Feed */}
        <Card className="bg-[#091020] border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <MessageCircle className="h-6 w-6 text-[#5B9BD5]" />
              User-Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialPosts.map((post) => (
                <div key={post.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-medium">{post.user.name}</h4>
                        {post.user.verified && (
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                        )}
                        {getPlatformIcon(post.platform)}
                      </div>
                      <p className="text-sm text-gray-400">{post.user.followers.toLocaleString()} followers</p>
                    </div>
                    <Badge className="bg-[#5B9BD5] text-white">
                      UGC
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{post.content}</p>
                  
                  {post.images.length > 0 && (
                    <div className="mb-3">
                      <img 
                        src={post.images[0]} 
                        alt="Social post" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  {post.product && (
                    <div className="p-3 bg-[#091020] rounded border border-gray-600 mb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-white font-medium">{post.product.name}</h5>
                          <p className="text-[#5B9BD5] font-bold">${post.product.price}</p>
                        </div>
                        <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Shop
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="h-4 w-4" />
                      {post.shares}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Influencer Partnership Dashboard */}
        <Card className="bg-[#091020] border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <Award className="h-6 w-6 text-[#5B9BD5]" />
              Influencer Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {influencers.map((influencer) => (
                <div key={influencer.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={influencer.avatar} />
                      <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-medium">{influencer.name}</h4>
                        {influencer.verified && (
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{influencer.platform} • {influencer.category}</p>
                    </div>
                    <Badge className={`${getPartnershipColor(influencer.partnershipStatus)} text-white`}>
                      {influencer.partnershipStatus}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{(influencer.followers / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-gray-400">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{influencer.engagementRate}%</p>
                      <p className="text-xs text-gray-400">Engagement</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{(influencer.averageViews / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-gray-400">Avg Views</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-400">
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Reviews */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Star className="h-6 w-6 text-[#5B9BD5]" />
            Community Reviews & Social Proof
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {communityReviews.map((review) => (
              <div key={review.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.user.avatar} />
                    <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-medium">{review.user.name}</h4>
                      {review.user.verified && (
                        <CheckCircle className="h-4 w-4 text-blue-400" />
                      )}
                      {review.featured && (
                        <Badge className="bg-yellow-600 text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <h5 className="text-white font-medium mb-2">{review.title}</h5>
                <p className="text-gray-400 text-sm mb-2">Product: {review.product}</p>
                <p className="text-gray-300 text-sm mb-3">{review.content}</p>
                
                {review.images.length > 0 && (
                  <div className="mb-3">
                    <img 
                      src={review.images[0]} 
                      alt="Review" 
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {review.helpful} helpful
                  </span>
                  <span>{review.timestamp.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialCommerceHub;