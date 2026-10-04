import React, { useState } from 'react';

interface IronEmpireLogoProps {
  className?: string;
  size?: number | string;
  showFullText?: boolean;
}

/**
 * Official IRON EMPIRE FITNESS STUDIO Logo Component
 * 
 * Accurately reflects the official brand identity:
 * - Chrome-beveled circular crest
 * - "IRON EMPIRE" upper arched lettering
 * - Muscular bodybuilder silhouette with double biceps flex
 * - Loaded barbell spanning horizontally
 * - Metallic triangle with red core on chest
 * - Dual red energetic curved arcs
 * - 3D Typography: "IRON EMPIRE" (with iconic red "EM") + "FITNESS STUDIO"
 */
export const IronEmpireLogo: React.FC<IronEmpireLogoProps> = ({
  className = "w-16 h-16",
  size,
  showFullText = false
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      {!imgError ? (
        <img
          src="/images/iron_empire_logo.png"
          alt="Iron Empire Fitness Studio Official Logo"
          className="w-full h-full object-contain drop-shadow-lg"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Vector SVG Representation of the Iron Empire Crest */
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-full drop-shadow-xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Chrome Bevel Gradient */}
            <linearGradient id="chromeBevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="75%" stopColor="#475569" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            {/* Red Crimson Glow Gradient */}
            <linearGradient id="redGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>

            {/* Dark Plate Gradient */}
            <linearGradient id="darkPlate" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>

            {/* Top Arc for Text */}
            <path
              id="ironEmpireTextArc"
              d="M 85,185 A 115,115 0 0,1 315,185"
              fill="none"
            />
          </defs>

          {/* Outer Chrome Ring */}
          <circle cx="200" cy="180" r="140" fill="url(#darkPlate)" stroke="url(#chromeBevel)" strokeWidth="10" />
          <circle cx="200" cy="180" r="132" fill="none" stroke="#000000" strokeWidth="3" />

          {/* Arched Text: IRON EMPIRE */}
          <text fill="#ffffff" fontSize="26" fontWeight="900" fontFamily="sans-serif" letterSpacing="4">
            <textPath href="#ironEmpireTextArc" startOffset="50%" textAnchor="middle">
              IRON EMPIRE
            </textPath>
          </text>

          {/* Bodybuilder Silhouette */}
          <g fill="#0f172a" stroke="url(#chromeBevel)" strokeWidth="1.5">
            {/* Head */}
            <ellipse cx="200" cy="120" rx="14" ry="18" fill="#1e293b" />
            {/* Neck / Traps */}
            <path d="M 186 135 Q 200 130 214 135 L 230 150 L 170 150 Z" fill="#1e293b" />
            {/* Shoulders & Flexed Biceps (Double Biceps pose) */}
            {/* Left Arm */}
            <path d="M 170 150 C 145 135, 125 120, 140 100 C 150 90, 165 95, 175 115 L 165 135 Z" fill="#1e293b" />
            {/* Left Forearm & Fist */}
            <path d="M 140 100 C 130 90, 135 75, 150 78 C 160 80, 165 90, 158 100 Z" fill="#1e293b" />
            {/* Right Arm */}
            <path d="M 230 150 C 255 135, 275 120, 260 100 C 250 90, 235 95, 225 115 L 235 135 Z" fill="#1e293b" />
            {/* Right Forearm & Fist */}
            <path d="M 260 100 C 270 90, 265 75, 250 78 C 240 80, 235 90, 242 100 Z" fill="#1e293b" />
            {/* Torso & Pecs */}
            <path d="M 170 150 L 230 150 L 220 220 L 180 220 Z" fill="#1e293b" />
          </g>

          {/* Heavy Loaded Barbell spanning across */}
          {/* Barbell Bar */}
          <rect x="50" y="180" width="300" height="8" rx="3" fill="url(#chromeBevel)" stroke="#0f172a" strokeWidth="1.5" />
          
          {/* Left Weight Plates */}
          <rect x="65" y="160" width="10" height="48" rx="2" fill="url(#chromeBevel)" />
          <rect x="78" y="152" width="12" height="64" rx="2" fill="#0f172a" stroke="url(#chromeBevel)" strokeWidth="2" />
          <rect x="93" y="156" width="10" height="56" rx="2" fill="#0f172a" stroke="url(#chromeBevel)" strokeWidth="2" />
          <rect x="106" y="174" width="8" height="20" rx="2" fill="url(#chromeBevel)" />

          {/* Right Weight Plates */}
          <rect x="325" y="160" width="10" height="48" rx="2" fill="url(#chromeBevel)" />
          <rect x="310" y="152" width="12" height="64" rx="2" fill="#0f172a" stroke="url(#chromeBevel)" strokeWidth="2" />
          <rect x="297" y="156" width="10" height="56" rx="2" fill="#0f172a" stroke="url(#chromeBevel)" strokeWidth="2" />
          <rect x="286" y="174" width="8" height="20" rx="2" fill="url(#chromeBevel)" />

          {/* Center Triangle with Glowing Red Core */}
          <polygon points="200,165 225,205 175,205" fill="none" stroke="url(#chromeBevel)" strokeWidth="7" strokeLinejoin="round" />
          <polygon points="200,174 218,201 182,201" fill="url(#redGlow)" />

          {/* Lower Red Energetic Arcs */}
          <path d="M 140 215 Q 200 240 260 215" fill="none" stroke="url(#redGlow)" strokeWidth="5" strokeLinecap="round" />
          <path d="M 125 230 Q 200 265 275 230" fill="none" stroke="url(#redGlow)" strokeWidth="7" strokeLinecap="round" />

          {/* Bottom 3D Text: IRON EMPIRE FITNESS STUDIO */}
          {showFullText && (
            <g transform="translate(200, 340)">
              <text 
                x="0" 
                y="0" 
                textAnchor="middle" 
                fontFamily="Impact, sans-serif" 
                fontSize="38" 
                fontWeight="900" 
                fill="#ffffff" 
                stroke="#0f172a" 
                strokeWidth="4" 
                letterSpacing="2"
              >
                IRON <tspan fill="#ef4444">EM</tspan>PIRE
              </text>
              <text 
                x="0" 
                y="34" 
                textAnchor="middle" 
                fontFamily="sans-serif" 
                fontSize="24" 
                fontWeight="900" 
                fill="url(#chromeBevel)" 
                stroke="#0f172a" 
                strokeWidth="2" 
                letterSpacing="4"
              >
                FITNESS STUDIO
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
};
