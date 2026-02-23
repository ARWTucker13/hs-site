export type KnobColor = "green" | "purple" | "teal" | "rose" | "orange";

export interface LiteraturePaper {
  id: string;
  control_knob: string;
  country: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  context: string;
  methodology: string;
  finding: string;
  macro_takeaway: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  intended_effects: Record<string, string>;
  systemic_risks: Record<string, string>;
  [key: string]: unknown;
}

export interface ScenarioSection {
  scenarios: Scenario[];
  title: string;
  lgCols?: number;
  extraFields?: string[];
}

export interface KnobPageConfig {
  activeKnob: string;
  defaultTitle: string;
  description: string;
  color: KnobColor;
  sections: ScenarioSection[];
}

export function formatMetricName(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function stripWarningPrefix(text: string): string {
  if (text.startsWith("Critical Warning: ")) return text.slice(18);
  if (text.startsWith("Warning: ")) return text.slice(9);
  return text;
}
