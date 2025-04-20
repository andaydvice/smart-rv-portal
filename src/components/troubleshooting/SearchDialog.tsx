
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
        className="w-full justify-start text-sm text-muted-foreground bg-white/5 border-white/20 hover:bg-white/10"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search troubleshooting topics...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList className="bg-[#091020] border border-gray-700">
          <CommandEmpty>No results found.</CommandEmpty>
          {troubleshootingTopics.map((group) => (
            <CommandGroup key={group.category} heading={group.category}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.title}
                  onSelect={() => handleSelect(item.link)}
                  className="cursor-pointer hover:bg-white/5"
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
