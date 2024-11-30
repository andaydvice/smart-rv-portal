import { Edge, MarkerType } from 'reactflow';

export const edges: Edge[] = [
  // Start connections
  { 
    id: 'e-start-power', 
    source: 'start', 
    target: 'power-check',
    animated: true,
    label: 'Power Subsystem',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#6366f1', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-start-network', 
    source: 'start', 
    target: 'network',
    animated: true,
    label: 'Network Subsystem',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#6366f1', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-start-software', 
    source: 'start', 
    target: 'software',
    animated: true,
    label: 'Software Subsystem',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#6366f1', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Power branch
  { 
    id: 'e-power-battery', 
    source: 'power-check', 
    target: 'battery',
    label: 'Voltage Analysis',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#818cf8', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-battery-charge', 
    source: 'battery', 
    target: 'charge',
    label: 'Below Threshold',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#818cf8', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Network branch
  { 
    id: 'e-network-wifi', 
    source: 'network', 
    target: 'wifi',
    label: 'Signal Analysis',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#818cf8', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-wifi-boost', 
    source: 'wifi', 
    target: 'boost',
    label: 'Signal Enhancement',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#818cf8', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Software branch
  { 
    id: 'e-software-version', 
    source: 'software', 
    target: 'version',
    label: 'Version Analysis',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#818cf8', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-version-update', 
    source: 'version', 
    target: 'update',
    label: 'Update Required',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#818cf8', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Resolution paths
  { 
    id: 'e-charge-resolved', 
    source: 'charge', 
    target: 'resolved',
    label: 'Verification',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#818cf8', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-boost-resolved', 
    source: 'boost', 
    target: 'resolved',
    label: 'Verification',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#818cf8', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e-update-resolved', 
    source: 'update', 
    target: 'resolved',
    label: 'Verification',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#818cf8', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  // Support escalation
  { 
    id: 'e-resolved-support', 
    source: 'resolved', 
    target: 'support',
    label: 'Issues Persist',
    labelStyle: { fill: '#94a3b8', fontWeight: 500 },
    style: { stroke: '#ef4444', strokeWidth: 2 },
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed }
  },
];