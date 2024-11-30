import { Edge, MarkerType } from 'reactflow';

const baseEdgeStyle = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#6366f1' },
  markerEnd: { type: MarkerType.ArrowClosed }
};

export const edges: Edge[] = [
  // Start to main branches
  {
    id: 'start-power',
    source: 'start',
    target: 'power',
    ...baseEdgeStyle
  },
  {
    id: 'start-network',
    source: 'start',
    target: 'network',
    ...baseEdgeStyle
  },
  {
    id: 'start-software',
    source: 'start',
    target: 'software',
    ...baseEdgeStyle
  },
  // Main branches to second level
  {
    id: 'power-battery',
    source: 'power',
    target: 'battery',
    ...baseEdgeStyle
  },
  {
    id: 'network-wifi',
    source: 'network',
    target: 'wifi',
    ...baseEdgeStyle
  },
  {
    id: 'software-update',
    source: 'software',
    target: 'update',
    ...baseEdgeStyle
  },
  // Second level to resolution
  {
    id: 'battery-resolved',
    source: 'battery',
    target: 'resolved',
    ...baseEdgeStyle
  },
  {
    id: 'wifi-resolved',
    source: 'wifi',
    target: 'resolved',
    ...baseEdgeStyle
  },
  {
    id: 'update-resolved',
    source: 'update',
    target: 'resolved',
    ...baseEdgeStyle
  }
];