import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import FreeExperienceSection from '../components/landing/FreeExperienceSection';
import VideosSection from '../components/landing/VideosSection';
import ReelsSection from '../components/landing/ReelsSection';
import LeadsSection from '../components/landing/LeadsSection';
import Footer from '../components/landing/Footer';
import Navbar from '../components/landing/Navbar';

// Default content for when Supabase is not configured or data is missing
const defaultContent = {
  hero: {
    title: 'Respire. Conecte-se. Transforme-se.',
    subtitle: 'Práticas de yoga e respiração consciente para trazer mais equilíbrio e presença para o seu dia a dia.',
    ctaText: 'Começar agora',
    secondaryText: 'Saiba mais',
    backgroundImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop'
  },
  about: {
    text: 'Olá, sou Maykon. Minha jornada com o yoga começou há mais de 10 anos. Acredito que a prática deve ser acessível, orgânica e adaptada à realidade de cada um. Meu foco é ajudar você a encontrar espaço no corpo e na mente através da respiração consciente e do movimento fluido.',
    photoUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=800&auto=format&fit=crop',
    stats: [
      { label: 'Anos de Experiência', value: '10+' },
      { label: 'Alunos Transformados', value: '500+' },
      { label: 'Estilo de Prática', value: 'Vinyasa & Hatha' }
    ]
  },
  leads: {
    incentiveText: 'Receba práticas exclusivas no seu e-mail e comece sua jornada de transformação hoje mesmo.',
    successMessage: 'Obrigado por se inscrever! Em breve você receberá novidades.'
  },
  footer: {
    copyright: '© 2026 Inspira Yoga por Maykon. Todos os direitos reservados.',
    instagramUrl: 'https://www.instagram.com/maykon_yoga/',
    youtubeUrl: 'https://www.youtube.com/channel/UCFkbpRdtwx5lMc3Dl2kB7xQ'
  }
};

export default function LandingPage() {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('*');
        
        if (error) throw error;

        if (data && data.length > 0) {
          const contentMap = data.reduce((acc, item) => {
            acc[item.chave] = item.valor;
            return acc;
          }, {} as any);
          
          setContent(prev => ({
            ...prev,
            ...contentMap
          }));
        }
      } catch (err) {
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-creme">
        <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-creme text-charcoal font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <FreeExperienceSection />
        <VideosSection />
        <ReelsSection />
        <LeadsSection content={content.leads} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}
