import { Node } from 'reactflow';

export const nodes: Node[] = [
  {
    id: 'start',
    type: 'default',
    data: { 
      label: 'System Diagnostics Entry Point' 
    },
    position: { x: 500, y: 0 },
    className: 'bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg border-2 border-blue-400 text-white font-semibold shadow-lg min-w-[250px] text-center'
  },
  // Power Branch - Purple Theme
  {
    id: 'power-check',
    type: 'default',
    data: { 
      label: 'Power System Diagnostics' 
    },
    position: { x: 50, y: 150 },
    className: 'bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg text-white font-semibold shadow-lg min-w-[250px] text-center'
  },
  {
    id: 'battery',
    type: 'default',
    data: { 
      label: 'Battery Voltage Analysis\n(Threshold: 12.2V DC)' 
    },
    position: { x: 50, y: 300 },
    className: 'bg-gradient-to-br from-purple-400 to-purple-500 p-4 rounded-lg text-white font-semibold min-w-[250px] text-center'
  },
  {
    id: 'battery-system',
    type: 'default',
    data: { 
      label: 'Battery System Diagnostics:\n• Cell Balance Check\n• Temperature Monitoring\n• Charging Efficiency Test' 
    },
    position: { x: -250, y: 450 },
    className: 'bg-gradient-to-br from-purple-400 to-purple-500 p-4 rounded-lg text-white font-semibold min-w-[300px] text-center whitespace-pre-line'
  },
  {
    id: 'solar-system',
    type: 'default',
    data: { 
      label: 'Solar Integration Check:\n• Panel Performance\n• Charge Controller Status\n• Power Output Analysis' 
    },
    position: { x: 50, y: 450 },
    className: 'bg-gradient-to-br from-purple-400 to-purple-500 p-4 rounded-lg text-white font-semibold min-w-[300px] text-center whitespace-pre-line'
  },
  {
    id: 'charge',
    type: 'default',
    data: { 
      label: 'Power System Recovery Protocol:\n• Initialize Shore Power Connection\n• Monitor Charging Parameters\n• Verify Power Stability' 
    },
    position: { x: 350, y: 450 },
    className: 'bg-gradient-to-br from-purple-400 to-purple-500 p-4 rounded-lg text-white font-semibold min-w-[300px] text-center whitespace-pre-line'
  },
  // Network Branch - Cyan Theme
  {
    id: 'network',
    type: 'default',
    data: { 
      label: 'Network Infrastructure Analysis' 
    },
    position: { x: 500, y: 150 },
    className: 'bg-gradient-to-br from-cyan-500 to-cyan-600 p-4 rounded-lg text-white font-semibold shadow-lg min-w-[250px] text-center'
  },
  {
    id: 'wifi',
    type: 'default',
    data: { 
      label: 'Signal Quality Metrics:\n• RSSI Threshold: -70dBm\n• SNR Threshold: 20dB\n• Connection Stability Check' 
    },
    position: { x: 500, y: 300 },
    className: 'bg-gradient-to-br from-cyan-400 to-cyan-500 p-4 rounded-lg text-white font-semibold min-w-[300px] text-center whitespace-pre-line'
  },
  {
    id: 'smart-devices',
    type: 'default',
    data: { 
      label: 'Smart Device Connectivity:\n• Device Discovery Scan\n• Protocol Compatibility\n• Connection Quality Test' 
    },
    position: { x: 500, y: 450 },
    className: 'bg-gradient-to-br from-cyan-400 to-cyan-500 p-4 rounded-lg text-white font-semibold min-w-[300px] text-center whitespace-pre-line'
  },
  {
    id: 'boost',
    type: 'default',
    data: { 
      label: 'Signal Enhancement Protocol:\n• Deploy Signal Amplification\n• Optimize Antenna Configuration\n• Verify Signal Improvement' 
    },
    position: { x: 500, y: 600 },
    className: 'bg-gradient-to-br from-cyan-400 to-cyan-500 p-4 rounded-lg text-white font-semibold min-w-[300px] text-center whitespace-pre-line'
  },
  // Software Branch - Indigo Theme
  {
    id: 'software',
    type: 'default',
    data: { 
      label: 'System Software Verification' 
    },
    position: { x: 950, y: 150 },
    className: 'bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-lg text-white font-semibold shadow-lg min-w-[250px] text-center'
  },
  {
    id: 'version',
    type: 'default',
    data: { 
      label: 'Firmware Version Analysis:\n• Current Version: v2.1.4\n• Latest Release: v2.1.4\n• Compatibility Check' 
    },
    position: { x: 950, y: 300 },
    className: 'bg-gradient-to-br from-indigo-400 to-indigo-500 p-4 rounded-lg text-white font-semibold min-w-[300px] text-center whitespace-pre-line'
  },
  {
    id: 'update',
    type: 'default',
    data: { 
      label: 'System Update Protocol:\n• Download Firmware Package\n• Verify Digital Signatures\n• Execute Update Sequence' 
    },
    position: { x: 950, y: 450 },
    className: 'bg-gradient-to-br from-indigo-400 to-indigo-500 p-4 rounded-lg text-white font-semibold min-w-[300px] text-center whitespace-pre-line'
  },
  // Resolution Nodes
  {
    id: 'resolved',
    type: 'default',
    data: { 
      label: 'System Status Verification:\nDiagnostic Completion Check' 
    },
    position: { x: 500, y: 750 },
    className: 'bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-lg text-white font-semibold shadow-lg min-w-[300px] text-center whitespace-pre-line'
  },
  {
    id: 'support',
    type: 'default',
    data: { 
      label: 'Technical Support Escalation:\n• Generate System Diagnostics\n• Schedule Technical Consultation\n• Prepare Support Documentation' 
    },
    position: { x: 500, y: 900 },
    className: 'bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-lg text-white font-semibold shadow-lg min-w-[300px] text-center whitespace-pre-line'
  }
];