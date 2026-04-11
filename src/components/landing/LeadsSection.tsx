import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface LeadsSectionProps {
  content: {
    incentiveText: string;
    successMessage: string;
  };
}

export default function LeadsSection({ content }: LeadsSectionProps) {
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      // Simulate success for preview
      setStatus('loading');
      setTimeout(() => setStatus('success'), 1000);
      return;
    }

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ ...formData, origem: 'landing_page' }]);
      
      if (error) throw error;
      setStatus('success');
      setFormData({ nome: '', email: '', telefone: '' });
    } catch (err) {
      console.error('Error saving lead:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-24 bg-sage relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-charcoal/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto bg-creme rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="w-full md:w-5/12 bg-charcoal text-creme p-10 md:p-12 flex flex-col justify-center relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="relative z-10">
              <h3 className="font-serif text-3xl font-medium mb-6">Comece sua jornada</h3>
              <p className="text-creme/80 font-light leading-relaxed mb-8">
                {content.incentiveText}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-creme/70">
                  <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Práticas semanais
                </div>
                <div className="flex items-center gap-3 text-sm text-creme/70">
                  <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Dicas de respiração
                </div>
                <div className="flex items-center gap-3 text-sm text-creme/70">
                  <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Avisos de novas turmas
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-7/12 p-10 md:p-12 bg-creme">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="font-serif text-2xl font-medium text-charcoal mb-4">Inscrição Confirmada!</h4>
                <p className="text-charcoal/70">{content.successMessage}</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sage font-medium hover:text-sage/80 transition-colors"
                >
                  Voltar
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-charcoal/70 mb-2">Nome completo</label>
                  <input 
                    type="text" 
                    id="nome" 
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-sand border-transparent focus:border-sage focus:bg-white focus:ring-0 transition-colors text-charcoal outline-none"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal/70 mb-2">E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-sand border-transparent focus:border-sage focus:bg-white focus:ring-0 transition-colors text-charcoal outline-none"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-charcoal/70 mb-2">WhatsApp (opcional)</label>
                  <input 
                    type="tel" 
                    id="telefone" 
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-sand border-transparent focus:border-sage focus:bg-white focus:ring-0 transition-colors text-charcoal outline-none"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                {status === 'error' && (
                  <p className="text-red-500 text-sm">Ocorreu um erro. Tente novamente.</p>
                )}

                {!isSupabaseConfigured && (
                  <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded-lg border border-blue-100">
                    <strong>Modo Preview:</strong> O banco de dados não está conectado. O cadastro será apenas simulado.
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="mt-4 w-full py-4 rounded-xl bg-charcoal text-white font-medium hover:bg-charcoal/90 transition-colors disabled:opacity-70 flex justify-center items-center"
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Quero receber os conteúdos'
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
