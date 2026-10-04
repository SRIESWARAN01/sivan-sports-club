import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  priority?: boolean;
}

/**
 * Official SIVAN SPORTZ CLUB Emblem & Brand Logo
 * 
 * Accurately represents the official crest:
 * 1. Braided golden rope border
 * 2. Deep midnight navy blue field (#08173e)
 * 3. Arched header: "SIVAN SPORTZ CLUB"
 * 4. Golden stars flanking both sides
 * 5. Sacred golden Damaru / Udukkai at 6 o'clock
 * 6. Center dynamic swimmer with splash waves & "Silver Wave" script
 * 
 * Supports rendering /logo.png directly, with a pristine vector SVG fallback.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = "w-12 h-12", 
  size,
  showText = false 
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      {!imgError ? (
        <img
          src="/logo.png"
          alt="Sivan Sportz Club Official Logo"
          className="w-full h-full object-contain rounded-full drop-shadow-md"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Pixel-perfect Vector SVG matching the official logo badge */
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-full drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Golden Rope Gradient */}
            <linearGradient id="goldRopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#eab308" />
              <stop offset="50%" stopColor="#ca8a04" />
              <stop offset="75%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            {/* Deep Navy Gradient */}
            <radialGradient id="navyRingGrad" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#0b2259" />
              <stop offset="90%" stopColor="#051233" />
              <stop offset="100%" stopColor="#020819" />
            </radialGradient>

            {/* Center Aqua Radial Glow */}
            <radialGradient id="centerWhiteGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#f0f9ff" />
              <stop offset="90%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#38bdf8" />
            </radialGradient>

            {/* Cyan Wave Gradient */}
            <linearGradient id="cyanWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>

            {/* Gold Damaru Gradient */}
            <linearGradient id="damaruGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>

            {/* Arched text path for SIVAN SPORTZ CLUB */}
            <path
              id="textArcTop"
              d="M 58,200 A 142,142 0 0,1 342,200"
              fill="none"
            />
          </defs>

          {/* 1. Outer Golden Braided Rope Ring */}
          <circle cx="200" cy="200" r="195" fill="none" stroke="url(#goldRopeGrad)" strokeWidth="12" />
          <circle cx="200" cy="200" r="189" fill="none" stroke="#713f12" strokeWidth="2" strokeDasharray="6,4" />
          <circle cx="200" cy="200" r="183" fill="none" stroke="url(#goldRopeGrad)" strokeWidth="3" />

          {/* 2. Deep Navy Blue Field */}
          <circle cx="200" cy="200" r="180" fill="url(#navyRingGrad)" stroke="#fef08a" strokeWidth="2" />

          {/* 3. Golden Stars along outer ring */}
          {/* Left stars */}
          <path d="M 68 188 l 3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
          <path d="M 72 230 l 3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
          <path d="M 90 270 l 3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
          <path d="M 120 305 l 3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />

          {/* Right stars */}
          <path d="M 332 188 l 3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
          <path d="M 328 230 l 3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
          <path d="M 310 270 l 3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
          <path d="M 280 305 l 3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />

          {/* 4. Arched Text: SIVAN SPORTZ CLUB */}
          <text fill="#ffffff" fontSize="27" fontWeight="900" fontFamily="sans-serif" letterSpacing="5">
            <textPath href="#textArcTop" startOffset="50%" textAnchor="middle">
              SIVAN SPORTZ CLUB
            </textPath>
          </text>

          {/* 5. Center Medallion Inner Circle */}
          <circle cx="200" cy="200" r="124" fill="url(#centerWhiteGrad)" stroke="url(#goldRopeGrad)" strokeWidth="5" />

          {/* 6. Dynamic Swimmer Silhouette */}
          <g transform="translate(140, 100) scale(0.68)">
            {/* Swimmer Head */}
            <circle cx="56" cy="55" r="14" fill="#091a42" />
            <path d="M 64 50 a 6 6 0 0 1 5 6 l -10 1 z" fill="#bae6fd" />
            {/* Swimmer Body & Shoulders */}
            <path 
              d="M 62 65 C 80 50, 110 50, 130 68 C 110 75, 95 80, 80 82 C 65 84, 52 75, 62 65 Z" 
              fill="#091a42" 
            />
            {/* Raised Forward Arm */}
            <path 
              d="M 72 58 C 76 35, 90 20, 105 25 C 100 35, 95 48, 88 62 Z" 
              fill="#091a42" 
            />
            <path 
              d="M 105 25 C 112 28, 120 40, 122 50 C 116 52, 110 46, 104 38 Z" 
              fill="#091a42" 
            />
          </g>

          {/* Water Splashes */}
          <g fill="#0284c7" opacity="0.95">
            <circle cx="130" cy="155" r="4" />
            <circle cx="120" cy="142" r="3" />
            <circle cx="140" cy="138" r="5" />
            <circle cx="265" cy="148" r="4.5" />
            <circle cx="276" cy="136" r="3.5" />
            <path d="M 125 170 C 120 150, 145 152, 140 172 Z" />
            <path d="M 260 170 C 275 148, 255 145, 252 170 Z" />
          </g>

          {/* Wave Swells */}
          <path 
            d="M 100 200 C 130 180, 170 215, 200 195 C 230 175, 270 215, 300 200 L 300 240 C 270 250, 230 225, 200 235 C 170 245, 130 220, 100 230 Z" 
            fill="url(#cyanWaveGrad)" 
            opacity="0.9"
          />
          <path 
            d="M 108 215 C 135 195, 175 228, 200 210 C 225 192, 265 228, 292 215 L 292 245 C 265 255, 225 235, 200 245 C 175 255, 135 235, 108 245 Z" 
            fill="#0369a1" 
          />

          {/* Script Text: Silver Wave */}
          <g transform="translate(200, 235)">
            {/* 3D Drop Shadow */}
            <text 
              x="0" 
              y="0" 
              textAnchor="middle" 
              fontFamily="Brush Script MT, cursive, 'Caveat', sans-serif" 
              fontSize="48" 
              fontWeight="bold" 
              fill="#082f49" 
              stroke="#ffffff" 
              strokeWidth="6"
              strokeLinejoin="round"
            >
              Silver Wave
            </text>
            <text 
              x="0" 
              y="0" 
              textAnchor="middle" 
              fontFamily="Brush Script MT, cursive, 'Caveat', sans-serif" 
              fontSize="48" 
              fontWeight="bold" 
              fill="url(#cyanWaveGrad)"
            >
              Silver Wave
            </text>
          </g>

          {/* 7. Sacred Golden Damaru at 6 o'clock Bottom */}
          <g transform="translate(182, 335) scale(0.9)">
            {/* Damaru hourglass shape */}
            <path 
              d="M 5 5 L 35 5 L 24 20 L 35 35 L 5 35 L 16 20 Z" 
              fill="url(#damaruGold)" 
              stroke="#713f12" 
              strokeWidth="1.5" 
            />
            {/* Damaru center band & beads */}
            <rect x="18" y="17" width="4" height="6" fill="#fef08a" stroke="#713f12" strokeWidth="1" />
            <circle cx="8" cy="20" r="2.5" fill="#fef08a" stroke="#713f12" strokeWidth="1" />
            <circle cx="32" cy="20" r="2.5" fill="#fef08a" stroke="#713f12" strokeWidth="1" />
            <line x1="8" y1="20" x2="18" y2="20" stroke="#713f12" strokeWidth="1.2" />
            <line x1="22" y1="20" x2="32" y2="20" stroke="#713f12" strokeWidth="1.2" />
            {/* Top eyelet */}
            <circle cx="20" cy="1" r="3" fill="none" stroke="#eab308" strokeWidth="1.5" />
          </g>

        </svg>
      )}
    </div>
  );
};
