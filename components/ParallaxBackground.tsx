
import React, { useState, useEffect } from 'react';

const ParallaxBackground: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Slowest layer - large, faint circles */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full filter blur-3xl"
        style={{ transform: `translateY(${offsetY * 0.1}px)` }}
      />
      <div 
        className="absolute top-3/4 right-1/4 w-[500px] h-[500px] bg-light-navy/20 rounded-full filter blur-3xl"
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      />
      
      {/* Mid-speed layer */}
      <div 
        className="absolute top-1/2 left-10 w-80 h-80 bg-cyan/5 rounded-full filter blur-2xl"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      />
      <div 
        className="absolute top-0 right-10 w-72 h-72 bg-lightest-navy/10 rounded-full filter blur-2xl"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      />
      
      {/* Fastest layer - small, sharper elements */}
       <div 
        className="absolute top-[80%] left-[5%] w-24 h-24 border border-cyan/20 rounded-full"
        style={{ transform: `translateY(${offsetY * 0.8}px) rotate(${offsetY * 0.1}deg)` }}
      />
       <div 
        className="absolute top-[20%] right-[15%] w-16 h-16 border-2 border-slate/20"
        style={{ transform: `translateY(${offsetY * 0.6}px) rotate(-${offsetY * 0.05}deg)` }}
      />
    </div>
  );
};

export default ParallaxBackground;
