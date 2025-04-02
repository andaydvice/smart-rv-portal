
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, Info } from 'lucide-react';

interface APIKeyInputProps {
  onKeySet: (key: string) => void;
}

export const APIKeyInput: React.FC<APIKeyInputProps> = ({ onKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('oneCallAPIKey');
    if (savedKey) {
      setApiKey(savedKey);
      onKeySet(savedKey);
    }
  }, [onKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('oneCallAPIKey', apiKey);
      onKeySet(apiKey);
      setShowHint(false);
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5 text-blue-400" />
          <h2 className="text-xl font-semibold">OpenWeather API Key</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleHint}
          className="flex items-center gap-1"
        >
          <Info className="h-4 w-4" />
          <span>Help</span>
        </Button>
      </div>

      {showHint && (
        <Alert className="bg-blue-500/10 border-blue-500/50">
          <AlertDescription>
            <p>You need an OpenWeatherMap API key to use this feature. Get one for free at:</p>
            <a 
              href="https://openweathermap.org/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline mt-1 block"
            >
              openweathermap.org/api
            </a>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex-1">
          <div className="relative">
            <Input
              type={isVisible ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your OpenWeather API key"
              className="w-full pr-20"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? "Hide" : "Show"}
            </Button>
          </div>
        </div>
        <Button type="submit">Set API Key</Button>
      </form>
    </div>
  );
};
