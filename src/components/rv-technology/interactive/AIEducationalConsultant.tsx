import React, { useState } from 'react';
import { MessageCircle, Send, BookOpen, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIEducationalConsultant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !hasAcceptedTerms) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-educational-assistant', {
        body: {
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage.content }
          ],
          context: { type: 'general_education' }
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'I apologize, but I cannot provide a response at this time. Please consult with RV professionals for guidance.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('AI consultation error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but the educational assistant is temporarily unavailable. For RV technology guidance, please consult with dealers or RV professionals who can provide hands on demonstrations and specific advice.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!hasAcceptedTerms) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-connectivity-darkBg border-gray-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-connectivity-accent" />
            <Shield className="h-6 w-6 text-green-500" />
          </div>
          <CardTitle className="text-white">RV Technology Educational Assistant</CardTitle>
          <CardDescription className="text-[#E2E8FF]">
            AI powered educational guidance for understanding RV technology concepts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-yellow-500 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-200">
              <strong>Educational Use Only</strong> - This assistant provides educational information about RV technology concepts.
              <br />
              <br />
              It does not make recommendations, give financial advice, or provide purchasing guidance.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">What this assistant can help you understand:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Badge variant="outline" className="justify-start p-3 border-connectivity-accent text-white bg-connectivity-accent/10">
                Technology concepts and how they work
              </Badge>
              <Badge variant="outline" className="justify-start p-3 border-connectivity-accent text-white bg-connectivity-accent/10">
                General considerations for different usage scenarios
              </Badge>
              <Badge variant="outline" className="justify-start p-3 border-connectivity-accent text-white bg-connectivity-accent/10">
                Educational explanations of features and capabilities
              </Badge>
              <Badge variant="outline" className="justify-start p-3 border-connectivity-accent text-white bg-connectivity-accent/10">
                Learning resources and research guidance
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Important disclaimers:</h3>
            <ul className="text-sm text-[#E2E8FF] space-y-2">
              <li>• All information is for educational purposes only</li>
              <li>• No recommendations or purchasing advice will be provided</li>
              <li>• Always consult with RV professionals for specific guidance</li>
              <li>• Technology specifications should be verified with manufacturers</li>
              <li>• This tool does not guarantee any outcomes or performance</li>
            </ul>
          </div>

          <Button 
            onClick={() => setHasAcceptedTerms(true)}
            className="w-full bg-connectivity-accent hover:bg-blue-600 text-white"
          >
            I Understand - Start Educational Session
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Fixed Header - Always Visible */}
      <div className="mb-6 p-6 bg-gradient-to-br from-[#091020] to-[#131a2a] border border-[#1a202c] rounded-lg text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="h-10 w-10 text-[#5B9BD5]" />
          <MessageCircle className="h-8 w-8 text-[#60A5FA]" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">RV Technology Educational Assistant</h1>
        <p className="text-[#E2E8FF] text-lg">
          Ask questions about RV technology concepts for educational understanding
        </p>
      </div>

      {/* Chat Interface */}
      <div className="bg-gradient-to-br from-[#091020] to-[#131a2a] border border-[#1a202c] rounded-lg p-6">
        <div className="h-96 overflow-y-auto space-y-4 p-4 bg-black/20 rounded-lg mb-4">
          {messages.length === 0 && (
            <div className="text-center text-[#E2E8FF]">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-[#5B9BD5]" />
              <p className="mb-2">Welcome to your educational technology consultant!</p>
              <p className="text-sm">Ask me about RV technology concepts like solar power, connectivity options, or battery systems.</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-[#5B9BD5] text-white'
                    : 'bg-gray-700 text-[#E2E8FF]'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="animate-pulse flex space-x-1">
                    <div className="w-2 h-2 bg-[#5B9BD5] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#5B9BD5] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#5B9BD5] rounded-full"></div>
                  </div>
                  <span className="text-sm text-[#E2E8FF]">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <Alert className="border-[#5B9BD5]/30 bg-[#5B9BD5]/10 mb-4">
          <Shield className="h-4 w-4 text-[#5B9BD5]" />
          <AlertDescription className="text-[#E2E8FF] text-sm">
            Remember: This is educational information only. Always consult RV professionals for specific advice.
          </AlertDescription>
        </Alert>

        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about RV technology concepts..."
            disabled={isLoading}
            className="flex-1 bg-[#151A22] border-[#1a202c] text-white placeholder-[#E2E8FF]/50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};