import Link from 'next/link';
import { controlKnobsFramework } from '@/data/controlKnobsData';
import ControlKnobsDiagram, { knobColors } from '@/components/ControlKnobsDiagram';

// Manual mapping for clarity (matches diagram colors)
const borderColorMap: Record<string, string> = {
  financing: '#0074D9', // blue
  payment: '#FF4136',   // red
  organization: '#2ECC40', // green
  regulation: '#FF851B', // orange
  behavior: '#B10DC9',  // purple
};

export default function ControlKnobsFrameworkPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{controlKnobsFramework.name}</h1>
      <p className="mb-6">{controlKnobsFramework.description}</p>
      <div className="mb-10">
        <ControlKnobsDiagram />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {controlKnobsFramework.knobs.map((knob) => (
          <Link 
            key={knob.id} 
            href={`/frameworks/control-knobs/${knob.id}`}
            style={{ border: `4px solid ${borderColorMap[knob.id]}` }}
            className="bg-white rounded-lg p-6 border-solid text-black hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{knob.name}</h2>
            <p>{knob.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}