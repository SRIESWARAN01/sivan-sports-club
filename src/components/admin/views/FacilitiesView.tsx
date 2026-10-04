import React, { useState } from 'react';
import { 
  Building2, 
  Clock, 
  IndianRupee, 
  Edit3, 
  Power, 
  Check, 
  X, 
  Plus, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import type { Facility } from '../../../types/database';

export const FacilitiesView: React.FC = () => {
  const { facilities, updateFacility, toggleFacilityStatus } = useDatabase();
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFacility) return;
    updateFacility(editingFacility);
    setEditingFacility(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            Facility & Court Infrastructure
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Configure hourly rates, operating hours, capacity rules, and active availability
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 font-mono">
          5 Configured Campus Zones
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className={`rounded-3xl bg-slate-900/60 border overflow-hidden flex flex-col justify-between transition-all ${
              fac.status === 'active' 
                ? 'border-slate-800 hover:border-emerald-500/40' 
                : 'border-rose-900/50 opacity-70 bg-slate-950/80'
            }`}
          >
            {/* Visual Header */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={fac.image}
                alt={fac.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
              
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  fac.status === 'active'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-rose-500 text-white'
                }`}>
                  {fac.status}
                </span>

                <div className="px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-emerald-400 font-mono font-bold text-xs">
                  Rs. {fac.hourlyRate}/hr
                </div>
              </div>

              <div className="absolute bottom-3 left-4 text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{fac.availability}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-heading font-black text-xl text-white mb-1.5">
                  {fac.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {fac.description}
                </p>

                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Features</div>
                  {fac.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => setEditingFacility({ ...fac })}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Edit Facility</span>
                </button>

                <button
                  onClick={() => toggleFacilityStatus(fac.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    fac.status === 'active'
                      ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/20'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{fac.status === 'active' ? 'Deactivate' : 'Activate'}</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingFacility && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setEditingFacility(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading font-black text-xl text-white mb-1">
              Edit {editingFacility.name}
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Updates reflect immediately on the public website and booking calendar
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Facility Name</label>
                <input
                  type="text"
                  value={editingFacility.name}
                  onChange={e => setEditingFacility({ ...editingFacility, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingFacility.description}
                  onChange={e => setEditingFacility({ ...editingFacility, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hourly Rate (Rs.)</label>
                  <input
                    type="number"
                    value={editingFacility.hourlyRate}
                    onChange={e => setEditingFacility({ ...editingFacility, hourlyRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Slot Duration (Min)</label>
                  <input
                    type="number"
                    value={editingFacility.bookingDurationMin}
                    onChange={e => setEditingFacility({ ...editingFacility, bookingDurationMin: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={editingFacility.availability}
                  onChange={e => setEditingFacility({ ...editingFacility, availability: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingFacility.image}
                  onChange={e => setEditingFacility({ ...editingFacility, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingFacility(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
