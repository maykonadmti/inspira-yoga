import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Práticas', href: '#praticas' },
    { name: 'Vídeos', href: '#videos' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-creme/80 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="font-serif text-2xl font-semibold text-charcoal tracking-tight">
          Inspira<span className="text-sage">Yoga</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-charcoal/80 hover:text-sage transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contato"
            className="px-5 py-2 rounded-full bg-sage text-white text-sm font-medium hover:bg-sage/90 transition-colors"
          >
            Começar
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-charcoal"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-creme border-t border-sand mt-4"
        >
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-base font-medium text-charcoal/80 py-2 border-b border-sand/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contato"
              className="mt-2 px-5 py-3 rounded-full bg-sage text-white text-center font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Começar
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
