import { Edge, MarkerType } from 'reactflow';

export const edges: Edge[] = [
  // Start connections
  { 
    id: 'e-start-power', 
    source: 'start', 
    target: 'power-check',
    animated: true,
    style: { stroke: '#6366f1' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-start-network', 
    source: 'start', 
    target: 'network',
    animated: true,
    style: { stroke: '#6366f1' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-start-software', 
    source: 'start', 
    target: 'software',
    animated: true,
    style: { stroke: '#6366f1' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Power branch
  { 
    id: 'e-power-battery', 
    source: 'power-check', 
    target: 'battery',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-battery-charge', 
    source: 'battery', 
    target: 'charge',
    label: 'Yes',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Network branch
  { 
    id: 'e-network-wifi', 
    source: 'network', 
    target: 'wifi',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-wifi-boost', 
    source: 'wifi', 
    target: 'boost',
    label: 'No',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Software branch
  { 
    id: 'e-software-version', 
    source: 'software', 
    target: 'version',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-version-update', 
    source: 'version', 
    target: 'update',
    label: 'No',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Resolution paths
  { 
    id: 'e-charge-resolved', 
    source: 'charge', 
    target: 'resolved',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-boost-resolved', 
    source: 'boost', 
    target: 'resolved',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-update-resolved', 
    source: 'update', 
    target: 'resolved',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Final support option
  { 
    id: 'e-resolved-support', 
    source: 'resolved', 
    target: 'support',
    label: 'No',
    style: { stroke: '#ef4444' },
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed }
  },
];