import Link from "next/link";

interface KnobLinkProps {
  href: string;
  label: string;
}

export default function KnobLink({ href, label }: KnobLinkProps) {
  return (
    <Link href={href} className="flex items-center gap-4 group">
      {/* Circular dial knob */}
      <div className="relative h-14 w-14 shrink-0">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-blue-600 bg-white transition-colors group-hover:bg-blue-50" />
        {/* Inner ring */}
        <div className="absolute inset-2 rounded-full border-2 border-blue-400 bg-white transition-colors group-hover:bg-blue-50" />
        {/* Center dot */}
        <div className="absolute inset-[18px] rounded-full bg-blue-600" />
        {/* Indicator notch (top) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-1 bg-blue-600" />
      </div>
      <span className="font-blueprint text-xs font-bold text-blue-600 uppercase tracking-wider">
        {label}
      </span>
    </Link>
  );
}
