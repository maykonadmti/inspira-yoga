import React from 'react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  content: {
    text: string;
    photoUrl: string;
    stats: { label: string; value: string }[];
  };
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="sobre" className="py-24 bg-creme relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl">
              <img 
                src={content.photoUrl} 
                alt="Maykon - Instrutor de Yoga" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-sand rounded-full -z-10 blur-3xl opacity-60"></div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-charcoal mb-8">
              Sobre Mim
            </h2>
            <div className="prose prose-lg text-charcoal/80 font-light leading-relaxed mb-12">
              <p>{content.text}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {content.stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  className="flex flex-col"
                >
                  <span className="font-serif text-4xl text-terracotta mb-2">{stat.value}</span>
                  <span className="text-sm font-medium text-charcoal/60 uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
