import React from 'react';
import { Trophy, Activity, Heart, Sparkles, Users } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const pillars = [
    {
      icon: Trophy,
      label: 'SPORT',
      desc: 'Stay active and enjoy your favourite games on regulation-standard indoor courts.',
      color: 'from-emerald-500/20 to-emerald-500/5',
      iconColor: 'text-emerald-400'
    },
    {
      icon: Activity,
      label: 'FITNESS',
      desc: 'Make movement part of your everyday routine with quality gym and conditioning gear.',
      color: 'from-cyan-500/20 to-cyan-500/5',
      iconColor: 'text-cyan-400'
    },
    {
      icon: Heart,
      label: 'FAMILY',
      desc: 'A destination for shared experiences, healthy recreation, and swimming together.',
      color: 'from-blue-500/20 to-blue-500/5',
      iconColor: 'text-blue-400'
    },
    {
      icon: Sparkles,
      label: 'CELEBRATIONS',
      desc: 'Create memorable moments together in our air-conditioned party hall and banquet venue.',
      color: 'from-purple-500/20 to-purple-500/5',
      iconColor: 'text-purple-400'
    },
    {
      icon: Users,
      label: 'COMMUNITY',
      desc: 'Bring people together through sportsmanship, tournaments, and positive community spirit.',
      color: 'from-amber-500/20 to-amber-500/5',
      iconColor: 'text-amber-400'
    }
  ];

  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            Why Sivan Sports Club
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Built for Active Lives.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A premium sports destination designed to bring health, discipline, joy, and togetherness to Cumbum.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center ${item.iconColor} mb-6 border border-white/5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-black text-lg text-white mb-2">
                    {item.label}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
