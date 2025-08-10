import { ShieldCheck, Cpu, Wifi, Sun, Wrench, Star } from "lucide-react";
import { Container } from "@/components/ui/container";

export const TrustStrip = () => {
  const items = [
    { icon: ShieldCheck, label: "Safety certified systems" },
    { icon: Cpu, label: "Works with Victron & Renogy" },
    { icon: Wifi, label: "Starlink & 5G ready" },
    { icon: Sun, label: "Optimized solar integration" },
    { icon: Wrench, label: "Professional installer network" },
    { icon: Star, label: "Trusted by smart RV community" },
  ];

  return (
    <section className="w-full py-6 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A] border-t border-gray-800/60">
      <Container>
        <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar items-center justify-between md:justify-around py-2">
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <it.icon className="h-5 w-5 text-[#5B9BD5]" aria-hidden="true" />
              <span className="text-sm text-gray-300 whitespace-nowrap">{it.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
