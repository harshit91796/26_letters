import React from 'react';
import { motion, AnimatePresence, MotionValue } from 'framer-motion';
// @ts-ignore
import { house } from '../assets/image';
import { useTransform } from 'framer-motion';

interface AboutProps {
  isVisible: boolean;
  isTransitioning: boolean;
  smoothProgress: MotionValue<number>;
}

const About: React.FC<AboutProps> = ({ isVisible, isTransitioning, smoothProgress }) => {
  // Now use the MotionValue with useTransform
  const aboutContentOpacity = useTransform(smoothProgress,
    [0.4, 0.5],
    [1, 0]
  );

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 50 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(3px)",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 1.1,
          filter: isTransitioning ? "blur(3px)" : "blur(0px)"
        }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <img 
          src={house} 
          alt="About Background" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80" />
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div 
            className="relative z-30 container mx-auto px-4 h-full py-20"
            style={{ opacity: aboutContentOpacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="h-full flex flex-col justify-center">
              {/* Title Section */}
              <motion.div className="mb-16" variants={itemVariants}>
                <motion.h2 
                  className="text-8xl font-light text-white mb-6"
                  variants={itemVariants}
                >
                  ABOUT US.
                </motion.h2>
                <motion.p 
                  className="text-white/60 text-lg tracking-wider max-w-2xl"
                  variants={itemVariants}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore.
                </motion.p>
              </motion.div>

              {/* Grid Section */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-12"
                variants={itemVariants}
              >
                {[
                  { number: "01", title: "Our Vision" },
                  { number: "02", title: "Our Mission" },
                  { number: "03", title: "Our Approach" }
                ].map((item) => (
                  <motion.div
                    key={item.number}
                    className="space-y-6"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div className="text-7xl font-light text-white/20">
                      {item.number}
                    </motion.div>
                    <motion.h3 className="text-2xl font-light text-white mb-4">
                      {item.title}
                    </motion.h3>
                    <motion.p className="text-white/60 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom Text */}
              <motion.div 
                className="mt-20 flex justify-between items-end"
                variants={itemVariants}
              >
                <div className="text-white/40 text-sm tracking-wider">
                  SCROLL FOR MORE
                </div>
                <div className="text-white/40 text-sm tracking-wider">
                  02 / 07
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About; 