
import React from "react";

const WeatherImpactTable = () => {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-[#1a202c] p-1.5 bg-[#131a2a] text-white text-left text-xs">Weather</th>
            <th className="border border-[#1a202c] p-1.5 bg-[#131a2a] text-white text-left text-xs">Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-[#1a202c] p-1.5 text-[#E2E8FF] text-xs">Heat</td>
            <td className="border border-[#1a202c] p-1.5 text-[#E2E8FF] text-xs">AC strain, refrigerator issues</td>
          </tr>
          <tr>
            <td className="border border-[#1a202c] p-1.5 text-[#E2E8FF] text-xs">Freezing</td>
            <td className="border border-[#1a202c] p-1.5 text-[#E2E8FF] text-xs">Plumbing damage, propane issues</td>
          </tr>
          <tr>
            <td className="border border-[#1a202c] p-1.5 text-[#E2E8FF] text-xs">High Humidity</td>
            <td className="border border-[#1a202c] p-1.5 text-[#E2E8FF] text-xs">Mold growth, electrical problems</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeatherImpactTable;
