import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

// Default videos for preview
const defaultVideos = [
  {
    id: '1',
    youtube_id: 'dQw4w9WgXcQ', // Placeholder
    titulo: 'Prática Matinal de 15 Minutos',
    destaque: true
  },
  {
    id: '2',
    youtube_id: 'dQw4w9WgXcQ',
    titulo: 'Yoga para Aliviar a Ansiedade',
    destaque: false
  },
  {
    id: '3',
    youtube_id: 'dQw4w9WgXcQ',
    titulo: 'Respiração para Dormir Melhor',
    destaque: false
  }
];

export default function VideosSection() {
  const [videos, setVideos] = useState(defaultVideos);

  useEffect(() => {
    async function fetchVideos() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .eq('ativo', true)
          .order('destaque', { ascending: false })
          .order('ordem', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setVideos(data);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    }
    fetchVideos();
  }, []);

  return (
    <section id="videos" className="py-24 bg-creme">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl font-medium text-charcoal mb-4"
            >
              Práticas em Vídeo
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-charcoal/70 max-w-xl"
            >
              Acompanhe aulas completas e tutoriais diretamente do canal do YouTube.
            </motion.p>
          </div>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="https://www.youtube.com/channel/UCFkbpRdtwx5lMc3Dl2kB7xQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-terracotta font-medium hover:text-terracotta/80 transition-colors"
          >
            Ver todos no YouTube
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-sand shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video relative">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtube_id}?rel=0`}
                  title={video.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                ></iframe>
              </div>
              <div className="p-6">
                {video.destaque && (
                  <span className="inline-block px-3 py-1 bg-sage/10 text-sage text-xs font-medium rounded-full mb-3 uppercase tracking-wider">
                    Gratuito
                  </span>
                )}
                <h3 className="font-serif text-xl font-medium text-charcoal line-clamp-2">
                  {video.titulo}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
