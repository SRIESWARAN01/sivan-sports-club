import React from 'react';
import { 
  Trophy, 
  GraduationCap, 
  Building2, 
  Award, 
  Heart, 
  Sparkles, 
  MapPin,
  CheckCircle2 
} from 'lucide-react';

export const WhyUs: React.FC = () => {
  const reasons = [
    {
      icon: Trophy,
      title: 'Multiple Sports Facilities',
      desc: 'All-inclusive campus featuring synthetic badminton courts, Olympic-style pool, full gym, and multi-sport arena.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: GraduationCap,
      title: 'Professional Coaching',
      desc: 'Structured youth grassroots and advanced master academies for badminton, swimming, and fitness conditioning.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      icon: Building2,
      title: 'Modern Infrastructure',
      desc: 'BWF-approved synthetic mats, shadowless glare-free lights, multi-stage ozone filtration, and commercial gym gear.',
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20'
    },
    {
      icon: Award,
      title: 'Training & Competitions',
      desc: 'Host venue for regional tournaments, friendly box cricket cups, and competitive athletic preparation.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      icon: Heart,
      title: 'Family-Friendly Environment',
      desc: 'Safe, welcoming, and clean recreational environment suitable for children, working adults, and senior citizens.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    },
    {
      icon: Sparkles,
      title: 'Events & Celebrations',
      desc: 'Centralized air-conditioned banquet venue for birthday celebrations, family functions, and corporate meets.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      icon: MapPin,
      title: 'Convenient Location',
      desc: 'Prime location on Kalaivanar Street near Thambis Theatre in Cumbum, with hassle-free vehicle parking.',
      color: 'text-emerald-300',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  return (
    <section className="py-24 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Competitive Advantages
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Why Choose Sivan Sports Club
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Purpose-built standards, dedicated coaches, and a welcoming community right in Cumbum.
          </p>
        </div>

        {/* 7 Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-slate-950/70 border hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                  idx === 6 ? 'sm:col-span-2 lg:col-span-3 xl:col-span-1' : ''
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${item.bg} ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-black text-lg text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Advantage 0{idx + 1}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
