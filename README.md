# Inspira Yoga - Landing Page & Admin Panel

Este projeto é uma landing page completa com painel administrativo para o projeto Inspira Yoga.

## Stack Técnica
- React 19 + Vite (adaptado do Next.js para o ambiente AI Studio)
- React Router DOM
- Tailwind CSS
- Framer Motion
- Supabase (Auth, Database, Storage)
- Lucide React (Ícones)

## Configuração do Supabase

Para que o painel administrativo e o conteúdo dinâmico funcionem, você precisa configurar um projeto no Supabase.

### 1. Criar Tabelas (SQL)

Execute o seguinte SQL no SQL Editor do seu projeto Supabase:

```sql
-- Tabela de Configurações e Textos (Chave/Valor)
CREATE TABLE site_content (
  chave text PRIMARY KEY,
  valor jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Tabela de Asanas (Experiência Gratuita)
CREATE TABLE asanas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  descricao text NOT NULL,
  duracao_segundos integer NOT NULL DEFAULT 60,
  imagem_url text,
  ordem integer DEFAULT 0,
  ativo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Tabela de Vídeos do YouTube
CREATE TABLE videos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_url text NOT NULL,
  youtube_id text NOT NULL,
  titulo text NOT NULL,
  destaque boolean DEFAULT false,
  ordem integer DEFAULT 0,
  ativo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Tabela de Reels do Instagram
CREATE TABLE reels (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  instagram_url text NOT NULL,
  ordem integer DEFAULT 0,
  ativo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Tabela de Leads Capturados
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  email text NOT NULL,
  telefone text,
  origem text DEFAULT 'landing_page',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Tabela de Níveis de Doação
CREATE TABLE donation_levels (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo text NOT NULL,
  valor text NOT NULL,
  beneficios jsonb NOT NULL,
  ordem integer DEFAULT 0,
  ativo boolean DEFAULT true
);
```

### 2. Configurar Storage

1. Vá em "Storage" no Supabase.
2. Crie um novo bucket chamado `media`.
3. Marque o bucket como **Public**.

### 3. Configurar Autenticação (Admin)

1. Vá em "Authentication" -> "Providers" e certifique-se de que "Email" está ativado.
2. Vá em "Authentication" -> "Users" e crie um novo usuário com o e-mail `admin@inspirayoga.com` e uma senha segura.

## Deploy na Vercel

1. Crie um repositório no GitHub e faça o push do código.
2. Importe o projeto na Vercel.
3. Configure as variáveis de ambiente na Vercel:
   - `VITE_SUPABASE_URL`: URL do seu projeto Supabase
   - `VITE_SUPABASE_ANON_KEY`: Chave anônima do seu projeto Supabase
   - `VITE_WHATSAPP_NUMBER`: Seu número de WhatsApp (ex: 5548988550617)
   - `VITE_YOUTUBE_CHANNEL_ID`: ID do seu canal no YouTube

## Uso do Painel Administrativo

1. Acesse `/admin` na sua URL de deploy.
2. Faça login com as credenciais criadas no Supabase.
3. Navegue pelas abas para gerenciar o conteúdo:
   - **Hero/Sobre/Doações**: Edite os textos e imagens principais.
   - **Experiência**: Adicione asanas com imagem, nome, descrição e tempo.
   - **Vídeos**: Cole a URL do YouTube para adicionar novos vídeos.
   - **Reels**: Cole a URL do Instagram para adicionar novos reels.
   - **Leads**: Visualize e exporte os contatos capturados.
