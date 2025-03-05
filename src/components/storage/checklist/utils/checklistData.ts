
// Define the structure of the checklist data
export interface ChecklistItem {
  id: string;
  label: string;
}

export interface ChecklistSectionData {
  title: string;
  items: ChecklistItem[];
}

// Compile all checklist items from across all tabs
export const checklistData: {[key: string]: ChecklistSectionData} = {
  // RV Info section
  'rv-info-basic': {
    title: 'RV Information',
    items: [
      { id: 'model-documented', label: 'RV model and specifications documented' },
      { id: 'manuals', label: 'Owner\'s manuals and documentation organized and accessible' },
      { id: 'insurance', label: 'Insurance information updated and stored safely' },
      { id: 'storage-contract', label: 'Storage facility contract and contact information documented' },
      { id: 'checklist-copy', label: 'Copy of completed checklist stored with RV paperwork' }
    ]
  },
  
  // Exterior section
  'exterior-cleaning': {
    title: 'Exterior Cleaning',
    items: [
      { id: 'wash', label: 'Wash exterior thoroughly, including roof, sides, and undercarriage' },
      { id: 'bugs', label: 'Remove all bugs, tree sap, and road tar' },
      { id: 'awnings', label: 'Clean awnings and allow to dry completely before retracting' },
      { id: 'uv', label: 'Apply UV protectant to rubber seals and gaskets' },
      { id: 'steps', label: 'Clean and lube entry steps and slide-out mechanisms' }
    ]
  },
  
  'exterior-inspection': {
    title: 'Exterior Inspection & Protection',
    items: [
      { id: 'seals', label: 'Inspect and reseal any roof or sidewall seams that show signs of cracking' },
      { id: 'damage', label: 'Check for and repair any exterior damage (cracks, chips, delamination)' },
      { id: 'wax', label: 'Apply wax to fiberglass or painted surfaces for extended protection' },
      { id: 'plastic', label: 'Cover or protect exterior plastic components from UV damage' },
      { id: 'accessories', label: 'Remove any exterior accessories that can be detached and store separately' }
    ]
  },
  
  'exterior-covering': {
    title: 'Exterior Covering',
    items: [
      { id: 'cover', label: 'Consider a breathable RV cover designed for indoor storage (prevents dust)' },
      { id: 'secure', label: 'If using a cover, ensure it\'s properly secured but not tight against surfaces' },
      { id: 'padding', label: 'Place padding over sharp edges to prevent cover damage' },
      { id: 'vents', label: 'Ensure any vents or air circulation points aren\'t completely sealed by the cover' }
    ]
  },
  
  // Interior section
  'interior-cleaning': {
    title: 'Interior Cleaning',
    items: [
      { id: 'vacuum', label: 'Vacuum all carpets, upholstery, and hard-to-reach areas' },
      { id: 'surfaces', label: 'Clean all hard surfaces with appropriate cleaners' },
      { id: 'fridge', label: 'Clean refrigerator and leave door slightly open to prevent odors' },
      { id: 'cabinets', label: 'Wipe out all cabinets and drawers' },
      { id: 'bedding', label: 'Remove and launder all bedding and fabric items' }
    ]
  },
  
  'interior-moisture': {
    title: 'Interior Moisture Control',
    items: [
      { id: 'dehumidifier', label: 'Place desiccant dehumidifiers or moisture absorbers throughout RV' },
      { id: 'vents-cracked', label: 'Leave roof vents slightly cracked for air circulation (if indoor storage)' },
      { id: 'blinds', label: 'Close blinds/curtains to prevent sun damage to interior fabrics' },
      { id: 'plants', label: 'Remove all plants and perishable items' },
      { id: 'check-leaks', label: 'Check for any signs of water leaks or previous water damage' }
    ]
  },
  
  'interior-pest': {
    title: 'Interior Pest Prevention',
    items: [
      { id: 'food', label: 'Remove all food items, including canned goods and spices' },
      { id: 'entry-points', label: 'Seal any potential pest entry points with steel wool or caulk' },
      { id: 'traps', label: 'Set appropriate pest traps (non-toxic if possible)' },
      { id: 'bait', label: 'Consider using enclosed bait stations for long-term storage' }
    ]
  },
  
  // Plumbing section
  'plumbing-water-system': {
    title: 'Plumbing - Water System',
    items: [
      { id: 'fresh-drain', label: 'Drain fresh water tank completely' },
      { id: 'water-pump', label: 'Run water pump briefly to remove water (then turn off)' },
      { id: 'low-points', label: 'Open all low-point drains and leave open' },
      { id: 'faucets', label: 'Open all faucets (hot and cold) to allow complete drainage' },
      { id: 'exterior-shower', label: 'Don\'t forget exterior shower connections' }
    ]
  },
  
  'plumbing-antifreeze': {
    title: 'Plumbing - Antifreeze (for cold storage)',
    items: [
      { id: 'bypass', label: 'Install water heater bypass kit' },
      { id: 'antifreeze', label: 'Use non-toxic RV antifreeze to protect pipes' },
      { id: 'toilet', label: 'Add antifreeze to toilet and pour down shower and sink drains' },
      { id: 'p-traps', label: 'Ensure all P-traps are protected with antifreeze' },
      { id: 'ice-maker', label: 'Disconnect and fully drain ice maker lines if equipped' }
    ]
  },
  
  'plumbing-holding-tanks': {
    title: 'Plumbing - Holding Tanks',
    items: [
      { id: 'black-tank', label: 'Thoroughly clean and flush black water tank' },
      { id: 'gray-tank', label: 'Drain and clean gray water tank' },
      { id: 'tank-treatment', label: 'Add special long-term tank treatment product to prevent odors' },
      { id: 'valves', label: 'Leave tank valves closed after emptying' },
      { id: 'sensors', label: 'Clean tank sensors if accessible' }
    ]
  },
  
  // Electrical section
  'electrical-batteries': {
    title: 'Electrical - Batteries',
    items: [
      { id: 'battery-clean', label: 'Clean battery terminals and connections' },
      { id: 'battery-disconnect', label: 'Disconnect batteries or turn off battery disconnect switch' },
      { id: 'battery-remove', label: 'Consider removing batteries for separate storage in climate-controlled environment' },
      { id: 'battery-charge', label: 'Fully charge batteries before storage' },
      { id: 'battery-maintenance', label: 'For lead-acid batteries: check water levels and top off if needed' }
    ]
  },
  
  'electrical-power': {
    title: 'Electrical - Power Systems',
    items: [
      { id: 'breakers', label: 'Turn off all circuit breakers' },
      { id: 'inverter', label: 'Turn off inverter and converter' },
      { id: 'power-cord', label: 'Unplug shore power cord, clean connections, and store properly' },
      { id: 'solar', label: 'Cover solar panels or disconnect if possible' },
      { id: 'generator', label: 'Follow manufacturer procedures for generator storage' }
    ]
  },
  
  'electrical-appliances': {
    title: 'Electrical - Appliances & Electronics',
    items: [
      { id: 'unplug', label: 'Unplug all electronics and small appliances' },
      { id: 'antennas', label: 'Lower and secure TV/satellite antennas' },
      { id: 'remove-batteries', label: 'Remove batteries from remotes, clocks, and detectors' },
      { id: 'tv-secure', label: 'Secure or remove TV and other mounted electronics' },
      { id: 'humidity-electronics', label: 'Consider using electronics-safe desiccants near sensitive equipment' }
    ]
  },
  
  // Mechanical section
  'mechanical-engine': {
    title: 'Mechanical - Engine (Motorhomes)',
    items: [
      { id: 'oil-change', label: 'Change oil and filter before storage' },
      { id: 'fuel-stabilizer', label: 'Add fuel stabilizer to nearly full fuel tank' },
      { id: 'coolant', label: 'Check coolant level and antifreeze protection' },
      { id: 'battery-maintenance', label: 'Follow additional chassis battery maintenance steps' },
      { id: 'run-engine', label: 'Run engine to operating temperature to circulate fluids before storage' }
    ]
  },
  
  'mechanical-leveling': {
    title: 'Mechanical - Leveling',
    items: [
      { id: 'level', label: 'Park RV as level as possible to prevent strain on refrigerator and other systems' },
      { id: 'stabilizers', label: 'Use stabilizing jacks to provide additional support' },
      { id: 'tire-blocks', label: 'Place appropriate blocking to reduce load on tires if storing long-term' },
      { id: 'jack-pressure', label: 'Verify hydraulic jacks are not under excessive pressure' }
    ]
  },
  
  'mechanical-chassis': {
    title: 'Mechanical - Chassis',
    items: [
      { id: 'lubricate', label: 'Lubricate all moving parts (hinges, locks, slide mechanisms)' },
      { id: 'suspension', label: 'Inspect suspension components for any needed repairs before storage' },
      { id: 'rust-prevention', label: 'Apply rust prevention to exposed metal parts if storing outdoors' },
      { id: 'brakes', label: 'Ensure parking brake is properly set (or chock wheels securely)' }
    ]
  },
  
  // Tires section
  'tires-preparation': {
    title: 'Tires - Preparation',
    items: [
      { id: 'tires-clean', label: 'Clean tires thoroughly to remove all dirt, grease, and chemicals' },
      { id: 'tires-inspect', label: 'Inspect tires for damage, unusual wear, and proper tread depth' },
      { id: 'tires-pressure', label: 'Inflate tires to manufacturer recommended pressure (slightly higher for storage)' },
      { id: 'tires-covers', label: 'Install tire covers to protect from UV damage' },
      { id: 'tires-rotate', label: 'Consider tire rotation before storage if due for service' }
    ]
  },
  
  'tires-storage': {
    title: 'Tires - Storage',
    items: [
      { id: 'weight-off', label: 'Use jacks or blocks to take weight off tires for long-term storage (if possible)' },
      { id: 'surface', label: 'Park on a dry, clean surface to prevent moisture damage to tires' },
      { id: 'move-periodically', label: 'Plan to move RV slightly every 2-3 months to prevent flat spots (or remove tires)' },
      { id: 'avoid-chemicals', label: 'Keep tires away from ozone sources, electrical equipment, and petroleum products' }
    ]
  },
  
  // Pest Control section
  'pest-exterior': {
    title: 'Pest Control - Exterior',
    items: [
      { id: 'pest-seal', label: 'Seal all exterior openings and potential entry points' },
      { id: 'pest-screens', label: 'Check all screens for tears and repair as needed' },
      { id: 'pest-repellent', label: 'Apply perimeter pest repellent around RV' },
      { id: 'pest-underneath', label: 'Pay special attention to sealing access points underneath the RV' },
      { id: 'pest-ground', label: 'Consider ground treatments if permitted in storage area' }
    ]
  },
  
  'pest-interior': {
    title: 'Pest Control - Interior',
    items: [
      { id: 'pest-clean', label: 'Thoroughly clean all interior surfaces, especially food preparation areas' },
      { id: 'pest-remove-attractants', label: 'Remove all food, including pet food and bird seed' },
      { id: 'pest-traps', label: 'Place appropriate traps inside the RV' },
      { id: 'pest-fabric', label: 'Protect fabric items with appropriate covering or storage' },
      { id: 'pest-inspect', label: 'Schedule periodic inspections during storage period' }
    ]
  },
  
  // Security section
  'security-physical': {
    title: 'Security - Physical Measures',
    items: [
      { id: 'wheel-locks', label: 'Install wheel locks or other anti-theft devices' },
      { id: 'hitch-lock', label: 'Use a hitch lock for towables' },
      { id: 'door-locks', label: 'Secure all doors and windows with additional locks if necessary' },
      { id: 'steering-wheel', label: 'Consider steering wheel lock for motorhomes' },
      { id: 'storage-security', label: 'Verify storage facility security features and access protocols' }
    ]
  },
  
  'security-electronics': {
    title: 'Security - Electronic',
    items: [
      { id: 'gps-tracker', label: 'Consider installing a GPS tracker for theft recovery' },
      { id: 'security-system', label: 'Program and activate any security systems' },
      { id: 'security-cameras', label: 'Set up trail cameras or similar if storing on private property' },
      { id: 'motion-lights', label: 'Install motion-activated lights if appropriate' }
    ]
  },
  
  'security-documentation': {
    title: 'Security - Documentation',
    items: [
      { id: 'inventory-valuables', label: 'Create inventory of any valuables left in RV with photos' },
      { id: 'emergency-contacts', label: 'Leave emergency contact information with storage facility' },
      { id: 'authorized-access', label: 'Document anyone authorized to access or move the RV' },
      { id: 'insurance-verification', label: 'Verify insurance coverage specifically for storage period' }
    ]
  }
};
