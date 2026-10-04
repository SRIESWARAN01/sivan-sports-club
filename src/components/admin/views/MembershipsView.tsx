import React, { useState } from 'react';
import { 
  Dumbbell, 
  Search, 
  Plus, 
  RotateCw, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Calendar,
  IndianRupee,
  X
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import type { GymMembership } from '../../../types/database';

export const MembershipsView: React.FC = () => {
  const { gymMemberships, membershipPlans, renewGymMembership, addGymMembership } = useDatabase();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [renewingMember, setRenewingMember] = useState<GymMembership | null>(null);
  const [monthsToAdd, setMonthsToAdd] = useState(1);

  // New Membership Modal
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [planId, setPlanId] = useState(membershipPlans[0]?.id || 'plan_1m');

  const selectedPlan = membershipPlans.find(p => p.id === planId) || membershipPlans[0];

  const handleRenew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renewingMember) return;
    renewGymMembership(renewingMember.id, monthsToAdd);
    setRenewingMember(null);
  };

  const handleCreateMembership = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerMobile) return;

    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + (selectedPlan?.durationMonths || 1));

    addGymMembership({
      customerId: 'cust_' + Date.now().toString().slice(-4),
      customerName,
      customerMobile,
      planName: selectedPlan?.name || 'Monthly Pass',
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      amount: selectedPlan?.price || 1500,
      paymentStatus: 'paid',
      status: 'active',
      autoRenew: true
    });

    setIsNewModalOpen(false);
    setCustomerName('');
    setCustomerMobile('');
  };

  const filteredMemberships = gymMemberships.filter(m => {
    const matchesSearch = 
      m.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.customerMobile.includes(searchTerm) ||
      m.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const activeCount = gymMemberships.filter(m => m.status === 'active').length;
  const expiringCount = gymMemberships.filter(m => m.status === 'expiring_soon').length;
  const expiredCount = gymMemberships.filter(m => m.status === 'expired').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Gym & Fitness Memberships
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Active subscriptions, plan renewals, and expiration tracking
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Gym Subscription</span>
        </button>
      </div>

      {/* Top 3 Membership Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-semibold">Active Members</div>
            <div className="font-heading font-black text-2xl text-emerald-400 mt-1">{activeCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-semibold">Expiring Soon (Next 30 Days)</div>
            <div className="font-heading font-black text-2xl text-amber-400 mt-1">{expiringCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-semibold">Expired Memberships</div>
            <div className="font-heading font-black text-2xl text-rose-400 mt-1">{expiredCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search member name, mobile, plan..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {['ALL', 'active', 'expiring_soon', 'expired'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                filterStatus === status 
                  ? 'bg-emerald-500 text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Memberships Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Plan Name</th>
                <th className="py-3 px-4">Start Date</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Fee Paid</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredMemberships.map(mem => (
                <tr key={mem.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{mem.customerName}</div>
                    <div className="text-[10px] text-slate-500">{mem.customerMobile}</div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-300">
                    {mem.planName}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">
                    {mem.startDate}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-200 font-semibold">
                    {mem.endDate}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                    Rs. {mem.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      mem.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : mem.status === 'expiring_soon'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {mem.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setRenewingMember(mem)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1 ml-auto transition-colors"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>Renew</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Renewal Modal */}
      {renewingMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl">
            <button
              onClick={() => setRenewingMember(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading font-black text-xl text-white mb-1">
              Renew Membership
            </h3>
            <p className="text-slate-400 text-xs mb-4">
              Extend gym access for {renewingMember.customerName}
            </p>

            <form onSubmit={handleRenew} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Add Duration</label>
                <select
                  value={monthsToAdd}
                  onChange={e => setMonthsToAdd(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value={1}>+ 1 Month (Rs. 1,500)</option>
                  <option value={3}>+ 3 Months (Rs. 3,800)</option>
                  <option value={12}>+ 12 Months (Rs. 12,000)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRenewingMember(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
                >
                  Confirm Renewal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Subscription Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsNewModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading font-black text-xl text-white mb-1">
              New Gym Subscription
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Create an active membership for Sivan Sports Club Gym
            </p>

            <form onSubmit={handleCreateMembership} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Member Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="e.g. S. Karthik"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={customerMobile}
                  onChange={e => setCustomerMobile(e.target.value)}
                  placeholder="e.g. 9842100000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Membership Plan</label>
                <select
                  value={planId}
                  onChange={e => setPlanId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  {membershipPlans.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.durationMonths} Months - Rs. {p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
                >
                  Create Membership
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
