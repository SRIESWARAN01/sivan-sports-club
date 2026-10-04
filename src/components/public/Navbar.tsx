import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Menu, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onOpenEnquiry: (facility?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, onOpenAdmin }) => {
  const { websiteContent, notifications } = useDatabase();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Badminton', href: '#badminton' },
    { label: 'Gym & Fitness', href: '#gym' },
    { label: 'Swimming Pool', href: '#pool' },
    { label: 'Events & Hall', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#location' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3' 
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <BrandLogo className="w-12 h-12 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(234,179,8,0.35)] shrink-0" />
            <div>
              <div className="font-heading font-black text-lg sm:text-xl tracking-wider text-white flex items-center gap-1.5">
                <span>SIVAN SPORTZ</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold tracking-normal">
                  CUMBUM
                </span>
              </div>
              <div className="text-[10px] tracking-wider text-slate-400 font-medium uppercase flex items-center gap-1">
                <span className="text-amber-400 font-sans font-semibold">சிவன் ஸ்போர்ட்ஸ் கிளப்</span>
                <span>•</span>
                <span>Theni Dist</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Admin Portal Toggle */}
            <button
              onClick={onOpenAdmin}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all duration-200 hover:border-slate-600 shadow-sm"
              title="Open Admin Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Portal</span>
              {unreadCount > 0 && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </button>

            {/* Enquire Now CTA */}
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Enquire Now</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700 flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/98 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-emerald-500 text-slate-950 font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>Book / Enquire Now</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-slate-900 text-slate-300 border border-slate-800"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin Dashboard Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
