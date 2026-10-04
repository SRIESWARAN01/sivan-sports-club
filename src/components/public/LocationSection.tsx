import React from 'react';
import { MapPin, Navigation, Compass, Phone, Mail, Clock } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const LocationSection: React.FC = () => {
  const { websiteContent } = useDatabase();

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Kalaivanar Street, Near Thambis Theatre, Cumbum, Theni District, Tamil Nadu 625516'
  )}`;

  return (
    <section id="location" className="py-24 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            Location & Access
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Find Us in Cumbum.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Centrally located in Cumbum town with easy road accessibility, ample parking, and peaceful surroundings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Address Details Card */}
          <div className="lg:col-span-5 p-7 sm:p-9 rounded-3xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                Physical Campus & Contact
              </div>

              {/* Real Building Entrance Photo Thumbnail */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-36 w-full shadow-md">
                <img 
                  src="/images/sivan_sports_entrance.jpg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';
                  }}
                  alt="Sivan Sportz Club Entrance Gate" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-3">
                  <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Look for the "Sivan Sportz Club" signboard on arrival</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  Sivan Sportz Club
                </h3>
                <div className="text-xs font-bold text-amber-400 font-sans mt-0.5">
                  சிவன் ஸ்போர்ட்ஸ் கிளப்
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mt-2">
                  Kalaivanar Street, Near Thambis Theatre,
                  <br />
                  Cumbum, Theni District, Tamil Nadu – 625516, India.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="tel:+918870790079" className="hover:text-emerald-400 transition-colors font-mono font-bold">
                    +91 88707 90079
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="mailto:rayansportsacademy@gmail.com" className="hover:text-emerald-400 transition-colors">
                    rayansportsacademy@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Open All 7 Days: 05:30 AM – 10:30 PM</span>
                </div>
              </div>
            </div>

            {/* 3 Dedicated Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.01]"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+918870790079"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/918870790079?text=Hi%20Sivan%20Sports%20Club%2C%20I%20would%20like%20to%20enquire%20about%20facilities"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Map Visual Frame */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 min-h-[380px] relative flex flex-col justify-between p-6">
            {/* Embedded interactive Google Map preview for Cumbum */}
            <iframe
              title="Sivan Sports Club Cumbum Location"
              src="https://maps.google.com/maps?q=Cumbum%20Theni%20Tamil%20Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0 opacity-70 hover:opacity-90 transition-opacity"
              loading="lazy"
            />
            
            {/* Overlay badge */}
            <div className="relative z-10 self-start p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 max-w-xs shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Sivan Sports Club Campus</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Kalaivanar St, Near Thambis Theatre, Cumbum
              </div>
            </div>

            <div className="relative z-10 self-end">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 shadow-lg"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open in Map App</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
