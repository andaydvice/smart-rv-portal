import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Search, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface VoiceSearchProps {
  onSearch?: (query: string) => void;
  onClose?: () => void;
  className?: string;
}

// Speech recognition types are now defined in global.d.ts

const VoiceSearch = ({ onSearch, onClose, className = "" }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  // Check for speech recognition support
  useEffect(() => {
    const supported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    setIsSupported(supported);
  }, []);

  // RV-specific search suggestions and routing
  const processVoiceQuery = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Route to specific pages based on voice commands
    if (lowerQuery.includes('solar') || lowerQuery.includes('panel')) {
      navigate('/solar-power-guide');
      return;
    }
    
    if (lowerQuery.includes('emergency') || lowerQuery.includes('help') || lowerQuery.includes('roadside')) {
      navigate('/rv-emergency-center');
      return;
    }
    
    if (lowerQuery.includes('app') || lowerQuery.includes('tool')) {
      navigate('/rv-apps-hub');
      return;
    }
    
    if (lowerQuery.includes('calculator') || lowerQuery.includes('cost') || lowerQuery.includes('budget')) {
      navigate('/calculators');
      return;
    }
    
    if (lowerQuery.includes('blog') || lowerQuery.includes('article')) {
      navigate('/blog');
      return;
    }
    
    // Default search
    onSearch?.(query);
  }, [navigate, onSearch]);

  // Generate contextual suggestions
  const generateSuggestions = useCallback((partial: string) => {
    const commonQueries = [
      "Find me solar panels under $500",
      "Show emergency roadside assistance",
      "Best RV apps for navigation", 
      "Calculate my RV trip cost",
      "RV maintenance checklist",
      "Campground reviews near me",
      "RV insurance comparison",
      "Battery monitoring systems",
      "Water filter recommendations",
      "RV security systems"
    ];

    if (!partial) return commonQueries.slice(0, 5);

    return commonQueries.filter(query => 
      query.toLowerCase().includes(partial.toLowerCase())
    ).slice(0, 5);
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const currentTranscript = finalTranscript || interimTranscript;
      setTranscript(currentTranscript);
      setSuggestions(generateSuggestions(currentTranscript));

      // Auto-search when speech is final and contains enough content
      if (finalTranscript && finalTranscript.trim().length > 3) {
        processVoiceQuery(finalTranscript);
        recognition.stop();
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [isSupported, generateSuggestions, processVoiceQuery]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  const handleTextSearch = useCallback(() => {
    if (transcript.trim()) {
      processVoiceQuery(transcript);
    }
  }, [transcript, processVoiceQuery]);

  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }, []);

  if (!isSupported) {
    return (
      <Card className={cn("bg-[#091020] border-gray-700", className)}>
        <CardContent className="p-6 text-center">
          <Mic className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">Voice search is not supported in this browser</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-[#091020] border-gray-700", className)}>
      <CardContent className="p-6">
        {/* Voice Search Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Voice Search</h3>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400">
              ✕
            </Button>
          )}
        </div>

        {/* Voice Input Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                value={transcript}
                onChange={(e) => {
                  setTranscript(e.target.value);
                  setSuggestions(generateSuggestions(e.target.value));
                }}
                placeholder="Say something like 'Find me solar panels under $500'"
                className="bg-[#131a2a] border-gray-700 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleTextSearch()}
              />
            </div>
            
            <Button
              onClick={isListening ? stopListening : startListening}
              variant={isListening ? "destructive" : "default"}
              size="lg"
              className={cn(
                "min-h-[48px] min-w-[48px] touch-manipulation",
                isListening && "animate-pulse bg-red-600 hover:bg-red-700"
              )}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>

            <Button
              onClick={handleTextSearch}
              variant="outline"
              size="lg"
              className="min-h-[48px] min-w-[48px] touch-manipulation border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#5B9BD5] hover:text-white"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Listening Indicator */}
          {isListening && (
            <div className="flex items-center justify-center gap-2 text-[#5B9BD5]">
              <div className="flex gap-1">
                <div className="w-2 h-6 bg-[#5B9BD5] rounded animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-8 bg-[#5B9BD5] rounded animate-pulse" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-4 bg-[#5B9BD5] rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-sm">Listening...</span>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && !isListening && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Suggestions:</p>
              <div className="grid gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTranscript(suggestion);
                      processVoiceQuery(suggestion);
                    }}
                    className="text-left p-3 bg-[#131a2a] hover:bg-[#1e2832] rounded border border-gray-700 transition-colors touch-manipulation"
                  >
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-[#5B9BD5]" />
                      <span className="text-white text-sm">{suggestion}</span>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(suggestion);
                        }}
                        variant="ghost"
                        size="sm"
                        className="ml-auto p-1 h-auto"
                      >
                        <Volume2 className="h-3 w-3 text-gray-400" />
                      </Button>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Voice Commands Help */}
          <div className="bg-[#131a2a] rounded-lg p-4 border border-gray-700">
            <h4 className="text-sm font-medium text-[#5B9BD5] mb-2">Try saying:</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• "Find me solar panels under $500"</li>
              <li>• "Show emergency roadside assistance"</li>
              <li>• "Best RV apps for navigation"</li>
              <li>• "Calculate my RV trip cost"</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceSearch;