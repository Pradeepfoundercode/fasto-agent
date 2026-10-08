import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgent } from '../../context/AgentContext';
import { UsersIcon, UserCheckIcon, BagCheckIcon, ClockIcon } from '../icons/Icons';

export function StatSummarySection() {
  const navigate = useNavigate();
  const { stats, setStatusFilter, setActiveTab } = useAgent();

  const handleCardClick = (filter) => {
    setStatusFilter(filter);
    setActiveTab?.('users');
    if (filter === 'ALL') {
      navigate('/referrals');
    } else {
      navigate(`/referrals?status=${filter}`);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Referral Summary
        </h2>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
          {stats.conversionRate}% Conversion
        </span>
      </div>

      {/* 3 Main Metrics Grid - Compact Mobile Proportion */}
      <div className="grid grid-cols-3 gap-2">
        {/* Total Referred */}
        <button
          onClick={() => handleCardClick('ALL')}
          className="flex flex-col items-start p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-all text-left group active:scale-98"
        >
          <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 mb-1.5 group-hover:scale-105 transition-transform">
            <UsersIcon className="w-3.5 h-3.5" />
          </div>
          <span className="text-lg font-black text-slate-900 tracking-tight leading-none">
            {stats.totalReferred}
          </span>
          <span className="text-[10px] font-medium text-slate-500 leading-tight mt-1">
            Referred
          </span>
        </button>

        {/* Registered */}
        <button
          onClick={() => handleCardClick('REGISTERED')}
          className="flex flex-col items-start p-2.5 rounded-xl bg-blue-50/60 hover:bg-blue-50 border border-blue-200/80 shadow-2xs transition-all text-left group active:scale-98"
        >
          <div className="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-600 mb-1.5 group-hover:scale-105 transition-transform">
            <UserCheckIcon className="w-3.5 h-3.5" />
          </div>
          <span className="text-lg font-black text-blue-900 tracking-tight leading-none">
            {stats.registered}
          </span>
          <span className="text-[10px] font-medium text-blue-700 leading-tight mt-1">
            Registered
          </span>
        </button>

        {/* Order Placed */}
        <button
          onClick={() => handleCardClick('ORDER_PLACED')}
          className="flex flex-col items-start p-2.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-50 border border-emerald-200/90 shadow-2xs transition-all text-left group active:scale-98 relative overflow-hidden"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-600 mb-1.5 group-hover:scale-105 transition-transform">
            <BagCheckIcon className="w-3.5 h-3.5" />
          </div>
          <span className="text-lg font-black text-emerald-700 tracking-tight leading-none">
            {stats.ordered}
          </span>
          <span className="text-[10px] font-bold text-emerald-800 leading-tight mt-1">
            Ordered
          </span>
        </button>
      </div>

      {/* Pending status helper slim bar */}
      <div 
        onClick={() => handleCardClick('PENDING')}
        className="flex items-center justify-between p-2 px-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 cursor-pointer hover:bg-amber-100/70 transition-all text-[11px]"
      >
        <div className="flex items-center gap-1.5 text-amber-800 font-medium">
          <ClockIcon className="w-3.5 h-3.5" />
          <span>{stats.pending} users haven't registered yet</span>
        </div>
        <span className="text-[10px] font-bold text-amber-700 underline">View</span>
      </div>
    </div>
  );
}
