import { Router } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const HotspotSection = () => {
  return (
    <AccordionItem value="hotspots" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Router className="h-5 w-5" />
          Mobile Gateway Solutions
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300">
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-blue-300">Device</TableHead>
                <TableHead className="text-blue-300">Key Features</TableHead>
                <TableHead className="text-blue-300">Best For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-gray-700">
                <TableCell className="font-medium">Netgear Nighthawk M6</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside text-sm">
                    <li>5G capability</li>
                    <li>Long battery life</li>
                    <li>2.5Gbps ethernet port</li>
                  </ul>
                </TableCell>
                <TableCell>High-speed needs, frequent travelers</TableCell>
              </TableRow>
              <TableRow className="border-gray-700">
                <TableCell className="font-medium">GL.iNet Beryl</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside text-sm">
                    <li>VPN support</li>
                    <li>Open-source firmware</li>
                    <li>Tor network support</li>
                  </ul>
                </TableCell>
                <TableCell>Privacy-focused users, tech enthusiasts</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">MoFi 5500</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside text-sm">
                    <li>External antenna ports</li>
                    <li>Rugged design</li>
                    <li>Advanced band selection</li>
                  </ul>
                </TableCell>
                <TableCell>Rural areas, signal-challenged locations</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};