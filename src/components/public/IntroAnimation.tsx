import React, { useEffect, useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface IntroAnimationProps {
  onComplete: () => void;
}

/**
 * Premium Cinematic Animated Logo Intro for SIVAN SPORTZ CLUB
 * 
 * Animation Sequence:
 * Stage 1 (0.0s - 0.5s): Dark open with ambient golden-azure sports lighting & subtle court lines.
 * Stage 2 (0.5s - 1.2s): Symbol reveal - Outer braided golden rope ring spins & scales up with cyan wave pulse.
 * Stage 3 (1.2s - 2.2s): Brand typography reveal - SIVAN SPORTZ CLUB, சிவன் ஸ்போர்ட்ஸ் கிளப், Cumbum • Theni District.
 * Stage 4 (2.2s - 2.8s): Short cinematic hold with status progress & smooth crossfade exit to Home hero.
 */
export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'enter' | 'reveal' | 'text' | 'exit'>('enter');

  useEffect(() => {
    // Stage 1 -> 2: Symbol reveal
    const t1 = setTimeout(() => {
      setStage('reveal');
    }, 450);

    // Stage 2 -> 3: Brand name and Tamil title reveal
    const t2 = setTimeout(() => {
      setStage('text');
    }, 1200);

    // Stage 3 -> 4: Exit fade transition
    const t3 = setTimeout(() => {
      setStage('exit');
    }, 2500);

    // Complete & unmount
    const t4 = setTimeout(() => {
      onComplete();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-4 select-none transition-opacity duration-700 ${
        stage === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Sivan Sportz Club Intro Animation"
    >
      {/* Background Ambient Lighting & Subtle Sports Court Geometry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Golden Central Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.12)_0%,rgba(2,132,199,0.08)_40%,transparent_70%)] blur-2xl" />
        
        {/* Abstract Dynamic Light Streaks */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
        
        {/* Subtle Diagonal Court Lines */}
        <div className="absolute -inset-10 opacity-10 bg-[linear-gradient(45deg,#0284c7_1px,transparent_1px),linear-gradient(-45deg,#eab308_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      {/* Main Center Stage */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
        
        {/* Animated Emblem Crest Container */}
        <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
          
          {/* Outer Energetic Golden Braided Spinning Halo */}
          <div 
            className={`absolute -inset-6 sm:-inset-8 rounded-full border-2 border-amber-500/30 border-t-amber-400 border-r-amber-300 border-b-transparent animate-[spin_8s_linear_infinite] transition-opacity duration-700 ${
              stage === 'enter' ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
            }`} 
          />

          {/* Secondary Azure Splash Wave Pulse */}
          <div 
            className={`absolute -inset-3 sm:-inset-4 rounded-full border border-cyan-400/40 animate-ping opacity-40 transition-opacity duration-500 ${
              stage === 'reveal' || stage === 'text' ? 'block' : 'hidden'
            }`} 
          />

          {/* Third Golden Concentric Accent Ring */}
          <div 
            className={`absolute -inset-1 sm:-inset-1.5 rounded-full border border-amber-400/50 transition-all duration-700 ${
              stage === 'enter' ? 'opacity-0 scale-90' : 'opacity-80 scale-100'
            }`} 
          />

          {/* Master SIVAN SPORTZ CLUB Emblem */}
          <div 
            className={`relative transform transition-all duration-700 ease-out ${
              stage === 'enter'
                ? 'opacity-0 scale-75 blur-sm'
                : 'opacity-100 scale-100 blur-0'
            }`}
          >
            <BrandLogo 
              className="w-40 h-40 sm:w-52 sm:h-52 drop-shadow-[0_0_40px_rgba(234,179,8,0.45)] hover:scale-105 transition-transform" 
            />

            {/* Shimmer Light Gleam across emblem */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div className="w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />
            </div>
          </div>
        </div>

        {/* Brand Typography Reveal */}
        <div className="space-y-2 overflow-hidden px-4">
          
          {/* Main Title: SIVAN SPORTZ CLUB */}
          <div 
            className={`font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-widest drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] transition-all duration-700 ${
              stage === 'text' || stage === 'exit'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
              SIVAN SPORTZ CLUB
            </span>
          </div>

          {/* Official Tamil Name */}
          <div 
            className={`text-base sm:text-xl font-bold text-amber-400 font-sans tracking-wide transition-all duration-700 delay-100 ${
              stage === 'text' || stage === 'exit'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            சிவன் ஸ்போர்ட்ஸ் கிளப்
          </div>

          {/* Location & Slogan Banner */}
          <div 
            className={`flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-cyan-400 uppercase font-mono pt-1 transition-all duration-700 delay-200 ${
              stage === 'text' || stage === 'exit'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <span>Cumbum</span>
            <span className="text-amber-400">•</span>
            <span>Theni District</span>
            <span className="text-amber-400">•</span>
            <span>Tamil Nadu</span>
          </div>

          {/* Tagline */}
          <p 
            className={`text-slate-400 text-xs sm:text-sm font-medium pt-2 italic transition-all duration-700 delay-300 ${
              stage === 'text' || stage === 'exit'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            "Play. Train. Celebrate. Live Better."
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-48 sm:w-64 h-1.5 bg-slate-900 rounded-full mt-8 overflow-hidden border border-slate-800 shadow-inner">
          <div className="h-full bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400 rounded-full animate-[introProgress_2.5s_ease-out_forwards]" />
        </div>

      </div>

      {/* Skip Button for Instant Navigation */}
      <button
        onClick={onComplete}
        className="absolute bottom-6 sm:bottom-8 right-6 text-xs font-semibold text-slate-400 hover:text-white px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg group z-20"
      >
        <span>Skip Intro</span>
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <style>{`
        @keyframes introProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};
