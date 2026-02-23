"use client";

import { type LucideIcon, AlertTriangle } from "lucide-react";

interface GaugeCardProps {
  label: string;
  icon: LucideIcon;
  activeEffect?: string | null;
  riskWarning?: string | null;
  onClick?: () => void;
  selected?: boolean;
}

function parseEffectLevel(effect: string | null | undefined): number {
  if (!effect) return 0;
  if (effect.startsWith("Very High")) return 4;
  if (effect.startsWith("Medium-High")) return 2;
  if (effect.startsWith("Medium")) return 1;
  if (effect.startsWith("High")) return 3;
  return 0;
}

function parseRiskLevel(risk: string | null | undefined): number {
  if (!risk) return 0;
  if (risk.startsWith("Critical Warning")) return -3;
  if (risk.startsWith("Warning")) return -2;
  return 0;
}

const SEGMENT_COUNT = 20;

export default function GaugeCard({
  label,
  icon: Icon,
  activeEffect,
  riskWarning,
  onClick,
  selected,
}: GaugeCardProps) {
  const effectLevel = parseEffectLevel(activeEffect);
  const riskLevel = parseRiskLevel(riskWarning);
  const net = effectLevel + riskLevel;
  const isActive = !!activeEffect || !!riskWarning;

  const clampedNet = Math.max(-4, Math.min(4, net));
  const barOffset = (clampedNet / 4) * 40;

  const fillPercent = 50 + barOffset;
  const filledSegments = Math.round((fillPercent / 100) * SEGMENT_COUNT);
  const indicatorPercent = (filledSegments / SEGMENT_COUNT) * 100;

  let segmentColor: string;
  if (!isActive) {
    segmentColor = "#93c5fd";
  } else if (net >= 0) {
    segmentColor = "#2563eb";
  } else {
    segmentColor = "#d97706";
  }

  let borderBg: string;
  if (selected) {
    borderBg = "border-blue-800 bg-blue-100 ring-2 ring-blue-300";
  } else if (isActive) {
    borderBg = "border-blue-600 bg-blue-50";
  } else {
    borderBg = "border-blue-600 bg-white";
  }

  const content = (
    <>
      {/* Top row: icon + label + warning triangle (always reserved) */}
      <div className="flex items-center">
        <Icon className="h-5 w-5 text-blue-600 shrink-0" />
        <span className="ml-2 font-blueprint text-xs font-bold text-blue-600 uppercase tracking-wider leading-tight">
          {label}
        </span>
        {/* Always render warning area to reserve space; invisible when no risk */}
        <div className={`ml-auto ${riskWarning ? "" : "invisible"}`}>
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        </div>
      </div>

      {/* Retro segmented bar */}
      <div className="relative w-full">
        <div className="flex gap-[2px]">
          {Array.from({ length: SEGMENT_COUNT }, (_, i) => {
            const filled = i < filledSegments;
            return (
              <div
                key={i}
                className="flex-1 h-3 rounded-[1px]"
                style={{
                  backgroundColor: filled ? segmentColor : "#e2e8f0",
                  transition: "background-color 0.3s ease-out",
                }}
              />
            );
          })}
        </div>
        {/* Center marker */}
        <div
          className="absolute top-0 bottom-0 bg-slate-400"
          style={{ left: "50%", width: "1px" }}
        />
        {/* Pulsing fill-boundary indicator */}
        {isActive && (
          <div
            style={{
              position: "absolute",
              left: `${indicatorPercent}%`,
              top: "-4px",
              width: "3px",
              height: "20px",
              backgroundColor: segmentColor,
              transform: "translateX(-1.5px)",
              borderRadius: "1px",
              zIndex: 10,
              transition: "left 0.3s ease-out",
              animation: "indicatorPulse 2s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </>
  );

  const className = `relative flex flex-1 flex-col justify-between gap-3 border-2 px-5 py-4 rounded-sm transition-colors duration-300 ${borderBg}${onClick ? " cursor-pointer" : ""}`;

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
