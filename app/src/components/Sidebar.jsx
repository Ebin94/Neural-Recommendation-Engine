import React from 'react';
import { Users, UserCircle2 } from 'lucide-react';

export default function Sidebar({ users, selectedUser, onSelectUser }) {
  return (
    <div className="w-72 bg-gray-50/50 border-r border-gray-200 h-[calc(100vh-60px)] p-5 overflow-y-auto flex flex-col hide-scrollbar">
      <div className="flex items-center mb-6 text-gray-800">
        <Users className="w-5 h-5 mr-2 text-blue-600" />
        <h2 className="text-sm font-bold uppercase tracking-wider">Select Persona</h2>
      </div>
      <div className="space-y-3">
        {users.map(u => (
          <button
            key={u.id}
            onClick={() => onSelectUser(u)}
            className={`w-full text-left p-4 rounded-xl text-sm border-2 transition-all duration-200 group ${selectedUser?.id === u.id ? 'bg-blue-50/50 border-blue-500 shadow-sm' : 'bg-white border-transparent hover:border-gray-200 shadow-sm hover:shadow'}`}
          >
            <div className="flex items-start">
              <UserCircle2 className={`w-8 h-8 mr-3 mt-0.5 ${selectedUser?.id === u.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-400 transition-colors'}`} />
              <div>
                <div className={`font-bold ${selectedUser?.id === u.id ? 'text-blue-900' : 'text-gray-900'} text-base leading-tight mb-1`}>{u.name.split('/')[0].trim()}</div>
                <div className={`text-xs font-medium ${selectedUser?.id === u.id ? 'text-blue-700' : 'text-gray-500'}`}>
                  {u.name.split('/')[1] ? u.name.split('/')[1].trim() : u.segment}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
