import { type LucideIcon } from "lucide-react";

interface GaugeCardProps {
  label: string;
  icon: LucideIcon;
}

export default function GaugeCard({ label, icon: Icon }: GaugeCardProps) {
  // Generate tick marks for the fan/speedometer gauge
  const ticks = Array.from({ length: 9 }, (_, i) => {
    const angle = -90 + i * (180 / 8); // spread from -90 to 90 degrees
    return angle;
  });

  return (
    <div className="flex flex-col items-center gap-1 border-2 border-blue-600 bg-white px-4 pt-4 pb-3 rounded-sm">
      {/* Fan gauge */}
      <div className="relative h-14 w-28">
        <svg viewBox="0 0 100 55" className="w-full h-full">
          {/* Gauge arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
          />
          {/* Tick marks */}
          {ticks.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 50;
            const cy = 50;
            const innerR = 30;
            const outerR = 42;
            const x1 = cx + innerR * Math.cos(rad);
            const y1 = cy + innerR * Math.sin(rad);
            const x2 = cx + outerR * Math.cos(rad);
            const y2 = cy + outerR * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#2563eb"
                strokeWidth={i === 0 || i === 8 ? "2" : "1.5"}
              />
            );
          })}
        </svg>
      </div>
      {/* Icon */}
      <Icon className="h-5 w-5 text-blue-600" />
      {/* Label */}
      <span className="font-blueprint text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
