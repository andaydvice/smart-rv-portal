import { Node } from 'reactflow';

const baseStyle = "p-4 rounded-lg text-white font-semibold shadow-lg text-center min-w-[200px]";

export const nodes: Node[] = [
  {
    id: 'start',
    type: 'default',
    data: { label: 'System Diagnostics Entry Point' },
    position: { x: 400, y: 0 },
    className: `${baseStyle} bg-blue-500`
  },
  {
    id: 'power',
    type: 'default',
    data: { label: 'Power System Diagnostics' },
    position: { x: 100, y: 150 },
    className: `${baseStyle} bg-purple-500`
  },
  {
    id: 'network',
    type: 'default',
    data: { label: 'Network Infrastructure Analysis' },
    position: { x: 400, y: 150 },
    className: `${baseStyle} bg-cyan-500`
  },
  {
    id: 'software',
    type: 'default',
    data: { label: 'System Software Verification' },
    position: { x: 700, y: 150 },
    className: `${baseStyle} bg-indigo-500`
  },
  {
    id: 'resolved',
    type: 'default',
    data: { label: 'Issue Resolved' },
    position: { x: 400, y: 300 },
    className: `${baseStyle} bg-green-500`
  }
];