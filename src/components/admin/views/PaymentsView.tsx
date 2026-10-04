import React, { useState } from 'react';
import { 
  IndianRupee, 
  Search, 
  Download, 
  Filter, 
  CreditCard, 
  CheckCircle2, 
  Clock,
  ArrowDownToLine,
  TrendingUp
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

export const PaymentsView: React.FC = () => {
  const { payments } = useDatabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');

  const filteredPayments = payments.filter(p => {
    const matchesSearch = 
      p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.facilityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === 'ALL' || p.paymentMethod === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const totalCollected = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const upiCollected = payments
    .filter(p => p.status === 'paid' && p.paymentMethod === 'UPI')
    .reduce((sum, p) => sum + p.amount, 0);

  const cashCollected = payments
    .filter(p => p.status === 'paid' && p.paymentMethod === 'Cash')
    .reduce((sum, p) => sum + p.amount, 0);

  const exportCSV = () => {
    const headers = ['Payment ID', 'Customer', 'Facility', 'Amount', 'Method', 'Transaction ID', 'Date', 'Status'];
    const rows = filteredPayments.map(p => [
      p.id,
      `"${p.customerName}"`,
      `"${p.facilityName}"`,
      p.amount,
      p.paymentMethod,
      p.transactionId,
      p.paymentDate,
      p.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sivan_Sports_Payments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Payments & Financial Ledger
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Audit court bookings, gym subscriptions, and event venue collections
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="text-xs text-slate-400 font-semibold">Total Revenue Collected</div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-400 mt-1">
            Rs. {totalCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Direct from confirmed transactions</div>
        </div>

        <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
          <div className="text-xs text-slate-400 font-semibold">UPI Collections</div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-cyan-400 mt-1">
            Rs. {upiCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Instant digital payments</div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <div className="text-xs text-slate-400 font-semibold">Cash On Arrival</div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-amber-400 mt-1">
            Rs. {cashCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Counter receipt collection</div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by customer, facility, transaction ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={methodFilter}
            onChange={e => setMethodFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
          >
            <option value="ALL">All Payment Methods</option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="NetBanking">Net Banking</option>
            <option value="Card">Card</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Payment ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Facility / Purpose</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Transaction Ref</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPayments.map(pay => (
                <tr key={pay.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono font-bold text-slate-300">
                    {pay.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">
                    {pay.customerName}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {pay.facilityName}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400 text-sm">
                    Rs. {pay.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-mono">
                      {pay.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                    {pay.transactionId}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">
                    {pay.paymentDate}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {pay.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
