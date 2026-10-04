import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Phone, 
  MessageCircle, 
  Check, 
  Trash2, 
  Calendar, 
  User, 
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import type { Enquiry, EnquiryStatus } from '../../../types/database';

export const EnquiriesView: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useDatabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [staffNote, setStaffNote] = useState('');

  const statuses: EnquiryStatus[] = ['new', 'contacted', 'follow_up', 'confirmed', 'closed', 'cancelled'];

  const filteredEnquiries = enquiries.filter(enq => {
    const matchesSearch = 
      enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.mobile.includes(searchTerm) ||
      enq.interestedFacility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || enq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getWhatsAppLink = (enq: Enquiry) => {
    const cleanPhone = enq.mobile.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Vanakkam ${enq.name}! Greeting from Sivan Sports Club, Cumbum (Near Thambis Theatre).\n\nWe received your enquiry regarding ${enq.interestedFacility}.\nHow can we help schedule your court slot / membership?`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  const handleSaveNote = () => {
    if (!selectedEnquiry || !staffNote.trim()) return;
    updateEnquiryStatus(selectedEnquiry.id, selectedEnquiry.status, staffNote);
    setSelectedEnquiry(null);
    setStaffNote('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Website Enquiries & Leads CRM
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Incoming public inquiries directly received from the website contact modal
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
            {enquiries.filter(e => e.status === 'new').length} New Enquiries Pending
          </span>
        </div>
      </div>

      {/* Search & Status Pipeline Filters */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by prospect name, mobile, facility, message..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              statusFilter === 'ALL' 
                ? 'bg-emerald-500 text-slate-950 font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({enquiries.length})
          </button>
          {statuses.map(st => {
            const count = enquiries.filter(e => e.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                  statusFilter === st 
                    ? 'bg-emerald-500 text-slate-950 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st.replace('_', ' ')} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Enquiries Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEnquiries.map(enq => (
          <div
            key={enq.id}
            className={`p-6 rounded-3xl bg-slate-900/70 border flex flex-col justify-between transition-all ${
              enq.status === 'new' 
                ? 'border-amber-500/50 shadow-lg shadow-amber-950/20' 
                : 'border-slate-800'
            }`}
          >
            <div>
              {/* Top Row: Facility & Status */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold font-heading">
                  {enq.interestedFacility}
                </span>

                <div className="flex items-center gap-2">
                  <select
                    value={enq.status}
                    onChange={e => updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-200 capitalize focus:outline-none focus:border-emerald-500"
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>{s.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Prospect Details */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-black text-lg text-white">
                    {enq.name}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {enq.createdDate}
                  </span>
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-3">
                  <span className="font-mono text-emerald-400 font-semibold">{enq.mobile}</span>
                  {enq.email && <span className="text-slate-500 truncate">{enq.email}</span>}
                </div>
              </div>

              {/* Message */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 italic mb-4">
                "{enq.message}"
              </div>

              {/* Staff Notes if any */}
              {enq.notes && (
                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 text-[11px] text-amber-300 mb-4">
                  <strong>Internal Note:</strong> {enq.notes}
                </div>
              )}
            </div>

            {/* Quick Action Buttons: Call & WhatsApp */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${enq.mobile}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Call</span>
                </a>

                <a
                  href={getWhatsAppLink(enq)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setSelectedEnquiry(enq);
                    setStaffNote(enq.notes || '');
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white text-xs border border-slate-800"
                >
                  Note
                </button>
              </div>

              <button
                onClick={() => {
                  if (confirm(`Delete enquiry from ${enq.name}?`)) {
                    deleteEnquiry(enq.id);
                  }
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Note Editor Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl">
            <h3 className="font-heading font-black text-lg text-white mb-2">
              Staff Note for {selectedEnquiry.name}
            </h3>
            <textarea
              rows={3}
              value={staffNote}
              onChange={e => setStaffNote(e.target.value)}
              placeholder="e.g. Discussed morning slot; visiting tomorrow at 10am."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 text-xs font-bold text-slate-950"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
