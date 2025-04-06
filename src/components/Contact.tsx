import React, { useEffect, useState, useRef } from 'react';
// @ts-ignore
import { heroBg } from '../assets/image';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-white text-white relative overflow-hidden">
      <div className="flex flex-col">
        {/* Text Container */}
        <div className="relative w-full pt-12 mb-20">
          <div className="container mx-auto px-8">
            <h1 className="text-[200px] font-bold leading-none relative flex overflow-hidden">
              {'CONTACT'.split('').map((letter, index) => (
                <span
                  key={index}
                  className="text-black relative inline-block"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible 
                      ? 'translateY(0) rotateX(0)' 
                      : 'translateY(100%) rotateX(-90deg)',
                    transition: 'all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)',
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Full Width Portrait Section */}
        <div className="relative h-[90vh] w-screen">
          {/* Portrait Background */}
          <div 
            className="absolute inset-0"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(1.2)',
              transition: 'all 1.2s cubic-bezier(0.215, 0.61, 0.355, 1)',
              transitionDelay: '0.5s'
            }}
          >
            <img 
              src={heroBg} 
              alt="Portrait" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              style={{
                objectPosition: 'center 30%',
                clipPath: isVisible 
                  ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                  : 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'
              }}
            />
            
            {/* Enhanced Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-70"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-white opacity-70"></div>
            
            {/* Corner Gradients for Smoother Edges */}
            <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-gradient-to-br from-white opacity-80"></div>
            <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-white opacity-80"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-white opacity-80"></div>
            <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-gradient-to-tl from-white opacity-80"></div>
          </div>

          {/* Contact Form Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '1s'
            }}
          >
            <div className="max-w-6xl w-full mx-auto px-8">
              {/* Contact Details */}
              <div className="grid grid-cols-3 gap-8 mb-16 text-black">
                <div className="text-center">
                  <p className="text-sm font-light mb-2">LOCATION</p>
                  <p className="text-lg">123 Creative Studio</p>
                  <p className="text-lg">Art Street, NY 10001</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-light mb-2">CONTACT</p>
                  <p className="text-lg">+1 234 567 890</p>
                  <p className="text-lg">hello@photographer.com</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-light mb-2">FOLLOW</p>
                  <p className="text-lg">Instagram</p>
                  <p className="text-lg">Behance</p>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full py-3 px-0 bg-transparent border-b border-black/20 focus:border-black text-black placeholder-black/40 focus:outline-none text-lg transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-3 px-0 bg-transparent border-b border-black/20 focus:border-black text-black placeholder-black/40 focus:outline-none text-lg transition-colors"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full py-3 px-0 bg-transparent border-b border-black/20 focus:border-black text-black placeholder-black/40 focus:outline-none text-lg resize-none transition-colors"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-12 py-3 bg-black text-white hover:bg-black/90 transition-colors text-lg"
                  >
                    Send Message →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div 
          className="relative z-20 border-t border-gray-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-in-out',
            transitionDelay: '1.2s'
          }}
        >
          <div className="container mx-auto px-8 py-8">
            <nav className="flex justify-between items-center text-lg font-light tracking-wider text-black">
              <a href="#about" className="hover:text-gray-600 transition-colors duration-300 hover:scale-110 transform">
                ABOUT ME
              </a>
              <a href="#works" className="hover:text-gray-600 transition-colors duration-300 hover:scale-110 transform">
                MY WORKS
              </a>
              <a href="#services" className="hover:text-gray-600 transition-colors duration-300 hover:scale-110 transform">
                MY SERVICES
              </a>
              <a href="#contact" className="hover:text-gray-600 transition-colors duration-300 hover:scale-110 transform">
                CONTACT ME
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 