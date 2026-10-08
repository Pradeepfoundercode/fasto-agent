import React from 'react';

export function MobileContainer({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center text-slate-800 antialiased">
      {/* 
        Native Mobile View:
        - 100% full width on mobile devices
        - Max-w-md centered on desktop with clean borders
        - Pure modern light mode UI
      */}
      <div className="w-full max-w-md min-h-screen bg-slate-50/50 sm:border-x border-slate-200 flex flex-col relative pb-16 shadow-sm">
        {children}
      </div>
    </div>
  );
}
