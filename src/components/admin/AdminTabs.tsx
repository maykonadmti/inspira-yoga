import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Trash2, Plus, Save, Users } from 'lucide-react';
import ImageUpload from './ImageUpload';

const notify = (msg: string) => alert(msg);

export const HeroTab = () => {
  const [data, setData] = useState({
    title: 'Inspira Yoga',
    subtitle: 'Encontre equilíbrio, força e paz interior através de práticas guiadas que transformam corpo e mente.',
    ctaText: 'Começar agora',
    secondaryText: 'Saiba mais',
    backgroundImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2000&auto=format&fit=crop'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from('site_content').select('valor').eq('chave', 'hero').single().then(({data: res}) => {
      if (res?.valor) setData(res.valor);
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase.from('site_content').upsert({ chave: 'hero', valor: data });
    setLoading(false);
    if (error) notify('Erro ao salvar. Verifique se as tabelas foram criadas no Supabase.');
    else notify('Salvo com sucesso!');
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-xl font-serif mb-6">Configurações do Hero</h2>
      <div className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1 text-charcoal/80">Título</label>
          <input className="w-full p-3 bg-sand border border-transparent focus:border-sage focus:bg-white rounded-xl outline-none transition-colors" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-charcoal/80">Subtítulo</label>
          <textarea className="w-full p-3 bg-sand border border-transparent focus:border-sage focus:bg-white rounded-xl outline-none transition-colors" rows={3} value={data.subtitle} onChange={e => setData({...data, subtitle: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-charcoal/80">Texto Botão Principal</label>
          <input className="w-full p-3 bg-sand border border-transparent focus:border-sage focus:bg-white rounded-xl outline-none transition-colors" value={data.ctaText} onChange={e => setData({...data, ctaText: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-charcoal/80">Texto Botão Secundário</label>
          <input className="w-full p-3 bg-sand border border-transparent focus:border-sage focus:bg-white rounded-xl outline-none transition-colors" value={data.secondaryText} onChange={e => setData({...data, secondaryText: e.target.value})} />
        </div>
        <ImageUpload 
          value={data.backgroundImage} 
          onChange={url => setData({...data, backgroundImage: url})} 
          label="Imagem de Fundo (Hero)" 
        />
        <button onClick={handleSave} disabled={loading} className="px-6 py-3 bg-charcoal text-white rounded-xl font-medium hover:bg-charcoal/90 transition-colors flex items-center gap-2 mt-4">
          <Save size={18} /> {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </div>
  );
};

export const AboutTab = () => {
  const [data, setData] = useState({
    title: 'Sobre Mim',
    description: 'Olá, sou Maykon. Minha jornada com o yoga começou há mais de 10 anos...',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=800&auto=format&fit=crop',
    stats: [
      { label: 'Alunos Transformados', value: '+500' },
      { label: 'Horas de Prática', value: '+1000' },
      { label: 'Estilo de Prática', value: 'Vinyasa & Hatha' }
    ]
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from('site_content').select('valor').eq('chave', 'about').single().then(({data: res}) => {
      if (res?.valor) setData(res.valor);
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase.from('site_content').upsert({ chave: 'about', valor: data });
    setLoading(false);
    if (error) notify('Erro ao salvar. Verifique se as tabelas foram criadas no Supabase.');
    else notify('Salvo com sucesso!');
  };

  const handleStatChange = (index: number, field: 'label' | 'value', newValue: string) => {
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: newValue };
    setData({ ...data, stats: newStats });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-xl font-serif mb-6">Configurações Sobre</h2>
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-charcoal/80">Título</label>
            <input className="w-full p-3 bg-sand border border-transparent focus:border-sage focus:bg-white rounded-xl outline-none transition-colors" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-charcoal/80">Descrição</label>
            <textarea className="w-full p-3 bg-sand border border-transparent focus:border-sage focus:bg-white rounded-xl outline-none transition-colors" rows={5} value={data.description} onChange={e => setData({...data, description: e.target.value})} />
          </div>
          <ImageUpload 
            value={data.image} 
            onChange={url => setData({...data, image: url})} 
            label="Foto de Perfil" 
          />
        </div>

        <div className="pt-4 border-t border-sand">
          <h3 className="font-medium text-charcoal mb-4">Estatísticas / Destaques</h3>
          <div className="space-y-4">
            {data.stats.map((stat, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-xs text-charcoal/60 mb-1">Rótulo {index + 1}</label>
                  <input
                    className="w-full p-3 bg-sand border border-transparent focus:border-sage focus:bg-white rounded-xl outline-none transition-colors"
                    value={stat.label}
                    onChange={e => handleStatChange(index, 'label', e.target.value)}
                    placeholder="Ex: Alunos Transformados"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs text-charcoal/60 mb-1">Valor {index + 1}</label>
                  <input
                    className="w-full p-3 bg-sand border border-transparent focus:border-sage focus:bg-white rounded-xl outline-none transition-colors"
                    value={stat.value}
                    onChange={e => handleStatChange(index, 'value', e.target.value)}
                    placeholder="Ex: +500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSave} disabled={loading} className="px-6 py-3 bg-charcoal text-white rounded-xl font-medium hover:bg-charcoal/90 transition-colors flex items-center gap-2 mt-4">
          <Save size={18} /> {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </div>
  );
};

export const ExperienceTab = () => {
  const [asanas, setAsanas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newAsana, setNewAsana] = useState({ nome: '', descricao: '', duracao_segundos: 60, imagem_url: '', ordem: 0 });

  useEffect(() => { fetchAsanas(); }, []);

  const fetchAsanas = async () => {
    const { data } = await supabase.from('asanas').select('*').order('ordem', { ascending: true });
    if (data) setAsanas(data);
  };

  const handleAdd = async () => {
    if (!newAsana.nome || !newAsana.imagem_url) return notify('Preencha nome e imagem');
    setLoading(true);
    const { error } = await supabase.from('asanas').insert([newAsana]);
    setLoading(false);
    if (error) notify('Erro: ' + error.message);
    else {
      setNewAsana({ nome: '', descricao: '', duracao_segundos: 60, imagem_url: '', ordem: asanas.length + 1 });
      fetchAsanas();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover esta postura?')) return;
    await supabase.from('asanas').delete().eq('id', id);
    fetchAsanas();
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-xl font-serif mb-6">Experiência Gratuita (Asanas)</h2>
      
      <div className="mb-8 p-6 bg-sand rounded-2xl space-y-4 max-w-2xl">
        <h3 className="font-medium text-charcoal">Adicionar Nova Postura</h3>
        <input placeholder="Nome da Postura" className="w-full p-3 bg-white border border-transparent focus:border-sage rounded-xl outline-none" value={newAsana.nome} onChange={e => setNewAsana({...newAsana, nome: e.target.value})} />
        <textarea placeholder="Descrição" className="w-full p-3 bg-white border border-transparent focus:border-sage rounded-xl outline-none" value={newAsana.descricao} onChange={e => setNewAsana({...newAsana, descricao: e.target.value})} />
        <div className="flex gap-4">
          <input type="number" placeholder="Duração (segundos)" className="w-1/2 p-3 bg-white border border-transparent focus:border-sage rounded-xl outline-none" value={newAsana.duracao_segundos} onChange={e => setNewAsana({...newAsana, duracao_segundos: Number(e.target.value)})} />
          <input type="number" placeholder="Ordem" className="w-1/2 p-3 bg-white border border-transparent focus:border-sage rounded-xl outline-none" value={newAsana.ordem} onChange={e => setNewAsana({...newAsana, ordem: Number(e.target.value)})} />
        </div>
        <ImageUpload 
          value={newAsana.imagem_url} 
          onChange={url => setNewAsana({...newAsana, imagem_url: url})} 
          label="Imagem da Postura" 
        />
        <button onClick={handleAdd} disabled={loading} className="px-6 py-3 bg-sage text-white rounded-xl font-medium hover:bg-sage/90 transition-colors flex items-center gap-2 mt-2">
          <Plus size={18} /> Adicionar Postura
        </button>
      </div>

      <div className="space-y-4 max-w-2xl">
        {asanas.map(a => (
          <div key={a.id} className="flex items-center justify-between p-4 border border-sand rounded-xl hover:border-sage/30 transition-colors">
            <div className="flex items-center gap-4">
              <img src={a.imagem_url} alt={a.nome} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <p className="font-medium text-charcoal">{a.nome}</p>
                <p className="text-sm text-charcoal/60">{a.duracao_segundos} segundos</p>
              </div>
            </div>
            <button onClick={() => handleDelete(a.id)} className="text-terracotta p-2 hover:bg-terracotta/10 rounded-lg transition-colors"><Trash2 size={20} /></button>
          </div>
        ))}
        {asanas.length === 0 && <p className="text-charcoal/50">Nenhuma postura cadastrada. As posturas padrão serão exibidas no site.</p>}
      </div>
    </div>
  );
};

export const VideosTab = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newVideo, setNewVideo] = useState({ titulo: '', youtube_url: '', ordem: 0 });

  useEffect(() => { fetchVideos(); }, []);

  const fetchVideos = async () => {
    const { data } = await supabase.from('videos').select('*').order('ordem', { ascending: true });
    if (data) setVideos(data);
  };

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAdd = async () => {
    const youtube_id = extractYoutubeId(newVideo.youtube_url);
    if (!newVideo.titulo || !youtube_id) return notify('Preencha o título e uma URL válida do YouTube');
    
    setLoading(true);
    const { error } = await supabase.from('videos').insert([{ ...newVideo, youtube_id }]);
    setLoading(false);
    if (error) notify('Erro: ' + error.message);
    else {
      setNewVideo({ titulo: '', youtube_url: '', ordem: videos.length + 1 });
      fetchVideos();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza?')) return;
    await supabase.from('videos').delete().eq('id', id);
    fetchVideos();
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-xl font-serif mb-6">Vídeos do YouTube</h2>
      
      <div className="mb-8 p-6 bg-sand rounded-2xl space-y-4 max-w-2xl">
        <h3 className="font-medium text-charcoal">Adicionar Novo Vídeo</h3>
        <input placeholder="Título do Vídeo" className="w-full p-3 bg-white border border-transparent focus:border-sage rounded-xl outline-none" value={newVideo.titulo} onChange={e => setNewVideo({...newVideo, titulo: e.target.value})} />
        <input placeholder="URL do YouTube (ex: https://youtube.com/watch?v=...)" className="w-full p-3 bg-white border border-transparent focus:border-sage rounded-xl outline-none" value={newVideo.youtube_url} onChange={e => setNewVideo({...newVideo, youtube_url: e.target.value})} />
        <button onClick={handleAdd} disabled={loading} className="px-6 py-3 bg-sage text-white rounded-xl font-medium hover:bg-sage/90 transition-colors flex items-center gap-2">
          <Plus size={18} /> Adicionar Vídeo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {videos.map(v => (
          <div key={v.id} className="border border-sand rounded-2xl p-4 flex flex-col gap-3 hover:border-sage/30 transition-colors">
            <img src={`https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`} alt={v.titulo} className="w-full rounded-xl object-cover aspect-video" />
            <div className="flex justify-between items-start mt-2">
              <p className="font-medium text-charcoal line-clamp-2">{v.titulo}</p>
              <button onClick={() => handleDelete(v.id)} className="text-terracotta p-2 hover:bg-terracotta/10 rounded-lg transition-colors"><Trash2 size={20} /></button>
            </div>
          </div>
        ))}
        {videos.length === 0 && <p className="text-charcoal/50 col-span-2">Nenhum vídeo cadastrado. Os vídeos padrão serão exibidos.</p>}
      </div>
    </div>
  );
};

export const ReelsTab = () => {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newReel, setNewReel] = useState({ instagram_url: '', ordem: 0 });

  useEffect(() => { fetchReels(); }, []);

  const fetchReels = async () => {
    const { data } = await supabase.from('reels').select('*').order('ordem', { ascending: true });
    if (data) setReels(data);
  };

  const handleAdd = async () => {
    if (!newReel.instagram_url) return notify('Preencha a URL do Instagram');
    setLoading(true);
    const { error } = await supabase.from('reels').insert([newReel]);
    setLoading(false);
    if (error) notify('Erro: ' + error.message);
    else {
      setNewReel({ instagram_url: '', ordem: reels.length + 1 });
      fetchReels();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza?')) return;
    await supabase.from('reels').delete().eq('id', id);
    fetchReels();
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-xl font-serif mb-6">Reels do Instagram</h2>
      
      <div className="mb-8 p-6 bg-sand rounded-2xl space-y-4 max-w-2xl">
        <h3 className="font-medium text-charcoal">Adicionar Novo Reel</h3>
        <input placeholder="URL do Reel (ex: https://www.instagram.com/reel/...)" className="w-full p-3 bg-white border border-transparent focus:border-sage rounded-xl outline-none" value={newReel.instagram_url} onChange={e => setNewReel({...newReel, instagram_url: e.target.value})} />
        <button onClick={handleAdd} disabled={loading} className="px-6 py-3 bg-sage text-white rounded-xl font-medium hover:bg-sage/90 transition-colors flex items-center gap-2">
          <Plus size={18} /> Adicionar Reel
        </button>
      </div>

      <div className="space-y-4 max-w-2xl">
        {reels.map(r => (
          <div key={r.id} className="flex items-center justify-between p-4 border border-sand rounded-xl hover:border-sage/30 transition-colors">
            <a href={r.instagram_url} target="_blank" rel="noreferrer" className="text-sage hover:underline truncate max-w-md">
              {r.instagram_url}
            </a>
            <button onClick={() => handleDelete(r.id)} className="text-terracotta p-2 hover:bg-terracotta/10 rounded-lg transition-colors"><Trash2 size={20} /></button>
          </div>
        ))}
        {reels.length === 0 && <p className="text-charcoal/50">Nenhum reel cadastrado. Os reels padrão serão exibidos.</p>}
      </div>
    </div>
  );
};

export const LeadsTab = () => {
  const [leads, setLeads] = useState<any[]>([]);
  
  useEffect(() => {
    supabase.from('leads').select('*').order('created_at', { ascending: false }).then(({data}) => {
      if (data) setLeads(data);
    });
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-xl font-serif mb-6">Leads Capturados</h2>
      
      {!isSupabaseConfigured && (
        <div className="mb-6 p-4 bg-blue-50 text-blue-800 text-sm rounded-xl border border-blue-100">
          <strong>Modo Preview:</strong> O Supabase não está configurado. Os leads reais não podem ser carregados.
        </div>
      )}

      <div className="bg-sand rounded-2xl p-6 mb-8 flex items-center justify-between max-w-sm">
        <div>
          <p className="text-sm font-medium text-charcoal/60 uppercase tracking-wider mb-1">Total de Leads</p>
          <div className="text-4xl font-serif text-sage tabular-nums">{leads.length}</div>
        </div>
        <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
          <Users className="text-sage" size={24} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-sand">
              <th className="py-4 px-4 text-sm font-medium text-charcoal/60">Nome</th>
              <th className="py-4 px-4 text-sm font-medium text-charcoal/60">E-mail</th>
              <th className="py-4 px-4 text-sm font-medium text-charcoal/60">Telefone</th>
              <th className="py-4 px-4 text-sm font-medium text-charcoal/60">Data</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(l => (
              <tr key={l.id} className="border-b border-sand/50 hover:bg-sand/30 transition-colors">
                <td className="py-4 px-4 text-sm text-charcoal font-medium">{l.nome}</td>
                <td className="py-4 px-4 text-sm text-charcoal/80">{l.email}</td>
                <td className="py-4 px-4 text-sm text-charcoal/80">{l.telefone || '-'}</td>
                <td className="py-4 px-4 text-sm text-charcoal/60">{new Date(l.created_at).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-charcoal/50">Nenhum lead capturado ainda. O contador exibirá dados reais quando houver cadastros.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SettingsTab = () => {
  const [kiwifyUrl, setKiwifyUrl] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from('site_content').select('valor').eq('chave', 'settings').single().then(({data: res}) => {
      if (res?.valor?.kiwifyUrl) setKiwifyUrl(res.valor.kiwifyUrl);
    });
  }, []);

  const handleSave = async () => {
    await supabase.from('site_content').upsert({ chave: 'settings', valor: { kiwifyUrl } });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-xl font-serif mb-6">Configurações Gerais</h2>
      
      <div className="space-y-6 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">Integração Kiwify</label>
          <input
            type="url"
            value={kiwifyUrl}
            onChange={(e) => setKiwifyUrl(e.target.value)}
            placeholder="Insira aqui a URL da sua página Kiwify"
            className="w-full px-4 py-3 rounded-xl bg-sand border border-transparent focus:border-sage focus:bg-white outline-none transition-colors"
          />
          <p className="text-xs text-charcoal/50 mt-2">Esta URL será usada para redirecionar os leads após o cadastro.</p>
        </div>

        <button 
          onClick={handleSave}
          className="px-6 py-3 bg-charcoal text-white rounded-xl font-medium hover:bg-charcoal/90 transition-colors"
        >
          {saved ? 'Salvo!' : 'Salvar Configurações'}
        </button>
      </div>
    </div>
  );
};
