import React from 'react';
import { Dumbbell, HeartPulse, Shield, Calendar, ArrowRight } from 'lucide-react';

interface GymProps {
  onOpenEnquiry: (fac: string) => void;
}

export const GymSpotlight: React.FC<GymProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="gym" className="py-24 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                alt="Gym & Fitness Center at Sivan Sports Club Cumbum"
                className="w-full h-[450px] sm:h-[520px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Fitness Center</span>
                  <span className="text-xs font-mono text-slate-300">Daily 5:30 AM - 9:30 PM</span>
                </div>
                <div className="text-white font-heading font-bold text-lg">
                  Dedicated Strength & Functional Cross-Training
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Feature Categories */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
              Strength & Wellness
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Train Strong. Feel Strong.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Achieve your wellness goals in a spacious, air-conditioned workout space equipped with professional biomechanical resistance gear, free weight sections, and cardio zones for everyone from beginners to seasoned fitness enthusiasts.
            </p>

            {/* 4 Feature categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">Strength Training</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Full rack of dumbbells, olympic barbells, squat stations, and plate-loaded gear.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">Cardio Zone</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Commercial incline treadmills, elliptical cross trainers, and spin cycles.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-2">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">Functional Fitness</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Kettlebells, battle ropes, plyometric boxes, and agility conditioning area.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">General Wellness</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Clean locker rooms, warm-up stretching bays, and supportive guidance.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => onOpenEnquiry('Gym & Fitness Center')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Explore Fitness Plans</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
