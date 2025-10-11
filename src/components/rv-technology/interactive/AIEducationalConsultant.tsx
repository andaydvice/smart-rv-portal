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

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

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

  const formatAssistantMessage = (content: string) => {
    if (!content) return null;
    
    // Step 1: Remove markdown bold formatting
    let cleanText = content.replace(/\*\*/g, '');
    
    // Step 1.5: Remove hyphens between words (but preserve in numbers/codes)
    cleanText = cleanText.replace(/([a-zA-Z])-([a-zA-Z])/g, '$1 $2');
    
    // Step 2: Add line breaks before bullet points if not already present
    cleanText = cleanText.replace(/([^\n])\s*•\s*/g, '$1\n\n• ');
    
    // Step 3: Add line breaks after lines ending with colon if followed by non-whitespace
    cleanText = cleanText.replace(/:\s*([^\s])/g, ':\n\n$1');
    
    // Step 3.5: Add line breaks after sentence-ending punctuation (. ! ?)
    // Only break when followed by space and capital letter (start of new sentence)
    cleanText = cleanText.replace(/([.!?])\s*(?=[A-Z])/g, '$1\n\n');
    
    // Step 4: Split on double newlines (including our injected ones)
    const paragraphs = cleanText
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0);
    
    // Step 5: Render with proper spacing
    return paragraphs.map((para, index) => (
      <p key={index} className="text-base leading-relaxed mb-4 last:mb-0">
        {para}
      </p>
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">

      {/* Full Width Chat Interface */}
      <div className="bg-gradient-to-br from-[#091020] to-[#131a2a] border border-[#1a202c] rounded-lg p-8">
        <div className="min-h-[400px] max-h-[70vh] overflow-y-auto space-y-4 p-6 bg-black/20 rounded-lg mb-6 flex flex-col">
          {messages.length === 0 && (
            <div className="text-center text-[#E2E8FF] py-8 flex-1 flex flex-col justify-center">
              <BookOpen className="h-16 w-16 mx-auto mb-6 text-[#5B9BD5]" />
              <p className="text-xl mb-4">Welcome to your educational technology consultant!</p>
              <p className="text-lg mb-6">Ask me about RV technology concepts like solar power, connectivity options, or battery systems.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <button
                  onClick={() => setInput("How do solar panels work in RVs?")}
                  className="text-left p-4 bg-[#151A22] border border-[#1a202c] rounded-lg hover:bg-[#1a202c] transition-colors"
                >
                  <span className="text-[#5B9BD5] font-medium">How do solar panels work in RVs?</span>
                </button>
                <button
                  onClick={() => setInput("What are the different types of RV batteries?")}
                  className="text-left p-4 bg-[#151A22] border border-[#1a202c] rounded-lg hover:bg-[#1a202c] transition-colors"
                >
                  <span className="text-[#5B9BD5] font-medium">What are the different types of RV batteries?</span>
                </button>
                <button
                  onClick={() => setInput("Explain RV electrical systems basics")}
                  className="text-left p-4 bg-[#151A22] border border-[#1a202c] rounded-lg hover:bg-[#1a202c] transition-colors"
                >
                  <span className="text-[#5B9BD5] font-medium">Explain RV electrical systems basics</span>
                </button>
                <button
                  onClick={() => setInput("What internet options are available for RVs?")}
                  className="text-left p-4 bg-[#151A22] border border-[#1a202c] rounded-lg hover:bg-[#1a202c] transition-colors"
                >
                  <span className="text-[#5B9BD5] font-medium">What internet options are available for RVs?</span>
                </button>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl px-6 py-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-[#5B9BD5] text-white'
                    : 'bg-gray-700 text-[#E2E8FF]'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div>{formatAssistantMessage(message.content)}</div>
                ) : (
                  <p className="text-base leading-relaxed">{message.content}</p>
                )}
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl px-6 py-4 rounded-lg bg-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="animate-pulse flex space-x-1">
                    <div className="w-3 h-3 bg-[#5B9BD5] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#5B9BD5] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#5B9BD5] rounded-full"></div>
                  </div>
                  <span className="text-base text-[#E2E8FF]">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about RV technology concepts..."
            disabled={isLoading}
            className="flex-1 h-14 text-lg bg-[#151A22] border-[#1a202c] text-white placeholder-[#E2E8FF]/50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="h-14 px-8 bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white text-lg"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Disclaimers at bottom */}
      <div className="mt-6 space-y-4">
        <Alert className="border-yellow-500 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-200">
            <strong>Educational Use Only</strong> - This assistant provides educational information about RV technology concepts. It does not make recommendations, give financial advice, or provide purchasing guidance.
          </AlertDescription>
        </Alert>

        <Alert className="border-[#5B9BD5]/30 bg-[#5B9BD5]/10">
          <Shield className="h-4 w-4 text-[#5B9BD5]" />
          <AlertDescription className="text-[#E2E8FF] text-sm">
            Always consult with RV professionals for specific guidance. Technology specifications should be verified with manufacturers.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};