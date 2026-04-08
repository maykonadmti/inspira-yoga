import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

// Default reels for preview
const defaultReels = [
  { id: '1', instagram_url: 'https://www.instagram.com/p/placeholder1/' },
  { id: '2', instagram_url: 'https://www.instagram.com/p/placeholder2/' },
  { id: '3', instagram_url: 'https://www.instagram.com/p/placeholder3/' },
  { id: '4', instagram_url: 'https://www.instagram.com/p/placeholder4/' },
];

export default function ReelsSection() {
  const [reels, setReels] = useState(defaultReels);

  useEffect(() => {
    async function fetchReels() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from('reels')
          .select('*')
          .eq('ativo', true)
          .order('ordem', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setReels(data);
        }
      } catch (err) {
        console.error('Error fetching reels:', err);
      }
    }
    fetchReels();
  }, []);

  return (
    <section className="py-24 bg-sand overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-medium text-charcoal mb-4"
          >
            Inspirações Diárias
          </motion.h2>
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            href="https://www.instagram.com/maykon_yoga/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage hover:text-sage/80 font-medium transition-colors"
          >
            @maykon_yoga
          </motion.a>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 gap-6 snap-x snap-mandatory hide-scrollbar">
          {reels.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-none w-64 md:w-72 aspect-[9/16] bg-creme rounded-2xl shadow-md snap-center relative overflow-hidden group cursor-pointer"
            >
              {/* Placeholder for Instagram Embed */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <svg className="w-12 h-12 text-charcoal/20 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <p className="text-sm text-charcoal/40 font-medium">Reel do Instagram</p>
                <p className="text-xs text-charcoal/30 mt-2 break-all">{reel.instagram_url}</p>
              </div>
              <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
