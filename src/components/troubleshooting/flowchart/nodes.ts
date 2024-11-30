import { Node } from 'reactflow';

const baseStyle = "p-4 rounded-lg text-white font-semibold shadow-lg text-center min-w-[200px]";

export const nodes: Node[] = [
  // Start node
  {
    id: 'start',
    type: 'default',
    data: { label: 'Start Diagnostics' },
    position: { x: 400, y: 0 },
    className: `${baseStyle} bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-400`
  },
  // Main branches
  {
    id: 'power',
    type: 'default',
    data: { label: 'Power System Check' },
    position: { x: 200, y: 100 },
    className: `${baseStyle} bg-gradient-to-br from-purple-500 to-purple-600`
  },
  {
    id: 'network',
    type: 'default',
    data: { label: 'Network Analysis' },
    position: { x: 400, y: 100 },
    className: `${baseStyle} bg-gradient-to-br from-cyan-500 to-cyan-600`
  },
  {
    id: 'software',
    type: 'default',
    data: { label: 'Software Verification' },
    position: { x: 600, y: 100 },
    className: `${baseStyle} bg-gradient-to-br from-indigo-500 to-indigo-600`
  },
  // Second level
  {
    id: 'battery',
    type: 'default',
    data: { label: 'Battery Check' },
    position: { x: 200, y: 200 },
    className: `${baseStyle} bg-gradient-to-br from-purple-400 to-purple-500`
  },
  {
    id: 'wifi',
    type: 'default',
    data: { label: 'WiFi Diagnostics' },
    position: { x: 400, y: 200 },
    className: `${baseStyle} bg-gradient-to-br from-cyan-400 to-cyan-500`
  },
  {
    id: 'update',
    type: 'default',
    data: { label: 'System Updates' },
    position: { x: 600, y: 200 },
    className: `${baseStyle} bg-gradient-to-br from-indigo-400 to-indigo-500`
  },
  // Resolution node
  {
    id: 'resolved',
    type: 'default',
    data: { label: 'Issue Resolved' },
    position: { x: 400, y: 300 },
    className: `${baseStyle} bg-gradient-to-br from-emerald-500 to-emerald-600`
  }
];