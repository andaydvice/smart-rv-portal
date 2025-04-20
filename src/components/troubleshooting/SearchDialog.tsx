
import { useState } from "react";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

const troubleshootingTopics = [
  {
    category: "Connectivity",
    items: [
      { title: "WiFi Connection Issues", link: "#wifi" },
      { title: "Signal Boosting", link: "#signal" },
      { title: "Remote Area Setup", link: "#remote" },
    ],
  },
  {
    category: "Power Systems",
    items: [
      { title: "Battery Management", link: "#battery" },
      { title: "Solar Setup", link: "#solar" },
      { title: "Power Distribution", link: "#power" },
    ],
  },
  {
    category: "Smart Systems",
    items: [
      { title: "Software Updates", link: "#software" },
      { title: "Bluetooth Pairing", link: "#bluetooth" },
      { title: "System Integration", link: "#integration" },
    ],
  },
];

export function SearchDialog() {
  const [open, setOpen] = useState(false);

  const handleSelect = (link: string) => {
    setOpen(false);
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-sm text-white bg-[#151A22] border-[#1a202c] hover:bg-[#1E2A3E]"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4 text-[#5B9BD5]" />
        Search troubleshooting topics...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Troubleshooting Search</DialogTitle>
        <CommandInput 
          placeholder="Type to search..." 
          className="text-white bg-[#151A22] border-b border-[#1a202c] text-lg"
        />
        <CommandList className="bg-[#080F1F] border border-[#1a202c] text-white">
          <CommandEmpty className="text-gray-400 p-4 text-base">No results found.</CommandEmpty>
          {troubleshootingTopics.map((group) => (
            <CommandGroup 
              key={group.category} 
              heading={group.category}
              className="text-[#5B9BD5] font-bold text-xl px-4 py-2 bg-[#151A22]"
            >
              {group.items.map((item) => (
                <CommandItem
                  key={item.title}
                  onSelect={() => handleSelect(item.link)}
                  className="text-white hover:bg-[#1E2A3E] cursor-pointer px-4 py-3 text-base rounded-md"
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
