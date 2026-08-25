// Realistic demo dataset for a fictional manufacturing client of InduTech Solutions:
// "Kwazi Manufacturing" — efficiency dropped from 91% to 78% over the last 6 weeks.

export type ProductionRecord = {
  id: string;
  date: string;
  product: string;
  department: string;
  target: number;
  actual: number;
  hours: number;
  downtime: number;
  defects: number;
  status: "Completed" | "In Progress" | "Delayed";
};

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  unit: string;
  stock: number;
  minimum: number;
  received: number;
  issued: number;
};

export type QualityRecord = {
  id: string;
  date: string;
  product: string;
  defect: string;
  category: string;
  department: string;
  severity: "Critical" | "Major" | "Minor";
  rootCause: string;
  action: string;
  status: "Open" | "In Progress" | "Closed";
};

export const productionRecords: ProductionRecord[] = [
  { id: "PR-1041", date: "2026-08-18", product: "Steel Bracket A", department: "Fabrication", target: 1200, actual: 1150, hours: 16, downtime: 0.8, defects: 18, status: "Completed" },
  { id: "PR-1042", date: "2026-08-18", product: "Valve Housing", department: "Machining", target: 800, actual: 611, hours: 16, downtime: 3.4, defects: 41, status: "Completed" },
  { id: "PR-1043", date: "2026-08-19", product: "Steel Bracket A", department: "Fabrication", target: 1200, actual: 1104, hours: 16, downtime: 1.2, defects: 22, status: "Completed" },
  { id: "PR-1044", date: "2026-08-19", product: "Conveyor Roller", department: "Assembly", target: 600, actual: 552, hours: 16, downtime: 1.0, defects: 12, status: "Completed" },
  { id: "PR-1045", date: "2026-08-20", product: "Valve Housing", department: "Machining", target: 800, actual: 570, hours: 16, downtime: 4.1, defects: 47, status: "Delayed" },
  { id: "PR-1046", date: "2026-08-20", product: "Pump Casing", department: "Foundry", target: 400, actual: 372, hours: 16, downtime: 1.5, defects: 9, status: "Completed" },
  { id: "PR-1047", date: "2026-08-21", product: "Steel Bracket A", department: "Fabrication", target: 1200, actual: 1188, hours: 16, downtime: 0.5, defects: 14, status: "Completed" },
  { id: "PR-1048", date: "2026-08-21", product: "Valve Housing", department: "Machining", target: 800, actual: 604, hours: 16, downtime: 3.8, defects: 39, status: "Delayed" },
  { id: "PR-1049", date: "2026-08-24", product: "Conveyor Roller", department: "Assembly", target: 600, actual: 588, hours: 16, downtime: 0.6, defects: 8, status: "Completed" },
  { id: "PR-1050", date: "2026-08-24", product: "Pump Casing", department: "Foundry", target: 400, actual: 341, hours: 16, downtime: 2.2, defects: 16, status: "In Progress" },
];

export const inventoryItems: InventoryItem[] = [
  { id: "INV-01", name: "Raw Material A (Steel Plate 4mm)", category: "Raw Material", unit: "sheets", stock: 84, minimum: 120, received: 400, issued: 316 },
  { id: "INV-02", name: "Raw Material B (Alloy Rod)", category: "Raw Material", unit: "bars", stock: 460, minimum: 200, received: 700, issued: 240 },
  { id: "INV-03", name: "Cutting Fluid", category: "Consumable", unit: "litres", stock: 38, minimum: 60, received: 120, issued: 82 },
  { id: "INV-04", name: "Machine 3 Spindle Bearing", category: "Spare Part", unit: "units", stock: 2, minimum: 6, received: 10, issued: 8 },
  { id: "INV-05", name: "Packaging Cartons", category: "Packaging", unit: "units", stock: 1840, minimum: 800, received: 3000, issued: 1160 },
  { id: "INV-06", name: "Welding Wire", category: "Consumable", unit: "kg", stock: 310, minimum: 150, received: 500, issued: 190 },
];

export const qualityRecords: QualityRecord[] = [
  { id: "QC-301", date: "2026-08-18", product: "Valve Housing", defect: "Dimensional out of tolerance", category: "Dimensional", department: "Machining", severity: "Major", rootCause: "Tool wear on Machine 3", action: "Increase tool change frequency", status: "In Progress" },
  { id: "QC-302", date: "2026-08-19", product: "Steel Bracket A", defect: "Weld porosity", category: "Welding", department: "Fabrication", severity: "Minor", rootCause: "Shielding gas flow low", action: "Recalibrate gas regulator", status: "Closed" },
  { id: "QC-303", date: "2026-08-20", product: "Valve Housing", defect: "Surface finish rough", category: "Surface", department: "Machining", severity: "Major", rootCause: "Spindle vibration on Machine 3", action: "Vibration analysis scheduled", status: "Open" },
  { id: "QC-304", date: "2026-08-20", product: "Pump Casing", defect: "Porosity in casting", category: "Casting", department: "Foundry", severity: "Critical", rootCause: "Moisture in sand mix", action: "Adjust sand moisture control", status: "In Progress" },
  { id: "QC-305", date: "2026-08-21", product: "Valve Housing", defect: "Dimensional out of tolerance", category: "Dimensional", department: "Machining", severity: "Major", rootCause: "Tool wear on Machine 3", action: "Preventive maintenance request", status: "Open" },
  { id: "QC-306", date: "2026-08-24", product: "Conveyor Roller", defect: "Incorrect assembly torque", category: "Assembly", department: "Assembly", severity: "Minor", rootCause: "Torque wrench out of calibration", action: "Recalibrate tooling", status: "Closed" },
];

export const efficiencyTrend = [
  { week: "W29", efficiency: 91, quality: 97.4, downtime: 4.2 },
  { week: "W30", efficiency: 89, quality: 97.1, downtime: 5.0 },
  { week: "W31", efficiency: 87, quality: 96.4, downtime: 6.1 },
  { week: "W32", efficiency: 84, quality: 95.6, downtime: 7.8 },
  { week: "W33", efficiency: 81, quality: 94.8, downtime: 9.4 },
  { week: "W34", efficiency: 78, quality: 94.1, downtime: 11.2 },
];

export const outputByDepartment = [
  { department: "Fabrication", target: 3600, actual: 3442 },
  { department: "Machining", target: 2400, actual: 1785 },
  { department: "Assembly", target: 1200, actual: 1140 },
  { department: "Foundry", target: 800, actual: 713 },
];

export const downtimeReasons = [
  { reason: "Machine 3 breakdown", hours: 9.6 },
  { reason: "Tool change", hours: 4.1 },
  { reason: "Material waiting", hours: 3.2 },
  { reason: "Setup / changeover", hours: 2.4 },
  { reason: "Operator unavailable", hours: 1.8 },
];

export const defectPareto = [
  { category: "Dimensional", count: 86 },
  { category: "Surface", count: 41 },
  { category: "Casting", count: 25 },
  { category: "Welding", count: 18 },
  { category: "Assembly", count: 8 },
];

export const alerts = [
  { level: "High" as const, title: "LOW STOCK", message: "Raw Material A has reached its minimum stock level (84 / 120 sheets)." },
  { level: "High" as const, title: "DOWNTIME SPIKE", message: "Machine 3 recorded 9.6 hours of unplanned downtime this week." },
  { level: "Medium" as const, title: "RECURRING DEFECT", message: "Dimensional defects on Valve Housing repeated 3 times in 5 days." },
  { level: "Low" as const, title: "SPARE PART", message: "Machine 3 Spindle Bearing below minimum (2 / 6 units)." },
];

export const kpis = {
  efficiency: 78,
  target: 8000,
  actual: 7080,
  qualityRate: 94.1,
  defectRate: 5.9,
  inventoryHealth: 82,
  downtimeHours: 19.1,
  productivity: 44.3,
  openIssues: 3,
  improvementOpportunities: 7,
};

/** Compact snapshot of operational data handed to the AI as grounding context. */
export function operationsContext() {
  return JSON.stringify(
    {
      company: "Kwazi Manufacturing (demo client)",
      kpis,
      efficiencyTrend,
      outputByDepartment,
      downtimeReasons,
      defectPareto,
      lowStock: inventoryItems.filter((i) => i.stock < i.minimum).map((i) => ({ item: i.name, stock: i.stock, minimum: i.minimum })),
      openQualityIssues: qualityRecords.filter((q) => q.status !== "Closed"),
    },
    null,
    1,
  );
}
