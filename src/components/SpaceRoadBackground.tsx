import React from "react";

const SpaceRoadBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        <div className="stars absolute inset-0"></div>
        <div className="stars2 absolute inset-0"></div>
        <div className="stars3 absolute inset-0"></div>
      </div>
      
      {/* Road container */}
      <div className="absolute inset-0 flex items-end justify-center perspective-road">
        <svg 
          className="road-svg absolute bottom-0" 
          width="100%" 
          height="100%" 
          viewBox="0 0 800 600" 
          preserveAspectRatio="xMidYMax slice"
        >
          {/* Road path */}
          <path
            className="road-path animate-road-flow"
            d="M 300 600 Q 400 450 350 350 Q 300 250 450 150 Q 600 50 400 0"
            stroke="hsl(var(--mem-babyBlue))"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
            filter="url(#glow)"
          />
          <path
            className="road-path animate-road-flow delay-100"
            d="M 500 600 Q 400 450 450 350 Q 500 250 350 150 Q 200 50 400 0"
            stroke="hsl(var(--mem-babyBlue))"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
            filter="url(#glow)"
          />
          
          {/* Center dashed lines */}
          <path
            className="center-line animate-dash-flow"
            d="M 400 600 Q 400 450 400 350 Q 400 250 400 150 Q 400 50 400 0"
            stroke="hsl(var(--mem-babyBlue))"
            strokeWidth="2"
            fill="none"
            strokeDasharray="20 15"
            opacity="0.6"
            filter="url(#glow)"
          />
          
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20 pointer-events-none"></div>
    </div>
  );
};

export default SpaceRoadBackground;