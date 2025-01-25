import React from "react";
import { Terminal } from "lucide-react";

interface CommandExampleProps {
  command: string;
  description: string;
}

const CommandExample = ({ command, description }: CommandExampleProps) => {
  return (
    <div className="bg-[#151A22] rounded-lg p-6">
      <div className="flex items-center gap-2 text-[#3B82F6] mb-3">
        <Terminal size={20} />
        <code className="text-lg">{command}</code>
      </div>
      <p className="text-[#D3E4FD] text-base">{description}</p>
    </div>
  );
};

export default CommandExample;