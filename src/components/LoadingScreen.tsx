import React, { useEffect, useState } from 'react';
// @ts-ignore
import { logo } from '../assets/image';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  // 0: Initial dark screen
  // 1: Fog appears
  // 2: Logo emerges
  // 3: Logo fully revealed
  // 4: Transition out

  useEffect(() => {
    // Sequence timing
    const sequence = [
      { phase: 1, delay: 500 },    // Fog appears
      { phase: 2, delay: 1000 },   // Logo emerges
      { phase: 3, delay: 2000 },   // Logo fully revealed
      { phase: 4, delay: 3000 },   // Begin transition out
    ];

    sequence.forEach(({ phase, delay }) => {
      setTimeout(() => setAnimationPhase(phase), delay);
    });

    // Complete animation
    setTimeout(onLoadingComplete, 4000);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Dynamic Fog Background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          animationPhase >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 dynamic-fog-1" />
        <div className="absolute inset-0 dynamic-fog-2" />
        <div className="absolute inset-0 dynamic-fog-3" />
        
        {/* Particle Effects */}
        <div className="absolute inset-0">
          <div className="particles-container">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="particle"
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Logo Container */}
      <div className={`
        absolute inset-0 flex items-center justify-center
        transition-all duration-1500 ease-out
        ${animationPhase >= 2 ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}
        ${animationPhase === 4 ? 'scale-90 opacity-0' : ''}
      `}>
        {/* Logo Glow Effect */}
        <div className="relative">
          <div className={`
            absolute inset-0 logo-glow-effect
            transition-all duration-1000
            ${animationPhase >= 3 ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}
          `} />
          
          {/* Main Logo */}
          <img 
            src={logo} 
            alt="Logo" 
            className={`
              relative z-10 w-64 transform
              transition-all duration-1500 ease-out
              ${animationPhase >= 3 ? 'brightness-125' : 'brightness-75'}
            `}
          />

          {/* Light Rays */}
          <div className={`
            absolute inset-0 light-rays-effect
            transition-all duration-1000
            ${animationPhase >= 3 ? 'opacity-100' : 'opacity-0'}
          `} />
        </div>
      </div>

      {/* Ambient Light Effect */}
      <div className={`
        absolute inset-0 ambient-light
        transition-opacity duration-1000
        ${animationPhase >= 2 ? 'opacity-30' : 'opacity-0'}
      `} />

      {/* Vignette Effect */}
      <div className="absolute inset-0 vignette" />
    </div>
  );
};

export default LoadingScreen; 