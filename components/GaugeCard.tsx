"use client";

import { type LucideIcon, AlertTriangle } from "lucide-react";
import { parseEffectLevel, parseRiskLevel } from "@/lib/knobUtils";

interface GaugeCardProps {
  label: string;
  icon: LucideIcon;
  activeEffect?: string | null;
  riskWarning?: string | null;
  secondActiveEffect?: string | null;
  secondRiskWarning?: string | null;
  primaryLabel?: string;
  secondaryLabel?: string;
  onClick?: () => void;
  selected?: boolean;
  scenarioKey?: number;
  gaugeIndex?: number;
}

const SEGMENT_COUNT = 20;

function computeIndicator(effectLevel: number, riskLevel: number) {
  const net = effectLevel + riskLevel;
  const clamped = Math.max(-4, Math.min(4, net));
  const barOffset = (clamped / 4) * 40;
  const fillPercent = 50 + barOffset;
  const filledSegments = Math.round((fillPercent / 100) * SEGMENT_COUNT);
  const indicatorPercent = (filledSegments / SEGMENT_COUNT) * 100;
  return { net, filledSegments, indicatorPercent };
}

export default function GaugeCard({
  label,
  icon: Icon,
  activeEffect,
  riskWarning,
  secondActiveEffect,
  secondRiskWarning,
  primaryLabel,
  secondaryLabel,
  onClick,
  selected,
  gaugeIndex = 0,
}: GaugeCardProps) {
  const effectLevel = parseEffectLevel(activeEffect);
  const riskLevel = parseRiskLevel(riskWarning);
  const isActive = !!activeEffect || !!riskWarning;
  const primary = computeIndicator(effectLevel, riskLevel);

  const secondEffectLevel = parseEffectLevel(secondActiveEffect);
  const secondRiskLevel = parseRiskLevel(secondRiskWarning);
  const isSecondActive = !!secondActiveEffect || !!secondRiskWarning;
  const secondary = computeIndicator(secondEffectLevel, secondRiskLevel);

  // Dual bar mode when second scenario props are explicitly provided (even as null)
  const isDualMode = secondActiveEffect !== undefined;

  let primaryColor: string;
  if (!isActive) {
    primaryColor = "#93c5fd";
  } else if (primary.net >= 0) {
    primaryColor = "#2563eb";
  } else {
    primaryColor = "#d97706";
  }

  let secondColor: string;
  if (!isSecondActive) {
    secondColor = "#a7f3d0";
  } else if (secondary.net >= 0) {
    secondColor = "#10b981";
  } else {
    secondColor = "#d97706";
  }

  let borderBg: string;
  if (selected) {
    borderBg = "border-blue-800 bg-blue-100 ring-2 ring-blue-300";
  } else if (isActive || isSecondActive) {
    borderBg = "border-blue-600 bg-blue-50";
  } else {
    borderBg = "border-blue-600 bg-white";
  }

  const hasAnyRisk = !!riskWarning || !!secondRiskWarning;

  // Timing: indicator snaps first, segments fill one-by-one like an old-school loading bar
  const indicatorDelay = gaugeIndex * 30; // ms — indicator leads
  const segmentBaseDelay = indicatorDelay + 350; // ms — segments start well after indicator settles

  const content = (
    <>
      {/* Top row: icon + label + warning triangle */}
      <div className="flex items-center">
        <Icon className="h-5 w-5 text-blue-600 shrink-0" />
        <span className="ml-2 font-blueprint text-xs font-bold text-blue-600 uppercase tracking-wider leading-tight">
          {label}
        </span>
        <div className={`ml-auto ${hasAnyRisk ? "" : "invisible"}`}>
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        </div>
      </div>

      {isDualMode ? (
        /* Dual bar mode for compare */
        <div className="w-full space-y-1.5">
          {/* A bar */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-blue-600 w-9 shrink-0 text-right truncate" title={primaryLabel}>{primaryLabel || "A"}</span>
            <div className="relative flex-1">
              <div className="flex gap-[2px]">
                {Array.from({ length: SEGMENT_COUNT }, (_, i) => (
                  <div
                    key={`a-${i}`}
                    className="flex-1 h-2.5 rounded-[1px]"
                    style={{
                      backgroundColor: i < primary.filledSegments ? primaryColor : "#e2e8f0",
                      transition: "background-color 0.35s ease-out",
                      transitionDelay: `${segmentBaseDelay + i * 45}ms`,
                    }}
                  />
                ))}
              </div>
              <div
                className="absolute top-0 bottom-0 bg-slate-400"
                style={{ left: "50%", width: "1px" }}
              />
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: `${primary.indicatorPercent}%`,
                    top: "-3px",
                    width: "3px",
                    height: "16px",
                    backgroundColor: primaryColor,
                    transform: "translateX(-1.5px)",
                    borderRadius: "1px",
                    zIndex: 10,
                    transition: "left 0.3s ease-out",
                    transitionDelay: `${indicatorDelay}ms`,
                    animation: "indicatorPulse 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>
          {/* B bar */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-emerald-600 w-9 shrink-0 text-right truncate" title={secondaryLabel}>{secondaryLabel || "B"}</span>
            <div className="relative flex-1">
              <div className="flex gap-[2px]">
                {Array.from({ length: SEGMENT_COUNT }, (_, i) => (
                  <div
                    key={`b-${i}`}
                    className="flex-1 h-2.5 rounded-[1px]"
                    style={{
                      backgroundColor: i < secondary.filledSegments ? secondColor : "#e2e8f0",
                      transition: "background-color 0.35s ease-out",
                      transitionDelay: `${segmentBaseDelay + 60 + i * 45}ms`,
                    }}
                  />
                ))}
              </div>
              <div
                className="absolute top-0 bottom-0 bg-slate-400"
                style={{ left: "50%", width: "1px" }}
              />
              {isSecondActive && (
                <div
                  style={{
                    position: "absolute",
                    left: `${secondary.indicatorPercent}%`,
                    top: "-3px",
                    width: "3px",
                    height: "16px",
                    backgroundColor: secondColor,
                    transform: "translateX(-1.5px)",
                    borderRadius: "1px",
                    zIndex: 10,
                    transition: "left 0.3s ease-out",
                    transitionDelay: `${indicatorDelay + 50}ms`,
                    animation: "indicatorPulse 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Single bar mode */
        <div className="relative w-full">
          {/* Indicator needle — moves FIRST */}
          {isActive && (
            <div
              style={{
                position: "absolute",
                left: `${primary.indicatorPercent}%`,
                top: "-4px",
                width: "3px",
                height: "20px",
                backgroundColor: primaryColor,
                transform: "translateX(-1.5px)",
                borderRadius: "1px",
                zIndex: 10,
                transition: "left 0.3s ease-out, background-color 0.2s ease-out",
                transitionDelay: `${indicatorDelay}ms`,
                animation: "indicatorPulse 2s ease-in-out infinite",
              }}
            />
          )}
          {/* Segments — step up/down AFTER indicator, one at a time */}
          <div className="flex gap-[2px]">
            {Array.from({ length: SEGMENT_COUNT }, (_, i) => (
              <div
                key={`seg-${i}`}
                className="flex-1 h-3 rounded-[1px]"
                style={{
                  backgroundColor: i < primary.filledSegments ? primaryColor : "#e2e8f0",
                  transition: "background-color 0.35s ease-out",
                  transitionDelay: `${segmentBaseDelay + i * 45}ms`,
                }}
              />
            ))}
          </div>
          <div
            className="absolute top-0 bottom-0 bg-slate-400"
            style={{ left: "50%", width: "1px" }}
          />
        </div>
      )}
    </>
  );

  const className = `relative flex flex-1 flex-col justify-between gap-3.5 border-2 px-6 py-5 rounded-sm transition-all duration-300 ease-out ${borderBg}${onClick ? " cursor-pointer" : ""}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${className} text-left w-full`}>
        {content}
      </button>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
}
