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

-- 6. Storage (Upload de Imagens)
-- Criar o bucket 'images' se ele não existir
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage para o bucket 'images'
-- Permitir leitura pública
CREATE POLICY "Imagens públicas" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Permitir upload apenas para usuários autenticados
CREATE POLICY "Upload apenas para admins" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Permitir update/delete apenas para usuários autenticados
CREATE POLICY "Update apenas para admins" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Delete apenas para admins" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
