import { Node } from 'reactflow';

export const nodes: Node[] = [
  {
    id: 'start',
    type: 'default',
    data: { 
      label: 'Start Troubleshooting' 
    },
    position: { x: 400, y: 0 },
    className: 'bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg border-2 border-blue-400 text-white font-semibold shadow-lg'
  },
  // Power Issues Branch
  {
    id: 'power-check',
    type: 'default',
    data: { 
      label: 'Check Power Supply' 
    },
    position: { x: 200, y: 100 },
    className: 'bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg text-white shadow-lg'
  },
  {
    id: 'battery',
    type: 'default',
    data: { 
      label: 'Battery Level < 20%?' 
    },
    position: { x: 200, y: 200 },
    className: 'bg-yellow-100 p-4 rounded-lg border border-yellow-300'
  },
  {
    id: 'charge',
    type: 'default',
    data: { 
      label: 'Charge Battery' 
    },
    position: { x: 50, y: 300 },
    className: 'bg-green-100 p-4 rounded-lg border border-green-300'
  },
  // Network Issues Branch
  {
    id: 'network',
    type: 'default',
    data: { 
      label: 'Check Network Connection' 
    },
    position: { x: 400, y: 100 },
    className: 'bg-gradient-to-br from-cyan-500 to-cyan-600 p-4 rounded-lg text-white shadow-lg'
  },
  {
    id: 'wifi',
    type: 'default',
    data: { 
      label: 'WiFi Signal Strong?' 
    },
    position: { x: 400, y: 200 },
    className: 'bg-blue-100 p-4 rounded-lg border border-blue-300'
  },
  {
    id: 'boost',
    type: 'default',
    data: { 
      label: 'Use Signal Booster' 
    },
    position: { x: 400, y: 300 },
    className: 'bg-green-100 p-4 rounded-lg border border-green-300'
  },
  // Software Issues Branch
  {
    id: 'software',
    type: 'default',
    data: { 
      label: 'Check Software Status' 
    },
    position: { x: 600, y: 100 },
    className: 'bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-lg text-white shadow-lg'
  },
  {
    id: 'version',
    type: 'default',
    data: { 
      label: 'Software Up to Date?' 
    },
    position: { x: 600, y: 200 },
    className: 'bg-violet-100 p-4 rounded-lg border border-violet-300'
  },
  {
    id: 'update',
    type: 'default',
    data: { 
      label: 'Update Software' 
    },
    position: { x: 750, y: 300 },
    className: 'bg-green-100 p-4 rounded-lg border border-green-300'
  },
  // Resolution or Support
  {
    id: 'resolved',
    type: 'default',
    data: { 
      label: 'Issue Resolved?' 
    },
    position: { x: 400, y: 400 },
    className: 'bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-lg text-white shadow-lg'
  },
  {
    id: 'support',
    type: 'default',
    data: { 
      label: 'Contact Support' 
    },
    position: { x: 400, y: 500 },
    className: 'bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-lg text-white shadow-lg'
  }
];