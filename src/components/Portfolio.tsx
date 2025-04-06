import React, { useState } from 'react';
// @ts-ignore
import { house, house2, house3, house4, house5, house6, house7, house8, house9 } from '../assets/image';

const portfolioItems = [
  { 
    image: house, 
    title: "Urban Life",
    description: "Capturing the essence of modern city living through architectural photography.",
    pageCount: "01/32"
  },
  { 
    image: house2, 
    title: "Portrait Art",
    description: "Expressive portrait photography that tells unique personal stories.",
    pageCount: "05/32"
  },
  { 
    image: house3, 
    title: "Fashion",
    description: "High-end fashion photography for contemporary brands and magazines.",
    pageCount: "12/32"
  },
  { 
    image: house4, 
    title: "Street Style",
    description: "Documenting authentic street fashion and urban culture.",
    pageCount: "15/32"
  },
  { 
    image: house5, 
    title: "Editorial",
    description: "Creative editorial photography for magazines and publications.",
    pageCount: "18/32"
  },
  { 
    image: house6, 
    title: "Black & White",
    description: "Timeless black and white photography with dramatic contrasts.",
    pageCount: "22/32"
  },
  { 
    image: house7, 
    title: "Lifestyle",
    description: "Natural lifestyle photography capturing genuine moments.",
    pageCount: "25/32"
  },
  { 
    image: house8, 
    title: "Portraits",
    description: "Professional portrait photography with artistic direction.",
    pageCount: "28/32"
  },
  { 
    image: house9, 
    title: "Modern Art",
    description: "Contemporary art photography pushing creative boundaries.",
    pageCount: "31/32"
  }
];

const Portfolio: React.FC = () => {
  const [activeItem, setActiveItem] = useState<typeof portfolioItems[0] | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMouseEnter = (item: typeof portfolioItems[0]) => {
    setIsTransitioning(true);
    setActiveItem(item);
    setTimeout(() => setIsTransitioning(false), 50);
  };

  return (
    <section className="relative py-20 min-h-screen bg-white overflow-hidden">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: activeItem ? 1 : 0,
          backgroundImage: activeItem ? `url('${activeItem.image}')` : 'none',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `scale(${isTransitioning ? 1.05 : 1})`,
          transition: 'all 0.7s ease-in-out'
        }}
      />

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-white transition-opacity duration-700 ease-in-out"
        style={{
          opacity: activeItem ? 0.3 : 1
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left side - Portfolio Info */}
          <div className="space-y-8">
            <div className="h-20"> {/* Fixed height container for title */}
              <h2 
                className="text-5xl font-bold transform transition-all duration-700 ease-in-out"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: `translateY(${isTransitioning ? '20px' : '0'})`
                }}
              >
                {activeItem ? activeItem.title : "Amazing Portfolio"}
              </h2>
            </div>
            <div className="space-y-2">
              <div 
                className="text-2xl font-light transform transition-all duration-700 ease-in-out"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: `translateX(${isTransitioning ? '-20px' : '0'})`
                }}
              >
                {activeItem ? activeItem.pageCount : "04/32"}
              </div>
              <div className="text-sm text-gray-600">PAGES LEFT</div>
            </div>
            <div className="h-24"> {/* Fixed height container for description */}
              <p 
                className="text-sm text-gray-600 max-w-sm transform transition-all duration-700 ease-in-out"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: `translateY(${isTransitioning ? '20px' : '0'})`
                }}
              >
                {activeItem 
                  ? activeItem.description 
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum sagittis lacus, laoreet luctus."}
              </p>
            </div>
            <button className="px-8 py-3 bg-black text-white text-sm hover:bg-gray-800 transition-colors">
              View Project →
            </button>
          </div>

          {/* Right side - Image Grid */}
          <div className="grid grid-cols-3 gap-6 auto-rows-[160px]">
            {portfolioItems.map((item, index) => (
              <div 
                key={index} 
                className="portfolio-image-container relative overflow-hidden group cursor-pointer"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                }}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="portfolio-image w-full h-full object-cover grayscale transition-all duration-500"
                />
                <div className="image-title absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-all duration-300">
                  <span className="text-white text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 