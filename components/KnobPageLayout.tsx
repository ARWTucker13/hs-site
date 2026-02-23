"use client";

import { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import ControlKnobsDiagram from "@/components/ControlKnobsDiagram";
import { METRIC_DESCRIPTIONS } from "@/data/metricDescriptions";
import literatureData from "@/data/literature.json";
import {
  type KnobPageConfig,
  type KnobColor,
  type LiteraturePaper,
  formatMetricName,
  stripWarningPrefix,
} from "@/lib/knobUtils";

const COLOR_CLASSES: Record<
  KnobColor,
  { border: string; bg: string; text: string; hoverBorder: string }
> = {
  green: {
    border: "border-green-600",
    bg: "bg-green-50",
    text: "text-green-600",
    hoverBorder: "hover:border-green-300",
  },
  purple: {
    border: "border-purple-600",
    bg: "bg-purple-50",
    text: "text-purple-600",
    hoverBorder: "hover:border-purple-300",
  },
  teal: {
    border: "border-teal-600",
    bg: "bg-teal-50",
    text: "text-teal-600",
    hoverBorder: "hover:border-teal-300",
  },
  rose: {
    border: "border-rose-600",
    bg: "bg-rose-50",
    text: "text-rose-600",
    hoverBorder: "hover:border-rose-300",
  },
  orange: {
    border: "border-orange-600",
    bg: "bg-orange-50",
    text: "text-orange-600",
    hoverBorder: "hover:border-orange-300",
  },
};

interface KnobPageLayoutProps {
  config: KnobPageConfig;
}

export default function KnobPageLayout({ config }: KnobPageLayoutProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [showLiterature, setShowLiterature] = useState(false);

  const allScenarios = config.sections.flatMap((s) => s.scenarios);
  const activeScenario = allScenarios.find((s) => s.id === activeId) ?? null;

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
  const cc = COLOR_CLASSES[config.color];

  const knobName = config.activeKnob.toLowerCase();
  const matchingPapers = (literatureData as LiteraturePaper[])
    .filter((paper) =>
      paper.control_knob
        .split(" / ")
        .some((k) => k.toLowerCase() === knobName)
    )
    .sort((a, b) => a.year - b.year);

  return (
    <div>
      <ControlKnobsDiagram
        activeKnob={config.activeKnob}
        activeScenario={scenarioData}
        onMetricClick={handleMetricClick}
        activeMetric={activeMetric}
      />

      {/* Description & Detail Panel */}
      <div className="mt-6 border-2 border-blue-600 bg-white p-4 sm:p-6">
        <h2 className="font-blueprint text-sm font-bold text-blue-600 mb-3 uppercase tracking-wider">
          {metric
            ? metric.name
            : activeScenario
              ? activeScenario.name
              : config.defaultTitle}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {metric
            ? metric.description
            : activeScenario
              ? activeScenario.description
              : config.description}
        </p>

        {activeScenario && !metric && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(activeScenario.intended_effects).length > 0 && (
              <div>
                <h3 className="font-blueprint text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  Intended Effects
                </h3>
                <ul className="space-y-2">
                  {Object.entries(activeScenario.intended_effects).map(
                    ([key, value]) => (
                      <li key={key} className="flex items-start gap-2">
                        <span className="shrink-0 mt-1.5 h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-sm text-slate-700">
                          <span className="font-semibold text-blue-700">
                            {formatMetricName(key)}:
                          </span>{" "}
                          {value}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {Object.keys(activeScenario.systemic_risks).length > 0 && (
              <div>
                <h3 className="font-blueprint text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                  Systemic Risks
                </h3>
                <ul className="space-y-2">
                  {Object.entries(activeScenario.systemic_risks).map(
                    ([key, value]) => (
                      <li key={key} className="flex items-start gap-2">
                        <AlertTriangle className="shrink-0 mt-0.5 h-4 w-4 text-amber-500" />
                        <span className="text-sm text-slate-700">
                          <span className="font-semibold text-amber-700">
                            {formatMetricName(key)}:
                          </span>{" "}
                          {stripWarningPrefix(value)}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Scenario Sections */}
      {config.sections.map((section) => (
        <div
          key={section.title}
          className={`mt-6 border-2 ${cc.border} bg-white p-4 sm:p-6`}
        >
          <h2
            className={`font-blueprint text-sm font-bold ${cc.text} mb-4 uppercase tracking-wider`}
          >
            {section.title}
          </h2>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${
              section.lgCols === 3
                ? "lg:grid-cols-3"
                : "lg:grid-cols-4"
            }`}
          >
            {section.scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioClick(scenario.id)}
                className={`text-left px-4 py-3 rounded-sm transition-colors ${
                  activeId === scenario.id
                    ? `border-2 ${cc.border} ${cc.bg}`
                    : `border border-slate-300 bg-white ${cc.hoverBorder}`
                }`}
              >
                <div className="font-medium text-sm text-slate-900">
                  {scenario.name}
                </div>
                {section.extraFields?.map((field) => {
                  const val = scenario[field];
                  if (!val) return null;
                  return (
                    <div key={field} className="text-xs text-slate-500 mt-1">
                      {formatMetricName(field)}: {String(val)}
                    </div>
                  );
                })}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Empirical Evidence Section */}
      {matchingPapers.length > 0 && (
        <div className="mt-6 border-2 border-blue-600 bg-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-blueprint text-sm font-bold text-blue-600 uppercase tracking-wider">
              Empirical Evidence
            </h2>
            <button
              onClick={() => setShowLiterature(!showLiterature)}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {showLiterature ? (
                <>
                  <span>Hide {matchingPapers.length} {matchingPapers.length === 1 ? "paper" : "papers"}</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Show {matchingPapers.length} {matchingPapers.length === 1 ? "paper" : "papers"}</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {showLiterature && (
            <div className="mt-4 space-y-3">
              {matchingPapers.map((paper) => {
                const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`;
                return (
                  <div
                    key={paper.id}
                    className="border border-slate-200 rounded-sm p-4"
                  >
                    <a
                      href={scholarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline inline-flex items-center gap-1"
                    >
                      {paper.title}
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                    <div className="text-xs text-slate-500 mt-1">
                      {paper.authors} ({paper.year}) &middot; {paper.journal} &middot; {paper.country}
                    </div>
                    <div className="mt-2">
                      <span className="inline-block text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {paper.methodology}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                      {paper.finding}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
