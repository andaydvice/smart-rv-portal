import { Edge, MarkerType } from 'reactflow';

const baseEdgeStyle = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#6366f1' },
  markerEnd: { type: MarkerType.ArrowClosed }
};

export const edges: Edge[] = [
  {
    id: 'start-power',
    source: 'start',
    target: 'power',
    label: 'Power Analysis',
    ...baseEdgeStyle
  },
  {
    id: 'start-network',
    source: 'start',
    target: 'network',
    label: 'Network Subsystem',
    ...baseEdgeStyle
  },
  {
    id: 'start-software',
    source: 'start',
    target: 'software',
    label: 'Software Subsystem',
    ...baseEdgeStyle
  },
  {
    id: 'power-resolved',
    source: 'power',
    target: 'resolved',
    ...baseEdgeStyle
  },
  {
    id: 'network-resolved',
    source: 'network',
    target: 'resolved',
    ...baseEdgeStyle
  },
  {
    id: 'software-resolved',
    source: 'software',
    target: 'resolved',
    ...baseEdgeStyle
  }
];