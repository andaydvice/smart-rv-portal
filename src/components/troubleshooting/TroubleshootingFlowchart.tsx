import ReactFlow, { 
  Controls,
  Background,
  Position,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from "@/components/ui/card";
import { nodes } from './flowchart/nodes';
import { edges } from './flowchart/edges';

const proOptions = { hideAttribution: true };

const TroubleshootingFlowchart = () => {
  return (
    <Card className="p-6 my-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <h3 className="text-2xl font-semibold mb-6 text-white">System Diagnostics Flowchart</h3>
      <p className="text-gray-300 mb-6">Interactive diagnostic flowchart for systematic troubleshooting of smart system integration issues.</p>
      <div className="h-[900px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          className="bg-transparent"
          minZoom={0.4}
          maxZoom={1.5}
          defaultViewport={{ x: 400, y: 0, zoom: 0.6 }}
          proOptions={proOptions}
        >
          <Background color="#6366f1" gap={16} size={1} />
          <Controls 
            className="bg-gray-800 border-gray-700 text-white flex flex-col" 
            showInteractive={false}
            position="bottom-right"
          />
        </ReactFlow>
      </div>
    </Card>
  );
};

export default TroubleshootingFlowchart;