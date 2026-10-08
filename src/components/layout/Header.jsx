import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAgent } from '../../context/AgentContext';
import { BoltIcon, LogOutIcon, QrCodeIcon, PlusIcon } from '../icons/Icons';

export function Header() {
  const navigate = useNavigate();
  const { logout, setIsAddUserOpen } = useAgent();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-800 px-3.5 py-2">
      <div className="flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
              <BoltIcon className="w-4 h-4 text-emerald-500 fill-emerald-500 animate-pulse" />
            </div>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-sm tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                FastoMart
              </span>
              <span className="px-1 py-0.2 text-[9px] font-extrabold bg-emerald-500/15 text-emerald-700 rounded-sm border border-emerald-500/20 uppercase tracking-wide">
                Agent
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none">Partner Portal</p>
          </div>
        </Link>

        {/* Right Actions - Compact Ergonomic Touch Targets */}
        <div className="flex items-center gap-1.5">
          {/* Quick QR button */}
          <button
            onClick={() => navigate('/qr')}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-emerald-600 border border-slate-200 active:scale-95 transition-all"
            title="Scan / Show QR Code"
            aria-label="Scan QR Code"
          >
            <QrCodeIcon className="w-3.5 h-3.5" />
          </button>

          {/* Quick Add Referral button */}
          <button
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] shadow-sm shadow-emerald-500/20 active:scale-95 transition-all"
            title="Add New Referral"
          >
            <PlusIcon className="w-3 h-3" />
            <span>Invite</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 active:scale-95 transition-all border border-slate-200"
            title="Logout"
            aria-label="Logout"
          >
            <LogOutIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
