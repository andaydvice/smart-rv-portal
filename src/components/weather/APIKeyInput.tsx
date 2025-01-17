import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface APIKeyInputProps {
  onKeySet: (key: string) => void;
}

export const APIKeyInput: React.FC<APIKeyInputProps> = ({ onKeySet }) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('oneCallAPIKey');
    if (savedKey) {
      setApiKey(savedKey);
      onKeySet(savedKey);
    }
  }, [onKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('oneCallAPIKey', apiKey);
    onKeySet(apiKey);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
      <div className="flex-1">
        <Input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenWeather API key"
          className="w-full"
        />
      </div>
      <Button type="submit">Set API Key</Button>
    </form>
  );
};