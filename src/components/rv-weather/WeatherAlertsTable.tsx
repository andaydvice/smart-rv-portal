
import React, { useEffect, useRef } from "react";

const WeatherAlertsTable = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  
  useEffect(() => {
    // Force repaint of table elements
    if (tableRef.current) {
      tableRef.current.style.display = 'none';
      setTimeout(() => {
        if (tableRef.current) {
          tableRef.current.style.display = 'table';
          console.log("Table repainted for better rendering");
        }
      }, 50);
    }
  }, []);

  return (
    <div className="overflow-x-auto mt-4 border border-[#e2e8f0] rounded-lg">
      <table ref={tableRef} className="w-full text-sm border-collapse text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left border-b border-[#e2e8f0] text-[#4a5568]">Alert Type</th>
            <th className="p-4 text-left border-b border-[#e2e8f0] text-[#4a5568]">What It Means</th>
            <th className="p-4 text-left border-b border-[#e2e8f0] text-[#4a5568]">RV Response</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#e2e8f0]">
            <td className="p-4 font-semibold text-[#3b82f6]">Watch</td>
            <td className="p-4 text-[#4a5568]">Conditions are favorable for severe weather</td>
            <td className="p-4 text-[#4a5568]">Monitor closely, prepare for possible relocation</td>
          </tr>
          <tr className="border-b border-[#e2e8f0]">
            <td className="p-4 font-semibold text-[#3b82f6]">Warning</td>
            <td className="p-4 text-[#4a5568]">Severe weather is imminent or occurring</td>
            <td className="p-4 text-[#4a5568]">Take immediate protective action</td>
          </tr>
          <tr>
            <td className="p-4 font-semibold text-[#3b82f6]">Advisory</td>
            <td className="p-4 text-[#4a5568]">Less severe but potentially hazardous conditions</td>
            <td className="p-4 text-[#4a5568]">Use caution, possibly adjust travel plans</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeatherAlertsTable;
