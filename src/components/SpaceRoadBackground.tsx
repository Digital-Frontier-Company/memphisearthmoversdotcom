import React from "react";

const SpaceRoadBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Space background with stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-black">
        <div className="stars absolute inset-0"></div>
        <div className="stars2 absolute inset-0"></div>
        <div className="stars3 absolute inset-0"></div>
      </div>
      
      {/* Highway grid perspective */}
      <div className="absolute inset-0 perspective-container">
        {/* Road surface */}
        <div className="road-surface"></div>
        
        {/* Grid lines */}
        <div className="grid-container">
          {/* Horizontal grid lines */}
          {Array.from({ length: 20 }, (_, i) => (
            <div 
              key={`h-${i}`} 
              className="grid-line horizontal"
              style={{ 
                transform: `translateZ(${-i * 50}px) translateY(${i * 10}px)`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
          
          {/* Vertical grid lines */}
          {Array.from({ length: 10 }, (_, i) => (
            <div 
              key={`v-${i}`} 
              className="grid-line vertical"
              style={{ 
                left: `${10 + i * 10}%`,
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
        
        {/* Center highway lines */}
        <div className="highway-lines">
          {Array.from({ length: 15 }, (_, i) => (
            <div 
              key={`lane-${i}`}
              className="lane-marker"
              style={{ 
                transform: `translateZ(${-i * 80}px)`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
        
        {/* Road edges */}
        <div className="road-edge left"></div>
        <div className="road-edge right"></div>
      </div>
      
      {/* Atmospheric glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default SpaceRoadBackground;