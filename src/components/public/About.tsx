import React from 'react';
import { ShieldCheck, HeartHandshake, Zap, Target } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const About: React.FC = () => {
  const { websiteContent } = useDatabase();

  const audiencePoints = [
    {
      icon: Zap,
      title: 'Sports Enthusiasts',
      desc: 'Dedicated indoor badminton and multi-sport court spaces for competitive players and weekend squads.'
    },
    {
      icon: Target,
      title: 'Fitness Focused',
      desc: 'Modern gym machinery and open conditioning zones designed for everyday strength and wellness.'
    },
    {
      icon: HeartHandshake,
      title: 'Families & Youth',
      desc: 'Safe, hygienic swimming pools and kids splash areas where parents and children stay active together.'
    },
    {
      icon: ShieldCheck,
      title: 'Special Celebrations',
      desc: 'Spacious banquet hall infrastructure for birthdays, corporate meets, and memorable family occasions.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Media with badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
                alt="Sivan Sports Club Cumbum Facility"
                className="w-full h-[440px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/70">
                <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">
                  Community & Athletic Hub
                </div>
                <div className="text-white font-heading font-bold text-xl sm:text-2xl">
                  Kalaivanar Street, Cumbum
                </div>
                <div className="text-slate-300 text-xs sm:text-sm mt-1">
                  Near Thambis Theatre • Theni District, Tamil Nadu
                </div>
              </div>
            </div>

            {/* Accent badge floating */}
            <div className="hidden sm:flex absolute -top-5 -right-5 p-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold shadow-xl items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-950">5-in-1 Campus</div>
                <div className="text-sm font-black">All Under One Roof</div>
              </div>
            </div>
          </div>

          {/* Right Column: Description & Audience Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
              About Our Club
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {websiteContent.aboutTitle}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {websiteContent.aboutContent}
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {audiencePoints.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <div key={i} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-base mb-1">
                      {pt.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
