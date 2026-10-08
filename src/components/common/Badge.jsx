import React from 'react';
import { BagCheckIcon, UserCheckIcon, ClockIcon } from '../icons/Icons';

export function StatusBadge({ status, size = "md" }) {
  const isSmall = size === "sm";

  if (status === 'ORDER_PLACED') {
    return (
      <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap ${
        isSmall ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <BagCheckIcon className={isSmall ? "w-3 h-3" : "w-3.5 h-3.5"} />
        <span>Order Placed</span>
      </span>
    );
  }

  if (status === 'REGISTERED') {
    return (
      <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap ${
        isSmall ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
      }`}>
        <UserCheckIcon className={isSmall ? "w-3 h-3" : "w-3.5 h-3.5"} />
        <span>Registered</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap ${
      isSmall ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
    }`}>
      <ClockIcon className={isSmall ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>Pending</span>
    </span>
  );
}
