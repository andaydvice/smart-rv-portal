import { Node } from 'reactflow';

export const nodes: Node[] = [
  {
    id: 'start',
    type: 'default',
    data: { 
      label: 'System Diagnostics Entry Point' 
    },
    position: { x: 400, y: 0 },
    className: 'bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg border-2 border-blue-400 text-white font-semibold shadow-lg'
  },
  // Power Issues Branch
  {
    id: 'power-check',
    type: 'default',
    data: { 
      label: 'Perform Power System Diagnostics' 
    },
    position: { x: 200, y: 100 },
    className: 'bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg text-white shadow-lg'
  },
  {
    id: 'battery',
    type: 'default',
    data: { 
      label: 'Battery Voltage Below 12.2V DC?' 
    },
    position: { x: 200, y: 200 },
    className: 'bg-yellow-100 p-4 rounded-lg border border-yellow-300'
  },
  {
    id: 'charge',
    type: 'default',
    data: { 
      label: 'Initiate Battery Charging Protocol\n- Connect Shore Power\n- Verify Charging Current' 
    },
    position: { x: 50, y: 300 },
    className: 'bg-green-100 p-4 rounded-lg border border-green-300'
  },
  // Network Issues Branch
  {
    id: 'network',
    type: 'default',
    data: { 
      label: 'Network Infrastructure Analysis' 
    },
    position: { x: 400, y: 100 },
    className: 'bg-gradient-to-br from-cyan-500 to-cyan-600 p-4 rounded-lg text-white shadow-lg'
  },
  {
    id: 'wifi',
    type: 'default',
    data: { 
      label: 'Signal Strength Analysis:\n- RSSI > -70dBm?\n- SNR > 20dB?' 
    },
    position: { x: 400, y: 200 },
    className: 'bg-blue-100 p-4 rounded-lg border border-blue-300'
  },
  {
    id: 'boost',
    type: 'default',
    data: { 
      label: 'Deploy Signal Enhancement:\n- Activate Signal Booster\n- Adjust Antenna Orientation' 
    },
    position: { x: 400, y: 300 },
    className: 'bg-green-100 p-4 rounded-lg border border-green-300'
  },
  // Software Issues Branch
  {
    id: 'software',
    type: 'default',
    data: { 
      label: 'System Software Verification' 
    },
    position: { x: 600, y: 100 },
    className: 'bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-lg text-white shadow-lg'
  },
  {
    id: 'version',
    type: 'default',
    data: { 
      label: 'Firmware Version Check:\n- Current Version: v2.1.4\n- Latest Version: v2.1.4?' 
    },
    position: { x: 600, y: 200 },
    className: 'bg-violet-100 p-4 rounded-lg border border-violet-300'
  },
  {
    id: 'update',
    type: 'default',
    data: { 
      label: 'Execute System Update:\n- Download Latest Firmware\n- Verify Checksum\n- Install Updates' 
    },
    position: { x: 750, y: 300 },
    className: 'bg-green-100 p-4 rounded-lg border border-green-300'
  },
  // Resolution or Support
  {
    id: 'resolved',
    type: 'default',
    data: { 
      label: 'System Status Verification:\nAll Diagnostics Passed?' 
    },
    position: { x: 400, y: 400 },
    className: 'bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-lg text-white shadow-lg'
  },
  {
    id: 'support',
    type: 'default',
    data: { 
      label: 'Escalate to Technical Support:\n- Generate Diagnostic Report\n- Schedule Remote Session' 
    },
    position: { x: 400, y: 500 },
    className: 'bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-lg text-white shadow-lg'
  }
];