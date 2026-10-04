import React from 'react';
import { Trophy, CheckCircle2, Calendar, ShieldCheck, Flame } from 'lucide-react';

interface SpotlightProps {
  onOpenEnquiry: (fac: string) => void;
}

export const BadmintonSpotlight: React.FC<SpotlightProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="badminton" className="py-24 bg-slate-900/40 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Cinematic Action Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
                alt="Sivan Sports Club Badminton Court Cumbum"
                className="w-full h-[450px] sm:h-[520px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-400">Indoor Court Environment</div>
                  <div className="text-white font-bold text-sm">Non-Marking Shoe Facility</div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                  High Ceiling
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="absolute -top-4 -left-4 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 shadow-lg">
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>Court Priority Booking</span>
            </div>
          </div>

          {/* Right Column: Copy & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
              Spotlight Feature
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Game On.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Step onto the court, challenge yourself and enjoy the game in a dedicated indoor badminton environment in Cumbum. Engineered for seamless footwork, excellent shuttle visibility, and zero weather interruptions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Indoor playing environment',
                'Suitable for casual play',
                'Practice & squad training',
                'Individual and group activities',
                'Shadowless LED court illumination',
                'Clean locker & changing facilities'
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenEnquiry('Indoor Badminton Court')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Enquire About Badminton</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
