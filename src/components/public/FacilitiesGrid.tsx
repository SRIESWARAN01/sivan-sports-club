import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Calendar 
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import type { Facility } from '../../types/database';
import { BrandLogo } from '../common/BrandLogo';
import { IronEmpireLogo } from '../common/IronEmpireLogo';
import { RayanSportsLogo } from '../common/RayanSportsLogo';
import { SilverWaveLogo } from '../common/SilverWaveLogo';

interface FacilitiesGridProps {
  onOpenEnquiry: (facilityName?: string) => void;
}

export const FacilitiesGrid: React.FC<FacilitiesGridProps> = ({ onOpenEnquiry }) => {
  const { facilities } = useDatabase();

  const renderFacilityLogo = (category: string) => {
    switch (category) {
      case 'badminton':
        return <RayanSportsLogo className="w-28 sm:w-32 h-auto" showTagline={false} />;
      case 'pool':
        return <SilverWaveLogo className="w-20 sm:w-24 h-auto" />;
      case 'gym':
        return <IronEmpireLogo className="w-9 h-9" />;
      default:
        return <BrandLogo className="w-9 h-9" />;
    }
  };

  const ctaLabels: Record<string, string> = {
    fac_badminton: 'Explore Badminton',
    fac_arena: 'Explore Arena',
    fac_gym: 'Explore Fitness',
    fac_pool: 'Explore Pool',
    fac_event: 'Plan Your Event'
  };

  const sectionLinks: Record<string, string> = {
    fac_badminton: '#badminton',
    fac_arena: '#arena',
    fac_gym: '#gym',
    fac_pool: '#pool',
    fac_event: '#events'
  };

  return (
    <section id="facilities" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            Club Facilities
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Everything You Need. Under One Roof.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Purpose-built spaces for badminton champions, fitness enthusiasts, swimming lovers and memorable family gatherings.
          </p>
        </div>

        {/* 5 Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac, idx) => (
            <div
              key={fac.id}
              className={`rounded-3xl bg-slate-900/60 border border-slate-800/80 overflow-hidden flex flex-col group hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Facility Image with overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={fac.image}
                  alt={`Sivan Sports Club ${fac.name}`}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    if (fac.category === 'badminton') e.currentTarget.src = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80';
                    else if (fac.category === 'pool') e.currentTarget.src = 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80';
                    else if (fac.category === 'gym') e.currentTarget.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80';
                    else if (fac.category === 'event') e.currentTarget.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
                
                {/* Number Pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-emerald-400 font-bold">
                  CARD 0{idx + 1}
                </div>

                {/* Brand Logo Floating Badge */}
                <div className="absolute top-3 right-3 p-1.5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-700/80 shadow-xl flex items-center justify-center">
                  {renderFacilityLogo(fac.category)}
                </div>

                {/* Operating hours */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    {fac.availability}
                  </span>
                  <span className="text-emerald-400 font-semibold font-mono">
                    Rs. {fac.hourlyRate}/hr
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{fac.subBrand}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">{fac.badge}</span>
                  </div>
                  <h3 className="font-heading font-black text-2xl text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {fac.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {fac.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2 mb-6">
                    {fac.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <a
                    href={sectionLinks[fac.id] || '#facilities'}
                    className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                  >
                    <span>{ctaLabels[fac.id] || 'Explore'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onOpenEnquiry(fac.name)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 transition-all flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Enquire Slot</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
