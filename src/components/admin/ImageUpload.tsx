import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Upload, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Imagem" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!isSupabaseConfigured) {
        alert('Supabase não configurado. Upload indisponível no modo preview.');
        return;
      }

      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      onChange(data.publicUrl);
    } catch (error: any) {
      alert('Erro ao fazer upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-charcoal/80">{label}</label>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-sand shrink-0">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-xl border border-dashed border-sage/50 flex items-center justify-center bg-sand/50 text-sage shrink-0">
            <ImageIcon size={24} />
          </div>
        )}
        
        <div className="flex-1">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-sand rounded-xl hover:bg-sand/50 transition-colors text-sm font-medium text-charcoal">
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? 'Enviando...' : 'Fazer Upload'}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
          <p className="text-xs text-charcoal/50 mt-2">
            Ou cole uma URL externa abaixo:
          </p>
          <input 
            type="text" 
            className="w-full mt-1 p-2 text-sm bg-sand border border-transparent focus:border-sage focus:bg-white rounded-lg outline-none transition-colors" 
            value={value} 
            onChange={e => onChange(e.target.value)} 
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
}
