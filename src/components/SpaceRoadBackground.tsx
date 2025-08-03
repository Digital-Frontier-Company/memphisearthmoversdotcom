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
      
      {/* Highway perspective */}
      <div className="absolute inset-0 perspective-container">
        {/* Left road edge */}
        <div className="road-edge-line left"></div>
        
        {/* Right road edge */}
        <div className="road-edge-line right"></div>
        
        {/* Center dotted line */}
        <div className="center-dotted-line"></div>
      </div>
      
      {/* Atmospheric glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default SpaceRoadBackground;