"use client";

import KnobPageLayout from "@/components/KnobPageLayout";
import type { KnobPageConfig, Scenario } from "@/lib/knobUtils";
import regulationData from "@/data/regulationData.json";

const data = regulationData as unknown as {
  description: string;
  quality_safety_scenarios: Scenario[];
  market_price_scenarios: Scenario[];
};

const config: KnobPageConfig = {
  activeKnob: "regulation",
  defaultTitle: "Health System Regulation",
  description: data.description,
  color: "rose",
  sections: [
    {
      scenarios: data.quality_safety_scenarios,
      title: "Regulation: Quality & Safety",
    },
    {
      scenarios: data.market_price_scenarios,
      title: "Regulation: Market & Price",
    },
  ],
};

export default function RegulationPage() {
  return <KnobPageLayout config={config} />;
}
