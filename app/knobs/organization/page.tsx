"use client";

import KnobPageLayout from "@/components/KnobPageLayout";
import type { KnobPageConfig, Scenario } from "@/lib/knobUtils";
import organizationData from "@/data/organizationData.json";

const data = organizationData as unknown as {
  description: string;
  delivery_structure_scenarios: Scenario[];
  facility_governance_scenarios: Scenario[];
};

const config: KnobPageConfig = {
  activeKnob: "organization",
  defaultTitle: "Health System Organization",
  description: data.description,
  color: "teal",
  sections: [
    {
      scenarios: data.delivery_structure_scenarios,
      title: "Organization: Delivery Structure",
    },
    {
      scenarios: data.facility_governance_scenarios,
      title: "Organization: Facility Governance",
    },
  ],
};

export default function OrganizationPage() {
  return <KnobPageLayout config={config} />;
}
