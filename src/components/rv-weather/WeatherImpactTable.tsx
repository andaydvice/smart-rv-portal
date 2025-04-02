
import React from "react";

const WeatherImpactTable = () => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-[#1a202c] p-2 bg-[#131a2a]">Weather Condition</th>
            <th className="border border-[#1a202c] p-2 bg-[#131a2a]">Potential Impact</th>
            <th className="border border-[#1a202c] p-2 bg-[#131a2a]">Preventative Measure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-[#1a202c] p-2 font-bold">Extreme Heat</td>
            <td className="border border-[#1a202c] p-2">AC strain, refrigerator failure, tire damage</td>
            <td className="border border-[#1a202c] p-2">Park in shade, use tire covers, check refrigerator vents</td>
          </tr>
          <tr>
            <td className="border border-[#1a202c] p-2 font-bold">Freezing Temps</td>
            <td className="border border-[#1a202c] p-2">Plumbing damage, propane regulator issues</td>
            <td className="border border-[#1a202c] p-2">Winterize systems, insulate connections</td>
          </tr>
          <tr>
            <td className="border border-[#1a202c] p-2 font-bold">High Humidity</td>
            <td className="border border-[#1a202c] p-2">Mold/mildew growth, electrical issues</td>
            <td className="border border-[#1a202c] p-2">Use dehumidifiers, check for water intrusion</td>
          </tr>
          <tr>
            <td className="border border-[#1a202c] p-2 font-bold">UV Exposure</td>
            <td className="border border-[#1a202c] p-2">Rubber/sealant degradation, fading</td>
            <td className="border border-[#1a202c] p-2">Use UV protectants, cover RV when stored</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeatherImpactTable;
