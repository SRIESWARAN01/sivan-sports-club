import React from 'react';
import { Waves, Sparkles, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface PoolProps {
  onOpenEnquiry: (fac: string) => void;
}

export const PoolSpotlight: React.FC<PoolProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="pool" className="py-24 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase">
              Aquatics & Wellness
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Make a Splash.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Whether you are swimming for stamina, technique practice, or weekend relaxation with family, enjoy a refreshing aquatic experience at Sivan Sports Club in Cumbum. Maintained with continuous multi-stage filtration and professional safety protocols.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Crystal clean ozone-filtered water',
                'Dedicated shallow kids splash area',
                'Trained safety lifeguard on duty',
                'Pre-swim freshwater rinse showers',
                'Comfortable poolside lounger zone',
                'Individual & family weekend passes'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenEnquiry('Swimming Pool')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-blue-500 hover:bg-blue-400 text-slate-950 transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Enquire About Pool</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
              <img
                src="/images/silver_wave_pool_real.jpg"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80';
                }}
                alt="Silver Wave 5-Lane Swimming Pool at Sivan Sports Club Cumbum"
                className="w-full h-[450px] sm:h-[500px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              
              {/* Official Silver Wave Seal Floating Badge */}
              <div className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-amber-500/40 shadow-xl flex items-center gap-3">
                <BrandLogo className="w-12 h-12 shrink-0 drop-shadow-md" />
                <div className="pr-2">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Official Partner</div>
                  <div className="text-xs font-heading font-black text-white">Silverwave Club</div>
                </div>
              </div>

              {/* Tournament Recognition Banner */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-blue-400">Theni Revenue District Competition Host</div>
                  <div className="text-white font-bold text-sm">5-Lane Semi-Covered Aquatic Center</div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Waves className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
