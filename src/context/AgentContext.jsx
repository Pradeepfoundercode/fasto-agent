import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_AGENT, INITIAL_REFERRED_USERS, ADMIN_CONTACT_INFO } from '../data/initialMockData';

const AgentContext = createContext();

export function AgentProvider({ children }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('fasto_auth');
    return saved !== null ? JSON.parse(saved) : true; // Default logged in for instant preview
  });

  const [agent, setAgent] = useState(() => {
    const saved = localStorage.getItem('fasto_agent');
    return saved !== null ? JSON.parse(saved) : INITIAL_AGENT;
  });

  // Referred Users State
  const [referredUsers, setReferredUsers] = useState(() => {
    const saved = localStorage.getItem('fasto_referred_users');
    return saved !== null ? JSON.parse(saved) : INITIAL_REFERRED_USERS;
  });

  // UI Navigation & Filters
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'users', 'qr', 'admin'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL', 'ORDER_PLACED', 'REGISTERED', 'PENDING'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  
  // Ensure dark class is removed from HTML root
  useEffect(() => {
    localStorage.removeItem('fasto_theme');
    document.documentElement.classList.remove('dark');
  }, []);

  // Toast Notification System
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('fasto_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('fasto_agent', JSON.stringify(agent));
  }, [agent]);

  useEffect(() => {
    localStorage.setItem('fasto_referred_users', JSON.stringify(referredUsers));
  }, [referredUsers]);

  // Auth Handlers
  const login = (mobileOrEmail, password) => {
    if (!mobileOrEmail || !password) {
      showToast('Please enter both mobile/email and password', 'error');
      return false;
    }
    setIsAuthenticated(true);
    showToast(`Welcome back, ${agent.name}!`, 'success');
    return true;
  };

  const register = (agentData) => {
    const newAgent = {
      ...INITIAL_AGENT,
      name: agentData.name,
      mobile: agentData.mobile,
      referralCode: `FMAG${Math.floor(10000 + Math.random() * 90000)}`,
      referralLink: `https://fastomart.app/join?ref=FMAG${Math.floor(10000 + Math.random() * 90000)}`,
      joiningDate: 'Today'
    };
    setAgent(newAgent);
    setIsAuthenticated(true);
    showToast('Agent account created successfully!', 'success');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Logged out successfully', 'info');
  };

  // User Actions
  const addNewReferral = ({ name, phone, notes }) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim() || 'New Customer',
      phone: phone.trim().startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`,
      status: 'PENDING',
      statusLabel: 'Pending / Not Registered',
      sharedAt: 'Just now',
      registeredAt: null,
      orderedAt: null,
      orderDetail: null,
      notes: notes || 'Referral link shared'
    };
    setReferredUsers((prev) => [newUser, ...prev]);
    showToast(`Referral invite created for ${newUser.name}`, 'success');
    setIsAddUserOpen(false);
  };

  const advanceUserStatus = (userId) => {
    setReferredUsers((prev) =>
      prev.map((user) => {
        if (user.id !== userId) return user;
        if (user.status === 'PENDING') {
          showToast(`${user.name} marked as Registered!`, 'success');
          return {
            ...user,
            status: 'REGISTERED',
            statusLabel: 'Registered',
            registeredAt: 'Just now'
          };
        }
        if (user.status === 'REGISTERED') {
          showToast(`${user.name} placed first order! 🎉`, 'success');
          return {
            ...user,
            status: 'ORDER_PLACED',
            statusLabel: 'Order Placed',
            orderedAt: 'Just now',
            orderDetail: 'First Grocery Order (₹350)'
          };
        }
        return user;
      })
    );
  };

  const resetAllData = () => {
    setReferredUsers(INITIAL_REFERRED_USERS);
    setAgent(INITIAL_AGENT);
    showToast('Data reset to default demo state', 'info');
  };

  // Filtered List & Counts
  const filteredUsers = referredUsers.filter((user) => {
    const matchesFilter =
      statusFilter === 'ALL' || user.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.phone.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''));
    return matchesFilter && matchesSearch;
  });

  const stats = {
    totalReferred: referredUsers.length,
    registered: referredUsers.filter((u) => u.status === 'REGISTERED' || u.status === 'ORDER_PLACED').length,
    ordered: referredUsers.filter((u) => u.status === 'ORDER_PLACED').length,
    pending: referredUsers.filter((u) => u.status === 'PENDING').length,
    conversionRate: referredUsers.length
      ? Math.round(
          (referredUsers.filter((u) => u.status === 'ORDER_PLACED').length /
            referredUsers.length) *
            100
        )
      : 0,
  };

  return (
    <AgentContext.Provider
      value={{
        agent,
        isAuthenticated,
        login,
        register,
        logout,
        referredUsers,
        filteredUsers,
        activeTab,
        setActiveTab,
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
        selectedUser,
        setSelectedUser,
        isAddUserOpen,
        setIsAddUserOpen,
        isQRModalOpen,
        setIsQRModalOpen,
        toasts,
        showToast,
        addNewReferral,
        advanceUserStatus,
        resetAllData,
        stats,
        adminContact: ADMIN_CONTACT_INFO,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}
