import React from 'react';
import { Star, Tag, Award, ShieldCheck, Zap } from 'lucide-react';

export default function ItemCard({ item, recommendation, onClick }) {
  // Map our generated tags to nice UI badges
  const renderBadges = (tags) => {
    return tags.slice(0, 2).map((tag, i) => {
      let Icon = Tag;
      let colorClass = "bg-gray-100 text-gray-700 border-gray-200";
      
      if (tag === "High Rated") { Icon = Award; colorClass = "bg-purple-50 text-purple-700 border-purple-200"; }
      if (tag === "Good Value") { Icon = ShieldCheck; colorClass = "bg-green-50 text-green-700 border-green-200"; }
      if (tag === "Trending") { Icon = Zap; colorClass = "bg-orange-50 text-orange-700 border-orange-200"; }
      if (tag === "Premium") { Icon = Star; colorClass = "bg-amber-50 text-amber-700 border-amber-200"; }

      return (
        <span key={i} className={`flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full border ${colorClass}`}>
          <Icon className="w-3 h-3 mr-1" /> {tag}
        </span>
      );
    });
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group relative"
      onClick={onClick}
    >
      <div className="h-44 bg-gray-50 flex items-center justify-center relative p-4 group-hover:bg-blue-50/30 transition-colors">
        <img src={item.image} alt={item.name} className="object-contain h-full w-full drop-shadow-md group-hover:scale-105 transition-transform duration-500" />
        
        {/* Match Score Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg font-black text-blue-700 shadow-sm border border-blue-100 flex items-center gap-1.5 z-10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          {recommendation.score}% Match
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">{item.category}</div>
        <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 mb-3 group-hover:text-blue-700 transition-colors">{item.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {item.tags && renderBadges(item.tags)}
        </div>
        
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <span className="font-black text-xl text-gray-900">${item.price.toFixed(2)}</span>
          <span className="flex items-center text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md text-sm border border-amber-100">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500 mr-1" /> {item.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
