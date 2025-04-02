
import React from "react";

const WeatherAlertsTable = () => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-[#1a202c] p-2 bg-[#131a2a]">Alert Type</th>
            <th className="border border-[#1a202c] p-2 bg-[#131a2a]">What It Means</th>
            <th className="border border-[#1a202c] p-2 bg-[#131a2a]">RV Response</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-[#1a202c] p-2 font-bold text-yellow-500">Watch</td>
            <td className="border border-[#1a202c] p-2">Conditions are favorable for severe weather</td>
            <td className="border border-[#1a202c] p-2">Monitor closely, prepare for possible relocation</td>
          </tr>
          <tr>
            <td className="border border-[#1a202c] p-2 font-bold text-red-500">Warning</td>
            <td className="border border-[#1a202c] p-2">Severe weather is imminent or occurring</td>
            <td className="border border-[#1a202c] p-2">Take immediate protective action</td>
          </tr>
          <tr>
            <td className="border border-[#1a202c] p-2 font-bold text-blue-500">Advisory</td>
            <td className="border border-[#1a202c] p-2">Less severe but potentially hazardous conditions</td>
            <td className="border border-[#1a202c] p-2">Use caution, possibly adjust travel plans</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeatherAlertsTable;
