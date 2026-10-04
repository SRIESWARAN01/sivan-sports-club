import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  IndianRupee, 
  Plus, 
  Check, 
  X, 
  Cake, 
  Briefcase, 
  Phone,
  FileText
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import type { ClubEvent, EventType, EventStatus, PaymentStatus } from '../../../types/database';

export const EventsView: React.FC = () => {
  const { events, addEvent, updateEventStatus, updateEventPayment } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Event Form State
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [eventType, setEventType] = useState<EventType>('Birthday');
  const [eventDate, setEventDate] = useState('2026-10-25');
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('22:00');
  const [guestCount, setGuestCount] = useState(80);
  const [quotationAmount, setQuotationAmount] = useState(18000);
  const [advanceAmount, setAdvanceAmount] = useState(5000);
  const [notes, setNotes] = useState('');

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerMobile) return;

    const bal = Math.max(0, quotationAmount - advanceAmount);
    addEvent({
      customerName,
      customerMobile,
      eventType,
      eventDate,
      startTime,
      endTime,
      guestCount: Number(guestCount),
      requirements: ['Centralized AC', 'Audio & mic system', 'Dining buffet setup'],
      quotationAmount: Number(quotationAmount),
      advanceAmount: Number(advanceAmount),
      balanceAmount: bal,
      paymentStatus: advanceAmount >= quotationAmount ? 'paid' : advanceAmount > 0 ? 'partially_paid' : 'pending',
      status: advanceAmount > 0 ? 'confirmed' : 'quotation',
      notes
    });

    setIsModalOpen(false);
    setCustomerName('');
    setCustomerMobile('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Party Hall & Event Management
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Manage birthdays, family functions, corporate gatherings, quotations, and advances
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Book Event / Banquet</span>
        </button>
      </div>

      {/* Events Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(evt => (
          <div
            key={evt.id}
            className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold font-heading flex items-center gap-1.5">
                  <Cake className="w-3.5 h-3.5" />
                  <span>{evt.eventType}</span>
                </span>

                <select
                  value={evt.status}
                  onChange={e => updateEventStatus(evt.id, e.target.value as EventStatus)}
                  className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-bold text-slate-300 uppercase focus:outline-none"
                >
                  <option value="enquiry">Enquiry</option>
                  <option value="quotation">Quotation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="mb-4">
                <h3 className="font-heading font-black text-xl text-white">
                  {evt.customerName}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3 h-3 text-purple-400" />
                  <span>{evt.customerMobile}</span>
                </div>
              </div>

              {/* Event Time and Date */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{evt.eventDate}</span>
                  </span>
                  <span className="font-mono text-slate-400">{evt.startTime} - {evt.endTime}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-900">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-purple-400" />
                    <span>{evt.guestCount} Guests</span>
                  </span>
                  <span className="text-slate-300 font-medium">Party Hall Main</span>
                </div>
              </div>

              {/* Financials: Quotation, Advance, Balance */}
              <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-3">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Quotation</div>
                  <div className="font-mono font-bold text-xs text-white mt-0.5">Rs. {evt.quotationAmount}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Advance</div>
                  <div className="font-mono font-bold text-xs text-emerald-400 mt-0.5">Rs. {evt.advanceAmount}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Balance</div>
                  <div className="font-mono font-bold text-xs text-amber-400 mt-0.5">Rs. {evt.balanceAmount}</div>
                </div>
              </div>

              {evt.notes && (
                <div className="text-[11px] text-slate-400 italic">
                  Note: {evt.notes}
                </div>
              )}
            </div>

            {/* Quick advance recorder */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                evt.paymentStatus === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                {evt.paymentStatus.replace('_', ' ')}
              </span>

              {evt.balanceAmount > 0 && (
                <button
                  onClick={() => {
                    const pay = prompt(`Enter advance payment received (Balance is Rs. ${evt.balanceAmount}):`, String(evt.balanceAmount));
                    if (pay && !isNaN(Number(pay))) {
                      const newAdv = evt.advanceAmount + Number(pay);
                      updateEventPayment(evt.id, newAdv, newAdv >= evt.quotationAmount ? 'paid' : 'partially_paid');
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 text-[11px] font-bold transition-colors"
                >
                  Record Advance
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading font-black text-xl text-white mb-1">
              Book Party Hall / Event
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Create an event booking and financial quotation
            </p>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Host Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. S. Mohan"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile</label>
                  <input
                    type="tel"
                    value={customerMobile}
                    onChange={e => setCustomerMobile(e.target.value)}
                    placeholder="e.g. 9842100000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Event Type</label>
                  <select
                    value={eventType}
                    onChange={e => setEventType(e.target.value as EventType)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="Birthday">Birthday</option>
                    <option value="Family Function">Family Function</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Private Event">Private Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Guest Count</label>
                  <input
                    type="number"
                    value={guestCount}
                    onChange={e => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Quotation (Rs.)</label>
                  <input
                    type="number"
                    value={quotationAmount}
                    onChange={e => setQuotationAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Advance Received (Rs.)</label>
                  <input
                    type="number"
                    value={advanceAmount}
                    onChange={e => setAdvanceAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Special Requirements / Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Balloon decor, buffet dining, projector"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold"
                >
                  Confirm Event Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
