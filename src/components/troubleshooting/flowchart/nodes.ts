import { Node } from 'reactflow';

// Node style configurations
const styles = {
  base: "p-4 rounded-lg text-white font-semibold shadow-lg text-center whitespace-pre-line min-w-[300px]",
  title: "text-3xl font-bold bg-transparent",
  power: "bg-gradient-to-br from-purple-500 to-purple-600",
  network: "bg-gradient-to-br from-cyan-500 to-cyan-600",
  software: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  resolution: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  error: "bg-gradient-to-br from-red-500 to-red-600",
  start: "bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-400",
};

// Helper function to create nodes
const createNode = (
  id: string,
  label: string,
  position: { x: number; y: number },
  style: string
): Node => ({
  id,
  type: 'default',
  data: { label },
  position,
  className: `${styles.base} ${style}`
});

// Create title nodes
const titleNodes = [
  createNode('power-analysis', 'Power Analysis', { x: -400, y: 50 }, styles.title),
  createNode('network-subsystem', 'Network Subsystem', { x: 0, y: 50 }, styles.title),
  createNode('software-subsystem', 'Software Subsystem', { x: 400, y: 50 }, styles.title),
];

// Create power branch nodes
const powerNodes = [
  createNode('power-check', 'Power System Diagnostics', { x: -400, y: 100 }, styles.power),
  createNode('battery', 'Battery Voltage Analysis\n(Threshold: 12.2V DC)', { x: -400, y: 250 }, styles.power),
  createNode('battery-system', 'Battery System Diagnostics:\n• Cell Balance Check\n• Temperature Monitoring\n• Charging Efficiency Test', { x: -400, y: 400 }, styles.power),
  createNode('solar-system', 'Solar Integration Check:\n• Panel Performance\n• Charge Controller Status\n• Power Output Analysis', { x: -400, y: 550 }, styles.power),
  createNode('charge', 'Power System Recovery Protocol:\n• Initialize Shore Power Connection\n• Monitor Charging Parameters\n• Verify Power Stability', { x: -400, y: 700 }, styles.power),
];

// Create network branch nodes
const networkNodes = [
  createNode('network', 'Network Infrastructure Analysis', { x: 0, y: 100 }, styles.network),
  createNode('wifi', 'Signal Quality Metrics:\n• RSSI Threshold: -70dBm\n• SNR Threshold: 20dB\n• Connection Stability Check', { x: 0, y: 250 }, styles.network),
  createNode('smart-devices', 'Smart Device Connectivity:\n• Device Discovery Scan\n• Protocol Compatibility\n• Connection Quality Test', { x: 0, y: 400 }, styles.network),
  createNode('boost', 'Signal Enhancement Protocol:\n• Deploy Signal Amplification\n• Optimize Antenna Configuration\n• Verify Signal Improvement', { x: 0, y: 550 }, styles.network),
];

// Create software branch nodes
const softwareNodes = [
  createNode('software', 'System Software Verification', { x: 400, y: 100 }, styles.software),
  createNode('version', 'Firmware Version Analysis:\n• Current Version: v2.1.4\n• Latest Release: v2.1.4\n• Compatibility Check', { x: 400, y: 250 }, styles.software),
  createNode('update', 'System Update Protocol:\n• Download Firmware Package\n• Verify Digital Signatures\n• Execute Update Sequence', { x: 400, y: 400 }, styles.software),
];

// Create resolution nodes
const resolutionNodes = [
  createNode('resolved', 'System Status Verification:\nDiagnostic Completion Check', { x: 0, y: 800 }, styles.resolution),
  createNode('support', 'Technical Support Escalation:\n• Generate System Diagnostics\n• Schedule Technical Consultation\n• Prepare Support Documentation', { x: 0, y: 900 }, styles.error),
];

// Entry point node
const entryNode = [
  createNode('start', 'System Diagnostics Entry Point', { x: 0, y: 0 }, styles.start),
];

// Export all nodes
export const nodes: Node[] = [
  ...entryNode,
  ...titleNodes,
  ...powerNodes,
  ...networkNodes,
  ...softwareNodes,
  ...resolutionNodes,
];