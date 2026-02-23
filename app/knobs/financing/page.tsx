"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings, Star, DoorOpen, Heart, Smile, Shield } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import financingData from "@/data/financingData.json";

type Scenario = (typeof financingData.scenarios)[number];

const INTERMEDIATE_METRICS = [
  { key: "efficiency", label: "Efficiency", icon: Settings },
  { key: "quality", label: "Quality", icon: Star },
  { key: "access", label: "Access", icon: DoorOpen },
] as const;

const GOAL_METRICS = [
  { key: "health_status", label: "Health Status", icon: Heart },
  { key: "customer_satisfaction", label: "Customer Satisfaction", icon: Smile },
  { key: "risk_protection", label: "Risk Protection", icon: Shield },
] as const;

function getEffect(scenario: Scenario | null, key: string): string | null {
  if (!scenario) return null;
  const effects = scenario.intended_effects as unknown as Record<string, string>;
  return effects[key] ?? null;
}

function getRisk(scenario: Scenario | null, key: string): string | null {
  if (!scenario) return null;
  const risks = scenario.systemic_risks as unknown as Record<string, string>;
  return risks[key] ?? null;
}

export default function FinancingPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeScenario =
    financingData.scenarios.find((s) => s.id === activeId) ?? null;

  return (
    <div>
      <Link
        href="/"
        className="font-blueprint text-sm text-blue-600 hover:underline mb-6 inline-block"
      >
        &larr; Back to Control Knobs
      </Link>

      <h1 className="font-blueprint text-2xl font-bold text-slate-900 mb-8">
        Financing: Risk Pooling Scenarios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column — Scenario Buttons */}
        <div className="flex flex-col gap-3">
          {financingData.scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() =>
                setActiveId(activeId === scenario.id ? null : scenario.id)
              }
              className={`text-left px-4 py-3 rounded-sm transition-colors ${
                activeId === scenario.id
                  ? "border-2 border-blue-600 bg-blue-50"
                  : "border border-slate-300 bg-white"
              }`}
            >
              <div className="font-medium text-sm text-slate-900">
                {scenario.name}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Revenue: {scenario.revenue_source}
              </div>
            </button>
          ))}
        </div>

        {/* Right Column — Sticky Dashboard */}
        <div className="md:sticky md:top-8 self-start">
          <div className="mb-6">
            <h2 className="font-blueprint text-sm font-bold text-blue-600 mb-3 uppercase tracking-wide">
              Intermediate Performance Measures
            </h2>
            <div className="flex flex-col gap-3">
              {INTERMEDIATE_METRICS.map((m) => (
                <MetricCard
                  key={m.key}
                  label={m.label}
                  icon={m.icon}
                  activeEffect={getEffect(activeScenario, m.key)}
                  riskWarning={getRisk(activeScenario, m.key)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-blueprint text-sm font-bold text-blue-600 mb-3 uppercase tracking-wide">
              Performance Goals
            </h2>
            <div className="flex flex-col gap-3">
              {GOAL_METRICS.map((m) => (
                <MetricCard
                  key={m.key}
                  label={m.label}
                  icon={m.icon}
                  activeEffect={getEffect(activeScenario, m.key)}
                  riskWarning={getRisk(activeScenario, m.key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
