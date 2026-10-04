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
                src="/images/rayan_badminton_board.jpg"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80';
                }}
                alt="Rayan Sports Academy Badminton Court at Sivan Sports Club Cumbum"
                className="w-full h-[450px] sm:h-[520px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-400">Rayan Sports Academy</div>
                  <div className="text-white font-bold text-sm">"Serve with Passion - Play with Pride"</div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                  BWF Mats
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="absolute -top-4 -left-4 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 shadow-lg">
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>Direct: 88 70 79 00 79</span>
            </div>
          </div>

          {/* Right Column: Copy & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
              Rayan Badminton Academy
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Serve with Passion. <br />Play with Pride.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Step onto international BWF-standard synthetic courts at Rayan Sports Academy inside Sivan Sports Club, Cumbum. Engineered for seamless footwork, excellent shuttle visibility, zero weather disruptions, and dedicated junior-to-advanced coaching squads.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'BWF standard synthetic court mats',
                'Suitable for recreational & match play',
                'Junior grassroots & tournament coaching',
                'Shadowless glare-free LED illumination',
                'Specialized morning & evening squad batches',
                'Clean locker & changing facilities'
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenEnquiry('Indoor Badminton Court')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Enquire Court Slots</span>
              </button>

              <a
                href="tel:+918870790079"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all"
              >
                <span>Call: 88 70 79 00 79</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
