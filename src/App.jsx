import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AgentProvider, useAgent } from './context/AgentContext';
import { MobileContainer } from './components/layout/MobileContainer';
import { AppLayout } from './components/layout/AppLayout';
import { ToastContainer } from './components/common/Toast';
import { AuthScreens } from './components/auth/AuthScreens';
import { DashboardView } from './components/dashboard/DashboardView';
import { UserList } from './components/users/UserList';
import { UserDetailPage } from './components/users/UserDetailPage';
import { QRView } from './components/dashboard/QRView';
import { AdminSupportCard } from './components/admin/AdminSupportCard';

function ProtectedLayout() {
  const { isAuthenticated } = useAgent();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <AppLayout />;
}

function PublicAuthRoute() {
  const { isAuthenticated } = useAgent();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <AuthScreens />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path="/login" element={<PublicAuthRoute />} />
      <Route path="/register" element={<PublicAuthRoute />} />

      {/* Protected Agent Portal Routes */}
      <Route element={<ProtectedLayout />}>
        <Route index element={<DashboardView />} />
        <Route path="dashboard" element={<Navigate to="/" replace />} />
        <Route path="referrals" element={<UserList />} />
        <Route path="referrals/:id" element={<UserDetailPage />} />
        <Route path="qr" element={<QRView />} />
        <Route path="admin" element={<AdminSupportCard />} />
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AgentProvider>
      <BrowserRouter>
        <MobileContainer>
          <AppRoutes />
        </MobileContainer>
        <ToastContainer />
      </BrowserRouter>
    </AgentProvider>
  );
}
