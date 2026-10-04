import React, { useState } from 'react';

interface RayanSportsLogoProps {
  className?: string;
  size?: number | string;
  showTagline?: boolean;
}

/**
 * Official RAYAN SPORTS ACADEMY Logo Component
 * 
 * Accurately represents the official brand identity:
 * 1. Dynamic multi-color swirling energy vortex (cyan, electric blue, yellow, orange, red)
 * 2. White silhouette of badminton player in jump smash action holding racket
 * 3. Flying shuttlecock with energetic trail
 * 4. 3D Beveled heavy block typography: "RAYAN SPORTS ACADEMY"
 * 5. Crown of upward multi-colored energy arrows above the letter 'O'
 * 6. Vibrant magenta/hot-pink ribbon banner: "SERVE WITH PASSION • PLAY WITH PRIDE"
 */
export const RayanSportsLogo: React.FC<RayanSportsLogoProps> = ({
  className = "w-48 h-auto",
  size,
  showTagline = true
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={size ? { width: size, height: 'auto' } : undefined}
    >
      {!imgError ? (
        <img
          src="/images/rayan_sports_logo.png"
          alt="Rayan Sports Academy Official Logo"
          className="w-full h-auto object-contain drop-shadow-xl"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Pixel-perfect Vector SVG reproducing the official Rayan Sports Academy artwork */
        <svg 
          viewBox="0 0 720 360" 
          className="w-full h-auto drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Swirl Gradients */}
            <linearGradient id="cyanBlueSwirl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>

            <linearGradient id="orangeRedSwirl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            {/* 3D Chrome Text Gradients */}
            <linearGradient id="rayanTextBevel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#e2e8f0" />
              <stop offset="70%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>

            <linearGradient id="rayanTextStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>

            {/* Hot-Pink Ribbon Gradient */}
            <linearGradient id="pinkRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>

            {/* Filter for subtle glow */}
            <filter id="swirlGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ================= LEFT: VORTEX & PLAYER ================= */}
          <g transform="translate(110, 160)">
            {/* Outer Energy Swirls */}
            {/* Orange-Red lower swooshes */}
            <path 
              d="M -90,40 C -85,85 -30,110 30,95 C 65,85 85,60 90,30 C 80,50 55,75 10,75 C -40,75 -75,45 -70,10 Z" 
              fill="url(#orangeRedSwirl)" 
            />
            <path 
              d="M -75,60 C -45,105 15,105 55,85 C 30,95 -20,95 -60,65 Z" 
              fill="#ef4444" 
            />

            {/* Cyan-Blue upper swooshes */}
            <path 
              d="M -95,-20 C -95,-75 -40,-115 20,-110 C 65,-105 95,-70 95,-30 C 90,-55 60,-85 10,-85 C -45,-85 -75,-50 -80,-10 Z" 
              fill="url(#cyanBlueSwirl)" 
            />
            <path 
              d="M -80,-40 C -40,-95 20,-100 65,-80 C 30,-90 -20,-85 -65,-50 Z" 
              fill="#38bdf8" 
            />

            {/* Yellow-Orange Inner Spiral */}
            <path 
              d="M -60,-10 C -60,-50 -25,-80 20,-75 C -15,-65 -45,-40 -45,-5 Z" 
              fill="#facc15" 
            />
            <path 
              d="M -60,10 C -55,50 -10,70 35,60 C -5,55 -40,35 -45,5 Z" 
              fill="#f97316" 
            />

            {/* Multicolored Splash Droplets */}
            <circle cx="-95" cy="10" r="4" fill="#38bdf8" />
            <circle cx="-85" cy="-70" r="5" fill="#facc15" />
            <circle cx="85" cy="-80" r="6" fill="#f97316" />
            <circle cx="95" cy="-55" r="4" fill="#ef4444" />
            <circle cx="80" cy="80" r="5" fill="#0284c7" />
            <circle cx="-60" cy="95" r="4" fill="#ef4444" />

            {/* White Silhouette of Jumping Badminton Player */}
            <g fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
              {/* Head */}
              <circle cx="15" cy="-35" r="10" />
              
              {/* Torso & Athletic Build */}
              <path d="M 12,-25 C 10,-10 8,10 -2,35 C 5,28 15,15 20,-5 C 24,-20 18,-25 12,-25 Z" />
              
              {/* Left Raised Arm with Racket */}
              <path d="M 10,-22 C -2,-25 -18,-20 -28,-10 C -34,-5 -35,-2 -40,-3 L -42,-12 C -35,-14 -30,-18 -20,-28 C -8,-32 5,-28 10,-22 Z" />
              
              {/* Badminton Racket Shaft and Head */}
              <line x1="-40" y1="-5" x2="-62" y2="-28" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="-72" cy="-40" rx="14" ry="18" fill="none" stroke="#ffffff" strokeWidth="2.5" transform="rotate(-30, -72, -40)" />
              {/* Racket Strings */}
              <ellipse cx="-72" cy="-40" rx="10" ry="14" fill="none" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="2,2" transform="rotate(-30, -72, -40)" />

              {/* Right Arm extended forward for balance */}
              <path d="M 18,-20 C 30,-15 45,-5 55,5 C 50,7 40,0 30,-8 C 22,-15 18,-18 18,-20 Z" />

              {/* Legs in Jump Smash Split/Kick */}
              {/* Front Right Leg Bent */}
              <path d="M 0,32 C 10,48 20,65 15,85 C 10,95 3,92 5,80 C 10,65 2,50 -4,38 Z" />
              {/* Back Left Leg Tucked High */}
              <path d="M -5,30 C -20,40 -40,42 -55,35 C -60,32 -55,25 -45,28 C -32,32 -18,32 -6,24 Z" />
            </g>

            {/* Flying Shuttlecock with Glowing Base */}
            <g transform="translate(38, -60) rotate(45)">
              {/* Shuttle Feathers */}
              <polygon points="0,0 -8,-22 8,-22" fill="#ffffff" stroke="#93c5fd" strokeWidth="1" />
              <line x1="-4" y1="-8" x2="4" y2="-8" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="-6" y1="-15" x2="6" y2="-15" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Shuttle Cork */}
              <ellipse cx="0" cy="2" rx="6" ry="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            </g>
          </g>

          {/* ================= RIGHT: 3D TYPOGRAPHY ================= */}
          <g transform="translate(225, 60)">
            {/* Crown of Dynamic Upward Arrows over the "O" */}
            <g transform="translate(285, 30)">
              {/* Green Arrow */}
              <path d="M -22,10 L -22,-15 L -28,-15 L -20,-30 L -12,-15 L -18,-15 L -18,10 Z" fill="#22c55e" />
              {/* Yellow-Orange Arrow */}
              <path d="M -5,12 L -5,-25 L -12,-25 L -2,-45 L 8,-25 L 1,-25 L 1,12 Z" fill="#eab308" />
              {/* Bright Red Arrow */}
              <path d="M 12,12 L 12,-35 L 5,-35 L 18,-60 L 30,-35 L 24,-35 L 24,12 Z" fill="#ef4444" />
              {/* Crimson Accent Arrow */}
              <path d="M 28,15 L 28,-18 L 22,-18 L 32,-36 L 42,-18 L 36,-18 L 36,15 Z" fill="#b91c1c" />
              {/* Crown Base Band */}
              <path d="M -30,12 Q 10,22 45,12 Q 10,8 -30,12 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            </g>

            {/* TOP LINE: RAYAN SPORTS */}
            <g>
              {/* 3D Extrusion Layer (Dark Blue Outline) */}
              <text 
                x="0" 
                y="95" 
                fontFamily="Arial Black, Impact, sans-serif" 
                fontSize="68" 
                fontWeight="900" 
                letterSpacing="1"
                fill="#031b3e"
                stroke="#031b3e"
                strokeWidth="10"
                strokeLinejoin="round"
              >
                RAYAN SPORTS
              </text>
              <text 
                x="2" 
                y="97" 
                fontFamily="Arial Black, Impact, sans-serif" 
                fontSize="68" 
                fontWeight="900" 
                letterSpacing="1"
                fill="#082f49"
                stroke="#0284c7"
                strokeWidth="4"
                strokeLinejoin="round"
              >
                RAYAN SPORTS
              </text>
              {/* Front Face (White to Ice-Blue Gradient) */}
              <text 
                x="0" 
                y="95" 
                fontFamily="Arial Black, Impact, sans-serif" 
                fontSize="68" 
                fontWeight="900" 
                letterSpacing="1"
                fill="url(#rayanTextBevel)"
              >
                RAYAN SPORTS
              </text>
            </g>

            {/* MIDDLE LINE: ACADEMY */}
            <g transform="translate(45, 82)">
              {/* 3D Extrusion Layer */}
              <text 
                x="0" 
                y="85" 
                fontFamily="Arial Black, Impact, sans-serif" 
                fontSize="76" 
                fontWeight="900" 
                letterSpacing="3"
                fill="#031b3e"
                stroke="#031b3e"
                strokeWidth="10"
                strokeLinejoin="round"
              >
                ACADEMY
              </text>
              <text 
                x="2" 
                y="87" 
                fontFamily="Arial Black, Impact, sans-serif" 
                fontSize="76" 
                fontWeight="900" 
                letterSpacing="3"
                fill="#082f49"
                stroke="#0284c7"
                strokeWidth="4"
                strokeLinejoin="round"
              >
                ACADEMY
              </text>
              {/* Front Face */}
              <text 
                x="0" 
                y="85" 
                fontFamily="Arial Black, Impact, sans-serif" 
                fontSize="76" 
                fontWeight="900" 
                letterSpacing="3"
                fill="url(#rayanTextBevel)"
              >
                ACADEMY
              </text>
            </g>

            {/* BOTTOM RIBBON: SERVE WITH PASSION • PLAY WITH PRIDE */}
            {showTagline && (
              <g transform="translate(-25, 205)">
                {/* Slanted Ribbon Banner */}
                <polygon 
                  points="-10,0 470,0 455,42 -25,42" 
                  fill="url(#pinkRibbonGrad)" 
                  stroke="#be123c" 
                  strokeWidth="2"
                  filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
                />
                {/* Ribbon Fold Edge */}
                <polygon points="-25,42 -10,42 -10,50" fill="#9f1239" />
                
                {/* Ribbon Slogan Text */}
                <text 
                  x="215" 
                  y="28" 
                  textAnchor="middle" 
                  fontFamily="sans-serif" 
                  fontSize="17" 
                  fontWeight="900" 
                  fontStyle="italic"
                  letterSpacing="1.8"
                  fill="#ffffff"
                >
                  SERVE WITH PASSION • PLAY WITH PRIDE
                </text>
              </g>
            )}
          </g>
        </svg>
      )}
    </div>
  );
};
