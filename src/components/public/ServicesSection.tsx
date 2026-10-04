import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Eye, 
  Sparkles,
  Trophy,
  Waves,
  Dumbbell,
  Cake,
  Activity
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { ServiceDetailModal } from './ServiceDetailModal';
import type { Facility } from '../../types/database';

interface ServicesSectionProps {
  onOpenEnquiry: (facilityName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenEnquiry }) => {
  const { facilities } = useDatabase();
  const [modalFacility, setModalFacility] = useState<Facility | null>(null);

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'badminton': return Trophy;
      case 'pool': return Waves;
      case 'gym': return Dumbbell;
      case 'event': return Cake;
      case 'arena': return Activity;
      default: return Sparkles;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Our Services & Facilities
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            World-Class Sports & Event Spaces
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Explore our specialized sports academies, conditioning gym, aquatic center, and grand banquet hall in Cumbum.
          </p>
        </div>

        {/* 5 Branded Facility Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac, idx) => {
            const Icon = getServiceIcon(fac.category);
            return (
              <div
                key={fac.id}
                className={`rounded-3xl bg-slate-900/60 border border-slate-800/80 overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Facility Image with overlay */}
                <div className="relative h-64 overflow-hidden bg-slate-950">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-bold text-emerald-400 flex items-center gap-1.5 shadow">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{fac.badge || fac.subBrand}</span>
                    </span>

                    <span className="px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-emerald-400 font-mono font-bold text-xs border border-slate-800">
                      Rs. {fac.hourlyRate}/hr
                    </span>
                  </div>

                  {/* Hours banner */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{fac.availability}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {fac.bookingDurationMin} Min Slots
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
                      {fac.subBrand}
                    </div>
                    <h3 className="font-heading font-black text-2xl text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {fac.name}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">
                      {fac.description}
                    </p>

                    {/* Features preview */}
                    <div className="space-y-2 mb-6">
                      {fac.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dual Action Buttons: View More + Enquire Now */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setModalFacility(fac)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>View More</span>
                    </button>

                    <button
                      onClick={() => onOpenEnquiry(fac.name)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.02] flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Enquire Now</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Facility Detail Modal */}
      <ServiceDetailModal
        facility={modalFacility}
        onClose={() => setModalFacility(null)}
        onEnquire={(facName) => onOpenEnquiry(facName)}
      />
    </section>
  );
};
