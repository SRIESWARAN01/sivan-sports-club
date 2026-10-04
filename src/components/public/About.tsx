import React, { useState } from 'react';
import { 
  Trophy, 
  Target, 
  Compass, 
  Award, 
  Users, 
  CheckCircle2, 
  Calendar, 
  MapPin,
  Sparkles
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { BrandLogo } from '../common/BrandLogo';

export const About: React.FC = () => {
  const { websiteContent } = useDatabase();
  const [imgFailed, setImgFailed] = useState(false);

  const achievements = [
    { number: 'Est. 2018', label: '8+ Years Serving Cumbum', desc: 'Pioneered modern sports training in Theni District.' },
    { number: '5-in-1', label: 'Multi-Sport Campus', desc: 'Badminton, swimming, gym, arena, and event banquet under one roof.' },
    { number: 'District', label: 'Tournament Host', desc: 'Official venue for Theni Revenue District Swimming Competitions.' },
    { number: '100%', label: 'Dedicated Facilities', desc: 'BWF standard synthetic badminton mats & ozone-clean pool.' }
  ];

  return (
    <section id="about" className="py-24 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Heritage & Mission
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            About Sivan Sportz Club
          </h2>
          <div className="text-base sm:text-lg font-bold text-amber-400 font-sans">
            சிவன் ஸ்போர்ட்ஸ் கிளப் • Cumbum
          </div>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            A premier destination where athletic training, physical wellness, and community celebrations unite in Cumbum, Theni District.
          </p>
        </div>

        {/* 2-Column Responsive Layout (Two columns on desktop, single column on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Official Outdoor Campus Signboard & Establishment Card */}
          <div className="lg:col-span-6 space-y-8">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl group bg-slate-950">
              
              <div className="relative h-[440px] sm:h-[500px] w-full overflow-hidden bg-slate-900">
                {!imgFailed ? (
                  <img
                    src="/images/sivan_sports_signboard.jpg"
                    alt="Sivan Sportz Club Official Outdoor Signboard Cumbum"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  /* Vector fallback showing the exact signboard artwork */
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-900 via-[#071638] to-slate-950 text-center">
                    <BrandLogo className="w-56 h-56 sm:w-68 sm:h-68 drop-shadow-[0_15px_35px_rgba(234,179,8,0.3)] mb-4" />
                    <div className="font-heading font-black text-2xl text-white">SIVAN SPORTZ CLUB</div>
                    <div className="text-amber-400 font-bold text-sm">சிவன் ஸ்போர்ட்ஸ் கிளப்</div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-black/25 pointer-events-none" />

                {/* Establishment Year Overlay Badge */}
                <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-400 font-bold shadow-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono">ESTD. {websiteContent.establishedYear || '2018'}</span>
                </div>

                {/* Campus Signboard Badge */}
                <div className="absolute top-5 right-5 px-3 py-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-bold text-xs shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official Signboard</span>
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-heading font-black text-white text-lg sm:text-xl tracking-wide">
                      SIVAN SPORTZ CLUB
                    </span>
                    <span className="text-xs font-bold text-amber-400 font-sans">
                      சிவன் ஸ்போர்ட்ஸ் கிளப்
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Kalaivanar Street, Near Thambis Theatre, Cumbum - 625516</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="font-heading font-black text-2xl text-emerald-400 font-mono">
                    {item.number}
                  </div>
                  <div className="text-xs font-bold text-white mt-1">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: History Narrative, Vision & Mission */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Club History & Narrative */}
            <div className="space-y-4">
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Our Story & History
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {websiteContent.aboutContent}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                From introducing BWF-standard synthetic court mats to establishing the Silver Wave swimming center and Iron Empire gym, Sivan Sports Club continues to bridge the gap between rural sports talent and professional athletic infrastructure in Tamil Nadu.
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="space-y-4 pt-2">
              
              {/* Vision */}
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/30 transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-white mb-1">
                    Our Vision
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {websiteContent.vision}
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/30 transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-white mb-1">
                    Our Mission
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {websiteContent.mission}
                  </p>
                </div>
              </div>

            </div>

            {/* Core Values checklist */}
            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Guiding Principles
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certified & Caring Coaches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Uncompromised Hygiene & Safety</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inclusive Family-Friendly Campus</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent Non-Fabricated Pricing</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
