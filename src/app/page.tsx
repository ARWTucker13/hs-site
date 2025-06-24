import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-800">
          Health Systems Frameworks Explorer
        </h1>
        <p className="text-xl mb-8 text-gray-700">
          Explore and understand different theoretical frameworks for analyzing health systems
        </p>
        
        <div className="space-x-4">
          <Link 
            href="/frameworks" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Explore Frameworks
          </Link>
          <Link 
            href="/about" 
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}