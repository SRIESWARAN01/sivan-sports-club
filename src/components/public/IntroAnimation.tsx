import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'enter' | 'pulse' | 'exit'>('enter');

  useEffect(() => {
    // Stage 1: Entrance animation
    const t1 = setTimeout(() => {
      setStage('pulse');
    }, 600);

    // Stage 2: Exit transition
    const t2 = setTimeout(() => {
      setStage('exit');
    }, 2200);

    // Stage 3: Complete & unmount
    const t3 = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-4 transition-opacity duration-700 ${
        stage === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient sports glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />

      {/* Center animated logo mark */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Animated Official Circular Emblem with rotating golden ring */}
        <div className="relative mb-6">
          {/* Outer energetic golden spinning ring */}
          <div className="absolute -inset-5 rounded-full border-2 border-amber-500/40 border-t-amber-300 border-r-transparent animate-spin duration-1000" />
          
          {/* Secondary pulsing cyan/blue wave ring */}
          <div className="absolute -inset-3 rounded-full border border-cyan-400/30 animate-ping opacity-30" />

          {/* Core Official Crest Logo */}
          <BrandLogo className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)] transform transition-transform duration-700 scale-100 hover:scale-105" />
        </div>

        {/* Club Name Typography with slide-up reveal */}
        <div className="space-y-2 overflow-hidden">
          <div className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
            SIVAN SPORTZ CLUB
          </div>

          <div className="text-sm sm:text-base font-bold text-amber-400 tracking-wide font-sans animate-in fade-in slide-in-from-bottom-3 duration-900">
            சிவன் ஸ்போர்ட்ஸ் கிளப்
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-emerald-400 uppercase font-mono animate-in fade-in slide-in-from-bottom-2 duration-1000">
            <span>Cumbum</span>
            <span>•</span>
            <span>Theni District</span>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto font-medium pt-2 italic animate-in fade-in duration-1000">
            "Play. Train. Celebrate. Live Better."
          </p>
        </div>

        {/* Loading status bar */}
        <div className="w-48 sm:w-64 h-1 bg-slate-900 rounded-full mt-8 overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-400 rounded-full animate-[progress_2s_ease-in-out_forwards]" />
        </div>

      </div>

      {/* Skip button for user convenience */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 text-xs font-semibold text-slate-500 hover:text-emerald-400 px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center gap-1 z-20"
      >
        <span>Skip Intro</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
