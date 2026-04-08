import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { LayoutDashboard, Image, FileText, PlaySquare, Instagram, Users, Settings, LogOut } from 'lucide-react';
import { HeroTab, AboutTab, ExperienceTab, VideosTab, ReelsTab, LeadsTab, SettingsTab } from '../../components/admin/AdminTabs';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isSupabaseConfigured) {
        const isMockAuth = localStorage.getItem('mock_admin_auth');
        if (!isMockAuth) navigate('/admin/login');
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    if (!isSupabaseConfigured) {
      localStorage.removeItem('mock_admin_auth');
      navigate('/admin/login');
      return;
    }
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-sand">Carregando...</div>;
  }

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Hero' },
    { path: '/admin/sobre', icon: FileText, label: 'Sobre' },
    { path: '/admin/experiencia', icon: Image, label: 'Experiência' },
    { path: '/admin/videos', icon: PlaySquare, label: 'Vídeos' },
    { path: '/admin/reels', icon: Instagram, label: 'Reels' },
    { path: '/admin/leads', icon: Users, label: 'Leads' },
    { path: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  return (
    <div className="min-h-screen bg-sand flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-charcoal text-creme flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-serif text-2xl font-semibold tracking-tight">
            Inspira<span className="text-sage">Yoga</span>
          </h1>
          <p className="text-xs text-creme/50 mt-1">Painel Admin</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-sage text-white' 
                    : 'text-creme/70 hover:bg-white/5 hover:text-creme'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-creme/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<HeroTab />} />
            <Route path="/sobre" element={<AboutTab />} />
            <Route path="/experiencia" element={<ExperienceTab />} />
            <Route path="/videos" element={<VideosTab />} />
            <Route path="/reels" element={<ReelsTab />} />
            <Route path="/leads" element={<LeadsTab />} />
            <Route path="/configuracoes" element={<SettingsTab />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
