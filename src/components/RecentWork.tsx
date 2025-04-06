import React, { useEffect, useState, useRef } from 'react';
// @ts-ignore
import { house, house2, house3, house4, house5, house6 } from '../assets/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const projects = [
  {
    image: house,
    position: { left: '15%' },
    delay: 0,
    size: 'medium',
    speed: 1
  },
  {
    image: house2,
    position: { right: '25%' },
    delay: 4,
    size: 'large',
    speed: 2
  },
  {
    image: house3,
    position: { left: '35%' },
    delay: 8,
    size: 'small',
    speed: 3
  },
  {
    image: house4,
    position: { left: '55%' },
    delay: 2,
    size: 'medium',
    speed: 2
  },
  {
    image: house5,
    position: { right: '15%' },
    delay: 6,
    size: 'large',
    speed: 1
  },
  {
    image: house6,
    position: { right: '45%' },
    delay: 10,
    size: 'small',
    speed: 3
  }
];

const RecentWork: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // const smoothScroll = useSpring(scrollYProgress, {
  //   damping: 30,
  //   stiffness: 100
  // });

  // Fade in animation
  // const opacity = useTransform(smoothScroll, [0, 0.2], [0, 1]);
  // const y = useSpring(
  //   useTransform(smoothScroll, [0, 0.2], [50, 0]),
  //   { damping: 30, stiffness: 200 }
  // );

  // Floating animation
  const floatingY = useTransform(
    useSpring(scrollYProgress, { damping: 10, stiffness: 50 }),
    [0, 1], 
    [0, -100]
  );

  // Add content animations
  const contentOpacity = useTransform(scrollYProgress, 
    [0, 0.2], 
    [0, 1]
  );
  const contentY = useTransform(scrollYProgress,
    [0, 0.2],
    [30, 0]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInitialAnimationComplete(true);
      // setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.section 
      ref={sectionRef}
      style={{ 
        opacity: contentOpacity,
        y: contentY 
      }}
      className="relative h-screen bg-[radial-gradient(circle,rgb(17,17,17)_0%,rgb(0,0,0)_100%)] overflow-hidden z-30"
    >
      {/* Remove previous gradient layers and keep noise */}
      <div className="noise-overlay" />

      {/* Top Navigation */}
      <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-4">
          <span className="text-white/50">26 letters</span>
        </div>
      </div>

      {/* Email Input */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Got an idea for a photo shoot? Send your e-mail"
            className="bg-white/10 text-white px-6 py-2 rounded-full w-[400px] focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black px-6 py-1 rounded-full hover:bg-white/90 transition-colors text-sm">
            Send
          </button>
        </div>
      </div>

      {/* Menu Button */}
      <button className="absolute top-8 right-8 z-20 text-white">Menu</button>

      {/* Center Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
        <h1 className="text-white text-7xl font-light mb-4">AmaN</h1>
        <h1 className="text-white text-7xl font-light">DhatarwaL</h1>
        <p className="text-white/60 mt-6 max-w-md mx-auto text-sm">
          Crafting digital experiences that captivate and inspire. Elevating your brand through design and innovation.
        </p>
      </div>

      {/* Floating Images */}
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: {
                delay: index * 0.2,
                duration: 0.8
              }
            }}
            className={`absolute ${getSizeClass(project.size)} recent-work-floating ${
              isInitialAnimationComplete ? `speed-${project.speed}` : ''
            }`}
            style={{
              ...project.position,
              y: floatingY,
              animationDelay: `${project.delay}s`
            }}
          >
            <div className="relative w-full h-full group">
              <img
                src={project.image}
                alt={`Project ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-500"></div>
              <button className="absolute bottom-4 right-4 bg-white/90 text-black text-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500">
                View album
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#333" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#333" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M200,100 C400,200 600,150 800,300"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          className="opacity-20"
        />
        <path
          d="M100,200 C300,400 500,300 700,500"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          className="opacity-20"
        />
      </svg>
    </motion.section>
  );
};

const getSizeClass = (size: string) => {
  switch (size) {
    case 'small': return 'w-48 h-48';
    case 'medium': return 'w-64 h-64';
    case 'large': return 'w-80 h-80';
    default: return 'w-64 h-64';
  }
};

export default RecentWork; 