"use client";

import { type LucideIcon, AlertTriangle } from "lucide-react";
import Tooltip from "./Tooltip";

interface MetricCardProps {
  label: string;
  icon: LucideIcon;
  activeEffect: string | null;
  riskWarning: string | null;
}

export default function MetricCard({
  label,
  icon: Icon,
  activeEffect,
  riskWarning,
}: MetricCardProps) {
  const isActive = activeEffect !== null;

  return (
    <div
      className={`flex flex-col gap-2 border-2 px-4 py-3 rounded-sm transition-colors ${
        isActive
          ? "border-blue-600 bg-blue-50"
          : "border-slate-300 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-slate-500 shrink-0" />
          <span className="text-sm font-medium text-slate-800">{label}</span>
        </div>
        {riskWarning && (
          <Tooltip text={riskWarning}>
            <AlertTriangle className="h-5 w-5 text-yellow-500 cursor-help shrink-0" />
          </Tooltip>
        )}
      </div>
      {activeEffect && (
        <p className="text-xs text-blue-800">{activeEffect}</p>
      )}
    </div>
  );
}
