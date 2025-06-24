import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Health Systems Frameworks
          </Link>
          <div className="space-x-4">
            <Link href="/frameworks" className="hover:text-blue-200">
              Frameworks
            </Link>
            <Link href="/about" className="hover:text-blue-200">
              About
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        © {new Date().getFullYear()} Health Systems Frameworks
      </footer>
    </div>
  );
}