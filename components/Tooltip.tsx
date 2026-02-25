"use client";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-[22rem] sm:w-[28rem] opacity-0 transition-opacity group-hover:opacity-100">
        <span className="block w-full rounded border border-slate-300 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-lg">
          {text}
        </span>
      </span>
    </span>
  );
}
