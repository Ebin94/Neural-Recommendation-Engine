import React from 'react';
import { Home, BarChart2, BookOpen, Hexagon } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
          <Hexagon className="w-5 h-5 text-current" fill="currentColor" strokeWidth={1} />
        </div>
        <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">NeuralRecom</span>
      </div>
      <div className="flex space-x-6 text-sm font-semibold text-gray-500">
        <a href="#landing" className="flex items-center hover:text-blue-600 transition-colors">
          <Home className="w-4 h-4 mr-1.5" /> Home
        </a>
        <a href="#insights" className="flex items-center hover:text-blue-600 transition-colors">
          <BarChart2 className="w-4 h-4 mr-1.5" /> Insights
        </a>
        <a href="#about" className="flex items-center hover:text-blue-600 transition-colors">
          <BookOpen className="w-4 h-4 mr-1.5" /> Methodology
        </a>
      </div>
    </nav>
  );
}
