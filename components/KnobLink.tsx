import Link from "next/link";

export type KnobColor = "green" | "purple" | "teal" | "rose" | "orange";

interface KnobLinkProps {
  href: string;
  label: string;
  active?: boolean;
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
  },
};

export default function KnobLink({ href, label, active, color = "green" }: KnobLinkProps) {
  const c = C[color];

  return (
    <Link href={href} className="flex flex-col items-center gap-1 lg:flex-row lg:items-center lg:gap-4 group">
      <div className="relative h-14 w-14 shrink-0">
        <div
          className={`absolute inset-0 rounded-full border-[3px] transition-colors ${
            active ? c.outerActive : `border-blue-600 bg-white ${c.outerHover}`
          }`}
        />
        <div
          className={`absolute inset-2 rounded-full border-2 transition-colors ${
            active ? c.innerActive : `border-blue-400 bg-white ${c.innerHover}`
          }`}
        />
        <div
          className={`absolute inset-[18px] rounded-full transition-colors ${
            active ? c.dotActive : `bg-blue-600 ${c.dotHover}`
          }`}
        />
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 h-2 w-1 transition-colors ${
            active ? c.dotActive : `bg-blue-600 ${c.dotHover}`
          }`}
        />
      </div>
      <span
        className={`font-blueprint text-[10px] text-center lg:text-xs lg:text-left font-bold uppercase tracking-wider transition-colors ${
          active ? c.textActive : `text-blue-600 ${c.textHover}`
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
