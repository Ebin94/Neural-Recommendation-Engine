import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Target, TrendingUp, DollarSign, Star, Activity } from 'lucide-react';

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

export default function InsightsPage({ insights }) {
  if (!insights) return <div className="p-8 text-center text-gray-500 flex items-center justify-center h-full"><Activity className="animate-spin mr-2" /> Loading insights...</div>;

  const pieData = insights.reason_breakdown.map(r => ({ name: r.reason.replace(/_/g, ' '), value: r.percentage }));

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
          <TrendingUp className="text-blue-600 mr-3 h-8 w-8" />
          Business Insights
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Aggregated metrics across all {insights.segment_performance.length} segments and recommendations.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 mb-8">
        
        {/* Top Categories Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-6">
            <Target className="text-indigo-500 mr-2 h-5 w-5" />
            <h3 className="font-bold text-gray-900 text-lg">Top Recommended Categories</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insights.top_categories} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" textAnchor="end" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="category" type="category" stroke="#64748b" fontSize={12} width={80} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reason Breakdown Pie */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <Star className="text-amber-500 mr-2 h-5 w-5" />
            <h3 className="font-bold text-gray-900 text-lg">Why Items Are Recommended</h3>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Price Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-6">
            <DollarSign className="text-green-500 mr-2 h-5 w-5" />
            <h3 className="font-bold text-gray-900 text-lg">Recommended Price Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insights.price_distribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segment Performance Table */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-6">
            <Activity className="text-purple-500 mr-2 h-5 w-5" />
            <h3 className="font-bold text-gray-900 text-lg">Average Affinity by Segment</h3>
          </div>
          <div className="space-y-5 mt-4">
            {insights.segment_performance.map(s => (
              <div key={s.segment}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700 capitalize">{s.segment.replace(/_/g, ' ')}</span>
                  <span className="text-gray-900 font-bold bg-gray-100 px-2 rounded">{s.avg_score} / 100</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-400 to-blue-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${s.avg_score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
