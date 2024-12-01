import { Node } from 'reactflow';

const baseNodeStyle = "p-4 rounded-lg text-white font-semibold shadow-lg text-center whitespace-pre-line min-w-[300px]";
const mainNodeStyle = "p-4 rounded-lg text-white font-bold shadow-lg text-center whitespace-pre-line min-w-[300px] text-xl";

export const nodes: Node[] = [
  {
    id: 'start',
    type: 'default',
    data: { 
      label: 'System Diagnostics Entry Point' 
    },
    position: { x: 0, y: 0 },
    className: `${mainNodeStyle} text-2xl bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-400`
  },
  
  {
    id: 'quick-check',
    type: 'default',
    data: { 
      label: 'Quick System Check:\n\n• Visual Safety Assessment\n• Power Indicator Verification\n• Basic Network Connectivity\n• System Interface Response' 
    },
    position: { x: 0, y: 100 },
    className: `${mainNodeStyle} bg-gradient-to-br from-blue-400 to-blue-500`
  },
  
  // Power Branch - Purple Theme
  {
    id: 'power-check',
    type: 'default',
    data: { 
      label: 'Power System Diagnostics' 
    },
    position: { x: -400, y: 250 },
    className: `${mainNodeStyle} bg-gradient-to-br from-purple-500 to-purple-600`
  },
  {
    id: 'battery',
    type: 'default',
    data: { 
      label: 'Battery Voltage Analysis\n(Threshold: 12.2V DC)' 
    },
    position: { x: -400, y: 375 },
    className: `${baseNodeStyle} bg-gradient-to-br from-purple-400 to-purple-500`
  },
  {
    id: 'battery-system',
    type: 'default',
    data: { 
      label: 'Battery System Diagnostics:\n• Cell Balance Check\n• Temperature Monitoring\n• Charging Efficiency Test' 
    },
    position: { x: -400, y: 500 },
    className: `${baseNodeStyle} bg-gradient-to-br from-purple-400 to-purple-500`
  },
  {
    id: 'solar-system',
    type: 'default',
    data: { 
      label: 'Solar Integration Check:\n• Panel Performance\n• Charge Controller Status\n• Power Output Analysis' 
    },
    position: { x: -400, y: 625 },
    className: `${baseNodeStyle} bg-gradient-to-br from-purple-400 to-purple-500`
  },
  {
    id: 'charge',
    type: 'default',
    data: { 
      label: 'Power System Recovery Protocol:\n• Initialize Shore Power Connection\n• Monitor Charging Parameters\n• Verify Power Stability' 
    },
    position: { x: -400, y: 750 },
    className: `${baseNodeStyle} bg-gradient-to-br from-purple-400 to-purple-500`
  },
  
  // Network Branch - Cyan Theme
  {
    id: 'network',
    type: 'default',
    data: { 
      label: 'Network Infrastructure Analysis' 
    },
    position: { x: 0, y: 250 },
    className: `${mainNodeStyle} bg-gradient-to-br from-cyan-500 to-cyan-600`
  },
  {
    id: 'wifi',
    type: 'default',
    data: { 
      label: 'Signal Quality Metrics:\n• RSSI Threshold: -70dBm\n• SNR Threshold: 20dB\n• Connection Stability Check' 
    },
    position: { x: 0, y: 375 },
    className: `${baseNodeStyle} bg-gradient-to-br from-cyan-400 to-cyan-500`
  },
  {
    id: 'smart-devices',
    type: 'default',
    data: { 
      label: 'Smart Device Connectivity:\n• Device Discovery Scan\n• Protocol Compatibility\n• Connection Quality Test' 
    },
    position: { x: 0, y: 500 },
    className: `${baseNodeStyle} bg-gradient-to-br from-cyan-400 to-cyan-500`
  },
  {
    id: 'boost',
    type: 'default',
    data: { 
      label: 'Signal Enhancement Protocol:\n• Deploy Signal Amplification\n• Optimize Antenna Configuration\n• Verify Signal Improvement' 
    },
    position: { x: 0, y: 625 },
    className: `${baseNodeStyle} bg-gradient-to-br from-cyan-400 to-cyan-500`
  },
  
  // Software Branch - Indigo Theme
  {
    id: 'software',
    type: 'default',
    data: { 
      label: 'System Software Verification' 
    },
    position: { x: 400, y: 250 },
    className: `${mainNodeStyle} bg-gradient-to-br from-indigo-500 to-indigo-600`
  },
  {
    id: 'version',
    type: 'default',
    data: { 
      label: 'Firmware Version Analysis:\n• Current Version: v2.1.4\n• Latest Release: v2.1.4\n• Compatibility Check' 
    },
    position: { x: 400, y: 375 },
    className: `${baseNodeStyle} bg-gradient-to-br from-indigo-400 to-indigo-500`
  },
  {
    id: 'update',
    type: 'default',
    data: { 
      label: 'System Update Protocol:\n• Download Firmware Package\n• Verify Digital Signatures\n• Execute Update Sequence' 
    },
    position: { x: 400, y: 500 },
    className: `${baseNodeStyle} bg-gradient-to-br from-indigo-400 to-indigo-500`
  },
  
  {
    id: 'resolved',
    type: 'default',
    data: { 
      label: 'System Status Verification:\nDiagnostic Completion Check' 
    },
    position: { x: 0, y: 850 },
    className: `${baseNodeStyle} bg-gradient-to-br from-emerald-500 to-emerald-600`
  },
  {
    id: 'support',
    type: 'default',
    data: { 
      label: 'Technical Support Escalation:\n• Generate System Diagnostics\n• Schedule Technical Consultation\n• Prepare Support Documentation' 
    },
    position: { x: 0, y: 950 },
    className: `${baseNodeStyle} bg-gradient-to-br from-red-500 to-red-600`
  }
];