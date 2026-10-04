import React from 'react';
import { Sparkles, Cake, Users, Briefcase, PartyPopper, Calendar } from 'lucide-react';

interface EventsProps {
  onOpenEnquiry: (fac: string) => void;
}

export const EventsSpotlight: React.FC<EventsProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="events" className="py-24 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
              <img
                src="/images/swimming_championship_banner.jpg"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80';
                }}
                alt="Theni Revenue District Swimming Competition at Sivan Sports Club Cumbum"
                className="w-full h-[450px] sm:h-[520px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-amber-400">Theni District Tournament Host</div>
                  <div className="text-white font-bold text-sm">Competitions, Banquets & Family Celebrations</div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold font-mono">
                  District Level
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Event Types */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-wider uppercase">
              Banquets & Gatherings
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Your Celebration. Your Space.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Bring people together for birthdays, family celebrations, private functions and special events in a comfortable event space in Cumbum. Featuring centralized air-conditioning, high quality acoustics, dedicated dining zones, and convenient parking near Thambis Theatre.
            </p>

            {/* 4 Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
                  <Cake className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">Birthday Celebrations</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Exciting balloon and theme setups with dedicated cake cutting stage and kid-friendly space.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">Family Events</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Intimate anniversary dinners, retirement celebrations, and get-togethers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">Corporate Gatherings</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Projector, sound system, and seating for company reviews, AGM meets, and team lunches.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                  <PartyPopper className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">Private Functions</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Versatile hall layout adaptable to customized floral decor and catering formats.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenEnquiry('Party Hall & Event Space')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-purple-500 hover:bg-purple-400 text-slate-950 transition-all shadow-lg shadow-purple-500/20 hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan Your Event</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
