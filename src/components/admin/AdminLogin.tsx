import React, { useState } from 'react';
import { 
  Trophy, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowLeft,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import type { Role } from '../../types/database';

interface AdminLoginProps {
  onBackToPublic: () => void;
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToPublic, onLoginSuccess }) => {
  const { isDemoMode, loginAs } = useDatabase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const demoAccounts = [
    {
      role: 'SUPER_ADMIN' as Role,
      title: 'Super Admin',
      email: 'demo.admin@sivansportsclub.com',
      desc: 'Full club authority & settings'
    },
    {
      role: 'MANAGER' as Role,
      title: 'Operations Manager',
      email: 'demo.manager@sivansportsclub.com',
      desc: 'Bookings, facilities, events & reports'
    },
    {
      role: 'STAFF' as Role,
      title: 'Front-Desk Staff',
      email: 'demo.staff@sivansportsclub.com',
      desc: 'Court bookings, customers & enquiries'
    },
    {
      role: 'ACCOUNTS' as Role,
      title: 'Accounts Lead',
      email: 'demo.accounts@sivansportsclub.com',
      desc: 'Payments, revenue & financial exports'
    }
  ];

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check against demo accounts if in demo mode
    const matched = demoAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());
    if (matched && password === 'Demo@Sivan2026!') {
      loginAs(matched.role);
      onLoginSuccess();
      return;
    }

    if (email && password) {
      // Default fallback in demo mode
      loginAs('SUPER_ADMIN');
      onLoginSuccess();
      return;
    }

    setError('Invalid email or password. Please use the demo accounts below.');
  };

  const handleQuickDemoLogin = (role: Role, demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Demo@Sivan2026!');
    loginAs(role);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80"
          alt="Sivan Sports Club Background"
          className="w-full h-full object-cover opacity-20 filter blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/80" />
      </div>

      {/* Top back button */}
      <div className="relative z-10 max-w-md w-full mx-auto px-4 mb-4">
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </button>
      </div>

      <div className="relative z-10 max-w-md w-full mx-auto px-4">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/80">
          
          {/* Logo & Heading */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-emerald-900/40">
              <Trophy className="w-6 h-6" />
            </div>
            <h1 className="font-heading font-black text-2xl text-white">
              Sivan Sports Club
            </h1>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mt-0.5">
              Management & Admin Portal
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Sign in to manage bookings, customers, facilities and revenue
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@sivansportsclub.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to registered email in production.')}
                  className="text-[11px] text-emerald-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0"
                />
                <span>Keep me signed in</span>
              </label>
              <span className="text-[10px] text-slate-500">256-bit Encrypted</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 mt-2"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Quick Demo Login Section */}
          {isDemoMode && (
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Development Demo Login
                </span>
                <span className="text-[10px] font-mono text-slate-500">DEMO_MODE=true</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                One-click switch to test different role permissions:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map(acc => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleQuickDemoLogin(acc.role, acc.email)}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-left transition-colors group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-between">
                      <span>{acc.title}</span>
                      <UserCheck className="w-3 h-3 text-emerald-400 opacity-60 group-hover:opacity-100" />
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {acc.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
