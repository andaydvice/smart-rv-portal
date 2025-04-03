
import React from "react";

const WeatherAlertsTable = () => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm">
        <thead className="bg-[#151A22]">
          <tr>
            <th className="p-3 text-left border-b border-[#1a202c] text-white">Alert Type</th>
            <th className="p-3 text-left border-b border-[#1a202c] text-white">What It Means</th>
            <th className="p-3 text-left border-b border-[#1a202c] text-white">RV Response</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#1a202c]">
            <td className="p-3 font-semibold text-[#5B9BD5]">Watch</td>
            <td className="p-3 text-light-blue">Conditions are favorable for severe weather</td>
            <td className="p-3 text-light-blue">Monitor closely, prepare for possible relocation</td>
          </tr>
          <tr className="border-b border-[#1a202c]">
            <td className="p-3 font-semibold text-[#5B9BD5]">Warning</td>
            <td className="p-3 text-light-blue">Severe weather is imminent or occurring</td>
            <td className="p-3 text-light-blue">Take immediate protective action</td>
          </tr>
          <tr>
            <td className="p-3 font-semibold text-[#5B9BD5]">Advisory</td>
            <td className="p-3 text-light-blue">Less severe but potentially hazardous conditions</td>
            <td className="p-3 text-light-blue">Use caution, possibly adjust travel plans</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeatherAlertsTable;
