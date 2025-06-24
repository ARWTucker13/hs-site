import Link from 'next/link';
import { controlKnobsFramework } from '@/data/controlKnobsData';

export default function FrameworksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Health System Frameworks</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Control Knobs Framework</h2>
          <p>{controlKnobsFramework.description}</p>
          <div className="mt-4">
            <Link 
              href="/frameworks/control-knobs" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Explore Framework
            </Link>
          </div>
        </div>
        
        {/* Placeholders for future frameworks */}
        <div className="bg-white shadow-md rounded-lg p-6 opacity-50">
          <h2 className="text-2xl font-semibold mb-4">WHO Building Blocks</h2>
          <p>Coming Soon</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 opacity-50">
          <h2 className="text-2xl font-semibold mb-4">Lancet Commission Framework</h2>
          <p>Coming Soon</p>
        </div>
      </div>
    </div>
  );
}