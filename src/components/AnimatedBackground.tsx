import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Moving light streaks */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse delay-700"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent animate-pulse delay-300"></div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/3 left-1/3 w-4 h-4 border border-cyan-400/40 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 border border-blue-400/30 rotate-45 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(77, 210, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(77, 210, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      {/* Atmospheric glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent"></div>
    </div>
  );
};

export default AnimatedBackground;