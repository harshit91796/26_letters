import React, { useRef, useEffect, useState } from 'react';
import { motion, } from 'framer-motion';
// @ts-ignore
import { person14, person9 , person59 , person66 , person63, person34 } from '../assets/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Portrait Artistry',
    subtitle: 'Human Connection Captured',
    image: person14,
    number: '01'
  },
  {
    title: 'Fashion Narratives',
    subtitle: 'Editorial Storytelling',
    image: person9,
    number: '02'
  },
  {
    title: 'Architectural Poetry',
    subtitle: 'Structures in Light',
    image: person59,
    number: '03'
  },
  {
    title: 'Event Chronicles',
    subtitle: 'Moments Preserved',
    image: person66,
    number: '04'
  },
  {
    title: 'Conceptual Vision',
    subtitle: 'Imagery with Purpose',
    image: person63,
    number: '05'
  },
  {
    title: 'Post Production',
    subtitle: 'Digital Alchemy',
    image: person34,
    number: '06'
  }
];

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ['start end', 'end start']
  // });

  // const x = useTransform(scrollYProgress, [0, 1], ['0%', '-150%']);

  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    if (direction === 'right') {
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
      setCurrentSlide(prev => Math.min(prev + 1, services.length - 1));
    } else {
      container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !isActive) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        element.scrollLeft += e.deltaY * 2;
      }
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [isActive]);

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      <div 
        ref={containerRef}
        className="h-full overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
      >
        <div className="h-full flex w-max">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative h-screen w-screen flex-shrink-0 snap-center"
            >
              <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full w-full will-change-transform"
                >
                  <div className="relative h-full flex items-center justify-center">
                    <div className="group relative h-[80vh] w-[80vw] overflow-hidden rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 z-10" />
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
                      />
                      
                      <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                        <div className="text-8xl font-light text-white/20">
                          {service.number}
                        </div>
                        
                        <div className="space-y-4">
                          <motion.h3 
                            className="text-5xl font-light text-white"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {service.title}
                          </motion.h3>
                          <p className="text-xl text-white/80 font-light">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-8 right-8 z-30">
                        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                          →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 w-full px-8 flex justify-between z-30">
        <button
          onClick={() => handleScroll('left')}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 disabled:opacity-30"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        
        <button
          onClick={() => handleScroll('right')}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 disabled:opacity-30"
          disabled={currentSlide === services.length - 1}
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {services.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-8 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Services; 