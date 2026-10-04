import React from 'react';
import { Trophy, MapPin, MessageCircle, ArrowUp } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

import { BrandLogo } from '../common/BrandLogo';

interface FooterProps {
  onOpenAdmin: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onReplayIntro }) => {
  const { websiteContent } = useDatabase();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <button 
              onClick={() => {
                if (onReplayIntro) onReplayIntro();
                else scrollToTop();
              }}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
              title="Click to replay official animated logo intro"
            >
              <BrandLogo className="w-12 h-12 shrink-0 drop-shadow-[0_0_12px_rgba(234,179,8,0.25)] group-hover:scale-105 transition-transform" />
              <div>
                <span className="font-heading font-black text-xl text-white tracking-wider">
                  SIVAN SPORTZ CLUB
                </span>
                <div className="text-[11px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5 font-sans">
                  <span>சிவன் ஸ்போர்ட்ஸ் கிளப்</span>
                  <span>•</span>
                  <span>Cumbum</span>
                </div>
              </div>
            </button>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              "Play. Train. Celebrate. Live Better."
              <br />
              Cumbum's premier multi-sport hub featuring Rayan Badminton Academy, Silver Wave Pool, Iron Empire Gym, Sports Arena, and Party Venues.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href={websiteContent.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={websiteContent.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${websiteContent.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#facilities" className="hover:text-emerald-400 transition-colors">Club Facilities</a></li>
              <li><a href="#badminton" className="hover:text-emerald-400 transition-colors">Badminton Court</a></li>
              <li><a href="#gym" className="hover:text-emerald-400 transition-colors">Gym & Fitness</a></li>
              <li><a href="#pool" className="hover:text-emerald-400 transition-colors">Swimming Pool</a></li>
              <li><a href="#events" className="hover:text-emerald-400 transition-colors">Party Hall & Banquets</a></li>
              <li><a href="#gallery" className="hover:text-emerald-400 transition-colors">Photo Gallery</a></li>
              {onReplayIntro && (
                <li>
                  <button 
                    onClick={onReplayIntro}
                    className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
                  >
                    <span>✨ Replay Intro Animation</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Address & Admin Portal */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Club Location
            </h4>
            <div className="text-sm space-y-2 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>
                  {websiteContent.address}, Near Thambis Theatre,
                  <br />
                  {websiteContent.city}, {websiteContent.district}, {websiteContent.state} – {websiteContent.pincode}.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs transition-colors"
              >
                <span>Staff & Management Portal</span>
                <span className="text-[10px] text-emerald-400 font-mono">/admin</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Sivan Sportz Club (சிவன் ஸ்போர்ட்ஸ் கிளப்). All Rights Reserved. Cumbum, Theni District.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
