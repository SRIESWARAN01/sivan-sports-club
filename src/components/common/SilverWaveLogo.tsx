import React, { useState } from 'react';

interface SilverWaveLogoProps {
  className?: string;
  size?: number | string;
}

/**
 * Official SILVER WAVE Swimming Facility Logo Component
 * 
 * Accurately represents the official brand identity:
 * 1. Die-cut contoured dynamic wave badge shape
 * 2. Swimmer silhouette emerging from the water wearing goggles
 * 3. Dynamic splashing waves with droplets and bubbling water spray
 * 4. 3D Glossy metallic cursive typography: "Silver Wave" with cyan and royal blue bevels
 */
export const SilverWaveLogo: React.FC<SilverWaveLogoProps> = ({
  className = "w-48 h-auto",
  size
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={size ? { width: size, height: 'auto' } : undefined}
    >
      {!imgError ? (
        <img
          src="/images/silver_wave_logo.png"
          alt="Silver Wave Swimming Pool Official Logo"
          className="w-full h-auto object-contain drop-shadow-xl"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Vector SVG reproducing the official Silver Wave emblem */
        <svg 
          viewBox="0 0 760 420" 
          className="w-full h-auto drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Water Wave Gradients */}
            <linearGradient id="oceanDeepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </linearGradient>

            <linearGradient id="cyanSplashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* 3D Glossy Text Gradients */}
            <linearGradient id="silverGlossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#f0f9ff" />
              <stop offset="75%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>

            <linearGradient id="blueBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#072044" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0284c7" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* ================= CONTURED CLOUD BADGE BACKGROUND ================= */}
          <path
            d="M 120,240 
               C 80,240 40,260 30,300 
               C 20,340 50,380 100,390 
               C 160,400 300,395 440,395 
               C 560,395 680,410 720,360 
               C 750,320 740,260 700,225 
               C 670,200 640,210 610,185 
               C 580,160 520,70 450,75 
               C 390,80 370,120 330,135 
               C 290,150 250,160 210,195 
               C 170,230 140,240 120,240 Z"
            fill="#ffffff"
            stroke="#0284c7"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          {/* Inner Accent Contour */}
          <path
            d="M 130,248 
               C 95,248 55,268 45,302 
               C 35,338 62,372 108,382 
               C 165,392 300,388 440,388 
               C 555,388 670,402 710,355 
               C 738,318 728,265 692,232 
               C 662,208 632,218 602,192 
               C 572,170 518,85 452,90 
               C 398,95 378,130 338,145 
               C 298,160 258,172 218,205 
               C 178,238 148,248 130,248 Z"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            opacity="0.8"
          />

          {/* ================= TOP: SWIMMER & WAVE SPLASH ================= */}
          <g id="swimmerAndSplashes">
            {/* Deep Ocean Wave Under Swimmer */}
            <path
              d="M 140,250 
                 C 190,190 230,190 280,240 
                 C 330,280 430,260 510,230 
                 C 590,200 650,210 690,250 
                 C 640,225 580,215 500,245 
                 C 420,275 320,290 260,250 
                 C 210,215 170,225 140,250 Z"
              fill="url(#oceanDeepGrad)"
            />

            {/* Cyan Wave Crests & Splash Curves */}
            <path
              d="M 160,230 
                 C 200,160 230,230 265,225 
                 C 290,220 320,180 340,230 
                 C 300,210 270,240 240,240 
                 C 200,240 180,210 160,230 Z"
              fill="url(#cyanSplashGrad)"
            />

            {/* Left High Splash Spikes */}
            <path
              d="M 180,230 
                 C 160,180 130,170 120,200 
                 C 135,190 155,200 165,220 
                 C 140,160 180,120 200,165 
                 C 205,175 195,205 180,230 Z"
              fill="url(#cyanSplashGrad)"
            />
            <path
              d="M 210,185 
                 C 225,140 250,150 240,185 
                 C 230,175 220,175 210,185 Z"
              fill="#38bdf8"
            />

            {/* Right Splash Curl */}
            <path
              d="M 540,225 
                 C 580,180 635,190 650,230 
                 C 630,210 590,205 560,225 Z"
              fill="url(#cyanSplashGrad)"
            />

            {/* Floating Water Droplets & Bubbles */}
            <circle cx="170" cy="155" r="10" fill="#0284c7" />
            <circle cx="172" cy="153" r="3" fill="#ffffff" />
            <circle cx="205" cy="130" r="12" fill="#0284c7" />
            <circle cx="208" cy="127" r="4" fill="#ffffff" />
            <circle cx="230" cy="115" r="8" fill="#0284c7" />
            <circle cx="245" cy="140" r="6" fill="#38bdf8" />
            <circle cx="145" cy="195" r="9" fill="#0284c7" />
            <circle cx="147" cy="193" r="3" fill="#ffffff" />
            <circle cx="130" cy="220" r="7" fill="#38bdf8" />
            <circle cx="620" cy="180" r="8" fill="#0284c7" />
            <circle cx="645" cy="210" r="10" fill="#0284c7" />
            <circle cx="670" cy="265" r="7" fill="#0284c7" />

            {/* Swimmer Silhouette in Deep Navy (#082f49 / #031b3e) */}
            <g fill="#051937" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))">
              {/* Swimmer Head & Cap */}
              <ellipse cx="320" cy="190" rx="38" ry="32" transform="rotate(-15, 320, 190)" />
              {/* Swimming Goggles Strap & Lens */}
              <ellipse cx="345" cy="195" rx="10" ry="6" fill="#ffffff" />
              <path d="M 315,188 L 350,195" stroke="#ffffff" strokeWidth="2.5" />
              {/* Back / Shoulders */}
              <path d="M 290,205 C 330,170 380,180 430,215 C 400,230 350,230 290,205 Z" />
              {/* Bent Arm Slicing Forward in Freestyle */}
              <path d="M 380,185 C 390,130 450,110 490,150 C 475,150 455,145 440,165 C 425,185 410,205 380,185 Z" />
              {/* Hand & Fingers entering water */}
              <path d="M 490,150 C 495,160 485,175 470,185 C 465,180 475,165 490,150 Z" />
            </g>
          </g>

          {/* ================= BOTTOM: 3D "Silver Wave" SCRIPT ================= */}
          <g transform="translate(65, 325)">
            {/* Under-glow ribbon waves */}
            <path
              d="M 10,25 
                 C 150,60 350,5 500,45 
                 C 580,65 620,40 640,25 
                 C 620,55 570,75 480,55 
                 C 340,25 150,75 10,25 Z"
              fill="url(#cyanSplashGrad)"
            />
            <path
              d="M 25,45 
                 C 160,75 340,30 480,62 
                 C 560,78 600,60 615,48 
                 C 595,72 550,88 470,70 
                 C 335,42 160,85 25,45 Z"
              fill="url(#oceanDeepGrad)"
            />

            {/* 3D Drop Shadow / Extrusion */}
            <text
              x="310"
              y="0"
              textAnchor="middle"
              fontFamily="Brush Script MT, cursive, Lucida Handwriting, sans-serif"
              fontSize="128"
              fontWeight="bold"
              fontStyle="italic"
              fill="#031b3e"
              stroke="#031b3e"
              strokeWidth="20"
              strokeLinejoin="round"
            >
              Silver Wave
            </text>

            <text
              x="310"
              y="2"
              textAnchor="middle"
              fontFamily="Brush Script MT, cursive, Lucida Handwriting, sans-serif"
              fontSize="128"
              fontWeight="bold"
              fontStyle="italic"
              fill="#0369a1"
              stroke="#0284c7"
              strokeWidth="10"
              strokeLinejoin="round"
            >
              Silver Wave
            </text>

            {/* Front Metallic Glossy Script Face */}
            <text
              x="310"
              y="0"
              textAnchor="middle"
              fontFamily="Brush Script MT, cursive, Lucida Handwriting, sans-serif"
              fontSize="128"
              fontWeight="bold"
              fontStyle="italic"
              fill="url(#silverGlossGrad)"
              stroke="#ffffff"
              strokeWidth="2"
            >
              Silver Wave
            </text>
          </g>
        </svg>
      )}
    </div>
  );
};
