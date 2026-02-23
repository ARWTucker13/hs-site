"use client";

import KnobPageLayout from "@/components/KnobPageLayout";
import type { KnobPageConfig, Scenario } from "@/lib/knobUtils";
import paymentData from "@/data/paymentData.json";

const data = paymentData as unknown as {
  description: string;
  provider_payment_scenarios: Scenario[];
  demand_side_scenarios: Scenario[];
};

const config: KnobPageConfig = {
  activeKnob: "payment",
  defaultTitle: "Health System Payment",
  description: data.description,
  color: "purple",
  sections: [
    {
      scenarios: data.provider_payment_scenarios,
      title: "Payment: Provider Payment Methods",
    },
    {
      scenarios: data.demand_side_scenarios,
      title: "Payment: Demand-side Cost Sharing",
    },
  ],
};

export default function PaymentPage() {
  return <KnobPageLayout config={config} />;
}
