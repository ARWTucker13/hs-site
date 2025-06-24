import { controlKnobsFramework, ControlKnobSubComponent } from '@/data/controlKnobsData';
import { notFound } from 'next/navigation';

interface ControlKnobPageProps {
  params: {
    knobId: string;
  };
}

// Manual mapping of colors for borders
const borderColorMap: Record<string, string> = {
  financing: '#0074D9',
  payment: '#FF4136',
  organization: '#2ECC40',
  regulation: '#FF851B',
  behavior: '#B10DC9',
};

export default function ControlKnobDetailPage({ params }: ControlKnobPageProps) {
  const knob = controlKnobsFramework.knobs.find(k => k.id === params.knobId);
  
  if (!knob) {
    notFound();
  }

  const knobColor = borderColorMap[params.knobId] || '#333';

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{knob.name}</h1>
      {/* Overview/Definition */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview / Definition</h2>
        <p>{knob.description}</p>
      </section>
      {/* Subcomponents or Moves */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Subcomponents or Country Moves</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {knob.subComponents.map((subComponent: ControlKnobSubComponent, index) => (
            <div 
              key={index} 
              style={{ border: `4px solid ${knobColor}` }}
              className="bg-white rounded-lg p-4 border-solid text-black"
            >
              <h3 className="text-xl font-medium mb-2">{subComponent.name}</h3>
              <p className="mb-4">{subComponent.description}</p>
              {subComponent.items && (
                <div className="grid gap-2 md:grid-cols-2">
                  {subComponent.items.map((item) => (
                    <div
                      key={item}
                      className="bg-blue-100 text-blue-900 border border-blue-400 rounded p-2 text-sm shadow-inner"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Cross-Framework Connections */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cross-Framework Connections</h2>
        {Object.entries(knob.relatedComponents).map(([framework, components]) => (
          <div 
            key={framework} 
            style={{ border: `4px solid ${knobColor}` }}
            className="bg-white rounded-lg p-4 mb-4 border-solid text-black"
          >
            <h3 className="text-xl font-medium mb-2">{framework}</h3>
            <ul className="list-disc pl-5">
              {components.map(comp => (
                <li key={comp}>{comp}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
} 