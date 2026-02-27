"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, BookOpen, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Tooltip from "@/components/Tooltip";
import ControlKnobsDiagram from "@/components/ControlKnobsDiagram";
import { METRIC_DESCRIPTIONS } from "@/data/metricDescriptions";
import literatureData from "@/data/literature.json";
import {
  type KnobPageConfig,
  type KnobColor,
  type LiteraturePaper,
  formatMetricName,
  stripWarningPrefix,
  parseEffectLevel,
  abbreviateScenario,
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
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Track scenario selection changes to trigger entrance animations via key remounts
  const [scenarioKey, setScenarioKey] = useState(0);

  useEffect(() => {
    // Trigger stagger-fade-in after mount
    const t = setTimeout(() => setPageLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  const allScenarios = config.sections.flatMap((s) => s.scenarios);
  const activeScenario = allScenarios.find((s) => s.id === activeId) ?? null;

  const compareScenarioA = compareMode
    ? allScenarios.find((s) => s.id === compareIds[0]) ?? null
    : null;
  const compareScenarioB = compareMode
    ? allScenarios.find((s) => s.id === compareIds[1]) ?? null
    : null;

  const scenarioData = compareMode
    ? compareScenarioA
      ? {
          intended_effects: compareScenarioA.intended_effects,
          systemic_risks: compareScenarioA.systemic_risks,
        }
      : null
    : activeScenario
      ? {
          intended_effects: activeScenario.intended_effects,
          systemic_risks: activeScenario.systemic_risks,
        }
      : null;

  const secondScenarioData =
    compareMode && compareScenarioB
      ? {
          intended_effects: compareScenarioB.intended_effects,
          systemic_risks: compareScenarioB.systemic_risks,
        }
      : null;

  const handleMetricClick = (key: string) => {
    if (compareMode) return;
    setActiveMetric(activeMetric === key ? null : key);
    setActiveId(null);
  };

  const handleScenarioClick = (id: string) => {
    if (compareMode) {
      setCompareIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length < 2) return [...prev, id];
        return [prev[0], id];
      });
      setActiveMetric(null);
      setScenarioKey((k) => k + 1);
    } else {
      setActiveId(activeId === id ? null : id);
      setActiveMetric(null);
      setScenarioKey((k) => k + 1);
    }
  };

  const toggleCompareMode = () => {
    if (compareMode) {
      setCompareMode(false);
      setCompareIds([]);
    } else {
      setCompareMode(true);
      setActiveId(null);
      setActiveMetric(null);
    }
  };

  const metric = activeMetric ? METRIC_DESCRIPTIONS[activeMetric] : null;
  const cc = COLOR_CLASSES[config.color];

  const knobName = config.activeKnob.toLowerCase();
  const allPapers = literatureData as LiteraturePaper[];
  const matchingPapers = allPapers
    .filter((paper) =>
      paper.control_knob
        .split(" / ")
        .some((k) => k.toLowerCase() === knobName)
    )
    .sort((a, b) => a.year - b.year);

  // Map knob display names to URL keys for linking
  const KNOB_KEY_MAP: Record<string, string> = {
    "Financing": "financing",
    "Payment": "payment",
    "Organization": "organization",
    "Regulation": "regulation",
    "Behavior": "behavior",
  };

  // Pill colors per knob for interaction chips
  const KNOB_PILL: Record<string, string> = {
    "Financing": "bg-green-100 text-green-700 border-green-300",
    "Payment": "bg-purple-100 text-purple-700 border-purple-300",
    "Organization": "bg-teal-100 text-teal-700 border-teal-300",
    "Regulation": "bg-rose-100 text-rose-700 border-rose-300",
    "Behavior": "bg-orange-100 text-orange-700 border-orange-300",
  };

  // Extract interacting knob keys from the active scenario
  const activeInteractions = !compareMode && activeScenario?.interactions
    ? activeScenario.interactions
    : null;
  const interactingKnobs = activeInteractions
    ? Object.keys(activeInteractions).map((k) => KNOB_KEY_MAP[k]).filter(Boolean)
    : [];

  // Literature IDs for the selected scenario
  const activeScenarioLitIds = !compareMode && activeScenario?.literature_ids
    ? activeScenario.literature_ids
    : [];

  // Union of all effect/risk metric keys for comparison
  const allEffectKeys =
    compareScenarioA && compareScenarioB
      ? [
          ...new Set([
            ...Object.keys(compareScenarioA.intended_effects),
            ...Object.keys(compareScenarioB.intended_effects),
          ]),
        ]
      : [];

  const allRiskKeys =
    compareScenarioA && compareScenarioB
      ? [
          ...new Set([
            ...Object.keys(compareScenarioA.systemic_risks),
            ...Object.keys(compareScenarioB.systemic_risks),
          ]),
        ]
      : [];

  return (
    <div>
      <ControlKnobsDiagram
        activeKnob={config.activeKnob}
        activeScenario={scenarioData}
        secondScenario={secondScenarioData}
        primaryLabel={compareScenarioA ? abbreviateScenario(compareScenarioA.name) : undefined}
        secondaryLabel={compareScenarioB ? abbreviateScenario(compareScenarioB.name) : undefined}
        onMetricClick={compareMode ? undefined : handleMetricClick}
        activeMetric={activeMetric}
        interactingKnobs={interactingKnobs.length > 0 ? interactingKnobs : undefined}
        scenarioKey={scenarioKey}
      />

      {/* Description & Detail Panel */}
      <div className="mt-6 border-2 border-blue-600 bg-white p-4 sm:p-6">
        {compareMode ? (
          compareScenarioA && compareScenarioB ? (
            /* Full comparison view */
            <div key={`compare-${compareIds.join("-")}`} className="animate-fade-slide-up">
              <h2 className="font-blueprint text-lg font-bold text-blue-600 mb-5 uppercase tracking-wider">
                Scenario Comparison
              </h2>

              {/* Descriptions side by side with colored borders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="border-l-4 border-blue-600 bg-blue-50/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center h-6 w-6 text-xs font-bold text-white bg-blue-600 rounded">
                      A
                    </span>
                    <h3 className="font-blueprint text-base font-bold text-blue-600 uppercase tracking-wider">
                      {compareScenarioA.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {compareScenarioA.description}
                  </p>
                </div>
                <div className="border-l-4 border-emerald-600 bg-emerald-50/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center h-6 w-6 text-xs font-bold text-white bg-emerald-600 rounded">
                      B
                    </span>
                    <h3 className="font-blueprint text-base font-bold text-emerald-600 uppercase tracking-wider">
                      {compareScenarioB.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {compareScenarioB.description}
                  </p>
                </div>
              </div>

              {/* Divider bar */}
              <div className="my-5 h-0.5 bg-gradient-to-r from-blue-600 via-slate-300 to-emerald-600" />

              {/* Intended Effects Comparison */}
              {allEffectKeys.length > 0 && (
                <div className="pb-4">
                  <h3 className="font-blueprint text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">
                    Intended Effects
                  </h3>
                  <div className="space-y-2">
                    {allEffectKeys.map((key) => {
                      const aVal =
                        compareScenarioA.intended_effects[key] ?? null;
                      const bVal =
                        compareScenarioB.intended_effects[key] ?? null;
                      const diff = Math.abs(
                        parseEffectLevel(aVal) - parseEffectLevel(bVal)
                      );
                      const isDivergent = diff >= 2;
                      return (
                        <div
                          key={key}
                          className={`py-2.5 px-3 rounded border ${
                            isDivergent
                              ? "bg-amber-50 border-amber-300"
                              : "bg-slate-50/50 border-slate-200"
                          }`}
                        >
                          <div className="font-semibold text-sm text-slate-900 mb-1.5">
                            {formatMetricName(key)}
                            {isDivergent && (
                              <span className="ml-2 text-xs font-bold text-amber-700 bg-amber-200 px-1.5 py-0.5 rounded">
                                Divergent
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                            <div className="text-sm text-slate-700 border-l-2 border-blue-400 pl-2">
                              <span className="font-semibold text-blue-600">
                                A:
                              </span>{" "}
                              {aVal || <span className="text-slate-400">No effect</span>}
                            </div>
                            <div className="text-sm text-slate-700 border-l-2 border-emerald-400 pl-2">
                              <span className="font-semibold text-emerald-600">
                                B:
                              </span>{" "}
                              {bVal || <span className="text-slate-400">No effect</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Systemic Risks Comparison */}
              {allRiskKeys.length > 0 && (
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="font-blueprint text-sm font-bold text-amber-600 uppercase tracking-wider mb-3">
                    Systemic Risks
                  </h3>
                  <div className="space-y-2">
                    {allRiskKeys.map((key) => {
                      const aVal =
                        compareScenarioA.systemic_risks[key] ?? null;
                      const bVal =
                        compareScenarioB.systemic_risks[key] ?? null;
                      return (
                        <div
                          key={key}
                          className="py-2.5 px-3 rounded border bg-slate-50/50 border-slate-200"
                        >
                          <div className="font-semibold text-sm text-slate-900 mb-1.5">
                            {formatMetricName(key)}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                            <div className="flex items-start gap-1.5 text-sm text-slate-700 border-l-2 border-blue-400 pl-2">
                              <span className="font-semibold text-blue-600 shrink-0">
                                A:
                              </span>
                              {aVal ? (
                                <span className="flex items-start gap-1">
                                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                  <span>{stripWarningPrefix(aVal)}</span>
                                </span>
                              ) : (
                                <span className="text-slate-400">
                                  No risk identified
                                </span>
                              )}
                            </div>
                            <div className="flex items-start gap-1.5 text-sm text-slate-700 border-l-2 border-emerald-400 pl-2">
                              <span className="font-semibold text-emerald-600 shrink-0">
                                B:
                              </span>
                              {bVal ? (
                                <span className="flex items-start gap-1">
                                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                  <span>{stripWarningPrefix(bVal)}</span>
                                </span>
                              ) : (
                                <span className="text-slate-400">
                                  No risk identified
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Prompt to select scenarios */
            <div>
              <h2 className="font-blueprint text-lg font-bold text-blue-600 mb-3 uppercase tracking-wider">
                Compare Scenarios
              </h2>
              {compareScenarioA ? (
                <div>
                  <p className="text-sm text-slate-500 mb-3">
                    Select a second scenario to compare.
                  </p>
                  <div className="border-l-4 border-blue-600 bg-blue-50/50 p-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 text-xs font-bold text-white bg-blue-600 rounded mr-2">
                      A
                    </span>
                    <span className="font-medium text-sm text-slate-900">
                      {compareScenarioA.name}
                    </span>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      {compareScenarioA.description}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Select two scenarios below to compare their effects and risks
                  side by side.
                </p>
              )}
            </div>
          )
        ) : (
          /* Normal mode panel */
          <div key={activeId ?? activeMetric ?? "default"} className={activeScenario || metric ? "animate-fade-slide-up" : ""}>
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
              <>
                {activeInteractions && Object.keys(activeInteractions).length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="font-blueprint text-[10px] font-bold text-slate-400 uppercase tracking-wider" title="This scenario has policy interactions with other control knobs. Hover each for details.">
                      Interacts with:
                    </span>
                    {Object.entries(activeInteractions).map(([knobDisplayName, explanation], idx) => (
                      <Tooltip key={knobDisplayName} text={explanation}>
                        <Link
                          href={`/knobs/${KNOB_KEY_MAP[knobDisplayName] ?? knobDisplayName.toLowerCase()}`}
                          className={`animate-pill-enter inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold transition-colors hover:opacity-80 ${KNOB_PILL[knobDisplayName] ?? "bg-slate-100 text-slate-700 border-slate-300"}`}
                          style={{ animationDelay: `${idx * 60}ms` }}
                        >
                          {knobDisplayName}
                        </Link>
                      </Tooltip>
                    ))}
                  </div>
                )}

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
              </>
            )}
          </div>
        )}
      </div>

      {/* Compare Toggle */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={toggleCompareMode}
          className={`font-blueprint text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-all duration-200 ${
            compareMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "border border-blue-600 text-blue-600 hover:bg-blue-50"
          }`}
        >
          {compareMode ? "Exit Compare" : "Compare Scenarios"}
        </button>
      </div>

      {/* Scenario Sections */}
      {(() => {
        let globalIdx = 0;
        return config.sections.map((section) => (
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
            {section.scenarios.map((scenario) => {
              const compareIndex = compareMode
                ? compareIds.indexOf(scenario.id)
                : -1;
              const isActiveNormal =
                !compareMode && activeId === scenario.id;
              const isSelectedCompare = compareIndex >= 0;
              const cardIdx = globalIdx++;
              const staggerClass = pageLoaded ? "" : `animate-fade-in stagger-delay-${Math.min(cardIdx + 1, 12)}`;

              return (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioClick(scenario.id)}
                  style={!pageLoaded ? { opacity: 0 } : undefined}
                  className={`scenario-card relative text-left px-4 py-3 rounded-sm ${staggerClass} ${
                    isActiveNormal
                      ? `border-2 ${cc.border} ${cc.bg}`
                      : isSelectedCompare
                        ? `border-2 ${
                            compareIndex === 0
                              ? "border-blue-600 bg-blue-50"
                              : "border-emerald-600 bg-emerald-50"
                          }`
                        : compareMode
                          ? `border border-dashed border-slate-300 bg-white ${cc.hoverBorder}`
                          : `border border-slate-300 bg-white ${cc.hoverBorder}`
                  }`}
                >
                  {isSelectedCompare && (
                    <span
                      className={`absolute top-1.5 right-1.5 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white rounded ${
                        compareIndex === 0
                          ? "bg-blue-600"
                          : "bg-emerald-600"
                      }`}
                    >
                      {compareIndex === 0 ? "A" : "B"}
                    </span>
                  )}
                  <div className="font-medium text-sm text-slate-900">
                    {scenario.name}
                  </div>
                  {scenario.literature_ids && scenario.literature_ids.length > 0 && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                      <BookOpen className="h-3 w-3" />
                      <span>{scenario.literature_ids.length} {scenario.literature_ids.length === 1 ? "paper" : "papers"}</span>
                    </div>
                  )}
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
              );
            })}
          </div>
        </div>
        ));
      })()}

      {/* Empirical Evidence Section */}
      {(matchingPapers.length > 0 || activeScenarioLitIds.length > 0) && (() => {
        // Linked papers come from the FULL paper set so cross-knob references work
        const linkedPapers = activeScenarioLitIds.length > 0
          ? allPapers.filter((p) => activeScenarioLitIds.includes(p.id))
          : [];
        const linkedIds = new Set(linkedPapers.map((p) => p.id));
        const otherPapers = matchingPapers.filter((p) => !linkedIds.has(p.id));

        const renderPaper = (paper: LiteraturePaper, highlight?: boolean) => {
          const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`;
          return (
            <div
              key={paper.id}
              className={`border rounded-sm p-4 ${
                highlight ? "border-blue-400 bg-blue-50/50" : "border-slate-200"
              }`}
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
        };

        return (
          <div className="mt-6 border-2 border-blue-600 bg-white p-4 sm:p-6">
            <h2 className="font-blueprint text-sm font-bold text-blue-600 uppercase tracking-wider">
              Empirical Evidence
            </h2>

            {/* Linked papers for selected scenario — always shown */}
            {linkedPapers.length > 0 && (
              <div key={activeId ?? "none"} className="mt-4 space-y-3 animate-fade-slide-up">
                {linkedPapers.map((paper) => renderPaper(paper, true))}
              </div>
            )}

            {/* Remaining papers — collapsible */}
            {otherPapers.length > 0 && (
              <div className={linkedPapers.length > 0 ? "mt-4 pt-4 border-t border-slate-200" : "mt-3"}>
                <button
                  onClick={() => setShowLiterature(!showLiterature)}
                  className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {showLiterature ? (
                    <>
                      <span>Hide {otherPapers.length} more {otherPapers.length === 1 ? "paper" : "papers"}</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>
                        {linkedPapers.length > 0
                          ? `Show ${otherPapers.length} more ${otherPapers.length === 1 ? "paper" : "papers"}`
                          : `Show ${otherPapers.length} ${otherPapers.length === 1 ? "paper" : "papers"}`
                        }
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
                <div className={`collapsible-section ${showLiterature ? "is-open" : ""}`}>
                  <div className="collapsible-inner">
                    <div className="mt-3 space-y-3">
                      {otherPapers.map((paper) => renderPaper(paper))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
