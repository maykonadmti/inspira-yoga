import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseUrl = rawUrl && rawUrl.startsWith('http') ? rawUrl : 'https://nxfuefpyfalyubzwezym.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for preview when Supabase is not configured
export const isSupabaseConfigured = 
  rawUrl && 
  rawUrl.startsWith('http') &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'your_supabase_anon_key' &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'placeholder-key';
