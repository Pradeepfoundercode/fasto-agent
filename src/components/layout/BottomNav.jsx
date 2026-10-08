import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAgent } from '../../context/AgentContext';
import { BoltIcon, UsersIcon, QrCodeIcon, HelpCircleIcon } from '../icons/Icons';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { referredUsers } = useAgent();

  const navItems = [
    {
      id: 'dashboard',
      path: '/',
      label: 'Home',
      icon: BoltIcon,
      isActive: (pathname) => pathname === '/' || pathname === '/dashboard',
    },
    {
      id: 'users',
      path: '/referrals',
      label: 'Referrals',
      icon: UsersIcon,
      badge: referredUsers.length,
      isActive: (pathname) => pathname.startsWith('/referrals'),
    },
    {
      id: 'qr',
      path: '/qr',
      label: 'Scan QR',
      icon: QrCodeIcon,
      isSpecial: true,
      isActive: (pathname) => pathname === '/qr',
    },
    {
      id: 'admin',
      path: '/admin',
      label: 'Admin',
      icon: HelpCircleIcon,
      isActive: (pathname) => pathname === '/admin',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/95 backdrop-blur-xl border-t sm:border-x border-slate-200/90 px-2 py-0.5 pb-safe shadow-lg">
      <div className="w-full flex items-center justify-around h-11">
        {navItems.map((item) => {
          const isActive = item.isActive(location.pathname);
          const Icon = item.icon;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => navigate('/qr')}
                className="relative -top-2 flex flex-col items-center group focus:outline-none"
              >
                <div className={`w-9 h-9 rounded-xl p-0.5 shadow-md group-hover:scale-105 active:scale-95 transition-all ${
                  isActive 
                    ? 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 ring-2 ring-emerald-500 shadow-emerald-500/40' 
                    : 'bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 shadow-emerald-500/25'
                }`}>
                  <div className="w-full h-full bg-slate-900 rounded-[9px] flex items-center justify-center text-emerald-400 group-hover:text-emerald-300">
                    <Icon className="w-4 h-4 animate-pulse-slow" />
                  </div>
                </div>
                <span className={`text-[8.5px] font-bold mt-0.5 tracking-tight ${
                  isActive ? 'text-emerald-700 font-extrabold' : 'text-emerald-600'
                }`}>
                  Scan QR
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center py-0.5 px-2 rounded-lg transition-all relative ${
                isActive
                  ? 'text-emerald-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 bg-emerald-500 text-white text-[8px] font-extrabold rounded-full min-w-3 text-center leading-tight shadow-2xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] tracking-tight">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-emerald-500 mt-0.5"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
