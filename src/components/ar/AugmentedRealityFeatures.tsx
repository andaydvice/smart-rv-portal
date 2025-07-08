import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Scan, 
  Box, 
  MapPin, 
  Wrench, 
  Share2, 
  Camera,
  RotateCcw,
  ZoomIn,
  Settings,
  Smartphone
} from 'lucide-react';

interface ARFeature {
  id: string;
  name: string;
  type: 'visualization' | 'installation' | 'troubleshooting' | 'tour' | 'social';
  description: string;
  isActive: boolean;
  usageCount: number;
  accuracy: number;
}

interface ARSession {
  id: string;
  featureType: string;
  duration: number;
  deviceType: 'mobile' | 'tablet';
  location: string;
  timestamp: Date;
  success: boolean;
}

const AugmentedRealityFeatures = () => {
  const [arFeatures, setArFeatures] = useState<ARFeature[]>([
    {
      id: '1',
      name: 'RV Product Visualization',
      type: 'visualization',
      description: 'Preview how solar panels, awnings, and accessories will look on your RV',
      isActive: true,
      usageCount: 1247,
      accuracy: 94.2
    },
    {
      id: '2',
      name: 'Virtual RV Tours',
      type: 'tour',
      description: 'Take 360° virtual tours of RV interiors and layouts',
      isActive: true,
      usageCount: 892,
      accuracy: 96.8
    },
    {
      id: '3',
      name: 'Installation Guide Overlay',
      type: 'installation',
      description: 'Step-by-step AR instructions for RV modifications and repairs',
      isActive: true,
      usageCount: 634,
      accuracy: 91.5
    },
    {
      id: '4',
      name: 'Interactive Troubleshooting',
      type: 'troubleshooting',
      description: 'Point camera at RV components for instant diagnostic information',
      isActive: true,
      usageCount: 445,
      accuracy: 89.3
    },
    {
      id: '5',
      name: 'AR Social Sharing',
      type: 'social',
      description: 'Share AR experiences and virtual RV setups with the community',
      isActive: false,
      usageCount: 234,
      accuracy: 87.1
    }
  ]);

  const [recentSessions, setRecentSessions] = useState<ARSession[]>([
    {
      id: '1',
      featureType: 'Product Visualization',
      duration: 145,
      deviceType: 'mobile',
      location: 'Denver, CO',
      timestamp: new Date('2024-07-08T10:30:00'),
      success: true
    },
    {
      id: '2',
      featureType: 'Virtual Tour',
      duration: 320,
      deviceType: 'tablet',
      location: 'Phoenix, AZ',
      timestamp: new Date('2024-07-08T09:15:00'),
      success: true
    },
    {
      id: '3',
      featureType: 'Installation Guide',
      duration: 480,
      deviceType: 'mobile',
      location: 'Austin, TX',
      timestamp: new Date('2024-07-08T08:45:00'),
      success: false
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState('solar_panel');
  const [arMode, setARMode] = useState<'preview' | 'installation' | 'troubleshooting'>('preview');
  const [isARActive, setIsARActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const productOptions = [
    { value: 'solar_panel', label: 'Solar Panel System' },
    { value: 'awning', label: 'Retractable Awning' },
    { value: 'backup_camera', label: 'Backup Camera' },
    { value: 'bike_rack', label: 'Bike Rack Mount' },
    { value: 'satellite_dish', label: 'Satellite Dish' },
    { value: 'generator', label: 'External Generator' }
  ];

  const startARSession = async () => {
    setIsARActive(true);
    
    try {
      // Request camera permission and start video stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Failed to access camera:', error);
      setIsARActive(false);
    }
  };

  const stopARSession = () => {
    setIsARActive(false);
    
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const getFeatureIcon = (type: string) => {
    switch (type) {
      case 'visualization': return <Box className="h-5 w-5" />;
      case 'tour': return <MapPin className="h-5 w-5" />;
      case 'installation': return <Wrench className="h-5 w-5" />;
      case 'troubleshooting': return <Scan className="h-5 w-5" />;
      case 'social': return <Share2 className="h-5 w-5" />;
      default: return <Box className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'visualization': return 'border-blue-600 text-blue-400';
      case 'tour': return 'border-green-600 text-green-400';
      case 'installation': return 'border-purple-600 text-purple-400';
      case 'troubleshooting': return 'border-orange-600 text-orange-400';
      case 'social': return 'border-pink-600 text-pink-400';
      default: return 'border-gray-600 text-gray-400';
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* AR Features Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Scan className="h-6 w-6 text-[#5B9BD5]" />
            Augmented Reality Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <Camera className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{arFeatures.filter(f => f.isActive).length}</p>
              <p className="text-sm text-gray-400">Active Features</p>
            </div>
            
            <div className="text-center">
              <Smartphone className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{arFeatures.reduce((sum, f) => sum + f.usageCount, 0).toLocaleString()}</p>
              <p className="text-sm text-gray-400">Total Sessions</p>
            </div>
            
            <div className="text-center">
              <Settings className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">92.4%</p>
              <p className="text-sm text-gray-400">Avg Accuracy</p>
            </div>
            
            <div className="text-center">
              <Share2 className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-sm text-gray-400">Shared Experiences</p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {arFeatures.map((feature) => (
              <div key={feature.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getFeatureIcon(feature.type)}
                    <h4 className="text-white font-medium">{feature.name}</h4>
                  </div>
                  <Badge 
                    className={`${feature.isActive ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                  >
                    {feature.isActive ? 'Active' : 'Disabled'}
                  </Badge>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{feature.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>{feature.usageCount} sessions</span>
                  <span>{feature.accuracy}% accuracy</span>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3]"
                  disabled={!feature.isActive}
                  onClick={() => {
                    if (feature.type === 'visualization') {
                      setARMode('preview');
                      startARSession();
                    }
                  }}
                >
                  Launch AR
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AR Camera Interface */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Camera className="h-6 w-6 text-[#5B9BD5]" />
            AR Product Visualizer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AR Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Select Product
                </label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="bg-[#131a2a] border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#131a2a] border-gray-600">
                    {productOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  AR Mode
                </label>
                <Select value={arMode} onValueChange={(value: any) => setARMode(value)}>
                  <SelectTrigger className="bg-[#131a2a] border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#131a2a] border-gray-600">
                    <SelectItem value="preview" className="text-white">Product Preview</SelectItem>
                    <SelectItem value="installation" className="text-white">Installation Guide</SelectItem>
                    <SelectItem value="troubleshooting" className="text-white">Troubleshooting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                {!isARActive ? (
                  <Button 
                    onClick={startARSession}
                    className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3]"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Start AR Session
                  </Button>
                ) : (
                  <Button 
                    onClick={stopARSession}
                    variant="outline"
                    className="w-full border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    Stop AR Session
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-400"
                  disabled={!isARActive}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Position
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-400"
                  disabled={!isARActive}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Experience
                </Button>
              </div>
            </div>

            {/* AR Camera View */}
            <div className="lg:col-span-2">
              <div className="relative aspect-video bg-[#131a2a] rounded-lg border border-gray-700 overflow-hidden">
                {isARActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400">Start AR session to begin</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Point your camera at your RV to see {productOptions.find(p => p.value === selectedProduct)?.label} placement
                      </p>
                    </div>
                  </div>
                )}

                {/* AR Overlay UI */}
                {isARActive && (
                  <>
                    {/* AR Crosshair */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 border-2 border-[#5B9BD5] rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#5B9BD5] rounded-full" />
                      </div>
                    </div>

                    {/* AR Controls Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-white/30 text-white bg-black/30">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/30 text-white bg-black/30">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-white text-sm bg-black/50 px-3 py-1 rounded">
                          Tap to place {productOptions.find(p => p.value === selectedProduct)?.label}
                        </p>
                      </div>
                      
                      <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                        Capture
                      </Button>
                    </div>

                    {/* AR Info Panel */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-xs">
                      <h4 className="font-medium mb-1">{productOptions.find(p => p.value === selectedProduct)?.label}</h4>
                      <p className="text-sm text-gray-300">
                        {arMode === 'preview' && 'Position the product on your RV to see how it will look'}
                        {arMode === 'installation' && 'Follow the step-by-step installation guide'}
                        {arMode === 'troubleshooting' && 'Point camera at component for diagnostic info'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent AR Sessions */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <MapPin className="h-6 w-6 text-[#5B9BD5]" />
            Recent AR Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div key={session.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-medium">{session.featureType}</h4>
                    <Badge className={`${session.success ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                      {session.success ? 'Success' : 'Failed'}
                    </Badge>
                    <Badge variant="outline" className="border-[#5B9BD5] text-[#5B9BD5]">
                      {session.deviceType}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">{session.timestamp.toLocaleString()}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Duration: {Math.floor(session.duration / 60)}m {session.duration % 60}s</span>
                  <span>Location: {session.location}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AugmentedRealityFeatures;