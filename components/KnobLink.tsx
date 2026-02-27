import Link from "next/link";
import { Link2 } from "lucide-react";

export type KnobColor = "green" | "purple" | "teal" | "rose" | "orange";

interface KnobLinkProps {
  href: string;
  label: string;
  active?: boolean;
  interacting?: boolean;
  color?: KnobColor;
}

const C: Record<KnobColor, {
  outerActive: string;
  outerHover: string;
  innerActive: string;
  innerHover: string;
  dotActive: string;
  dotHover: string;
  textActive: string;
  textHover: string;
  interactingRing: string;
}> = {
  green: {
    outerActive: "border-green-600 bg-green-100",
    outerHover: "group-hover:border-green-600 group-hover:bg-green-50",
    innerActive: "border-green-600 bg-green-100",
    innerHover: "group-hover:border-green-400 group-hover:bg-green-50",
    dotActive: "bg-green-600",
    dotHover: "group-hover:bg-green-600",
    textActive: "text-green-600",
    textHover: "group-hover:text-green-600",
    interactingRing: "ring-green-400",
  },
  purple: {
    outerActive: "border-purple-600 bg-purple-100",
    outerHover: "group-hover:border-purple-600 group-hover:bg-purple-50",
    innerActive: "border-purple-600 bg-purple-100",
    innerHover: "group-hover:border-purple-400 group-hover:bg-purple-50",
    dotActive: "bg-purple-600",
    dotHover: "group-hover:bg-purple-600",
    textActive: "text-purple-600",
    textHover: "group-hover:text-purple-600",
    interactingRing: "ring-purple-400",
  },
  teal: {
    outerActive: "border-teal-600 bg-teal-100",
    outerHover: "group-hover:border-teal-600 group-hover:bg-teal-50",
    innerActive: "border-teal-600 bg-teal-100",
    innerHover: "group-hover:border-teal-400 group-hover:bg-teal-50",
    dotActive: "bg-teal-600",
    dotHover: "group-hover:bg-teal-600",
    textActive: "text-teal-600",
    textHover: "group-hover:text-teal-600",
    interactingRing: "ring-teal-400",
  },
  rose: {
    outerActive: "border-rose-600 bg-rose-100",
    outerHover: "group-hover:border-rose-600 group-hover:bg-rose-50",
    innerActive: "border-rose-600 bg-rose-100",
    innerHover: "group-hover:border-rose-400 group-hover:bg-rose-50",
    dotActive: "bg-rose-600",
    dotHover: "group-hover:bg-rose-600",
    textActive: "text-rose-600",
    textHover: "group-hover:text-rose-600",
    interactingRing: "ring-rose-400",
  },
  orange: {
    outerActive: "border-orange-600 bg-orange-100",
    outerHover: "group-hover:border-orange-600 group-hover:bg-orange-50",
    innerActive: "border-orange-600 bg-orange-100",
    innerHover: "group-hover:border-orange-400 group-hover:bg-orange-50",
    dotActive: "bg-orange-600",
    dotHover: "group-hover:bg-orange-600",
    textActive: "text-orange-600",
    textHover: "group-hover:text-orange-600",
    interactingRing: "ring-orange-400",
  },
};

// Subtle glow for interacting knobs — visible but not mistaken for selected
const GLOW_SHADOW: Record<KnobColor, string> = {
  green: "0 0 8px rgba(22, 163, 74, 0.3)",
  purple: "0 0 8px rgba(147, 51, 234, 0.3)",
  teal: "0 0 8px rgba(13, 148, 136, 0.3)",
  rose: "0 0 8px rgba(225, 29, 72, 0.3)",
  orange: "0 0 8px rgba(234, 88, 12, 0.3)",
};

const BADGE_COLOR: Record<KnobColor, string> = {
  green: "bg-green-600",
  purple: "bg-purple-600",
  teal: "bg-teal-600",
  rose: "bg-rose-600",
  orange: "bg-orange-600",
};

export default function KnobLink({ href, label, active, interacting, color = "green" }: KnobLinkProps) {
  const c = C[color];
  const showInteracting = interacting && !active;

  return (
    <Link href={href} className="flex flex-col items-center gap-1 lg:flex-row lg:items-center lg:gap-3 group">
      <div
        className="relative h-12 w-12 shrink-0 rounded-full transition-shadow duration-300"
        style={showInteracting ? { boxShadow: GLOW_SHADOW[color] } : undefined}
      >
        <div
          className={`absolute inset-0 rounded-full border-[3px] transition-colors ${
            active ? c.outerActive : showInteracting ? c.outerActive : `border-blue-600 bg-white ${c.outerHover}`
          }`}
        />
        <div
          className={`absolute inset-[7px] rounded-full border-2 transition-colors ${
            active ? c.innerActive : showInteracting ? c.innerActive : `border-blue-400 bg-white ${c.innerHover}`
          }`}
        />
        <div
          className={`absolute inset-[16px] rounded-full transition-colors ${
            active ? c.dotActive : showInteracting ? c.dotActive : `bg-blue-600 ${c.dotHover}`
          }`}
        />
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 h-2 w-1 transition-colors ${
            active ? c.dotActive : showInteracting ? c.dotActive : `bg-blue-600 ${c.dotHover}`
          }`}
        />
        {showInteracting && (
          <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full ${BADGE_COLOR[color]} flex items-center justify-center z-10`}>
            <Link2 className="h-2 w-2 text-white" strokeWidth={3} />
          </div>
        )}
      </div>
      <span
        className={`font-blueprint text-[10px] text-center lg:text-xs lg:text-left font-bold uppercase tracking-wider transition-colors ${
          active ? c.textActive : showInteracting ? c.textActive : `text-blue-600 ${c.textHover}`
        }`}
      >
        {label}
        {showInteracting && (
          <span className={`block text-[7px] lg:text-[8px] font-normal normal-case tracking-normal ${c.textActive}`}>Linked</span>
        )}
      </span>
    </Link>
  );
}
