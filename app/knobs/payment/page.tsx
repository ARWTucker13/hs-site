"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import ControlKnobsDiagram from "@/components/ControlKnobsDiagram";
import { METRIC_DESCRIPTIONS } from "@/data/metricDescriptions";
import paymentData from "@/data/paymentData.json";

interface Scenario {
  id: string;
  name: string;
  description: string;
  intended_effects: Record<string, string>;
  systemic_risks: Record<string, string>;
}

interface PaymentData {
  description: string;
  provider_payment_scenarios: Scenario[];
  demand_side_scenarios: Scenario[];
}

const typedData = paymentData as unknown as PaymentData;

function formatMetricName(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function stripWarningPrefix(text: string): string {
  if (text.startsWith("Critical Warning: ")) return text.slice(18);
  if (text.startsWith("Warning: ")) return text.slice(9);
  return text;
}

export default function PaymentPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const activeScenario =
    typedData.provider_payment_scenarios.find((s) => s.id === activeId) ??
    typedData.demand_side_scenarios.find((s) => s.id === activeId) ??
    null;

  const scenarioData = activeScenario
    ? {
        intended_effects: activeScenario.intended_effects,
        systemic_risks: activeScenario.systemic_risks,
      }
    : null;

  const handleMetricClick = (key: string) => {
    setActiveMetric(activeMetric === key ? null : key);
    setActiveId(null);
  };

  const handleScenarioClick = (id: string) => {
    setActiveId(activeId === id ? null : id);
    setActiveMetric(null);
  };

  const metric = activeMetric ? METRIC_DESCRIPTIONS[activeMetric] : null;

  return (
    <div>
      <ControlKnobsDiagram
        activeKnob="payment"
        activeScenario={scenarioData}
        onMetricClick={handleMetricClick}
        activeMetric={activeMetric}
      />

      <div className="mt-6 border-2 border-blue-600 bg-white p-6">
        <h2 className="font-blueprint text-sm font-bold text-blue-600 mb-3 uppercase tracking-wider">
          {metric ? metric.name : activeScenario ? activeScenario.name : "Health System Payment"}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {metric ? metric.description : activeScenario ? activeScenario.description : typedData.description}
        </p>

        {activeScenario && !metric && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(activeScenario.intended_effects).length > 0 && (
              <div>
                <h3 className="font-blueprint text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  Intended Effects
                </h3>
                <ul className="space-y-2">
                  {Object.entries(activeScenario.intended_effects).map(([key, value]) => (
                    <li key={key} className="flex items-start gap-2">
                      <span className="shrink-0 mt-1.5 h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-slate-700">
                        <span className="font-semibold text-blue-700">{formatMetricName(key)}:</span>{" "}
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {Object.keys(activeScenario.systemic_risks).length > 0 && (
              <div>
                <h3 className="font-blueprint text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                  Systemic Risks
                </h3>
                <ul className="space-y-2">
                  {Object.entries(activeScenario.systemic_risks).map(([key, value]) => (
                    <li key={key} className="flex items-start gap-2">
                      <AlertTriangle className="shrink-0 mt-0.5 h-4 w-4 text-amber-500" />
                      <span className="text-sm text-slate-700">
                        <span className="font-semibold text-amber-700">{formatMetricName(key)}:</span>{" "}
                        {stripWarningPrefix(value)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 border-2 border-purple-600 bg-white p-6">
        <h2 className="font-blueprint text-sm font-bold text-purple-600 mb-4 uppercase tracking-wider">
          Payment: Provider Payment Methods
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {typedData.provider_payment_scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario.id)}
              className={`text-left px-4 py-3 rounded-sm transition-colors ${
                activeId === scenario.id
                  ? "border-2 border-purple-600 bg-purple-50"
                  : "border border-slate-300 bg-white hover:border-purple-300"
              }`}
            >
              <div className="font-medium text-sm text-slate-900">{scenario.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 border-2 border-purple-600 bg-white p-6">
        <h2 className="font-blueprint text-sm font-bold text-purple-600 mb-4 uppercase tracking-wider">
          Payment: Demand-side Cost Sharing
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {typedData.demand_side_scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario.id)}
              className={`text-left px-4 py-3 rounded-sm transition-colors ${
                activeId === scenario.id
                  ? "border-2 border-purple-600 bg-purple-50"
                  : "border border-slate-300 bg-white hover:border-purple-300"
              }`}
            >
              <div className="font-medium text-sm text-slate-900">{scenario.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
