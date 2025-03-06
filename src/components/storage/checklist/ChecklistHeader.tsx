import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function ChecklistHeader({ title, ...props }) {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-between p-4 bg-[#151A22] border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <Tooltip>
          <TooltipTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-gray-500 hover:text-gray-400 cursor-pointer"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </TooltipTrigger>
          <TooltipContent>
            {props.description}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export default ChecklistHeader;
