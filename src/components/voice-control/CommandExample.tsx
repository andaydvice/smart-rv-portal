import React from "react";
import { Terminal } from "lucide-react";

interface CommandExampleProps {
  command: string;
  description: string;
}

const CommandExample = ({ command, description }: CommandExampleProps) => {
  return (
    <div className="bg-connectivity.bg rounded-lg p-4">
      <div className="flex items-center gap-2 text-connectivity.accent mb-2">
        <Terminal size={16} />
        <code>{command}</code>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default CommandExample;