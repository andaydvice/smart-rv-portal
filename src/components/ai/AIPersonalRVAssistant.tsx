import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  AlertTriangle, 
  Wrench,
  Route,
  Thermometer,
  Battery,
  Fuel,
  Shield
} from 'lucide-react';

interface RVAssistantState {
  isActive: boolean;
  currentContext: string;
  userProfile: {
    rvType: string;
    experience: string;
    location: string;
    preferences: string[];
  };
  activeConversations: number;
  dailyInteractions: number;
  satisfactionScore: number;
}

interface MaintenanceReminder {
  id: string;
  type: 'oil_change' | 'tire_rotation' | 'brake_check' | 'battery_test' | 'generator_service';
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  mileage?: number;
  isOverdue: boolean;
}

interface TripPlan {
  id: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  route: RoutePoint[];
  weatherAlerts: WeatherAlert[];
  estimatedCost: number;
  status: 'planning' | 'confirmed' | 'active' | 'completed';
}

interface RoutePoint {
  location: string;
  type: 'camp' | 'fuel' | 'rest' | 'attraction';
  coordinates: { lat: number; lng: number };
  estimatedArrival: Date;
  notes?: string;
}

interface WeatherAlert {
  type: 'severe_weather' | 'temperature_extreme' | 'road_conditions';
  severity: 'watch' | 'warning' | 'emergency';
  description: string;
  affectedArea: string;
  startTime: Date;
  endTime: Date;
}

const AIPersonalRVAssistant = () => {
  const [assistantState, setAssistantState] = useState<RVAssistantState>({
    isActive: true,
    currentContext: 'general',
    userProfile: {
      rvType: 'Class A Motorhome',
      experience: 'Intermediate',
      location: 'Colorado, USA',
      preferences: ['National Parks', 'Boondocking', 'Solar Power']
    },
    activeConversations: 23,
    dailyInteractions: 156,
    satisfactionScore: 4.7
  });

  const [maintenanceReminders, setMaintenanceReminders] = useState<MaintenanceReminder[]>([
    {
      id: '1',
      type: 'oil_change',
      description: 'Engine oil change and filter replacement',
      dueDate: new Date('2024-08-15'),
      priority: 'high',
      mileage: 5000,
      isOverdue: false
    },
    {
      id: '2',
      type: 'tire_rotation',
      description: 'Rotate all six tires and check pressure',
      dueDate: new Date('2024-07-20'),
      priority: 'medium',
      mileage: 6000,
      isOverdue: true
    },
    {
      id: '3',
      type: 'generator_service',
      description: 'Generator annual service and load test',
      dueDate: new Date('2024-09-01'),
      priority: 'medium',
      isOverdue: false
    }
  ]);

  const [tripPlans, setTripPlans] = useState<TripPlan[]>([
    {
      id: '1',
      destination: 'Yellowstone National Park',
      startDate: new Date('2024-08-01'),
      endDate: new Date('2024-08-14'),
      route: [],
      weatherAlerts: [
        {
          type: 'temperature_extreme',
          severity: 'watch',
          description: 'Overnight temperatures may drop below 35°F',
          affectedArea: 'Yellowstone area',
          startTime: new Date('2024-08-05'),
          endTime: new Date('2024-08-07')
        }
      ],
      estimatedCost: 2850,
      status: 'planning'
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'assistant',
      message: 'Good morning! I noticed your oil change is coming up in 2 weeks. Would you like me to help you find nearby service centers?',
      timestamp: new Date(),
      context: 'maintenance'
    },
    {
      id: '2',
      sender: 'user',
      message: 'Yes, I\'ll be near Denver. What are my options?',
      timestamp: new Date(),
      context: 'maintenance'
    },
    {
      id: '3',
      sender: 'assistant',
      message: 'I found 3 highly-rated RV service centers in Denver. Mile High RV has the best reviews for Class A motorhomes. Would you like me to check their availability?',
      timestamp: new Date(),
      context: 'maintenance'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const getMaintenanceIcon = (type: string) => {
    switch (type) {
      case 'oil_change': return <Fuel className="h-4 w-4" />;
      case 'tire_rotation': return <Route className="h-4 w-4" />;
      case 'brake_check': return <Shield className="h-4 w-4" />;
      case 'battery_test': return <Battery className="h-4 w-4" />;
      case 'generator_service': return <Wrench className="h-4 w-4" />;
      default: return <Wrench className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-600 text-red-400';
      case 'high': return 'border-orange-600 text-orange-400';
      case 'medium': return 'border-yellow-600 text-yellow-400';
      case 'low': return 'border-green-600 text-green-400';
      default: return 'border-gray-600 text-gray-400';
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
      context: 'general'
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        message: generateAIResponse(newMessage),
        timestamp: new Date(),
        context: 'general'
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setNewMessage('');
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "I'd be happy to help you with that! Let me check the latest RV regulations and best practices for your situation.",
      "Based on your Class A motorhome and preferences, I recommend considering these options. Would you like more details?",
      "That's a great question! For RVers in Colorado, here's what I've found from current weather and road conditions...",
      "I can help you plan that route! Let me factor in RV-friendly stops, fuel stations, and overnight camping options.",
      "Safety first! I notice some weather alerts for your planned route. Here are my recommendations for adjustments."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="space-y-6">
      {/* Assistant Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Bot className="h-6 w-6 text-[#5B9BD5]" />
            AI Personal RV Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <MessageCircle className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{assistantState.activeConversations}</p>
              <p className="text-sm text-gray-400">Active Conversations</p>
            </div>
            
            <div className="text-center">
              <Bot className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{assistantState.dailyInteractions}</p>
              <p className="text-sm text-gray-400">Daily Interactions</p>
            </div>
            
            <div className="text-center">
              <span className="text-2xl">⭐</span>
              <p className="text-2xl font-bold text-white">{assistantState.satisfactionScore}</p>
              <p className="text-sm text-gray-400">Satisfaction Score</p>
            </div>
            
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${assistantState.isActive ? 'bg-green-400' : 'bg-red-400'}`} />
              <p className="text-lg font-bold text-white">{assistantState.isActive ? 'Online' : 'Offline'}</p>
              <p className="text-sm text-gray-400">Assistant Status</p>
            </div>
          </div>

          {/* User Profile */}
          <div className="mt-6 p-4 bg-[#131a2a] rounded-lg border border-gray-700">
            <h4 className="text-white font-medium mb-3">Your RV Profile</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">RV Type</p>
                <p className="text-white">{assistantState.userProfile.rvType}</p>
              </div>
              <div>
                <p className="text-gray-400">Experience Level</p>
                <p className="text-white">{assistantState.userProfile.experience}</p>
              </div>
              <div>
                <p className="text-gray-400">Location</p>
                <p className="text-white">{assistantState.userProfile.location}</p>
              </div>
              <div>
                <p className="text-gray-400">Interests</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {assistantState.userProfile.preferences.map((pref, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5] text-xs">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Scheduling */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Calendar className="h-6 w-6 text-[#5B9BD5]" />
            Smart Maintenance Scheduling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceReminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className={`p-4 rounded-lg border ${getPriorityColor(reminder.priority)} ${reminder.isOverdue ? 'bg-red-900/20' : 'bg-[#131a2a]'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getMaintenanceIcon(reminder.type)}
                    <h4 className="text-white font-medium">{reminder.description}</h4>
                    {reminder.isOverdue && (
                      <Badge className="bg-red-600 text-white">Overdue</Badge>
                    )}
                  </div>
                  <Badge variant="outline" className={getPriorityColor(reminder.priority)}>
                    {reminder.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-400">
                    <span>Due: {reminder.dueDate.toLocaleDateString()}</span>
                    {reminder.mileage && <span>Every {reminder.mileage} miles</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                      Reschedule
                    </Button>
                    <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                      Mark Complete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trip Planning */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Route className="h-6 w-6 text-[#5B9BD5]" />
            Intelligent Trip Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tripPlans.map((trip) => (
              <div key={trip.id} className="p-4 bg-[#131a2a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#5B9BD5]" />
                    <h4 className="text-white font-medium">{trip.destination}</h4>
                    <Badge className={`${
                      trip.status === 'planning' ? 'bg-yellow-600' :
                      trip.status === 'confirmed' ? 'bg-green-600' :
                      trip.status === 'active' ? 'bg-blue-600' : 'bg-gray-600'
                    } text-white`}>
                      {trip.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">${trip.estimatedCost.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">Estimated Cost</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-gray-400 text-sm">Dates</p>
                    <p className="text-white">{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white">{Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24))} days</p>
                  </div>
                </div>

                {/* Weather Alerts */}
                {trip.weatherAlerts.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Weather Alerts
                    </h5>
                    {trip.weatherAlerts.map((alert, index) => (
                      <div key={index} className="p-2 bg-yellow-900/20 border border-yellow-600/30 rounded text-sm">
                        <p className="text-yellow-400 font-medium">{alert.description}</p>
                        <p className="text-gray-400">{alert.affectedArea} • {alert.startTime.toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                    Modify Route
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                    Weather Updates
                  </Button>
                  <Button size="sm" className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
                    Confirm Trip
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <MessageCircle className="h-6 w-6 text-[#5B9BD5]" />
            Ask Your RV Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto space-y-3 p-4 bg-[#131a2a] rounded-lg border border-gray-700">
              {chatMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-[#5B9BD5] text-white' 
                      : 'bg-[#091020] border border-gray-700 text-gray-300'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask about maintenance, trip planning, weather, or RV advice..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-[#131a2a] border-gray-600 text-white"
              />
              <Button
                onClick={sendMessage}
                className="bg-[#5B9BD5] hover:bg-[#4B8FE3]"
              >
                Send
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="border-gray-600 text-gray-400 hover:border-[#5B9BD5] hover:text-[#5B9BD5]"
                onClick={() => setNewMessage("What maintenance does my RV need?")}
              >
                Check Maintenance
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-gray-600 text-gray-400 hover:border-[#5B9BD5] hover:text-[#5B9BD5]"
                onClick={() => setNewMessage("Plan a trip to national parks")}
              >
                Plan Trip
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-gray-600 text-gray-400 hover:border-[#5B9BD5] hover:text-[#5B9BD5]"
                onClick={() => setNewMessage("What's the weather forecast for my route?")}
              >
                Weather Check
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-gray-600 text-gray-400 hover:border-[#5B9BD5] hover:text-[#5B9BD5]"
                onClick={() => setNewMessage("Emergency assistance needed")}
              >
                Emergency Help
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPersonalRVAssistant;