import React from 'react';
import { useAgent } from '../../context/AgentContext';
import { CheckIcon, HelpCircleIcon } from '../icons/Icons';

export function ToastContainer() {
  const { toasts } = useAgent();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl text-sm font-medium text-white transition-all transform animate-bounce-short pointer-events-auto backdrop-blur-md ${
            toast.type === 'error'
              ? 'bg-rose-600/95 border border-rose-400/30'
              : toast.type === 'info'
              ? 'bg-slate-800/95 border border-slate-700'
              : 'bg-emerald-600/95 border border-emerald-400/30'
          }`}
        >
          {toast.type === 'error' ? (
            <span className="w-5 h-5 rounded-full bg-rose-500/50 flex items-center justify-center text-xs font-bold">!</span>
          ) : toast.type === 'info' ? (
            <HelpCircleIcon className="w-4 h-4 text-slate-300" />
          ) : (
            <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
              <CheckIcon className="w-3.5 h-3.5 text-white" />
            </span>
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
