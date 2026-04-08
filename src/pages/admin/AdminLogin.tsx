import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured) {
      // Mock login for preview
      if (email === 'admin@inspirayoga.com' && password === 'admin') {
        localStorage.setItem('mock_admin_auth', 'true');
        navigate('/admin');
      } else {
        setError('Credenciais inválidas. (Dica: admin@inspirayoga.com / admin)');
      }
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-creme flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-semibold text-charcoal mb-2">
            Inspira<span className="text-sage">Yoga</span>
          </h1>
          <p className="text-charcoal/60">Painel Administrativo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-2">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-sand border border-transparent focus:border-sage focus:bg-white outline-none transition-colors"
              placeholder="admin@inspirayoga.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-2">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-sand border border-transparent focus:border-sage focus:bg-white outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-charcoal text-white rounded-xl font-medium hover:bg-charcoal/90 transition-colors disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
        
        {!isSupabaseConfigured && (
          <div className="mt-8 p-4 bg-blue-50 text-blue-800 text-sm rounded-xl border border-blue-100">
            <strong>Modo Preview:</strong> O Supabase não está configurado. Use <code>admin@inspirayoga.com</code> e senha <code>admin</code> para testar a interface.
          </div>
        )}
      </div>
    </div>
  );
}
