import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

// Default asanas for preview
const defaultAsanas = [
  {
    id: '1',
    nome: 'Balasana (Postura da Criança)',
    descricao: 'Acalma a mente e alivia o estresse. Sente-se sobre os calcanhares e alongue os braços à frente.',
    duracao_segundos: 60,
    imagem_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    nome: 'Adho Mukha Svanasana (Cachorro Olhando para Baixo)',
    descricao: 'Alonga o corpo inteiro e energiza. Mantenha as mãos e pés no chão, elevando o quadril.',
    duracao_segundos: 45,
    imagem_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    nome: 'Bhujangasana (Postura da Cobra)',
    descricao: 'Abre o peito e fortalece a coluna. Deite-se de bruços e eleve suavemente o tronco.',
    duracao_segundos: 30,
    imagem_url: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=800&auto=format&fit=crop'
  }
];

function BreathingPlayer() {
  const [phase, setPhase] = useState<'idle' | 'inspire' | 'segure' | 'exale'>('idle');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes total
  const [isActive, setIsActive] = useState(false);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);

  useEffect(() => {
    let globalInterval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      globalInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setPhase('idle');
    }
    return () => clearInterval(globalInterval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (!isActive) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const runBreathingCycle = () => {
      setPhase('inspire');
      setPhaseTimeLeft(4);
      
      timeoutId = setTimeout(() => {
        setPhase('segure');
        setPhaseTimeLeft(7);
        
        timeoutId = setTimeout(() => {
          setPhase('exale');
          setPhaseTimeLeft(8);
          
          timeoutId = setTimeout(runBreathingCycle, 8000);
        }, 7000);
      }, 4000);
    };

    runBreathingCycle();

    intervalId = setInterval(() => {
      setPhaseTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isActive]);

  const toggleTimer = () => {
    if (!isActive && timeLeft === 0) setTimeLeft(180);
    setIsActive(!isActive);
    if (isActive) setPhase('idle');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl mb-16 flex flex-col items-center text-center relative overflow-hidden border border-sage/10">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sage via-terracotta to-sage opacity-50"></div>
      
      <h3 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-4">Respiração Guiada (4-7-8)</h3>
      <p className="text-charcoal/60 mb-16 max-w-lg text-lg">
        Acompanhe o círculo. Inspire, segure e exale para reduzir a ansiedade e promover relaxamento profundo.
      </p>

      <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center mb-16 mx-auto">
        {/* Outer decorative dashed ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-sage/30 animate-[spin_60s_linear_infinite]"></div>

        {/* Breathing Circle */}
        <motion.div
          className="absolute rounded-full bg-gradient-to-tr from-sage/40 to-sage/10 backdrop-blur-md border border-sage/30 shadow-[0_0_40px_rgba(138,154,146,0.3)]"
          initial={false}
          animate={{
            width: isActive ? (phase === 'inspire' || phase === 'segure' ? '100%' : '40%') : '40%',
            height: isActive ? (phase === 'inspire' || phase === 'segure' ? '100%' : '40%') : '40%',
            opacity: isActive ? (phase === 'segure' ? 0.8 : 1) : 0.6,
          }}
          transition={{
            duration: phase === 'inspire' ? 4 : phase === 'segure' ? 7 : phase === 'exale' ? 8 : 1,
            ease: phase === 'inspire' ? "easeOut" : phase === 'exale' ? "easeInOut" : "linear"
          }}
        />

        {/* Inner Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm md:text-base font-medium text-charcoal/70 uppercase tracking-[0.25em] mb-2"
            >
              {phase === 'idle' ? 'Pronto?' : phase === 'inspire' ? 'Inspire' : phase === 'segure' ? 'Segure' : 'Exale'}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.span
              key={isActive ? phaseTimeLeft : '4'}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.2 }}
              className="text-7xl md:text-8xl font-serif text-charcoal tabular-nums leading-none"
            >
              {isActive ? phaseTimeLeft : '4'}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <div className="flex flex-col items-center">
          <span className="text-xs text-charcoal/40 uppercase tracking-wider mb-1">Tempo Restante</span>
          <div className="text-xl text-charcoal/80 font-medium tabular-nums font-mono">
            {formatTime(timeLeft)}
          </div>
        </div>
        <button 
          onClick={toggleTimer}
          className="px-10 py-4 rounded-full bg-charcoal text-white font-medium hover:bg-charcoal/90 transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0 min-w-[200px]"
        >
          {isActive ? 'Pausar Prática' : timeLeft === 0 ? 'Recomeçar' : 'Iniciar Prática'}
        </button>
      </div>
    </div>
  );
}

export default function FreeExperienceSection() {
  const [asanas, setAsanas] = useState(defaultAsanas);
  const [currentAsanaIndex, setCurrentAsanaIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(defaultAsanas[0].duracao_segundos);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    async function fetchAsanas() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from('asanas')
          .select('*')
          .eq('ativo', true)
          .order('ordem', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setAsanas(data);
          setTimeLeft(data[0].duracao_segundos);
        }
      } catch (err) {
        console.error('Error fetching asanas:', err);
      }
    }
    fetchAsanas();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleNext();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleNext = () => {
    const nextIndex = (currentAsanaIndex + 1) % asanas.length;
    setCurrentAsanaIndex(nextIndex);
    setTimeLeft(asanas[nextIndex].duracao_segundos);
    setIsActive(false);
  };

  const handlePrev = () => {
    const prevIndex = currentAsanaIndex === 0 ? asanas.length - 1 : currentAsanaIndex - 1;
    setCurrentAsanaIndex(prevIndex);
    setTimeLeft(asanas[prevIndex].duracao_segundos);
    setIsActive(false);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentAsana = asanas[currentAsanaIndex];

  return (
    <section id="praticas" className="py-24 bg-sand relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-medium text-charcoal mb-4"
          >
            Experiência Gratuita
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-charcoal/70 max-w-2xl mx-auto"
          >
            Uma sequência curta para você experimentar os benefícios da prática agora mesmo.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <BreathingPlayer />
          
          <div className="bg-creme rounded-[2rem] shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentAsana.id}
                    src={currentAsana.imagem_url}
                    alt={currentAsana.nome}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent md:hidden"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6 text-sm font-medium text-sage uppercase tracking-wider">
                    <span>Postura {currentAsanaIndex + 1} de {asanas.length}</span>
                    <span>{formatTime(currentAsana.duracao_segundos)}</span>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentAsana.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-4">
                        {currentAsana.nome}
                      </h3>
                      <p className="text-charcoal/70 font-light leading-relaxed mb-8">
                        {currentAsana.descricao}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-6">
                  <div className="text-4xl font-serif text-terracotta tabular-nums">
                    {formatTime(timeLeft)}
                  </div>
                  
                  <div className="flex items-center gap-4 w-full justify-center">
                    <button 
                      onClick={handlePrev}
                      className="p-3 rounded-full hover:bg-sand transition-colors text-charcoal/60 hover:text-charcoal"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    
                    <button 
                      onClick={toggleTimer}
                      className="w-16 h-16 rounded-full bg-sage text-white flex items-center justify-center hover:bg-sage/90 transition-transform hover:scale-105 shadow-lg"
                    >
                      {isActive ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="m7 3 14 9-14 9z"/></svg>
                      )}
                    </button>
                    
                    <button 
                      onClick={handleNext}
                      className="p-3 rounded-full hover:bg-sand transition-colors text-charcoal/60 hover:text-charcoal"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
