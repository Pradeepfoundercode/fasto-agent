import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgent } from '../../context/AgentContext';
import { QRCodeSVG } from '../../utils/qrCodeGenerator';
import { ArrowRightIcon } from '../icons/Icons';

export function QRCodeCard() {
  const navigate = useNavigate();
  const { agent } = useAgent();

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-2.5 flex items-center justify-between gap-3 shadow-2xs">
      {/* Mini QR Preview Thumbnail */}
      <div 
        onClick={() => navigate('/qr')}
        className="cursor-pointer group flex-shrink-0 relative active:scale-95 transition-transform"
        title="Tap to view full QR"
      >
        <div className="p-1 rounded-xl bg-slate-50 border border-slate-200">
          <QRCodeSVG value={agent.referralLink} size={48} />
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-slate-900 truncate">
            Fast QR Scanner
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </div>
        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
          Customer scans from smartphone camera
        </p>
      </div>

      {/* Action CTA */}
      <button
        onClick={() => navigate('/qr')}
        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs transition-all active:scale-95 shadow-sm shadow-emerald-500/20 flex-shrink-0"
      >
        <span>Show QR</span>
        <ArrowRightIcon className="w-3 h-3" />
      </button>
    </div>
  );
}
