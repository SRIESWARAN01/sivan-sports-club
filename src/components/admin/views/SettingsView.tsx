import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  RotateCcw, 
  Database, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Lock,
  Bell
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

export const SettingsView: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    loadDemoData, 
    resetDemoData, 
    isDemoMode, 
    setIsDemoMode 
  } = useDatabase();

  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [loadConfirmOpen, setLoadConfirmOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExecuteReset = () => {
    resetDemoData();
    setResetConfirmOpen(false);
  };

  const handleExecuteLoad = () => {
    loadDemoData();
    setLoadConfirmOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            System & Business Settings
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Configure club rules, buffer times, demo environment, and notification channels
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Environment:</span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
            isDemoMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            {isDemoMode ? 'DEVELOPMENT / DEMO' : 'PRODUCTION'}
          </span>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Business settings updated successfully!</span>
        </div>
      )}

      {/* Demo Controls Section (Requirement #4 and #19) */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-amber-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Development Demo Seed & Reset System
          </div>
          <span className="text-[10px] text-slate-400 font-mono">isDemo: true</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Manage sample sports-club data for demo and operational testing. Loading demo data seeds realistic badminton bookings, gym memberships, and enquiries without mixing production records.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setLoadConfirmOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
          >
            <Database className="w-4 h-4" />
            <span>Load Demo Data</span>
          </button>

          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDemoMode(!isDemoMode)}
            className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700 transition-colors ml-auto"
          >
            Toggle DEMO_MODE: <strong>{isDemoMode ? 'TRUE' : 'FALSE'}</strong>
          </button>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Business Profile */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="font-heading font-black text-lg text-white">
            Club Profile & Identification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Business Name</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Official Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              required
            />
          </div>
        </div>

        {/* Booking & Operational Rules */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="font-heading font-black text-lg text-white">
            Court Booking & Operational Rules
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Slot Buffer Time (Minutes)</label>
              <input
                type="number"
                value={formData.bookingBufferMin}
                onChange={e => setFormData({ ...formData, bookingBufferMin: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cancellation Notice (Hours)</label>
              <input
                type="number"
                value={formData.cancellationHours}
                onChange={e => setFormData({ ...formData, cancellationHours: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Currency Code</label>
              <input
                type="text"
                value={formData.currency}
                onChange={e => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="font-heading font-black text-lg text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Alert & Dispatch Settings</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.whatsappNotifications}
                onChange={e => setFormData({ ...formData, whatsappNotifications: e.target.checked })}
                className="rounded bg-slate-950 border-slate-800 text-emerald-500"
              />
              <span className="text-xs text-slate-300">Enable WhatsApp alert notifications for staff on new bookings</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={e => setFormData({ ...formData, emailNotifications: e.target.checked })}
                className="rounded bg-slate-950 border-slate-800 text-emerald-500"
              />
              <span className="text-xs text-slate-300">Enable Email notifications for payments and receipts</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

      </form>

      {/* Load Demo Data Confirmation */}
      {loadConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-black text-lg text-white">
              Load Demo Data?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This will populate realistic sports-club bookings, members, payments, and website enquiries marked with isDemo: true.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setLoadConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteLoad}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
              >
                Yes, Load Demo Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Demo Data Confirmation (Requirement #19) */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl border border-rose-900/50 p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-black text-lg text-white">
              Reset demo data?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reset demo data? Production records will not be affected. Only seeded demo transactional records will be cleared.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteReset}
                className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold"
              >
                Yes, Reset Demo Records
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
