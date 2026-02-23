"use client";

import KnobPageLayout from "@/components/KnobPageLayout";
import type { KnobPageConfig, Scenario } from "@/lib/knobUtils";
import behaviorData from "@/data/behaviorData.json";

const data = behaviorData as unknown as {
  description: string;
  provider_behavior_scenarios: Scenario[];
  patient_behavior_scenarios: Scenario[];
};

const config: KnobPageConfig = {
  activeKnob: "behavior",
  defaultTitle: "Persuasion & Behavior Change",
  description: data.description,
  color: "orange",
  sections: [
    {
      scenarios: data.provider_behavior_scenarios,
      title: "Behavior: Provider Behavior Change",
    },
    {
      scenarios: data.patient_behavior_scenarios,
      title: "Behavior: Patient & Population",
    },
  ],
};

export default function BehaviorPage() {
  return <KnobPageLayout config={config} />;
}
