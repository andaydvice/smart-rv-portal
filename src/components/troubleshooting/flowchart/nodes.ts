import { Node } from 'reactflow';

// Base styles for nodes
const baseNodeStyle = "p-4 rounded-lg text-white font-semibold shadow-lg text-center whitespace-pre-line min-w-[300px]";
const topNodeStyle = "p-4 rounded-lg text-white font-bold shadow-lg text-center whitespace-pre-line min-w-[300px] text-3xl";

// Helper function to create nodes with consistent styling
const createNode = (id: string, label: string, position: { x: number, y: number }, style: string) => ({
  id,
  type: 'default',
  data: { label },
  position,
  className: style
});

// Create the nodes array
export const nodes: Node[] = [
  // Entry point
  createNode(
    'start',
    'System Diagnostics Entry Point',
    { x: 0, y: 0 },
    `${baseNodeStyle} bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-400`
  ),
  
  // Top row titles
  createNode(
    'power-analysis',
    'Power Analysis',
    { x: -400, y: 50 },
    `${topNodeStyle} bg-transparent`
  ),
  createNode(
    'network-subsystem',
    'Network Subsystem',
    { x: 0, y: 50 },
    `${topNodeStyle} bg-transparent`
  ),
  createNode(
    'software-subsystem',
    'Software Subsystem',
    { x: 400, y: 50 },
    `${topNodeStyle} bg-transparent`
  ),
  
  // Power branch nodes
  createNode(
    'power-check',
    'Power System Diagnostics',
    { x: -400, y: 100 },
    `${baseNodeStyle} bg-gradient-to-br from-purple-500 to-purple-600`
  ),
  createNode(
    'battery',
    'Battery Voltage Analysis\n(Threshold: 12.2V DC)',
    { x: -400, y: 250 },
    `${baseNodeStyle} bg-gradient-to-br from-purple-400 to-purple-500`
  ),
  createNode(
    'battery-system',
    'Battery System Diagnostics:\n• Cell Balance Check\n• Temperature Monitoring\n• Charging Efficiency Test',
    { x: -400, y: 400 },
    `${baseNodeStyle} bg-gradient-to-br from-purple-400 to-purple-500`
  ),
  createNode(
    'solar-system',
    'Solar Integration Check:\n• Panel Performance\n• Charge Controller Status\n• Power Output Analysis',
    { x: -400, y: 550 },
    `${baseNodeStyle} bg-gradient-to-br from-purple-400 to-purple-500`
  ),
  createNode(
    'charge',
    'Power System Recovery Protocol:\n• Initialize Shore Power Connection\n• Monitor Charging Parameters\n• Verify Power Stability',
    { x: -400, y: 700 },
    `${baseNodeStyle} bg-gradient-to-br from-purple-400 to-purple-500`
  ),
  
  // Network branch nodes
  createNode(
    'network',
    'Network Infrastructure Analysis',
    { x: 0, y: 100 },
    `${baseNodeStyle} bg-gradient-to-br from-cyan-500 to-cyan-600`
  ),
  createNode(
    'wifi',
    'Signal Quality Metrics:\n• RSSI Threshold: -70dBm\n• SNR Threshold: 20dB\n• Connection Stability Check',
    { x: 0, y: 250 },
    `${baseNodeStyle} bg-gradient-to-br from-cyan-400 to-cyan-500`
  ),
  createNode(
    'smart-devices',
    'Smart Device Connectivity:\n• Device Discovery Scan\n• Protocol Compatibility\n• Connection Quality Test',
    { x: 0, y: 400 },
    `${baseNodeStyle} bg-gradient-to-br from-cyan-400 to-cyan-500`
  ),
  createNode(
    'boost',
    'Signal Enhancement Protocol:\n• Deploy Signal Amplification\n• Optimize Antenna Configuration\n• Verify Signal Improvement',
    { x: 0, y: 550 },
    `${baseNodeStyle} bg-gradient-to-br from-cyan-400 to-cyan-500`
  ),
  
  // Software branch nodes
  createNode(
    'software',
    'System Software Verification',
    { x: 400, y: 100 },
    `${baseNodeStyle} bg-gradient-to-br from-indigo-500 to-indigo-600`
  ),
  createNode(
    'version',
    'Firmware Version Analysis:\n• Current Version: v2.1.4\n• Latest Release: v2.1.4\n• Compatibility Check',
    { x: 400, y: 250 },
    `${baseNodeStyle} bg-gradient-to-br from-indigo-400 to-indigo-500`
  ),
  createNode(
    'update',
    'System Update Protocol:\n• Download Firmware Package\n• Verify Digital Signatures\n• Execute Update Sequence',
    { x: 400, y: 400 },
    `${baseNodeStyle} bg-gradient-to-br from-indigo-400 to-indigo-500`
  ),
  
  // Resolution nodes
  createNode(
    'resolved',
    'System Status Verification:\nDiagnostic Completion Check',
    { x: 0, y: 800 },
    `${baseNodeStyle} bg-gradient-to-br from-emerald-500 to-emerald-600`
  ),
  createNode(
    'support',
    'Technical Support Escalation:\n• Generate System Diagnostics\n• Schedule Technical Consultation\n• Prepare Support Documentation',
    { x: 0, y: 900 },
    `${baseNodeStyle} bg-gradient-to-br from-red-500 to-red-600`
  )
];