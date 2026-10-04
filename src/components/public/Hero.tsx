import React from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Trophy, 
  Activity, 
  Waves, 
  Sparkles,
  Users
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const { websiteContent } = useDatabase();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={websiteContent.heroImageUrl}
          alt="Sivan Sports Club Cumbum - Modern Sports Facility"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
          loading="eager"
        />
        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-start justify-center">
        
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md mb-6 shadow-sm">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{websiteContent.heroLocationBadge}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Main Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white max-w-4xl leading-[1.08] mb-6">
          {websiteContent.heroHeadline.split(' ').map((word, idx) => (
            <span key={idx} className={idx === 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>

        {/* Supporting Tagline / Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          {websiteContent.heroSupportingText}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-4 mb-16 w-full sm:w-auto">
          <button
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all duration-200 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-5 h-5 text-slate-950" />
            <span>Enquire Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#facilities"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-slate-600 transition-all duration-200 backdrop-blur-md"
          >
            <span>Explore Facilities</span>
          </a>
        </div>

        {/* 4 Pillars Under One Roof */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full pt-8 border-t border-slate-800/80">
          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Rayan Academy</div>
              <div className="text-sm font-bold text-white">Badminton</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Iron Empire</div>
              <div className="text-sm font-bold text-white">Fitness Studio</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Waves className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Silver Wave</div>
              <div className="text-sm font-bold text-white">Swimming Pool</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Grand Events</div>
              <div className="text-sm font-bold text-white">Party & Arena</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
