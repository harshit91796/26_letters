import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import { heroBg, person2, person3, person4, person5, logo } from '../assets/image';

const backgrounds = [heroBg, person2, person3, person4, person5];
const TEXT_TO_TYPE = "L E T T E R S";


const Hero: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingTimer = useRef<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    // Start animations after loading screen completes
    const startDelay = setTimeout(() => {
      setIsTextVisible(true);
      startTypingAnimation();
    }, 4500);

    return () => {
      clearTimeout(startDelay);
      if (typingTimer.current) clearTimeout(typingTimer.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isTypingComplete) {
      startBackgroundCarousel();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTypingComplete]);

  const startBackgroundCarousel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentBg(prev => (prev + 1) % backgrounds.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 3000);
      }
    }, 8000);
  };

  const manualBackgroundChange = (index: number) => {
    if (!isTransitioning && index !== currentBg) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsTransitioning(true);
      setCurrentBg(index);
      setTimeout(() => {
        setIsTransitioning(false);
        startBackgroundCarousel();
      }, 3000);
    }
  };

  const startTypingAnimation = () => {
    let currentIndex = 0;
    const typeNextChar = () => {
      if (currentIndex <= TEXT_TO_TYPE.length) {
        setTypedText(TEXT_TO_TYPE.slice(0, currentIndex));
        currentIndex++;
        typingTimer.current = setTimeout(typeNextChar, 150);
      } else {
        setIsTypingComplete(true);
      }
    };
    typeNextChar();
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Background Images */}
      <motion.div className="absolute inset-0">
        {backgrounds.map((bg, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 transition-all duration-3000 ease-in-out"
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: currentBg === index ? (isTransitioning ? 0 : 1) : 0,
              scale: currentBg === index ? (isTransitioning ? 1.1 : 1.05) : 1
            }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <img 
              src={bg}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover grayscale transition-transform duration-3000 ease-in-out"
            />
          </motion.div>
        ))}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4">
        {/* Top Navigation */}
        <motion.div 
          className="flex justify-between items-center py-8 text-white/80 text-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: isTextVisible ? 0 : -20,
            opacity: isTextVisible ? 1 : 0
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span>
            <img src={logo} alt="Logo" className="w-30 h-20" />
          </span>
          <span>STUDIO</span>
        </motion.div>

        {/* Main Content */}
        <div className="h-[calc(100%-8rem)] flex flex-col justify-center">
          <div className="max-w-xl space-y-6">
            <motion.h1 className="text-white overflow-hidden">
              <motion.div 
                className="text-7xl font-light tracking-wider"
                initial={{ y: "100%" }}
                animate={{ 
                  y: isTextVisible ? 0 : "100%",
                  opacity: isTextVisible ? 1 : 0
                }}
                transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                2 6
              </motion.div>
              <motion.div 
                className="text-8xl font-light typing-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: isTextVisible ? 1 : 0 }}
                style={{
                  borderRight: !isTypingComplete ? '2px solid white' : 'none'
                }}
              >
                {typedText}
              </motion.div>
            </motion.h1>
            <motion.p 
              className="text-white/60 text-sm tracking-wider uppercase"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isTypingComplete ? 0 : 20,
                opacity: isTypingComplete ? 1 : 0
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Photography Portfolio
            </motion.p>
            <motion.div 
              className="pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isTypingComplete ? 0 : 20,
                opacity: isTypingComplete ? 1 : 0
              }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a 
                href="#portfolio" 
                className="text-white/80 text-sm hover:text-white transition-colors"
              >
                www.lenzstudio.com
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Navigation Dots */}
        <motion.div 
          className="absolute bottom-8 right-8 flex gap-2 z-20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isTypingComplete ? 0 : 20,
            opacity: isTypingComplete ? 1 : 0
          }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {backgrounds.map((_, index) => (
            <motion.div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
                currentBg === index ? 'bg-white' : 'bg-white/30'
              }`}
              onClick={() => manualBackgroundChange(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Side Menu Dots */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 right-8 flex flex-col gap-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ 
            x: isTypingComplete ? 0 : 20,
            opacity: isTypingComplete ? 1 : 0
          }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="w-1 h-1 rounded-full bg-white"></div>
          <div className="w-1 h-1 rounded-full bg-white/30"></div>
          <div className="w-1 h-1 rounded-full bg-white/30"></div>
          <div className="w-1 h-1 rounded-full bg-white/30"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;