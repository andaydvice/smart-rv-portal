import { Edge, MarkerType } from 'reactflow';

export const edges: Edge[] = [
  // Start connections
  { 
    id: 'e-start-power', 
    source: 'start', 
    target: 'power-check',
    animated: true,
    label: 'Power subsystem',
    style: { stroke: '#6366f1' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-start-network', 
    source: 'start', 
    target: 'network',
    animated: true,
    label: 'Network subsystem',
    style: { stroke: '#6366f1' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-start-software', 
    source: 'start', 
    target: 'software',
    animated: true,
    label: 'Software subsystem',
    style: { stroke: '#6366f1' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Power branch
  { 
    id: 'e-power-battery', 
    source: 'power-check', 
    target: 'battery',
    label: 'Check voltage',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-battery-charge', 
    source: 'battery', 
    target: 'charge',
    label: 'Voltage critical',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Network branch
  { 
    id: 'e-network-wifi', 
    source: 'network', 
    target: 'wifi',
    label: 'Signal analysis',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-wifi-boost', 
    source: 'wifi', 
    target: 'boost',
    label: 'Signal insufficient',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Software branch
  { 
    id: 'e-software-version', 
    source: 'software', 
    target: 'version',
    label: 'Version check',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-version-update', 
    source: 'version', 
    target: 'update',
    label: 'Update required',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Resolution paths
  { 
    id: 'e-charge-resolved', 
    source: 'charge', 
    target: 'resolved',
    label: 'Verify charge',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-boost-resolved', 
    source: 'boost', 
    target: 'resolved',
    label: 'Verify signal',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-update-resolved', 
    source: 'update', 
    target: 'resolved',
    label: 'Verify update',
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Final support option
  { 
    id: 'e-resolved-support', 
    source: 'resolved', 
    target: 'support',
    label: 'Issues persist',
    style: { stroke: '#ef4444' },
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed }
  },
];