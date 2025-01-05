import { Home, Wrench, Building, Cpu } from "lucide-react";

export const KeyFeatures = () => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm mb-4">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">
            Unrivaled Luxury: Class A Diesel Pushers & Custom Coaches
          </h2>
          <h3 className="text-2xl font-semibold text-blue-400">
            From $1.3M | Custom Excellence
          </h3>
          <p className="text-gray-300 text-lg">
            Each model represents the pinnacle of mobile living, where cutting edge technology meets timeless elegance.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Key Features</h2>
          <ul className="grid gap-6">
            <li className="flex items-start gap-3">
              <Home className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300">
                <span className="font-semibold text-white">Residential Masterpieces:</span> Heated marble floors, custom cabinetry, premium appliances
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300">
                <span className="font-semibold text-white">Advanced Engineering:</span> Air ride suspension, multiplex wiring, independent power systems
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300">
                <span className="font-semibold text-white">Elite Construction:</span> Aircraft grade materials, thermal windows, vacuum bonded walls
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cpu className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300">
                <span className="font-semibold text-white">Smart Integration:</span> Whole coach automation, satellite communications, premium security
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};