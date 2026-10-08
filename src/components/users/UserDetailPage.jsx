import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAgent } from '../../context/AgentContext';
import { StatusBadge } from '../common/Badge';
import { 
  ArrowLeftIcon, 
  PhoneIcon, 
  WhatsAppIcon, 
  BagCheckIcon, 
  UserCheckIcon, 
  ClockIcon, 
  CheckIcon,
  RefreshCwIcon,
  UsersIcon
} from '../icons/Icons';

export function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { referredUsers, advanceUserStatus } = useAgent();

  const user = referredUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="space-y-4 py-8 text-center px-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
          <UsersIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">Referral Customer Not Found</h3>
          <p className="text-xs text-slate-500 mt-1">
            The customer referral you are looking for does not exist or has been removed.
          </p>
        </div>
        <button
          onClick={() => navigate('/referrals')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          <span>Back to Referrals</span>
        </button>
      </div>
    );
  }

  const isPending = user.status === 'PENDING';
  const isRegistered = user.status === 'REGISTERED';
  const isOrdered = user.status === 'ORDER_PLACED';

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

  const handleWhatsAppFollowup = () => {
    let msg = `Hi ${user.name}, install FastoMart to get groceries delivered in 10 mins! Use link: https://fastomart.app/join`;
    if (isRegistered) {
      msg = `Hi ${user.name}, thank you for registering on FastoMart! Enjoy flat 20% off on your first grocery order today!`;
    } else if (isOrdered) {
      msg = `Hi ${user.name}, thanks for ordering on FastoMart! Hope your delivery was lightning-fast ⚡`;
    }
    const cleanPhone = user.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCall = () => {
    const cleanPhone = user.phone.replace(/[^0-9]/g, '');
    window.location.href = `tel:+${cleanPhone}`;
  };

  return (
    <div className="space-y-3 pb-2">
      {/* Top Header with Back Button */}
      <div className="flex items-center justify-between px-0.5">
        <button
          onClick={() => navigate('/referrals')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>All Referrals</span>
        </button>
        <span className="text-[10px] font-mono text-slate-400 font-semibold">
          {user.id}
        </span>
      </div>

      {/* User Info Header Card */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-3.5 shadow-2xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${getAvatarBg(
                user.name
              )} flex items-center justify-center text-white font-black text-sm shadow-sm flex-shrink-0`}
            >
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900 leading-tight">
                  {user.name}
                </h2>
              </div>
              <p className="text-xs text-slate-600 font-mono font-medium mt-0.5">
                {user.phone}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Referred: {user.sharedAt}
              </p>
            </div>
          </div>
          <StatusBadge status={user.status} size="md" />
        </div>

        {user.notes && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-600">
            <span className="font-bold text-slate-400 text-[10px] uppercase">Note:</span>
            <span>{user.notes}</span>
          </div>
        )}
      </div>

      {/* 3-Step Journey Progress Timeline */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Conversion Timeline
          </h3>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Stage {isOrdered ? '3/3' : isRegistered ? '2/3' : '1/3'}
          </span>
        </div>

        <div className="relative pl-5 space-y-4">
          {/* Vertical connecting line */}
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-200"></div>

          {/* Step 1: Referral Shared */}
          <div className="relative flex items-start gap-2.5">
            <div className="absolute -left-5 top-0.5 w-4 h-4 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-600">
              <CheckIcon className="w-2.5 h-2.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">1. Referral Link Shared</p>
              <p className="text-[10px] text-slate-500">{user.sharedAt}</p>
            </div>
          </div>

          {/* Step 2: Account Registered */}
          <div className="relative flex items-start gap-2.5">
            <div
              className={`absolute -left-5 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                isRegistered || isOrdered
                  ? 'bg-blue-500/20 border-blue-500 text-blue-600'
                  : 'bg-slate-100 border-slate-300 text-slate-400'
              }`}
            >
              {isRegistered || isOrdered ? (
                <CheckIcon className="w-2.5 h-2.5" />
              ) : (
                <ClockIcon className="w-2.5 h-2.5" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">2. FastoMart App Registered</p>
              <p className="text-[10px] text-slate-500">
                {user.registeredAt ? user.registeredAt : 'Customer has not registered yet'}
              </p>
            </div>
          </div>

          {/* Step 3: First Order Placed */}
          <div className="relative flex items-start gap-2.5">
            <div
              className={`absolute -left-5 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                isOrdered
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600'
                  : 'bg-slate-100 border-slate-300 text-slate-400'
              }`}
            >
              {isOrdered ? (
                <CheckIcon className="w-2.5 h-2.5" />
              ) : (
                <BagCheckIcon className="w-2.5 h-2.5" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">3. First Grocery Order Placed</p>
              <p className="text-[10px] text-slate-500">
                {user.orderedAt
                  ? `${user.orderedAt} • ${user.orderDetail || 'Completed'}`
                  : 'Commission awaits first completed order'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Helper */}
      {!isOrdered && (
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-xs font-bold text-slate-800">Simulate Next Step</p>
            <p className="text-[10px] text-slate-500">
              {isPending ? 'Simulate user creating account' : 'Simulate 1st grocery order'}
            </p>
          </div>
          <button
            onClick={() => advanceUserStatus(user.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
            <span>{isPending ? 'Advance to Registered' : 'Advance to Order Placed'}</span>
          </button>
        </div>
      )}

      {/* Customer Contact Actions */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={handleWhatsAppFollowup}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-[#25D366]/20"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>Follow-up WhatsApp</span>
        </button>
        <button
          onClick={handleCall}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all active:scale-95 border border-slate-200"
        >
          <PhoneIcon className="w-4 h-4 text-emerald-600" />
          <span>Call Customer</span>
        </button>
      </div>
    </div>
  );
}
