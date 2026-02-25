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

export function abbreviateScenario(name: string): string {
  const parts = name.split(/[\s\-\/]+/).filter(Boolean);
  if (parts.length >= 2) {
    return parts.map((p) => p[0].toUpperCase()).join("").slice(0, 5);
  }
  return name.slice(0, 3);
}

export function parseEffectLevel(effect: string | null | undefined): number {
  if (!effect) return 0;
  if (effect.startsWith("Very High")) return 4;
  if (effect.startsWith("Medium-High")) return 2;
  if (effect.startsWith("Medium")) return 1;
  if (effect.startsWith("High")) return 3;
  return 0;
}

export function parseRiskLevel(risk: string | null | undefined): number {
  if (!risk) return 0;
  if (risk.startsWith("Critical Warning")) return -3;
  if (risk.startsWith("Warning")) return -2;
  return 0;
}
