import React from 'react';
import { X, CheckCircle2, ChevronRight, TrendingUp, Filter, Search } from 'lucide-react';
import ItemCard from './ItemCard';

export default function ResultsPage({ user, items, recommendations }) {
  const userRecs = recommendations[user.id] || [];
  const recItems = userRecs.map(rec => {
    const item = items.find(i => i.id === rec.item_id);
    return { item, recommendation: rec };
  }).filter(r => r.item);

  return (
    <div className="flex-1 p-6 md:p-8 relative bg-gray-50/30 overflow-y-auto">
      
      {/* Header section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1" /> Active Persona
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Recommended for {user.name.split('/')[0].trim()}
          </h1>
          <p className="text-gray-500 mt-2 font-medium flex items-center">
            Based on <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md text-xs uppercase font-bold ml-2 border border-blue-100">{user.segment.replace(/_/g, ' ')}</span> profile
          </p>
        </div>
        
        <div className="mt-6 md:mt-0 flex gap-3">
          <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-indigo-500" />
            Top {recItems.length} Ranked
          </div>
          <button className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center transition-colors">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
        </div>
      </div>
      
      {/* Action Bar / Copilot placeholder from Phase 2 later */}
      <div className="mb-8 relative max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input 
          type="text" 
          className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-shadow font-medium" 
          placeholder="Ask why items were ranked, or search for cheaper alternatives..."
          readOnly
        />
        <div className="absolute inset-y-2 right-2 flex items-center">
          <button className="bg-blue-600 text-white rounded-xl p-1.5 hover:bg-blue-700 shadow shadow-blue-200 transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Content Grid */}
      {recItems.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-500 font-medium">Try selecting a different persona from the sidebar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {recItems.map(({ item, recommendation }) => (
            <ItemCard 
              key={item.id} 
              item={item} 
              recommendation={recommendation} 
              onClick={() => {
                // Dispatch event to app level to show drawer
                const evt = new CustomEvent('openDetail', { detail: { item, recommendation } });
                window.dispatchEvent(evt);
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
