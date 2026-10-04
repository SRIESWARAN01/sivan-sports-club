import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  Dumbbell, 
  Trophy, 
  Waves, 
  Activity, 
  Sparkles, 
  IndianRupee, 
  TrendingUp, 
  MessageSquare,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

interface DashboardOverviewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenNewBookingModal: () => void;
  onOpenNewEnquiryModal: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  onNavigateTab,
  onOpenNewBookingModal,
  onOpenNewEnquiryModal
}) => {
  const { 
    stats, 
    bookings, 
    enquiries, 
    facilities, 
    gymMemberships, 
    payments, 
    events 
  } = useDatabase();

  const [bookingTimeFilter, setBookingTimeFilter] = useState<'today' | '7d' | '30d' | 'all'>('7d');
  const [revenueFilter, setRevenueFilter] = useState<'all' | 'badminton' | 'gym' | 'pool' | 'event'>('all');

  // Top 10 Summary Cards
  const summaryCards = [
    {
      id: 'enquiries',
      title: 'Total Enquiries',
      value: stats.totalEnquiries,
      icon: MessageSquare,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      note: 'Website & Walk-ins',
      tab: 'enquiries'
    },
    {
      id: 'today_bookings',
      title: "Today's Bookings",
      value: stats.todayBookings,
      icon: Clock,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      note: 'Active on court/gym today',
      tab: 'bookings'
    },
    {
      id: 'upcoming',
      title: 'Upcoming Bookings',
      value: stats.upcomingBookings,
      icon: Calendar,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      note: 'Next 7-30 days reserved',
      tab: 'bookings'
    },
    {
      id: 'gym_members',
      title: 'Active Gym Members',
      value: stats.activeGymMembers,
      icon: Dumbbell,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20',
      note: 'Valid active subscriptions',
      tab: 'memberships'
    },
    {
      id: 'badminton',
      title: 'Badminton Bookings',
      value: stats.badmintonBookings,
      icon: Trophy,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      note: 'Court slots reserved',
      tab: 'bookings'
    },
    {
      id: 'pool',
      title: 'Pool Bookings',
      value: stats.swimmingBookings,
      icon: Waves,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      note: 'Swim slots & passes',
      tab: 'bookings'
    },
    {
      id: 'arena',
      title: 'Arena Bookings',
      value: stats.arenaBookings,
      icon: Activity,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      note: 'Box cricket & futsal',
      tab: 'bookings'
    },
    {
      id: 'events',
      title: 'Event Bookings',
      value: stats.eventBookings,
      icon: Sparkles,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      note: 'Banquets & Celebrations',
      tab: 'events'
    },
    {
      id: 'today_rev',
      title: "Today's Revenue",
      value: `Rs. ${stats.todayRevenue.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      note: 'Collected today',
      tab: 'payments'
    },
    {
      id: 'monthly_rev',
      title: 'Total Tracked Revenue',
      value: `Rs. ${stats.monthlyRevenue.toLocaleString('en-IN')}`,
      icon: TrendingUp,
      color: 'text-emerald-300',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      note: 'Real recorded payments',
      tab: 'payments'
    }
  ];

  // Dynamic Facility Usage counts
  const totalBks = bookings.length || 1;
  const facilityBreakdown = [
    { name: 'Badminton', count: stats.badmintonBookings, pct: Math.round((stats.badmintonBookings / totalBks) * 100), color: 'bg-emerald-500' },
    { name: 'Multi-Sport Arena', count: stats.arenaBookings, pct: Math.round((stats.arenaBookings / totalBks) * 100), color: 'bg-cyan-500' },
    { name: 'Gym & Fitness', count: bookings.filter(b => b.facilityId === 'fac_gym').length, pct: Math.round((bookings.filter(b => b.facilityId === 'fac_gym').length / totalBks) * 100), color: 'bg-teal-500' },
    { name: 'Swimming Pool', count: stats.swimmingBookings, pct: Math.round((stats.swimmingBookings / totalBks) * 100), color: 'bg-blue-500' },
    { name: 'Party Hall', count: stats.eventBookings, pct: Math.round((stats.eventBookings / totalBks) * 100), color: 'bg-purple-500' },
  ];

  // Enquiry Funnel counts
  const enquiryFunnel = [
    { label: 'New', count: enquiries.filter(e => e.status === 'new').length, color: 'bg-amber-500' },
    { label: 'Contacted', count: enquiries.filter(e => e.status === 'contacted').length, color: 'bg-blue-500' },
    { label: 'Follow-up', count: enquiries.filter(e => e.status === 'follow_up').length, color: 'bg-cyan-500' },
    { label: 'Confirmed', count: enquiries.filter(e => e.status === 'confirmed').length, color: 'bg-emerald-500' },
    { label: 'Closed', count: enquiries.filter(e => e.status === 'closed').length, color: 'bg-slate-500' },
  ];

  // Membership status counts
  const activeMems = gymMemberships.filter(m => m.status === 'active').length;
  const expiringMems = gymMemberships.filter(m => m.status === 'expiring_soon').length;
  const expiredMems = gymMemberships.filter(m => m.status === 'expired').length;

  return (
    <div className="space-y-8">
      
      {/* Top Header & Fast Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Club Executive Overview
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Real-time business performance for Sivan Sports Club • Cumbum Campus
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewBookingModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>+ New Booking</span>
          </button>
          <button
            onClick={onOpenNewEnquiryModal}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>+ Log Enquiry</span>
          </button>
        </div>
      </div>

      {/* 10 Summary Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Key Operational Metrics
          </h2>
          <span className="text-[11px] text-emerald-400 font-medium">Click card to view details</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => onNavigateTab(card.tab)}
                className={`p-4 rounded-2xl bg-slate-900/80 border text-left flex flex-col justify-between hover:border-emerald-500/50 hover:scale-[1.02] active:scale-[0.99] transition-all group ${card.bg}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                    {card.title}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-950/60 ${card.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight">
                    {card.value}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                    <span>{card.note}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Booking Overview Activity */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Booking Activity & Sport Volume
              </h3>
              <p className="text-xs text-slate-400">
                Visual slot utilization across badminton, gym, arena and swimming
              </p>
            </div>

            {/* Time Filter */}
            <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
              {(['today', '7d', '30d', 'all'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setBookingTimeFilter(filter)}
                  className={`px-3 py-1 rounded-lg font-semibold capitalize transition-colors ${
                    bookingTimeFilter === filter
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Real Dynamic Chart Simulation */}
          <div className="space-y-4 pt-2">
            {facilityBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">{item.name}</span>
                  <span className="font-mono text-emerald-400 font-semibold">{item.count} bookings ({item.pct}%)</span>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${Math.max(item.pct, 6)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Total Logged Bookings: <strong className="text-white">{bookings.length}</strong></span>
            <span>Confirmed: <strong className="text-emerald-400">{bookings.filter(b => b.bookingStatus === 'confirmed').length}</strong></span>
            <span>Completed: <strong className="text-cyan-400">{bookings.filter(b => b.bookingStatus === 'completed').length}</strong></span>
          </div>
        </div>

        {/* Chart 2: Enquiry CRM Funnel */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-heading font-bold text-lg text-white">
                Enquiry CRM Pipeline
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                {enquiries.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Conversion flow of website visitor inquiries
            </p>

            <div className="space-y-3">
              {enquiryFunnel.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${step.color}`} />
                    <span className="text-xs font-semibold text-slate-300">{step.label}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                    {step.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('enquiries')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            Manage Enquiries in Pipeline →
          </button>
        </div>

      </div>

      {/* Row 2: Gym Membership Status & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Membership Status */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">
            Gym Membership Health
          </h3>
          <p className="text-xs text-slate-400">
            Active and expiring subscription records
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <div className="font-heading font-black text-xl text-emerald-400">{activeMems}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Active</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <div className="font-heading font-black text-xl text-amber-400">{expiringMems}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Expiring</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
              <div className="font-heading font-black text-xl text-rose-400">{expiredMems}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Expired</div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('memberships')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              View All Subscriptions & Renewals →
            </button>
          </div>
        </div>

        {/* Recent Bookings Feed */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white">
              Recent Bookings Feed
            </h3>
            <button
              onClick={() => onNavigateTab('bookings')}
              className="text-xs font-semibold text-emerald-400 hover:underline"
            >
              View Full Schedule →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Facility</th>
                  <th className="py-2.5 px-3">Slot Date & Time</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {bookings.slice(0, 5).map(bk => (
                  <tr key={bk.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-white">{bk.customerName}</div>
                      <div className="text-[10px] text-slate-400">{bk.mobile}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {bk.facilityName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-mono">
                      {bk.date} ({bk.startTime} - {bk.endTime})
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                      Rs. {bk.amount}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        bk.bookingStatus === 'confirmed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : bk.bookingStatus === 'completed'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {bk.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
