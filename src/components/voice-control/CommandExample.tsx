import React from "react";
import { Terminal } from "lucide-react";

interface CommandExampleProps {
  command: string;
  description: string;
}

const CommandExample = ({ command, description }: CommandExampleProps) => {
  return (
    <div className="bg-[#0A0E17] rounded-2xl p-10 shadow-lg">
      <div className="flex items-center gap-4 text-[#3B82F6] mb-6">
        <Terminal size={32} />
        <code className="text-2xl font-mono font-medium">{command}</code>
      </div>
      <p className="text-[#D3E4FD] text-xl leading-relaxed tracking-wide">{description}</p>
    </div>
  );
};

export default CommandExample;