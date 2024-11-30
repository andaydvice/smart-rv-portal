import ReactFlow, { 
  Node, 
  Edge,
  Controls,
  Background,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from "@/components/ui/card";

const TroubleshootingFlowchart = () => {
  const nodes: Node[] = [
    {
      id: '1',
      type: 'default',
      data: { 
        label: 'Device Not Connecting?' 
      },
      position: { x: 250, y: 0 },
      className: 'bg-blue-100 p-4 rounded-lg border-2 border-blue-300'
    },
    {
      id: '2',
      type: 'default',
      data: { 
        label: 'Check Power Supply' 
      },
      position: { x: 250, y: 100 },
      className: 'bg-gray-100 p-4 rounded-lg'
    },
    {
      id: '3',
      type: 'default',
      data: { 
        label: 'Verify WiFi Connection' 
      },
      position: { x: 100, y: 200 },
      className: 'bg-gray-100 p-4 rounded-lg'
    },
    {
      id: '4',
      type: 'default',
      data: { 
        label: 'Check Device Compatibility' 
      },
      position: { x: 400, y: 200 },
      className: 'bg-gray-100 p-4 rounded-lg'
    },
    {
      id: '5',
      type: 'default',
      data: { 
        label: 'Reset Network Settings' 
      },
      position: { x: 100, y: 300 },
      className: 'bg-gray-100 p-4 rounded-lg'
    },
    {
      id: '6',
      type: 'default',
      data: { 
        label: 'Update Device Firmware' 
      },
      position: { x: 400, y: 300 },
      className: 'bg-gray-100 p-4 rounded-lg'
    },
    {
      id: '7',
      type: 'default',
      data: { 
        label: 'Contact Support' 
      },
      position: { x: 250, y: 400 },
      className: 'bg-red-100 p-4 rounded-lg border-2 border-red-300'
    },
  ];

  const edges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e3-5', source: '3', target: '5' },
    { id: 'e4-6', source: '4', target: '6' },
    { id: 'e5-7', source: '5', target: '7' },
    { id: 'e6-7', source: '6', target: '7' },
  ];

  return (
    <Card className="p-4 my-6 bg-white/10">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">Common Integration Issues Flowchart</h3>
      <div style={{ height: '600px' }} className="bg-white/5 rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          className="bg-transparent"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </Card>
  );
};

export default TroubleshootingFlowchart;