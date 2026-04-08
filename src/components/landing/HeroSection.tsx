import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  content: {
    title: string;
    subtitle: string;
    ctaText: string;
    secondaryText: string;
    backgroundImage: string;
  };
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={content.backgroundImage} 
          alt="Yoga Background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-creme/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-medium text-charcoal leading-tight mb-6">
            {content.title}
          </h1>
          <p className="text-lg md:text-xl text-charcoal/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {content.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#praticas"
              className="px-8 py-4 rounded-full bg-sage text-white font-medium hover:bg-sage/90 transition-all hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
            >
              {content.ctaText}
            </a>
            <a 
              href="#sobre"
              className="px-8 py-4 rounded-full bg-transparent border border-charcoal/20 text-charcoal font-medium hover:bg-charcoal/5 transition-all w-full sm:w-auto"
            >
              {content.secondaryText}
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative organic shape */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-creme to-transparent z-10"></div>
    </section>
  );
}
