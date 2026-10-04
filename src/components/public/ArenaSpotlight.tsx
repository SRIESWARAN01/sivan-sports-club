import React from 'react';
import { Shield, Sparkles, Calendar, Layers, Activity } from 'lucide-react';

interface ArenaProps {
  onOpenEnquiry: (fac: string) => void;
}

export const ArenaSpotlight: React.FC<ArenaProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="arena" className="py-24 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider uppercase">
              Multi-Sport Excellence
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              One Arena. Many Possibilities.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              An adaptable sports space designed for active play, squad training, and multi-sport recreation. Whether you want to assemble a weekend box cricket team, organize futsal drills, or practice athletic coordination, our arena provides the ideal surface.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                { title: 'Box Cricket', tag: 'Team Friendly' },
                { title: 'Indoor Futsal', tag: 'Fast-paced' },
                { title: 'Volleyball', tag: 'Regulation Height' },
                { title: 'Agility Training', tag: 'Youth & Squads' },
                { title: 'Polyurethane Court', tag: 'Joint Protection' },
                { title: 'Spectator Bay', tag: 'Comfort Seating' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-sm font-bold text-white mb-0.5">{item.title}</div>
                  <div className="text-[10px] text-cyan-400 font-medium">{item.tag}</div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenEnquiry('Multi-Sport Arena')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Enquire Arena Slots</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                alt="Multi-Sport Arena at Sivan Sports Club Cumbum"
                className="w-full h-[450px] sm:h-[500px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-cyan-400">Flexible Court Configuration</div>
                  <div className="text-white font-bold text-sm">Squad & Tournament Ready</div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
