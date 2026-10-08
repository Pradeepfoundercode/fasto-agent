import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgent } from '../../context/AgentContext';
import { QRCodeSVG } from '../../utils/qrCodeGenerator';
import { 
  ArrowLeftIcon, 
  CopyIcon, 
  CheckIcon, 
  WhatsAppIcon, 
  ShareIcon, 
  BoltIcon, 
  UsersIcon 
} from '../icons/Icons';

export function QRView() {
  const navigate = useNavigate();
  const { agent, showToast } = useAgent();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(agent.referralCode);
      setCopiedCode(true);
      showToast('Referral code copied to clipboard!', 'success');
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      showToast('Copied code!', 'success');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(agent.referralLink);
      setCopiedLink(true);
      showToast('Referral link copied to clipboard!', 'success');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      showToast('Copied link!', 'success');
    }
  };

  const handleWhatsApp = () => {
    const text = `⚡ Order groceries in 10 minutes on FastoMart! Use my partner referral code ${agent.referralCode} to get exclusive welcome discount: ${agent.referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FastoMart 10-Min Delivery',
          text: `Join FastoMart with partner code ${agent.referralCode}`,
          url: agent.referralLink,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-3 pb-2">
      {/* Top Header with Back Button */}
      <div className="flex items-center justify-between px-0.5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Live Scanner
        </span>
      </div>

      {/* Hero Card */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm text-center">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 mx-auto mb-2 flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
            <BoltIcon className="w-4 h-4 text-emerald-500 fill-emerald-500" />
          </div>
        </div>
        <h2 className="text-base font-black text-slate-900 tracking-tight">
          FastoMart Partner QR
        </h2>
        <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-0.5">
          Ask customers to scan this code with their smartphone camera or Google Lens
        </p>

        {/* Scaled QR Container */}
        <div className="my-3.5 inline-block p-4 bg-white rounded-2xl shadow-sm border-2 border-emerald-500/20">
          <QRCodeSVG value={agent.referralLink} size={180} />
          <div className="mt-2 text-center">
            <span className="text-[10px] font-semibold text-slate-500 block uppercase tracking-wider">
              Scan to Auto-Apply
            </span>
            <span className="text-base font-black text-slate-900 font-mono tracking-widest text-emerald-700">
              {agent.referralCode}
            </span>
          </div>
        </div>

        {/* Partner Info Details */}
        <div className="grid grid-cols-2 gap-2 text-left mb-3">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[9px] font-bold text-slate-400 block uppercase">Partner Name</span>
            <span className="text-xs font-bold text-slate-800 truncate block">{agent.name}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[9px] font-bold text-slate-400 block uppercase">Partner ID</span>
            <span className="text-xs font-mono font-bold text-slate-800 truncate block">{agent.agentId}</span>
          </div>
        </div>

        {/* Copy Referral Code Row */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 mb-3 text-left">
          <div>
            <span className="text-[9px] text-emerald-700 font-bold block uppercase leading-none">
              Referral Code
            </span>
            <span className="text-sm font-mono font-extrabold text-emerald-900">
              {agent.referralCode}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 active:scale-95"
          >
            {copiedCode ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-[#25D366]/20"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Share WhatsApp</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all active:scale-95 shadow-sm"
          >
            {copiedLink ? <CheckIcon className="w-4 h-4 text-emerald-400" /> : <ShareIcon className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Link'}</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation to Customer Referrals */}
      <button
        onClick={() => navigate('/referrals')}
        className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-left shadow-2xs transition-all"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-600 flex items-center justify-center">
            <UsersIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-tight">View Referred Customers</p>
            <p className="text-[10px] text-slate-500">Track registrations and order commissions</p>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-600">Open →</span>
      </button>
    </div>
  );
}
