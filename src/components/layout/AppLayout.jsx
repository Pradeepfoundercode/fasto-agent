import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { QRModal } from '../dashboard/QRModal';
import { UserDetailModal } from '../users/UserDetailModal';
import { AddReferralModal } from '../users/AddReferralModal';

export function AppLayout() {
  return (
    <>
      <Header />
      <main className="flex-1 px-3 py-2.5 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
      <QRModal />
      <UserDetailModal />
      <AddReferralModal />
    </>
  );
}
