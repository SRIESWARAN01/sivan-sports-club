import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  Trophy, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import type { Facility } from '../../types/database';

interface ServiceDetailModalProps {
  facility: Facility | null;
  onClose: () => void;
  onEnquire: (facilityName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ 
  facility, 
  onClose, 
  onEnquire 
}) => {
  if (!facility) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="relative max-w-2xl w-full bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Image Banner */}
        <div className="relative h-60 sm:h-72 w-full shrink-0">
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Facility Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg">
              {facility.badge}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                {facility.subBrand}
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                {facility.name}
              </h3>
            </div>
            <div className="text-right bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-700/80">
              <span className="text-[10px] text-slate-400 block">Pricing</span>
              <span className="text-emerald-400 font-mono font-bold text-sm">
                Rs. {facility.hourlyRate}/hr
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Description */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
              Facility Overview
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {facility.description}
            </p>
          </div>

          {/* Schedule & Rules Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                <Clock className="w-4 h-4" />
                <span>Operating Timings</span>
              </div>
              <div className="text-sm font-bold text-white font-mono">{facility.availability}</div>
              <div className="text-[11px] text-slate-400 mt-1">{facility.pricingNote}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Facility Guidelines</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1">
                {facility.rules?.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                    <span className="text-cyan-400">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features Checklist */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
              Court & Equipment Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {facility.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coaching Programs if available */}
          {facility.coachingPrograms && facility.coachingPrograms.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4" />
                <span>Available Training & Coaching Batches</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {facility.coachingPrograms.map((prog, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                    <span>{prog}</span>
                    <Trophy className="w-3.5 h-3.5 text-emerald-400 opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onEnquire(facility.name);
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Enquire / Book Slot Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
