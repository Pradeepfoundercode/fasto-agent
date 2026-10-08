import React, { useState } from 'react';
import { useAgent } from '../../context/AgentContext';
import { XIcon, PlusIcon } from '../icons/Icons';

export function AddReferralModal() {
  const { isAddUserOpen, setIsAddUserOpen, addNewReferral } = useAgent();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!isAddUserOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addNewReferral({ name, phone: phone || '9876543210', notes });
    setName('');
    setPhone('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-[320px] rounded-2xl bg-white border border-slate-200 p-4 shadow-2xl relative text-left">
        {/* Close Button */}
        <button
          onClick={() => setIsAddUserOpen(false)}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Close"
        >
          <XIcon className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
            <PlusIcon className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">New Referral</h3>
        </div>
        <p className="text-[10px] text-slate-500 mb-3">
          Record customer who received your link
        </p>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Customer Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 rounded-l-lg border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-[11px] font-semibold">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-r-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Interaction Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Met at Society Gate"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="pt-1 flex gap-2">
            <button
              type="button"
              onClick={() => setIsAddUserOpen(false)}
              className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-sm shadow-emerald-500/20 active:scale-95"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
