import React, { useState } from 'react';
import { useAgent } from '../../context/AgentContext';
import { QRCodeSVG } from '../../utils/qrCodeGenerator';
import { XIcon, CopyIcon, WhatsAppIcon, CheckIcon, BoltIcon } from '../icons/Icons';

export function QRModal() {
  const { agent, isQRModalOpen, setIsQRModalOpen, showToast } = useAgent();
  const [copied, setCopied] = useState(false);

  if (!isQRModalOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(agent.referralCode);
      setCopied(true);
      showToast('Referral code copied!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Copied!', 'success');
    }
  };

  const handleWhatsApp = () => {
    const text = `Download FastoMart app and get groceries in 10 mins! Use referral: ${agent.referralCode} 👉 ${agent.referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-[320px] rounded-2xl bg-white border border-slate-200 p-4 shadow-2xl text-center">
        {/* Close Button */}
        <button
          onClick={() => setIsQRModalOpen(false)}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Close"
        >
          <XIcon className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
            <BoltIcon className="w-3.5 h-3.5 fill-emerald-500" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            FastoMart Referral QR
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mb-3">
          Customer scans directly with camera
        </p>

        {/* Scaled High-Contrast QR Code Card */}
        <div className="inline-block p-3 bg-white rounded-2xl shadow-sm border border-slate-200 mb-3">
          <QRCodeSVG value={agent.referralLink} size={150} />
          <div className="mt-1.5 text-center">
            <span className="text-[10px] font-bold text-slate-600 block">
              Scan to Download & Auto-Apply
            </span>
            <span className="text-sm font-black text-slate-900 font-mono tracking-wider">
              {agent.referralCode}
            </span>
          </div>
        </div>

        {/* Referral Code Quick Copy Box */}
        <div className="flex items-center justify-between p-2 px-2.5 rounded-xl bg-slate-50 border border-slate-200 mb-3">
          <div className="text-left">
            <span className="text-[9px] text-slate-400 block font-bold leading-none">AGENT CODE</span>
            <span className="text-xs font-mono font-bold text-emerald-600">{agent.referralCode}</span>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-[11px] font-bold text-slate-700 border border-slate-200 transition-colors shadow-2xs"
          >
            {copied ? <CheckIcon className="w-3 h-3 text-emerald-600" /> : <CopyIcon className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-all active:scale-95 shadow-sm shadow-[#25D366]/20"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Send Text</span>
          </button>
          <button
            onClick={() => {
              showToast('QR Code ready for direct scanning', 'info');
              setIsQRModalOpen(false);
            }}
            className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all active:scale-95 border border-slate-200"
          >
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
}
