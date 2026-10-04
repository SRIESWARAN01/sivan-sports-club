import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  IndianRupee, 
  Users, 
  Trophy, 
  Activity, 
  Sparkles,
  Layers
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';

export const ReportsView: React.FC = () => {
  const { bookings, payments, customers, gymMemberships, events, enquiries, stats } = useDatabase();
  const [selectedReport, setSelectedReport] = useState<string>('bookings');

  const reportDefinitions = [
    { id: 'bookings', title: '1. Booking Report', desc: 'Court slots, facilities, player records, and attendance', count: bookings.length },
    { id: 'revenue', title: '2. Revenue Report', desc: 'Financial collections broken down by facility and date', count: `Rs. ${stats.monthlyRevenue}` },
    { id: 'customers', title: '3. Customer Report', desc: 'Active players, contact details, address, and spending', count: customers.length },
    { id: 'memberships', title: '4. Membership Report', desc: 'Gym subscriptions, renewal schedules, and expiry tracking', count: gymMemberships.length },
    { id: 'facility_usage', title: '5. Facility Usage Report', desc: 'Utilization statistics across Badminton, Gym, Arena, Pool, Hall', count: '5 Facilities' },
    { id: 'events', title: '6. Event Report', desc: 'Party hall bookings, guest estimates, quotations & balances', count: events.length },
    { id: 'enquiries', title: '7. Enquiry Report', desc: 'Inbound customer leads, conversion stages, and status', count: enquiries.length },
    { id: 'payments', title: '8. Payment Report', desc: 'Transaction references, UPI & Cash receipts ledger', count: payments.length },
    { id: 'daily_collection', title: '9. Daily Collection', desc: 'Today revenue audit breakdown', count: `Rs. ${stats.todayRevenue}` },
    { id: 'monthly_business', title: '10. Monthly Business Report', desc: 'Comprehensive executive summary of the entire sports club', count: 'Executive' },
  ];

  const handleDownloadReport = (reportId: string) => {
    let filename = `Sivan_Sports_Club_${reportId}_${new Date().toISOString().split('T')[0]}.csv`;
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (reportId === 'bookings') {
      csvContent += 'Booking ID,Customer,Mobile,Facility,Date,Time,Amount,Payment,Status\n';
      bookings.forEach(b => {
        csvContent += `${b.id},"${b.customerName}",${b.mobile},"${b.facilityName}",${b.date},"${b.startTime}-${b.endTime}",${b.amount},${b.paymentStatus},${b.bookingStatus}\n`;
      });
    } else if (reportId === 'revenue' || reportId === 'payments' || reportId === 'daily_collection') {
      csvContent += 'Payment ID,Customer,Facility,Amount,Method,Transaction ID,Date,Status\n';
      payments.forEach(p => {
        csvContent += `${p.id},"${p.customerName}","${p.facilityName}",${p.amount},${p.paymentMethod},${p.transactionId},${p.paymentDate},${p.status}\n`;
      });
    } else if (reportId === 'customers') {
      csvContent += 'Customer ID,Name,Mobile,Email,Address,Membership,Total Spent,Status\n';
      customers.forEach(c => {
        csvContent += `${c.id},"${c.name}",${c.mobile},${c.email},"${c.address}","${c.membershipPlan || 'None'}",${c.totalSpent},${c.status}\n`;
      });
    } else if (reportId === 'memberships') {
      csvContent += 'Member ID,Name,Mobile,Plan,Start Date,End Date,Fee,Status\n';
      gymMemberships.forEach(m => {
        csvContent += `${m.id},"${m.customerName}",${m.customerMobile},"${m.planName}",${m.startDate},${m.endDate},${m.amount},${m.status}\n`;
      });
    } else if (reportId === 'events') {
      csvContent += 'Event ID,Host,Mobile,Type,Date,Guests,Quotation,Advance,Balance,Status\n';
      events.forEach(e => {
        csvContent += `${e.id},"${e.customerName}",${e.customerMobile},"${e.eventType}",${e.eventDate},${e.guestCount},${e.quotationAmount},${e.advanceAmount},${e.balanceAmount},${e.status}\n`;
      });
    } else {
      csvContent += 'Report,Date,Metric,Value\n';
      csvContent += `"${reportId}",${new Date().toISOString().split('T')[0]},Total Records,${bookings.length + customers.length}\n`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
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
            Business Intelligence & Reports
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Download and export official CSV & Excel records for accounts and audit review
          </p>
        </div>

        <button
          onClick={() => handleDownloadReport(selectedReport)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Download Selected Report (CSV)</span>
        </button>
      </div>

      {/* 10 Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportDefinitions.map((rep) => (
          <div
            key={rep.id}
            onClick={() => setSelectedReport(rep.id)}
            className={`p-6 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between ${
              selectedReport === rep.id
                ? 'bg-slate-900 border-emerald-500 shadow-xl shadow-emerald-950/20'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-heading font-black text-lg text-white">
                  {rep.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-emerald-400 font-mono font-bold text-xs border border-slate-800">
                  {rep.count}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {rep.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500">
                {selectedReport === rep.id ? '● Active Selection' : 'Click to select'}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadReport(rep.id);
                }}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
