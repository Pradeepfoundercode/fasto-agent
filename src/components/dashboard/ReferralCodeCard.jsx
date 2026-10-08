import React, { useState } from 'react';
import { useAgent } from '../../context/AgentContext';
import { CopyIcon, CheckIcon, ShareIcon, WhatsAppIcon, BoltIcon } from '../icons/Icons';

export function ReferralCodeCard() {
  const { agent, showToast } = useAgent();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(agent.referralCode);
      setCopiedCode(true);
      showToast(`Code "${agent.referralCode}" copied!`, 'success');
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      showToast('Copied!', 'success');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(agent.referralLink);
      setCopiedLink(true);
      showToast('Referral link copied!', 'success');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      showToast('Copied!', 'success');
    }
  };

  const handleShare = async () => {
    const shareText = `Order groceries in 10 minutes on FastoMart! Download using code: ${agent.referralCode}\n${agent.referralLink}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FastoMart Referral',
          text: shareText,
          url: agent.referralLink,
        });
        showToast('Shared successfully!', 'success');
      } catch {
        // cancelled
      }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  const handleWhatsAppShare = () => {
    const shareText = `Order groceries in 10 minutes on FastoMart! Download using code: ${agent.referralCode}\n${agent.referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white to-emerald-500/5 border border-emerald-500/25 p-3 shadow-2xs">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
            <BoltIcon className="w-3.5 h-3.5 fill-emerald-500" />
          </div>
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
            Referral Code & Link
          </span>
        </div>
        <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-md border border-slate-200">
          ID: {agent.agentId}
        </span>
      </div>

      {/* Prominent Referral Code Row */}
      <div className="flex items-center justify-between p-2 px-2.5 rounded-xl bg-white border border-emerald-500/30 mb-2 shadow-2xs">
        <div>
          <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">
            Code
          </span>
          <span className="text-lg font-black text-emerald-600 tracking-wider font-mono">
            {agent.referralCode}
          </span>
        </div>
        <button
          onClick={handleCopyCode}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 shadow-2xs ${
            copiedCode
              ? 'bg-emerald-500 text-white'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-500/30'
          }`}
        >
          {copiedCode ? <CheckIcon className="w-3 h-3" /> : <CopyIcon className="w-3 h-3" />}
          <span>{copiedCode ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Compact Referral Link & Actions */}
      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between gap-1.5 p-1.5 px-2 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600 font-mono">
          <span className="truncate select-all flex-1">{agent.referralLink}</span>
          <button
            onClick={handleCopyLink}
            className="p-1 rounded text-slate-400 hover:text-emerald-600 transition-colors"
            title="Copy Link"
          >
            {copiedLink ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" /> : <CopyIcon className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Action Buttons: Native Share + WhatsApp */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-bold transition-all active:scale-98 shadow-2xs"
          >
            <ShareIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Share Link</span>
          </button>
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-bold transition-all active:scale-98 shadow-sm shadow-[#25D366]/20"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
