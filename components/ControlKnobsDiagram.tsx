"use client";

import Link from "next/link";
import { Settings, Star, DoorOpen, Heart, Smile, Shield } from "lucide-react";
import KnobLink, { type KnobColor } from "./KnobLink";
import GaugeCard from "./GaugeCard";

interface ScenarioData {
  intended_effects: Record<string, string>;
  systemic_risks: Record<string, string>;
}

interface ControlKnobsDiagramProps {
  activeKnob?: string;
  activeScenario?: ScenarioData | null;
  secondScenario?: ScenarioData | null;
  primaryLabel?: string;
  secondaryLabel?: string;
  onMetricClick?: (metricKey: string) => void;
  activeMetric?: string | null;
  interactingKnobs?: string[];
  scenarioKey?: number;
}

const KNOBS: { href: string; label: string; key: string; color: KnobColor }[] = [
  { href: "/knobs/financing", label: "Financing", key: "financing", color: "green" },
  { href: "/knobs/payment", label: "Payment", key: "payment", color: "purple" },
  { href: "/knobs/organization", label: "Organization", key: "organization", color: "teal" },
  { href: "/knobs/regulation", label: "Regulation", key: "regulation", color: "rose" },
  { href: "/knobs/behavior", label: "Behavior", key: "behavior", color: "orange" },
];

const INTERMEDIATE_METRICS = [
  { key: "efficiency", label: "Efficiency", icon: Settings },
  { key: "quality", label: "Quality", icon: Star },
  { key: "access", label: "Access", icon: DoorOpen },
];

const GOAL_METRICS = [
  { key: "health_status", label: "Health Status", icon: Heart },
  { key: "customer_satisfaction", label: "Customer Satisfaction", icon: Smile },
  { key: "risk_protection", label: "Risk Protection", icon: Shield },
];

function getEffect(scenario: ScenarioData | null | undefined, key: string): string | null {
  if (!scenario) return null;
  return scenario.intended_effects[key] ?? null;
}

function getRisk(scenario: ScenarioData | null | undefined, key: string): string | null {
  if (!scenario) return null;
  return scenario.systemic_risks[key] ?? null;
}

export default function ControlKnobsDiagram({
  activeKnob,
  activeScenario,
  secondScenario,
  primaryLabel,
  secondaryLabel,
  onMetricClick,
  activeMetric,
  interactingKnobs,
  scenarioKey,
}: ControlKnobsDiagramProps) {
  const hasScenario = activeScenario != null;
  const hasSecondScenario = secondScenario != null;

  return (
    <div>
      {/* Title in bordered box */}
      <div className="border-2 border-blue-600 bg-white px-3 py-2 mb-6 sm:px-6 sm:py-3 sm:mb-10 mx-auto w-fit">
        {activeKnob ? (
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-blueprint text-xs font-bold text-blue-400 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
              &larr; Overview
            </span>
            <h1 className="font-blueprint text-base sm:text-xl font-bold text-blue-600 uppercase tracking-wider">
              The Health System Control Knobs
            </h1>
          </Link>
        ) : (
          <h1 className="font-blueprint text-base sm:text-xl font-bold text-blue-600 uppercase tracking-wider">
            The Health System Control Knobs
          </h1>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[auto_60px_1fr_60px_1fr] lg:gap-0 lg:items-stretch">
        {/* Column 1: Control Knobs panel */}
        <div className="border-2 border-blue-600 bg-white p-4 sm:p-6 flex flex-col lg:min-w-[155px]">
          <h2 className="font-blueprint text-sm font-bold text-blue-600 mb-5 uppercase tracking-wider hidden lg:block">
            Control Knobs
          </h2>
          <div className="flex flex-row flex-wrap justify-center gap-3 lg:flex-col lg:gap-5">
            {KNOBS.map((knob) => (
              <KnobLink
                key={knob.key}
                href={knob.href}
                label={knob.label}
                active={activeKnob === knob.key}
                interacting={interactingKnobs?.includes(knob.key)}
                color={knob.color}
              />
            ))}
          </div>
        </div>

        {/* Mobile flow indicator */}
        <div className="flex justify-center lg:hidden">
          <div className="w-3 h-6 bg-blue-600 rounded-sm" />
        </div>

        {/* Pipe connector 1 */}
        <div className="hidden lg:block lg:relative">
          <div className="absolute left-0 top-[10%] bottom-[10%] w-3 bg-blue-600" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 left-3 h-3 bg-blue-600" />
        </div>

        {/* Column 2: Intermediate Performance Measures panel */}
        <div className="border-2 border-blue-600 bg-white p-4 sm:p-6 flex flex-col">
          <h2 className="font-blueprint text-sm font-bold text-blue-600 mb-5 uppercase tracking-wider text-center">
            Intermediate<br />Performance Measures
          </h2>
          <div className="flex flex-col gap-3 flex-1">
            {INTERMEDIATE_METRICS.map((m, idx) => (
              <GaugeCard
                key={m.key}
                label={m.label}
                icon={m.icon}
                activeEffect={hasScenario ? getEffect(activeScenario, m.key) : null}
                riskWarning={hasScenario ? getRisk(activeScenario, m.key) : null}
                {...(hasSecondScenario ? {
                  secondActiveEffect: getEffect(secondScenario, m.key),
                  secondRiskWarning: getRisk(secondScenario, m.key),
                  primaryLabel,
                  secondaryLabel,
                } : {})}
                onClick={onMetricClick ? () => onMetricClick(m.key) : undefined}
                selected={activeMetric === m.key}
                scenarioKey={scenarioKey}
                gaugeIndex={idx}
              />
            ))}
          </div>
        </div>

        {/* Mobile flow indicator */}
        <div className="flex justify-center lg:hidden">
          <div className="w-3 h-6 bg-blue-600 rounded-sm" />
        </div>

        {/* Pipe connector 2 */}
        <div className="hidden lg:block lg:relative">
          <div className="absolute left-0 top-[10%] bottom-[10%] w-3 bg-blue-600" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 left-3 h-3 bg-blue-600" />
        </div>

        {/* Column 3: Performance Goals panel */}
        <div className="border-2 border-blue-600 bg-white p-4 sm:p-6 flex flex-col">
          <h2 className="font-blueprint text-sm font-bold text-blue-600 mb-5 uppercase tracking-wider text-center">
            Performance Goals
          </h2>
          <div className="flex flex-col gap-3 flex-1">
            {GOAL_METRICS.map((m, idx) => (
              <GaugeCard
                key={m.key}
                label={m.label}
                icon={m.icon}
                activeEffect={hasScenario ? getEffect(activeScenario, m.key) : null}
                riskWarning={hasScenario ? getRisk(activeScenario, m.key) : null}
                {...(hasSecondScenario ? {
                  secondActiveEffect: getEffect(secondScenario, m.key),
                  secondRiskWarning: getRisk(secondScenario, m.key),
                  primaryLabel,
                  secondaryLabel,
                } : {})}
                onClick={onMetricClick ? () => onMetricClick(m.key) : undefined}
                selected={activeMetric === m.key}
                scenarioKey={scenarioKey}
                gaugeIndex={idx + 3}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
