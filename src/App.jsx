import React from 'react';
import { AgentProvider, useAgent } from './context/AgentContext';
import { MobileContainer } from './components/layout/MobileContainer';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { ToastContainer } from './components/common/Toast';
import { AuthScreens } from './components/auth/AuthScreens';
import { DashboardView } from './components/dashboard/DashboardView';
import { UserList } from './components/users/UserList';
import { AdminSupportCard } from './components/admin/AdminSupportCard';
import { QRModal } from './components/dashboard/QRModal';
import { UserDetailModal } from './components/users/UserDetailModal';
import { AddReferralModal } from './components/users/AddReferralModal';

function MainAppContent() {
  const { isAuthenticated, activeTab } = useAgent();

  if (!isAuthenticated) {
    return <AuthScreens />;
  }

  return (
    <>
      <Header />
      <main className="flex-1 px-3 py-2.5 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'admin' && <AdminSupportCard />}
      </main>
      <BottomNav />
      <QRModal />
      <UserDetailModal />
      <AddReferralModal />
    </>
  );
}

export default function App() {
  return (
    <AgentProvider>
      <MobileContainer>
        <MainAppContent />
      </MobileContainer>
      <ToastContainer />
    </AgentProvider>
  );
}
