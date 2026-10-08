import React, { useState, useEffect } from 'react';

export function StatusBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' ', '')
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[13px] font-semibold tracking-tight text-slate-800 dark:text-slate-200 select-none">
      <span>{time || '9:41 AM'}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal Bars */}
        <div className="flex items-end gap-0.5 h-3">
          <div className="w-0.5 h-1.5 bg-current rounded-sm"></div>
          <div className="w-0.5 h-2 bg-current rounded-sm"></div>
          <div className="w-0.5 h-2.5 bg-current rounded-sm"></div>
          <div className="w-0.5 h-3 bg-current rounded-sm"></div>
        </div>
        {/* 5G label */}
        <span className="text-[11px] font-bold tracking-tighter">5G</span>
        {/* Battery */}
        <div className="flex items-center">
          <div className="w-5 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
            <div className="w-full h-full bg-emerald-500 rounded-2xs"></div>
          </div>
          <div className="w-0.5 h-1 bg-current rounded-r-xs"></div>
        </div>
      </div>
    </div>
  );
}
