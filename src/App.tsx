import  { useState, useEffect } from 'react';
import TransitionContainer from './components/TransitionContainer';
import ProjectStages from './components/ProjectStages';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/transitions.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".transition-container",
          start: "top top",
          end: "+=500%",
          scrub: 4,
          pin: true,
          anticipatePin: 1
        }
      });

      // Initial setup
      gsap.set(".recent-work-section", { opacity: 0, y: 30, zIndex: 0 });
      gsap.set(".gradient-bg", { opacity: 0 });

      // Build the transition sequence
      tl
      // Longer initial delay
      .to({}, { duration: 0.6 })
      
      // Keep About section stable longer
      .to(".about-section", {
        scale: 1,
        duration: 2,
        ease: "none"
      })
      
      // Start transition after 4 scrolls
      .to(".about-section", {
        scale: 1.02,
        duration: 0.4,
        ease: "power1.inOut"
      }, "+=2")
      
      // First phase: Subtle indication that transition is starting
      .to(".about-section", {
        filter: "blur(10px)",
        scale: 1.1,
        opacity: 0.8,
        duration: 0.6,
        ease: "power2.inOut"
      })
      
      // Complete fade out and adjust z-index
      .to(".about-section", {
        opacity: 0,
        scale: 1.2,
        zIndex: 0,
        duration: 0.6,
        ease: "power2.inOut"
      })
      
      // Fade in gradient background
      .to(".gradient-bg", {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut"
      })
      
      // Prepare Recent Work section
      .set(".recent-work-section", {
        zIndex: 10,
        opacity: 0,
        y: 30,
        immediate: true
      })
      
      // Longer pause before Recent Work content
      .to({}, { duration: 0.4 })
      
      // Fade in Recent Work section
      .to(".recent-work-section", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out"
      });

      // Create a ScrollTrigger for the About section entrance
      ScrollTrigger.create({
        trigger: ".about-section",
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(".about-content", {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className={`min-h-screen transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'} hide-scrollbar bg-black relative z-10 overflow-hidden`}>
        <div className="app-container">
          <TransitionContainer />
          <ProjectStages />
          <Portfolio />
          <Services />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
