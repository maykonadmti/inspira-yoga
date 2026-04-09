-- Execute este script no SQL Editor do seu painel do Supabase

-- 1. Tabela de Conteúdo do Site (Hero, Sobre, Configurações)
CREATE TABLE IF NOT EXISTS site_content (
  chave text PRIMARY KEY,
  valor jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabela de Asanas (Experiência Gratuita)
CREATE TABLE IF NOT EXISTS asanas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  descricao text NOT NULL,
  duracao_segundos integer NOT NULL DEFAULT 60,
  imagem_url text NOT NULL,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabela de Vídeos do YouTube
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_id text NOT NULL,
  titulo text NOT NULL,
  destaque boolean NOT NULL DEFAULT false,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabela de Reels do Instagram
CREATE TABLE IF NOT EXISTS reels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instagram_url text NOT NULL,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabela de Leads (Cadastros)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  telefone text,
  origem text DEFAULT 'landing_page',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Configuração de Segurança (Row Level Security - RLS)

-- Habilitar RLS em todas as tabelas
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE asanas ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Políticas para site_content (Leitura pública, Escrita apenas autenticados)
CREATE POLICY "Conteúdo visível para todos" ON site_content FOR SELECT USING (true);
CREATE POLICY "Apenas admins podem modificar conteúdo" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para asanas (Leitura pública, Escrita apenas autenticados)
CREATE POLICY "Asanas visíveis para todos" ON asanas FOR SELECT USING (true);
CREATE POLICY "Apenas admins podem modificar asanas" ON asanas FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para videos (Leitura pública, Escrita apenas autenticados)
CREATE POLICY "Vídeos visíveis para todos" ON videos FOR SELECT USING (true);
CREATE POLICY "Apenas admins podem modificar vídeos" ON videos FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para reels (Leitura pública, Escrita apenas autenticados)
CREATE POLICY "Reels visíveis para todos" ON reels FOR SELECT USING (true);
CREATE POLICY "Apenas admins podem modificar reels" ON reels FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para leads (Inserção pública, Leitura/Escrita apenas autenticados)
CREATE POLICY "Qualquer um pode inserir leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Apenas admins podem ver leads" ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Apenas admins podem modificar leads" ON leads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Apenas admins podem deletar leads" ON leads FOR DELETE USING (auth.role() = 'authenticated');

-- Inserir dados padrão (Opcional, para não começar vazio)
INSERT INTO site_content (chave, valor) VALUES 
('hero', '{"title": "Respire. Conecte-se. Transforme-se.", "subtitle": "Práticas de yoga e respiração consciente para trazer mais equilíbrio e presença para o seu dia a dia.", "ctaText": "Começar agora", "secondaryText": "Saiba mais", "backgroundImage": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop"}'),
('about', '{"title": "Sobre Mim", "description": "Olá, sou Maykon. Minha jornada com o yoga começou há mais de 10 anos. Acredito que a prática deve ser acessível, orgânica e adaptada à realidade de cada um. Meu foco é ajudar você a encontrar espaço no corpo e na mente através da respiração consciente e do movimento fluido.", "image": "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=800&auto=format&fit=crop", "stats": [{"label": "Anos de Experiência", "value": "10+"}, {"label": "Alunos Transformados", "value": "500+"}, {"label": "Estilo de Prática", "value": "Vinyasa & Hatha"}]}'),
('settings', '{"kiwifyUrl": ""}');
