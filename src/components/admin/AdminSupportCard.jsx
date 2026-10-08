import React from 'react';
import { useAgent } from '../../context/AgentContext';
import { 
  WhatsAppIcon, 
  PhoneIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  CheckIcon 
} from '../icons/Icons';

export function AdminSupportCard() {
  const { adminContact, agent, resetAllData } = useAgent();

  const handleWhatsApp = () => {
    const text = `Hi Admin, I am FastoMart Agent ${agent.name} (ID: ${agent.agentId}). I have a query regarding my payout/account.`;
    window.open(`https://wa.me/${adminContact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${adminContact.callNumber}`;
  };

  return (
    <div className="space-y-2.5">
      {/* Page Title */}
      <div className="px-0.5">
        <h2 className="text-sm font-black text-slate-900 tracking-tight">
          Admin & Business Support
        </h2>
        <p className="text-[10px] text-slate-500">
          Direct communication with your FastoMart Field Operations Manager
        </p>
      </div>

      {/* Primary Contact Card */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-3 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <ShieldCheckIcon className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <h3 className="text-xs font-bold text-slate-900">{adminContact.adminName}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Field Operations Manager</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{adminContact.timing}</p>
          </div>
        </div>

        {/* Action Buttons: WhatsApp & Call */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-all active:scale-95 shadow-sm shadow-[#25D366]/20"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Chat WhatsApp</span>
          </button>

          <button
            onClick={handleCall}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs transition-all active:scale-95 shadow-2xs"
          >
            <PhoneIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Call Admin</span>
          </button>
        </div>
      </div>

      {/* Salary & Payout Policy Notice */}
      <div className="rounded-xl bg-white border border-slate-200/90 p-3 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
          <CheckIcon className="w-3.5 h-3.5" />
          <span>Salary & Referral Commission</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Payouts are reconciled directly by FastoMart Admin:
        </p>
        <ul className="text-[10px] text-slate-500 space-y-1 pl-3.5 list-disc">
          <li>Weekly salary transferred every Tuesday directly to bank account.</li>
          <li>For status clarification, contact Admin directly on WhatsApp.</li>
        </ul>
      </div>

      {/* FastoMart Agent Guidelines */}
      <div className="rounded-xl bg-white border border-slate-200/90 p-3 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[11px]">
          <BoltIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tips to Increase Conversion</span>
        </div>
        <div className="text-[10px] text-slate-500 space-y-1 leading-relaxed">
          <p>
            1. <strong className="text-slate-700">Quick QR:</strong> Use the QR tab to show QR directly on your mobile screen.
          </p>
          <p>
            2. <strong className="text-slate-700">1-Tap Reminder:</strong> Tap any "Pending" referral to send a WhatsApp nudge.
          </p>
        </div>
      </div>

      {/* Demo helper */}
      <div className="pt-1 text-center">
        <button
          onClick={resetAllData}
          className="text-[10px] text-slate-400 hover:text-slate-600 underline font-medium"
        >
          Reset Demo Sample Data
        </button>
      </div>
    </div>
  );
}
