import React from 'react';
import { Hexagon, ArrowRight, Zap, Target, LayoutDashboard } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col justify-center items-center bg-white px-4 text-center pb-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Icon Badge */}
      <div className="relative group mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-24 h-24 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-2xl">
          <Hexagon className="w-12 h-12 text-blue-600" />
        </div>
      </div>
      
      {/* Typography */}
      <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
        Explainable Re-Ranking Prototype
      </div>
      
      <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter" style={{ lineHeight: 1.1 }}>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">Neural</span> Recommendation <br />Engine
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mb-12 font-medium leading-relaxed">
        An end-to-end ML ranking system demo. Explore how segment-aware recommendations impact product positioning without backend dependencies.
      </p>
      
      {/* CTA */}
      <button 
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-5 text-lg font-black text-white bg-blue-600 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-blue-500/50"
      >
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
        <Zap className="w-5 h-5 mr-3 fill-current" />
        Launch Demo
      </button>

      {/* Feature Pills */}
      <div className="mt-20 flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
        <div className="flex items-center"><Target className="w-4 h-4 mr-1.5" /> Offline Training</div>
        <span className="opacity-30">•</span>
        <div className="flex items-center"><LayoutDashboard className="w-4 h-4 mr-1.5" /> Static Inference</div>
        <span className="opacity-30">•</span>
        <div className="flex items-center"><ArrowRight className="w-4 h-4 mr-1.5" /> Vercel Ready</div>
      </div>
    </div>
  );
}
