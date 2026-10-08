import React from 'react';
import { useAgent } from '../../context/AgentContext';
import { StatusBadge } from '../common/Badge';
import { 
  XIcon, 
  PhoneIcon, 
  WhatsAppIcon, 
  BagCheckIcon, 
  UserCheckIcon, 
  ClockIcon, 
  CheckIcon,
  RefreshCwIcon 
} from '../icons/Icons';

export function UserDetailModal() {
  const { selectedUser, setSelectedUser, advanceUserStatus } = useAgent();

  if (!selectedUser) return null;

  const isPending = selectedUser.status === 'PENDING';
  const isRegistered = selectedUser.status === 'REGISTERED';
  const isOrdered = selectedUser.status === 'ORDER_PLACED';

  const handleWhatsAppFollowup = () => {
    let msg = `Hi ${selectedUser.name}, install FastoMart to get groceries delivered in 10 mins! Use link: https://fastomart.app/join`;
    if (isRegistered) {
      msg = `Hi ${selectedUser.name}, thank you for registering on FastoMart! Enjoy flat 20% off on your first grocery order today!`;
    }
    const cleanPhone = selectedUser.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCall = () => {
    const cleanPhone = selectedUser.phone.replace(/[^0-9]/g, '');
    window.location.href = `tel:+${cleanPhone}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-3 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-t-2xl sm:rounded-2xl bg-white border border-slate-200 p-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        {/* Handlebar for Mobile */}
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3 sm:hidden"></div>

        {/* Header & Close */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-base font-bold text-slate-900">{selectedUser.name}</h3>
              <StatusBadge status={selectedUser.status} size="sm" />
            </div>
            <p className="text-[11px] text-slate-500 font-mono">{selectedUser.phone}</p>
          </div>
          <button
            onClick={() => setSelectedUser(null)}
            className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Step Journey Progress Timeline (as defined in PRD Section 5) */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 mb-3">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Conversion Timeline
          </h4>

          <div className="relative pl-5 space-y-3.5">
            {/* Vertical Line */}
            <div className="absolute left-2 top-1.5 bottom-1.5 w-0.5 bg-slate-200"></div>

            {/* Step 1: Referral Shared */}
            <div className="relative flex items-start gap-2.5">
              <div className="absolute -left-5 top-0.5 w-4 h-4 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-600">
                <CheckIcon className="w-2.5 h-2.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">1. Referral Shared</p>
                <p className="text-[10px] text-slate-500">{selectedUser.sharedAt}</p>
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
                <p className="text-xs font-bold text-slate-900">2. App Account Registered</p>
                <p className="text-[10px] text-slate-500">
                  {selectedUser.registeredAt ? selectedUser.registeredAt : 'Pending registration'}
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
                <p className="text-xs font-bold text-slate-900">3. First Order Placed</p>
                <p className="text-[10px] text-slate-500">
                  {selectedUser.orderedAt
                    ? `${selectedUser.orderedAt} • ${selectedUser.orderDetail || 'Completed'}`
                    : 'Awaiting first order'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Simulator Tool */}
        {!isOrdered && (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 mb-3 flex items-center justify-between">
            <div className="text-[11px]">
              <p className="font-bold text-slate-800">Interactive Test</p>
              <p className="text-[10px] text-slate-500">
                {isPending ? 'Simulate user registration' : 'Simulate first order placement'}
              </p>
            </div>
            <button
              onClick={() => {
                advanceUserStatus(selectedUser.id);
                setSelectedUser((prev) => ({
                  ...prev,
                  status: prev.status === 'PENDING' ? 'REGISTERED' : 'ORDER_PLACED',
                  statusLabel: prev.status === 'PENDING' ? 'Registered' : 'Order Placed',
                  registeredAt: prev.status === 'PENDING' ? 'Just now' : prev.registeredAt,
                  orderedAt: prev.status === 'REGISTERED' ? 'Just now' : prev.orderedAt,
                }));
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] transition-colors shadow-2xs"
            >
              <RefreshCwIcon className="w-3 h-3" />
              <span>{isPending ? 'Register' : 'Order'}</span>
            </button>
          </div>
        )}

        {/* Contact Customer Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsAppFollowup}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-all active:scale-95 shadow-sm shadow-[#25D366]/20"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Follow-up WhatsApp</span>
          </button>
          <button
            onClick={handleCall}
            className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all active:scale-95 border border-slate-200"
          >
            <PhoneIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Call Customer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
