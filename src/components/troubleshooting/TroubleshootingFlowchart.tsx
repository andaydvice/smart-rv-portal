import ReactFlow, { 
  Node, 
  Edge,
  Controls,
  Background,
  Position,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from "@/components/ui/card";

const TroubleshootingFlowchart = () => {
  const nodes: Node[] = [
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

  const edges: Edge[] = [
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

  return (
    <Card className="p-6 my-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <h3 className="text-2xl font-semibold mb-6 text-white">Interactive Troubleshooting Guide</h3>
      <p className="text-gray-300 mb-6">Follow this interactive flowchart to diagnose and resolve common smart system integration issues.</p>
      <div className="h-[800px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          className="bg-transparent"
          minZoom={0.5}
          maxZoom={1.5}
          defaultZoom={0.8}
        >
          <Background color="#6366f1" gap={16} size={1} />
          <Controls className="bg-gray-800 border-gray-700 text-white" />
        </ReactFlow>
      </div>
    </Card>
  );
};

export default TroubleshootingFlowchart;