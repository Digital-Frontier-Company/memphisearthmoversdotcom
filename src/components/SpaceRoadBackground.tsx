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
      
      {/* First Person Highway View */}
      <div className="absolute inset-0">
        {/* Multiple road edge lines for continuous effect */}
        <div className="road-edge-line left" style={{ animationDelay: '0s' }}></div>
        <div className="road-edge-line left" style={{ animationDelay: '4s' }}></div>
        <div className="road-edge-line right" style={{ animationDelay: '0s' }}></div>
        <div className="road-edge-line right" style={{ animationDelay: '4s' }}></div>
        
        {/* Multiple center dashed lines for continuous effect */}
        <div className="center-dash" style={{ animationDelay: '0s' }}></div>
        <div className="center-dash" style={{ animationDelay: '1.5s' }}></div>
        <div className="center-dash" style={{ animationDelay: '3s' }}></div>
        <div className="center-dash" style={{ animationDelay: '4.5s' }}></div>
        <div className="center-dash" style={{ animationDelay: '6s' }}></div>
      </div>
      
      {/* Atmospheric glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default SpaceRoadBackground;