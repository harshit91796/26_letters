import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './Hero';
import About from './About';
import RecentWork from './RecentWork';

gsap.registerPlugin(ScrollTrigger);

const TransitionContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "1000% start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 2
  });

  // Hero section animations
  const heroScale = useTransform(smoothProgress, 
    [0, 0.15],
    [1, 1.1]
  );
  const heroOpacity = useTransform(smoothProgress, 
    [0.1, 0.2],
    [1, 0]
  );

  // About section animations with enhanced transitions
  const aboutOpacity = useTransform(smoothProgress, 
    [0.15, 0.25, 0.7, 0.8],
    [0, 1, 1, 0]
  );
  const aboutScale = useTransform(smoothProgress, 
    [0.15, 0.25, 0.65, 0.75],
    [0.95, 1, 1, 0.95]
  );
  const aboutBlur = useTransform(smoothProgress,
    [0.65, 0.75],
    ["blur(0px)", "blur(3px)"]
  );

  // Background transition
  const backgroundOpacity = useTransform(smoothProgress,
    [0.55, 0.65], // Background transition after content fade
    [0, 1]
  );

  // Radial glow effect
  const glowOpacity = useTransform(smoothProgress,
    [0.7, 0.75, 0.85],
    [0, 0.2, 0]
  );

  // Reset Recent Work transforms to basic visibility
  const recentWorkOpacity = useTransform(smoothProgress,
    [0.65, 0.8],
    [0, 1]
  );

  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((latest) => {
      if (latest > 0.15 && latest < 0.7) {
        setIsAboutVisible(true);
        setIsTransitioning(false);
      } else if (latest >= 0.7) {
        setIsTransitioning(true);
      } else {
        setIsAboutVisible(false);
        setIsTransitioning(false);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "1000% top",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1
      });
    });

    return () => ctx.revert();
  }, []);

  

  return (
    <div ref={containerRef} className="h-[100vh] relative bg-black">
      {/* Hero Section */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="fixed top-0 left-0 w-full h-screen"
      >
        <Hero />
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-transparent via-black/90 to-black pointer-events-none"
          style={{
            opacity: useTransform(smoothProgress, [0, 0.15], [0, 1])
          }}
        />
      </motion.div>

      {/* About Section */}
      <motion.div
        style={{
          opacity: aboutOpacity,
          scale: aboutScale,
          filter: aboutBlur
        }}
        className="fixed top-0 left-0 w-full h-screen z-30"
      >
        <About 
          isVisible={isAboutVisible} 
          isTransitioning={isTransitioning}
          smoothProgress={smoothProgress}
        />
      </motion.div>

      {/* Background Transition Layer */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          opacity: backgroundOpacity,
          background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)'
        }}
      />

      {/* Radial Glow Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-45"
        style={{
          opacity: glowOpacity,
          boxShadow: 'inset 0 0 50px rgba(255, 255, 255, 0.2)'
        }}
      />

      {/* Recent Work Section */}
      <motion.div
        style={{ opacity: recentWorkOpacity }}
        className="fixed top-0 left-0 w-full h-screen z-40"
      >
        <RecentWork />
      </motion.div>

      {/* Progress Indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[100px] h-[2px] bg-white/20 z-50 mix-blend-difference"
        style={{ scaleX: smoothProgress }}
      >
        <div className="h-full bg-white origin-left" />
      </motion.div>
    </div>
  );
};

export default TransitionContainer; 