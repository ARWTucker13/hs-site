import { Settings, Star, DoorOpen, Heart, Smile, Shield } from "lucide-react";
import KnobLink from "@/components/KnobLink";
import GaugeCard from "@/components/GaugeCard";

export default function Home() {
  return (
    <div>
      {/* Title in bordered box */}
      <div className="border-2 border-blue-600 bg-white px-6 py-3 mb-10 mx-auto w-fit">
        <h1 className="font-blueprint text-xl font-bold text-blue-600 uppercase tracking-wider">
          The Health System Control Knobs
        </h1>
      </div>

      <div className="grid grid-cols-[auto_60px_1fr_60px_1fr] items-stretch">
        {/* Column 1: Control Knobs panel */}
        <div className="border-2 border-blue-600 bg-white p-5">
          <h2 className="font-blueprint text-xs font-bold text-blue-600 mb-5 uppercase tracking-wider">
            Control Knobs
          </h2>
          <div className="flex flex-col gap-5">
            <KnobLink href="/knobs/financing" label="Financing" />
            <KnobLink href="/knobs/payment" label="Payment" />
            <KnobLink href="/knobs/organization" label="Organization" />
            <KnobLink href="/knobs/regulation" label="Regulation" />
            <KnobLink href="/knobs/behavior" label="Behavior" />
          </div>
        </div>

        {/* Pipe connector 1: L-shaped going right then down */}
        <div className="relative">
          {/* Vertical pipe running full height at left edge */}
          <div className="absolute left-0 top-[10%] bottom-[10%] w-3 bg-blue-600" />
          {/* Horizontal pipe going right from middle */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 left-3 h-3 bg-blue-600" />
        </div>

        {/* Column 2: Intermediate Performance Measures panel */}
        <div className="border-2 border-blue-600 bg-white p-5">
          <h2 className="font-blueprint text-xs font-bold text-blue-600 mb-5 uppercase tracking-wider text-center">
            Intermediate<br />Performance Measures
          </h2>
          <div className="flex flex-col gap-5">
            <GaugeCard label="Efficiency" icon={Settings} />
            <GaugeCard label="Quality" icon={Star} />
            <GaugeCard label="Access" icon={DoorOpen} />
          </div>
        </div>

        {/* Pipe connector 2: L-shaped going right then down */}
        <div className="relative">
          <div className="absolute left-0 top-[10%] bottom-[10%] w-3 bg-blue-600" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 left-3 h-3 bg-blue-600" />
        </div>

        {/* Column 3: Performance Goals panel */}
        <div className="border-2 border-blue-600 bg-white p-5">
          <h2 className="font-blueprint text-xs font-bold text-blue-600 mb-5 uppercase tracking-wider text-center">
            Performance Goals
          </h2>
          <div className="flex flex-col gap-5">
            <GaugeCard label="Health Status" icon={Heart} />
            <GaugeCard label="Customer Satisfaction" icon={Smile} />
            <GaugeCard label="Risk Protection" icon={Shield} />
          </div>
        </div>
      </div>
    </div>
  );
}
