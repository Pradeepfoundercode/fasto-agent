import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAgent } from '../../context/AgentContext';
import { BoltIcon } from '../icons/Icons';

export function AuthScreens() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAgent();

  const isRegister = location.pathname === '/register';

  // Login form state
  const [loginPhone, setLoginPhone] = useState('9876543210');
  const [loginPassword, setLoginPassword] = useState('agent123');
  const [showPassword, setShowPassword] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regZone, setRegZone] = useState('Indiranagar, Bengaluru');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const success = login(loginPhone, loginPassword);
    if (success) {
      navigate('/');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regMobile.trim() || !regPassword) {
      alert('Please fill all required fields');
      return;
    }
    const success = register({
      name: regName,
      mobile: regMobile,
      password: regPassword,
      zone: regZone,
    });
    if (success) {
      navigate('/');
    }
  };

  const handleQuickDemo = () => {
    setLoginPhone('9876543210');
    setLoginPassword('agent123');
    login('9876543210', 'agent123');
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-3.5 py-6">
      {/* Brand Hero */}
      <div className="text-center mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 mx-auto mb-2 flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
            <BoltIcon className="w-6 h-6 text-emerald-500 fill-emerald-500 animate-pulse" />
          </div>
        </div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight m-0">
          FastoMart <span className="text-emerald-600 font-extrabold">Agent</span>
        </h1>
        <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs mx-auto">
          Partner portal for customer referrals & live tracking
        </p>
      </div>

      {/* Switch Tab Pills */}
      <div className="flex p-0.5 rounded-xl bg-slate-100 border border-slate-200 mb-3.5 shadow-2xs">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            !isRegister
              ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Agent Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/register')}
          className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            isRegister
              ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Agent Registration
        </button>
      </div>

      {/* Forms Card */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm">
        {!isRegister ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Registered Mobile Number / Email
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-semibold">
                  +91
                </span>
                <input
                  type="text"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full px-2.5 py-2 rounded-r-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] text-emerald-600 hover:underline font-semibold"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-98 mt-1"
            >
              Login to Agent Portal
            </button>

            {/* Quick Demo Fill button */}
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={handleQuickDemo}
                className="w-full py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-emerald-700 font-bold text-[11px] border border-slate-200 transition-colors"
              >
                ⚡ 1-Tap Demo Login (Rahul Sharma)
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Agent Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rohan Mehra"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Mobile Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-semibold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="98765 43210"
                  value={regMobile}
                  onChange={(e) => setRegMobile(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-r-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Set Password *
              </label>
              <input
                type="password"
                required
                placeholder="Create password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Operating Hub / Area
              </label>
              <input
                type="text"
                value={regZone}
                onChange={(e) => setRegZone(e.target.value)}
                placeholder="e.g. HSR Layout, Bengaluru"
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-98 mt-1"
            >
              Register & Generate Code
            </button>
          </form>
        )}
      </div>

      <div className="mt-3 text-center text-[10px] text-slate-400">
        <span>FastoMart Partner Program • 10-Minute Delivery Network</span>
      </div>
    </div>
  );
}
