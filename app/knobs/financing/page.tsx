"use client";

import KnobPageLayout from "@/components/KnobPageLayout";
import type { KnobPageConfig, Scenario } from "@/lib/knobUtils";
import financingData from "@/data/financingData.json";

const data = financingData as unknown as {
  description: string;
  revenue_generation_scenarios: Scenario[];
  risk_pooling_scenarios: Scenario[];
};

const config: KnobPageConfig = {
  activeKnob: "financing",
  defaultTitle: "Health System Financing",
  description: data.description,
  color: "green",
  sections: [
    {
      scenarios: data.revenue_generation_scenarios,
      title: "Financing: Revenue Generation",
    },
    {
      scenarios: data.risk_pooling_scenarios,
      title: "Financing: Risk Pooling Scenarios",
      lgCols: 3,
      extraFields: ["revenue_source"],
    },
  ],
};

export default function FinancingPage() {
  return <KnobPageLayout config={config} />;
}
