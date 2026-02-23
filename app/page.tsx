"use client";

import { useState } from "react";
import ControlKnobsDiagram from "@/components/ControlKnobsDiagram";
import { METRIC_DESCRIPTIONS } from "@/data/metricDescriptions";

export default function Home() {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const handleMetricClick = (key: string) => {
    setActiveMetric(activeMetric === key ? null : key);
  };

  const metric = activeMetric ? METRIC_DESCRIPTIONS[activeMetric] : null;

  return (
    <div>
      <ControlKnobsDiagram
        onMetricClick={handleMetricClick}
        activeMetric={activeMetric}
      />

      <div className="mt-6 border-2 border-blue-600 bg-white p-6">
        <h2 className="font-blueprint text-sm font-bold text-blue-600 mb-3 uppercase tracking-wider">
          {metric ? metric.name : "The Control Knobs Framework"}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {metric ? (
            metric.description
          ) : (
            <>
              Health systems can be understood through five policy control
              knobs that governments and institutions adjust to shape system
              performance. Based on the &ldquo;Getting Health Reform
              Right&rdquo; framework by Roberts, Hsiao, Berman, and Reich,
              each knob represents a major lever of health policy&mdash;financing,
              payment, organization, regulation, and persuasion &amp;
              behavior&mdash;whose configuration drives measurable changes in
              intermediate performance and ultimate population health goals.
            </>
          )}
        </p>
        {!metric && (
          <>
            <p className="text-sm text-slate-700 leading-relaxed mt-3">
              Click any control knob on the left to explore its policy scenarios
              and see how different configurations affect system performance.
              Click any performance measure or goal to learn what it represents
              and how it is measured at the population level.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed mt-3 italic">
              The outcome ratings shown on each knob page are informed by
              empirical literature but are not deterministic predictions. The
              influence of any policy change is context-specific and both
              implementation- and path-dependent&mdash;the same reform can
              produce markedly different results depending on institutional
              capacity, existing market structure, political economy, and
              sequencing with other reforms.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
