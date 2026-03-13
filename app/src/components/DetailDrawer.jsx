import React, { useEffect } from 'react';
import { X, CheckCircle2, Star, ShieldCheck, Zap } from 'lucide-react';

export default function DetailDrawer({ item, recommendation, onClose }) {
  // Handle escape key closing
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!item) return null;
  
  return (
    <>
      <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 overflow-y-auto flex flex-col border-l border-gray-100 transform transition-transform duration-300">
        
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h3 className="font-bold text-gray-900 flex items-center">
            <Zap className="w-5 h-5 text-amber-500 mr-2" /> Recommendation Logic
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-8 flex-1">
          {/* Header Card */}
          <div className="bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
            <img src={item.image} alt={item.name} className="w-full h-56 object-contain drop-shadow-lg mb-6 mix-blend-multiply" />
            <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-widest">{item.category}</div>
            <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{item.name}</h2>
            
            <div className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
              <span className="font-black text-2xl text-gray-900 decoration-blue-500 decoration-4 w-1/2 text-center border-r border-gray-100">${item.price.toFixed(2)}</span>
              <span className="flex items-center text-amber-500 font-bold text-lg w-1/2 justify-center">
                <Star className="w-5 h-5 fill-amber-500 mr-1.5" /> {item.rating}
              </span>
            </div>
          </div>

          {/* AI Score Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl transform rotate-1 scale-[1.02] opacity-20"></div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 relative shadow-inner">
              <div className="flex justify-between items-start mb-4">
                <div className="text-xs font-black uppercase tracking-widest text-blue-800">Neural Match Score</div>
                <div className="bg-white px-2 py-1 rounded-md shadow-sm border border-blue-50 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Live Pipeline</span>
                </div>
              </div>
              
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-black text-blue-700 tracking-tighter">{recommendation.score}</span>
                <span className="text-lg font-bold text-blue-400 mb-1.5 align-baseline">/ 100</span>
              </div>
              
              <div className="text-sm font-medium text-blue-900 leading-relaxed shadow-sm p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white relative">
                <blockquote className="italic">"{recommendation.explanation}"</blockquote>
              </div>
            </div>
          </div>

          {/* Reasons List */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <ShieldCheck className="w-5 h-5 text-gray-400 mr-2" /> Explainability Weights
            </h4>
            <div className="space-y-3">
              {Object.entries(recommendation.reasons).map(([key, value]) => (
                <div key={key} className={`flex items-center text-sm p-3 rounded-xl border ${value ? 'bg-green-50/50 border-green-100 text-green-800 font-medium shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                  {value ? <CheckCircle2 className="text-green-500 w-5 h-5 mr-3 flex-shrink-0" /> : <div className="w-5 h-5 mr-3 rounded-full border-2 border-gray-200 flex-shrink-0" />}
                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
