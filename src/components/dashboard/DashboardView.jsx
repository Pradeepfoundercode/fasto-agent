import React from 'react';
import { useAgent } from '../../context/AgentContext';
import { StatSummarySection } from './StatCard';
import { ReferralCodeCard } from './ReferralCodeCard';
import { QRCodeCard } from './QRCodeCard';
import { UserCard } from '../users/UserCard';
import { ArrowRightIcon } from '../icons/Icons';

export function DashboardView() {
  const { agent, referredUsers, setActiveTab, setStatusFilter } = useAgent();

  // Show 4 most recent referrals on main dashboard
  const recentUsers = referredUsers.slice(0, 4);

  return (
    <div className="space-y-3">
      {/* Agent Greeting Header - Compact Mobile Row */}
      <div className="flex items-center justify-between px-0.5">
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
            Welcome back
          </span>
          <h2 className="text-base font-black text-slate-900 tracking-tight leading-tight">
            {agent.name} 👋
          </h2>
          <p className="text-[10px] text-slate-500 mt-0.5">{agent.zone}</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">
            Partner ID
          </span>
          <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
            {agent.agentId}
          </span>
        </div>
      </div>

      {/* 1. Basic Summary Stats (Total Referred, Registered, Ordered) */}
      <StatSummarySection />

      {/* 2. Referral Code & Unique Link Card */}
      <ReferralCodeCard />

      {/* 3. Fast QR Code Card */}
      <QRCodeCard />

      {/* 4. Recent Referred Users Preview */}
      <div className="space-y-2 pt-0.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Recent Referrals
            </h3>
            <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-md font-mono">
              {referredUsers.length}
            </span>
          </div>
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setActiveTab('users');
            }}
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>See All</span>
            <ArrowRightIcon className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-1.5">
          {recentUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
