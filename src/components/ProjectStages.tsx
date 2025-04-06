import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import { person22, person21, person55 , person69 } from '../assets/image';

const stages = [
  {
    title: 'Concept Development',
    description: 'Crafting the visual narrative and artistic direction',
    image: person22,
    number: '01'
  },
  {
    title: 'Production Design',
    description: 'Location scouting, set design, and lighting setup',
    image: person69,
    number: '02'
  },
  {
    title: 'Post Production',
    description: 'Editing, color grading, and final retouching',
    image: person55,
    number: '03'
  }
];

const ProjectStages: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 py-24">
        <motion.h2 
          className="text-7xl font-light mb-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Creative Process
        </motion.h2>

        <div className="flex flex-col gap-24">
          {stages.map((stage, index) => (
            <motion.div 
              key={index}
              className="group relative h-screen flex items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              </div>

              <div className="relative z-10 max-w-2xl pl-12">
                <div className="text-8xl font-light text-white/20 mb-4">{stage.number}</div>
                <h3 className="text-5xl font-light mb-6">{stage.title}</h3>
                <p className="text-white/80 text-lg">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectStages; 