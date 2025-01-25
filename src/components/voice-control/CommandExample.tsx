import React from "react";
import { Terminal } from "lucide-react";

interface CommandExampleProps {
  command: string;
  description: string;
}

const CommandExample = ({ command, description }: CommandExampleProps) => {
  return (
    <div className="bg-[#0A0E17] rounded-xl p-8">
      <div className="flex items-center gap-3 text-[#3B82F6] mb-4">
        <Terminal size={24} />
        <code className="text-xl font-mono">{command}</code>
      </div>
      <p className="text-[#D3E4FD] text-lg leading-relaxed">{description}</p>
    </div>
  );
};

export default CommandExample;