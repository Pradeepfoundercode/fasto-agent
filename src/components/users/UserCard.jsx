import React from 'react';
import { useAgent } from '../../context/AgentContext';
import { StatusBadge } from '../common/Badge';
import { ChevronRightIcon } from '../icons/Icons';

export function UserCard({ user }) {
  const { setSelectedUser } = useAgent();

  const getAvatarBg = (name) => {
    const colors = [
      'from-emerald-500 to-teal-600',
      'from-blue-500 to-cyan-600',
      'from-indigo-500 to-purple-600',
      'from-amber-500 to-orange-600',
      'from-rose-500 to-pink-600',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return colors[hash % colors.length];
  };

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      onClick={() => setSelectedUser(user)}
      className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-2xs transition-all cursor-pointer flex items-center justify-between gap-2.5 group active:scale-98"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Compact Avatar */}
        <div
          className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${getAvatarBg(
            user.name
          )} flex items-center justify-center text-white font-bold text-[11px] shadow-2xs flex-shrink-0 group-hover:scale-105 transition-transform`}
        >
          {initials}
        </div>

        {/* User Details */}
        <div className="min-w-0 leading-tight">
          <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-600 transition-colors">
            {user.name}
          </h4>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
            <span className="font-mono text-slate-600">{user.phone}</span>
            <span>•</span>
            <span className="text-slate-400 truncate">{user.sharedAt}</span>
          </div>
        </div>
      </div>

      {/* Right Status Badge & Arrow */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <StatusBadge status={user.status} size="sm" />
        <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}
