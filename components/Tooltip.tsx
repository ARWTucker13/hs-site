"use client";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-normal opacity-0 transition-opacity group-hover:opacity-100">
        <span className="block max-w-xs rounded-sm border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
          {text}
        </span>
      </span>
    </span>
  );
}
