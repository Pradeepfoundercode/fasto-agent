import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAgent } from '../../context/AgentContext';
import { UserCard } from './UserCard';
import { SearchIcon, XIcon, PlusIcon, UsersIcon } from '../icons/Icons';

export function UserList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    filteredUsers,
    referredUsers,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    stats,
    setIsAddUserOpen,
  } = useAgent();

  // Sync URL search params with statusFilter
  useEffect(() => {
    const urlStatus = searchParams.get('status');
    if (urlStatus && ['ALL', 'ORDER_PLACED', 'REGISTERED', 'PENDING'].includes(urlStatus)) {
      if (statusFilter !== urlStatus) {
        setStatusFilter(urlStatus);
      }
    }
  }, [searchParams]);

  const handleFilterClick = (tabId) => {
    setStatusFilter(tabId);
    if (tabId === 'ALL') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('status');
      setSearchParams(nextParams);
    } else {
      setSearchParams({ status: tabId });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('status');
    setSearchParams(nextParams);
  };

  const filterTabs = [
    { id: 'ALL', label: 'All', count: stats.totalReferred },
    { id: 'ORDER_PLACED', label: 'Ordered', count: stats.ordered },
    { id: 'REGISTERED', label: 'Registered', count: stats.registered },
    { id: 'PENDING', label: 'Pending', count: stats.pending },
  ];

  return (
    <div className="space-y-2.5">
      {/* Header and Add Referral CTA */}
      <div className="flex items-center justify-between px-0.5">
        <div>
          <h2 className="text-sm font-black text-slate-900 tracking-tight">
            Referred Customers
          </h2>
          <p className="text-[10px] text-slate-500">
            Real-time status of referred app users
          </p>
        </div>
        <button
          onClick={() => setIsAddUserOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] transition-all shadow-sm shadow-emerald-500/20 active:scale-95"
        >
          <PlusIcon className="w-3 h-3" />
          <span>New Invite</span>
        </button>
      </div>

      {/* Compact Search Bar */}
      <div className="relative">
        <SearchIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name or mobile..."
          className="w-full pl-8.5 pr-8 py-2 rounded-xl bg-white border border-slate-200/90 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
            aria-label="Clear search"
          >
            <XIcon className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Status Filter Horizontal Scrolling Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-[11px]">
        {filterTabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleFilterClick(tab.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all select-none ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1 rounded-sm text-[9px] font-extrabold ${
                  isActive
                    ? 'bg-black/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List of Referred Users */}
      <div className="space-y-1.5 pt-0.5">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="text-center py-10 px-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <UsersIcon className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-800">No users found</p>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
              {searchQuery
                ? `No customers match "${searchQuery}".`
                : `No customers in "${statusFilter}" status.`}
            </p>
            {(searchQuery || statusFilter !== 'ALL') && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-emerald-600 font-bold text-[11px] transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
