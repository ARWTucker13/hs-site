"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import ControlKnobsDiagram from "@/components/ControlKnobsDiagram";
import { METRIC_DESCRIPTIONS } from "@/data/metricDescriptions";
import financingData from "@/data/financingData.json";

interface Scenario {
  id: string;
  name: string;
  description: string;
  revenue_source?: string;
  intended_effects: Record<string, string>;
  systemic_risks: Record<string, string>;
}

interface FinancingData {
  description: string;
  revenue_generation_scenarios: Scenario[];
  risk_pooling_scenarios: Scenario[];
}

const typedData = financingData as unknown as FinancingData;

function formatMetricName(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function stripWarningPrefix(text: string): string {
  if (text.startsWith("Critical Warning: ")) return text.slice(18);
  if (text.startsWith("Warning: ")) return text.slice(9);
  return text;
}

export default function FinancingPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const activeScenario =
    typedData.revenue_generation_scenarios.find((s) => s.id === activeId) ??
    typedData.risk_pooling_scenarios.find((s) => s.id === activeId) ??
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
        activeKnob="financing"
        activeScenario={scenarioData}
        onMetricClick={handleMetricClick}
        activeMetric={activeMetric}
      />

      {/* Description & Detail Panel */}
      <div className="mt-6 border-2 border-blue-600 bg-white p-6">
        <h2 className="font-blueprint text-sm font-bold text-blue-600 mb-3 uppercase tracking-wider">
          {metric ? metric.name : activeScenario ? activeScenario.name : "Health System Financing"}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {metric ? metric.description : activeScenario ? activeScenario.description : typedData.description}
        </p>

        {activeScenario && !metric && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Intended Effects */}
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
                        <span className="font-semibold text-blue-700">
                          {formatMetricName(key)}:
                        </span>{" "}
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Systemic Risks */}
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
                        <span className="font-semibold text-amber-700">
                          {formatMetricName(key)}:
                        </span>{" "}
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

      {/* Revenue Generation Scenarios */}
      <div className="mt-6 border-2 border-green-600 bg-white p-6">
        <h2 className="font-blueprint text-sm font-bold text-green-600 mb-4 uppercase tracking-wider">
          Financing: Revenue Generation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {typedData.revenue_generation_scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario.id)}
              className={`text-left px-4 py-3 rounded-sm transition-colors ${
                activeId === scenario.id
                  ? "border-2 border-green-600 bg-green-50"
                  : "border border-slate-300 bg-white hover:border-green-300"
              }`}
            >
              <div className="font-medium text-sm text-slate-900">
                {scenario.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Risk Pooling Scenarios */}
      <div className="mt-6 border-2 border-green-600 bg-white p-6">
        <h2 className="font-blueprint text-sm font-bold text-green-600 mb-4 uppercase tracking-wider">
          Financing: Risk Pooling Scenarios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {typedData.risk_pooling_scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario.id)}
              className={`text-left px-4 py-3 rounded-sm transition-colors ${
                activeId === scenario.id
                  ? "border-2 border-green-600 bg-green-50"
                  : "border border-slate-300 bg-white hover:border-green-300"
              }`}
            >
              <div className="font-medium text-sm text-slate-900">
                {scenario.name}
              </div>
              {scenario.revenue_source && (
                <div className="text-xs text-slate-500 mt-1">
                  Revenue: {scenario.revenue_source}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
